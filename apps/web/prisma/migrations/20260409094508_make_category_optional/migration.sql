-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "savingId" TEXT,
ALTER COLUMN "category" DROP NOT NULL;
