/*
  Warnings:

  - You are about to drop the `post_views` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post_views" DROP CONSTRAINT "post_views_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_views" DROP CONSTRAINT "post_views_user_id_fkey";

-- DropTable
DROP TABLE "post_views";

-- CreateTable
CREATE TABLE "posts_views" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "posts_views_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_views_postId_userId_key" ON "posts_views"("postId", "userId");

-- AddForeignKey
ALTER TABLE "posts_views" ADD CONSTRAINT "posts_views_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
