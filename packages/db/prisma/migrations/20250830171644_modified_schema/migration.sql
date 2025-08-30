-- AlterEnum
ALTER TYPE "AuthType" ADD VALUE 'Email';

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "amount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authType" "AuthType",
ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
