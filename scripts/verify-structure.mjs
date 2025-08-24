import { access } from "node:fs/promises";

async function must(p) {
  try { await access(p); console.log("✔", p); }
  catch { console.error("✖ Missing:", p); process.exitCode = 1; }
}
await must("./app/layout.tsx");
await must("./app/providers.tsx");
await must("./components/Header.tsx");
console.log("\nIf all three are ✔, imports should resolve.");
