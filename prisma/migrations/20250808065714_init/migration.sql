-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "surname" TEXT,
    "name" TEXT,
    "city" TEXT,
    "address" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
