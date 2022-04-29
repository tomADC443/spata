-- CreateTable
CREATE TABLE "HttpCode" (
    "code" INTEGER NOT NULL,
    "phrase" TEXT NOT NULL,

    CONSTRAINT "HttpCode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "providerId" TEXT,
    "given_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_HttpCodes" (
    "userId" TEXT NOT NULL,
    "codeId" INTEGER NOT NULL,
    "right" INTEGER NOT NULL DEFAULT 0,
    "wrong" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_HttpCodes_pkey" PRIMARY KEY ("codeId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "HttpCode_code_key" ON "HttpCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User_HttpCodes" ADD CONSTRAINT "User_HttpCodes_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "HttpCode"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_HttpCodes" ADD CONSTRAINT "User_HttpCodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
