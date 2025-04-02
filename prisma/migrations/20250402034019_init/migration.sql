-- CreateTable
CREATE TABLE "SiteMetadata" (
    "id" TEXT NOT NULL,
    "about" TEXT,
    "privacyPolicy" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "socialMedia" JSONB NOT NULL,

    CONSTRAINT "SiteMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteMetadata_email_key" ON "SiteMetadata"("email");
