import express from "express";
import { createOne, deleteOne, getAll, updateOne } from "./controller.mjs";

const router = express.Router();
// router.get("/:commentId", getAll);
// router.post("/", createOne);

router.patch("/:commentId", updateOne);
router.delete("/:commentId", deleteOne);

export const commentRouter = router;
export const commentGetRouter = getAll;
export const commentCreateRouter = createOne;
