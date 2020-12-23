-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
"id" SERIAL,
    "apt" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "mostLonely" TEXT NOT NULL,
    "lonelinessMeans" TEXT NOT NULL,
    "firstTime" TEXT NOT NULL,
    "lastTime" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "searchField" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Story.apt_unique" ON "Story"("apt");

-- AddForeignKey
ALTER TABLE "Story" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
