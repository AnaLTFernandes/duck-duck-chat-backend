/*
  Warnings:

  - You are about to drop the column `userid` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_userid_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userid_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "userid",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "userid",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
