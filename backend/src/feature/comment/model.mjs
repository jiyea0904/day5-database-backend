import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const commentFindMany = async (pageStart, pageEnd, post_id) =>
  prisma.film_comment.findMany({
    where: {
      post_id,
    },
    include: {
      customer: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    skip: pageStart,
    take: pageEnd,
  });

export const commentCreate = async ({ post_id, customer_id, content }) =>
  prisma.film_comment.create({
    data: {
      content,
      post_id,
      customer_id,
    },
  });

export const commentUpdate = async (id, { content }) =>
  prisma.film_comment.update({
    where: { id },
    data: { content },
  });

export const commentDelete = async (id) =>
  prisma.film_comment.delete({
    where: { id },
  });
