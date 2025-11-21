# Deployment Guide for Kaambala Admin Portal

## Fixing 404 Errors on Direct Access

When accessing `admin.kaambala.com` directly or refreshing pages, you may get 404 errors. This is because the server needs to be configured to serve `index.html` for all routes (since React Router handles routing on the client side).

## Solution 1: Nginx Configuration

1. Copy the `nginx.conf` file to your server's nginx configuration directory (usually `/etc/nginx/sites-available/`)

2. Update the `root` path in the config to point to your actual deployment directory:
   ```nginx
   root /var/www/admin-portal/dist;
   ```

3. Create a symbolic link to enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/admin-portal /etc/nginx/sites-enabled/
   ```

4. Test the configuration:
   ```bash
   sudo nginx -t
   ```

5. Reload nginx:
   ```bash
   sudo systemctl reload nginx
   ```

## Solution 2: Apache Configuration

1. Copy the `.htaccess` file to your `dist` directory after building:
   ```bash
   cp .htaccess dist/
   ```

2. Make sure `mod_rewrite` is enabled in Apache:
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

3. Ensure your Apache virtual host allows `.htaccess` overrides:
   ```apache
   <Directory /var/www/admin-portal/dist>
       Options Indexes FollowSymLinks
       AllowOverride All
       Require all granted
   </Directory>
   ```

## Solution 3: Using a Node.js Server (Express)

If you're using Node.js/Express, you can use the `serve-static` package:

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Build and Deploy Steps

1. Build the production version:
   ```bash
   npm run build
   ```

2. The `dist` folder contains all the production files.

3. Upload the `dist` folder contents to your server.

4. Configure your web server (Nginx/Apache) as described above.

## Important Notes

- Always ensure `index.html` is served for all routes
- Static assets (JS, CSS, images) should be cached
- `index.html` should NOT be cached (always fetch fresh version)
- Make sure your server has proper CORS headers if needed

## Testing

After deployment, test:
- Direct access to `admin.kaambala.com` → Should show login page
- Access to `admin.kaambala.com/users` → Should show users page (after login)
- Refresh on any page → Should not show 404

