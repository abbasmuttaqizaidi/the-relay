import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("No database connection string found in env.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function generateBaseSlug(title) {
  if (!title) return "insight";
  const slug = title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (slug.length <= 80) return slug || "insight";
  const truncated = slug.slice(0, 80);
  const lastHyphen = truncated.lastIndexOf("-");
  return (lastHyphen > 40 ? truncated.slice(0, lastHyphen) : truncated) || "insight";
}

async function backfill() {
  const questions = await prisma.question.findMany({ where: { slug: null } });
  console.log(`Found ${questions.length} questions without slug.`);
  for (const q of questions) {
    const base = generateBaseSlug(q.title);
    let candidate = base;
    let counter = 2;
    while (await prisma.question.findFirst({ where: { slug: candidate, NOT: { id: q.id } } })) {
      candidate = `${base}-${counter}`;
      counter++;
    }
    await prisma.question.update({ where: { id: q.id }, data: { slug: candidate } });
    console.log(`Updated question "${q.title.slice(0, 40)}" -> ${candidate}`);
  }

  const articles = await prisma.knowledgeInsight.findMany({ where: { slug: null } });
  console.log(`Found ${articles.length} knowledge articles without slug.`);
  for (const a of articles) {
    const base = generateBaseSlug(a.title);
    let candidate = base;
    let counter = 2;
    while (await prisma.knowledgeInsight.findFirst({ where: { slug: candidate, NOT: { id: a.id } } })) {
      candidate = `${base}-${counter}`;
      counter++;
    }
    await prisma.knowledgeInsight.update({ where: { id: a.id }, data: { slug: candidate } });
    console.log(`Updated article "${a.title.slice(0, 40)}" -> ${candidate}`);
  }

  console.log("Backfill complete!");
  await pool.end();
}

backfill().catch((e) => {
  console.error("Backfill failed:", e);
  process.exit(1);
});
