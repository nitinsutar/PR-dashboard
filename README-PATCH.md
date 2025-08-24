# Patch Instructions

1) Place `app/layout.tsx` under your project's `app/` folder, replacing the old file.
2) Ensure there is a file `app/providers.tsx` (lowercase **p**) with the exact contents in this patch.
3) Verify your header component lives at `components/Header.tsx` (case-sensitive).

> If you previously used `@/components/Header` imports, this patch switches to **relative** imports so the build doesn't rely on tsconfig path aliases.

After copying, clear build cache locally:
```
rm -rf .next
npm run build
```
Commit and redeploy to Vercel.
