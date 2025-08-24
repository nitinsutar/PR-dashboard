# Hardfix Patch (module resolution)

This patch **removes path aliases** and forces **relative imports** to resolve:
- `app/layout.tsx` → imports `./providers` and `../components/Header`
- `app/providers.tsx` → required by layout
- `components/Header.tsx` → required by layout
- `tsconfig.json` → NO `baseUrl` / `paths`

## Apply
1. Copy the files in this zip to your repo root, **overwriting** existing ones.
2. Ensure your project structure is exactly:
   ```
   app/
     layout.tsx
     providers.tsx
   components/
     Header.tsx
   tsconfig.json
   ```
3. (Local) run the checker:
   ```bash
   node scripts/verify-structure.mjs
   rm -rf .next
   npm run build
   ```
4. Commit and push to Vercel.

If Vercel had cached an older build, trigger a fresh build by clearing cache or making a new commit.
