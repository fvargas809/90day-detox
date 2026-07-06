-- CreateTable
CREATE TABLE "Funnel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "offerTag" TEXT NOT NULL,
    "ctaLabel" TEXT NOT NULL,
    "successMessage" TEXT NOT NULL DEFAULT 'Thanks! We''ll be in touch shortly.',
    "variant" TEXT NOT NULL DEFAULT 'forest',
    "collectPhone" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Funnel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Funnel_offerTag_key" ON "Funnel"("offerTag");
