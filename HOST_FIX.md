# Fix for "Blocked request. This host is not allowed" Error

## Solution Applied

I've updated `vite.config.js` with:
- `host: '0.0.0.0'` - Allows external connections
- `allowedHosts` array with `admin.kaambala.com`
- Updated npm scripts to include `--host` flag

## Important: Restart Required!

**You MUST restart the dev server** after changing vite.config.js:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

## Alternative Solutions

### Option 1: Use --host flag directly
```bash
npm run dev -- --host
```

### Option 2: If still not working, temporarily allow all hosts (NOT RECOMMENDED for production)
In `vite.config.js`, change:
```javascript
server: {
  host: '0.0.0.0',
  allowedHosts: true  // ⚠️ Allows all hosts - security risk!
}
```

### Option 3: Use production build instead (RECOMMENDED)
**For production, don't use the dev server!**

1. Build for production:
   ```bash
   npm run build
   ```

2. Serve the `dist` folder with Apache/Nginx (not Vite dev server)

3. The production build doesn't have host restrictions

## Check Your Setup

**Are you running in development or production?**

- **Development** (`npm run dev`): Use the updated vite.config.js and restart
- **Production**: Use `npm run build` and serve with Apache/Nginx (no dev server needed)

## Still Having Issues?

1. Check Vite version: `npm list vite`
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check if port 5173 is accessible
4. Verify DNS points to your server correctly

