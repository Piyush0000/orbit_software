-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateTable
CREATE TABLE "Coupon" (
    "id"            TEXT        NOT NULL,
    "storeId"       TEXT        NOT NULL,
    "code"          TEXT        NOT NULL,
    "type"          "DiscountType" NOT NULL,
    "value"         DOUBLE PRECISION NOT NULL,
    "minOrderValue" DOUBLE PRECISION,
    "maxUses"       INTEGER,
    "usedCount"     INTEGER     NOT NULL DEFAULT 0,
    "expiresAt"     TIMESTAMP(3),
    "isActive"      BOOLEAN     NOT NULL DEFAULT true,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_storeId_code_key" ON "Coupon"("storeId", "code");

-- CreateIndex
CREATE INDEX "Coupon_storeId_idx" ON "Coupon"("storeId");

-- CreateIndex
CREATE INDEX "Coupon_code_idx" ON "Coupon"("code");
