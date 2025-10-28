/*
  Warnings:

  - You are about to drop the column `resetPasswordExpiry` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."users_provider_providerId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "resetPasswordExpiry",
DROP COLUMN "resetPasswordToken",
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3),
ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "provider" DROP DEFAULT;
