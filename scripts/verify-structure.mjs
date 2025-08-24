import { access } from "node:fs/promises";

async function must(p) {
  try { await access(p); console.log("✔", p); }
  catch { console.error("✖ Missing:", p); process.exitCode = 1; }
}
const hasSrcApp = await access("./src/app").then(() => true).catch(() => false);

if (hasSrcApp) {
  await must("./src/app/layout.tsx");
  await must("./src/app/providers.tsx");
  // header can be in root or src
  try { await access("./src/components/Header.tsx"); console.log("✔ ./src/components/Header.tsx"); }
  catch { await must("./components/Header.tsx"); }
} else {
  await must("./app/layout.tsx");
  await must("./app/providers.tsx");
  await must("./components/Header.tsx");
}
console.log("\nIf all are ✔, imports should resolve without '@' aliases.");
