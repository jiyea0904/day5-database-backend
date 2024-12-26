import getPageStartEnd from "../../util/getPageStartEnd.mjs";
import { commentCreate, commentFindMany, commentUpdate, commentDelete } from "./model.mjs";

export const getAll = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const post_id = req.params.postId;
  const { pageStart, pageEnd } = getPageStartEnd(Number(limit), Number(page));

  try {
    const result = await commentFindMany(pageStart, pageEnd, Number(post_id));
    if (!result) return res.status(404).json({ error: "Not Found" });
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

export const createOne = async (req, res) => {
  const content = req.body.content;
  const customer_id = req.body.customerId;
  const post_id = req.body.postId;
  if (!post_id || !customer_id || !content)
    return res.status(400).json({ error: "Bad Request" });

  const like = {
    post_id,
    customer_id,
    content,
  };

  try {
    const result = await commentCreate(like);
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(400).json({ error: e.stack });
  }
};

export const updateOne = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const result = await commentUpdate(Number(commentId), { content });
    if (!result) return res.status(404).json({ error: "Comment not found" });
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

export const deleteOne = async (req, res) => {
  const { commentId } = req.params;

  try {
    const result = await commentDelete(Number(commentId));
    if (!result) return res.status(404).json({ error: "Comment not found" });
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};
