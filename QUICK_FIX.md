# Quick Fix for 404 Error on admin.kaambala.com

## Immediate Steps to Fix:

### 1. Rebuild and Copy .htaccess
```bash
npm run build
```
This will now automatically copy `.htaccess` to the `dist` folder.

### 2. Upload ALL Contents of `dist` Folder

**IMPORTANT:** Upload the CONTENTS of the `dist` folder to your web root, NOT the `dist` folder itself.

Your web root should contain:
- `index.html`
- `assets/` folder (with JS and CSS files)
- `.htaccess` file
- `vite.svg` (if needed)

### 3. Verify Server Configuration

#### For Apache:
1. **Enable mod_rewrite:**
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

2. **Check your virtual host config** (`/etc/apache2/sites-available/admin.kaambala.com.conf` or similar):
   ```apache
   <VirtualHost *:80>
       ServerName admin.kaambala.com
       DocumentRoot /var/www/admin-portal
       
       <Directory /var/www/admin-portal>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

3. **Check Apache error logs:**
   ```bash
   sudo tail -f /var/log/apache2/error.log
   ```

#### For Nginx:
1. **Check your server block** (`/etc/nginx/sites-available/admin.kaambala.com`):
   ```nginx
   server {
       listen 80;
       server_name admin.kaambala.com;
       root /var/www/admin-portal;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

2. **Test and reload:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### 4. Check File Permissions
```bash
sudo chown -R www-data:www-data /var/www/admin-portal
sudo chmod -R 755 /var/www/admin-portal
sudo chmod 644 /var/www/admin-portal/.htaccess
```

### 5. Test Direct Access
Try accessing:
- `https://admin.kaambala.com/index.html` - Should work
- `https://admin.kaambala.com/` - Should also work after fix

## Common Mistakes:

❌ **Wrong:** Uploading the `dist` folder itself
✅ **Correct:** Uploading the CONTENTS of the `dist` folder

❌ **Wrong:** Missing `.htaccess` file
✅ **Correct:** `.htaccess` must be in web root

❌ **Wrong:** `AllowOverride None` in Apache config
✅ **Correct:** `AllowOverride All` in Apache config

❌ **Wrong:** mod_rewrite not enabled
✅ **Correct:** `sudo a2enmod rewrite` and restart Apache

## Still Getting 404?

1. Check if `index.html` exists in web root
2. Check Apache/Nginx error logs
3. Verify DNS points to correct server
4. Check if SSL certificate is blocking (try HTTP first)

