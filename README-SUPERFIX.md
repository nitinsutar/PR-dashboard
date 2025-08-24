# SUPERFIX PATCH (handles both `app/` and `src/app/`)

Copy these files into your repo root:
- If your project uses `app/` at root → keep files under `app/` and `components/`.
- If your project uses `src/app/` → keep files under `src/app/` and `src/components/`.

> Remove any `@/components/Header` imports you still have — these files use **relative imports** only.

## Steps
1. Copy patch files (choose the correct folder structure for your project).
2. Delete any old `Providers.tsx` with different casing or location conflicts.
3. Clear caches:
   ```bash
   rm -rf .next
   npm run build
   ```
4. Commit and push → Vercel rebuilds.

**Reminder:** Linux (Vercel) is case‑sensitive. Ensure the file is exactly `providers.tsx` (lowercase) or import the capitalized re‑export we included.
