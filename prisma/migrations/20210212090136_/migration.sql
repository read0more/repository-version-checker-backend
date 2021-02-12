-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "githubId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profileImage" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRepository" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "repositoryId" INTEGER NOT NULL,
    "repositoryUrl" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepositoryVersion" (
    "id" SERIAL NOT NULL,
    "repositoryId" INTEGER NOT NULL,
    "prerelease" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.githubId_unique" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRepository.userId_repositoryId_unique" ON "UserRepository"("userId", "repositoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository.name_unique" ON "Repository"("name");

-- AddForeignKey
ALTER TABLE "UserRepository" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRepository" ADD FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryVersion" ADD FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
