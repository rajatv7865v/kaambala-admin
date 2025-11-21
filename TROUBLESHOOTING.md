# Troubleshooting 404 Errors on admin.kaambala.com

## Issue: GET https://admin.kaambala.com/ 404 (Not Found)

This error means the server cannot find the files. Here's how to fix it:

## Step 1: Verify Files Are Deployed

Make sure the `dist` folder contents are uploaded to your server's web root directory.

**Check:**
- Is `index.html` in the web root?
- Are the `assets` folder and files present?
- Is `.htaccess` file in the web root? (for Apache)

## Step 2: Check Server Configuration

### For Apache:

1. **Verify .htaccess is in the dist folder:**
   ```bash
   # After building, make sure .htaccess is copied:
   npm run build
   # This should copy .htaccess to dist/
   ```

2. **Check if mod_rewrite is enabled:**
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

3. **Verify Apache allows .htaccess overrides:**
   Check your Apache virtual host configuration:
   ```apache
   <Directory /path/to/your/web/root>
       Options Indexes FollowSymLinks
       AllowOverride All
       Require all granted
   </Directory>
   ```

4. **Check Apache error logs:**
   ```bash
   sudo tail -f /var/log/apache2/error.log
   ```

### For Nginx:

1. **Verify nginx.conf is properly configured:**
   - Check that `root` points to the correct directory
   - Ensure `try_files $uri $uri/ /index.html;` is present

2. **Check Nginx error logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Test Nginx configuration:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Step 3: Verify File Permissions

Make sure files have correct permissions:
```bash
# Set proper permissions
sudo chown -R www-data:www-data /path/to/web/root
sudo chmod -R 755 /path/to/web/root
```

## Step 4: Check Document Root

Verify your server's document root matches where you uploaded the files:

**Apache:**
- Check `DocumentRoot` in your virtual host config
- Usually in `/etc/apache2/sites-available/`

**Nginx:**
- Check `root` directive in your server block
- Usually in `/etc/nginx/sites-available/`

## Step 5: Test Direct File Access

Try accessing files directly:
- `https://admin.kaambala.com/index.html` - Should work
- `https://admin.kaambala.com/assets/index-*.js` - Should work

If these work but the root doesn't, it's a routing configuration issue.

## Step 6: Common Issues

### Issue: Files not in correct location
**Solution:** Upload all contents of `dist` folder to web root, not the `dist` folder itself.

### Issue: .htaccess not working
**Solution:** 
- Ensure `AllowOverride All` is set in Apache config
- Check file permissions on .htaccess
- Verify mod_rewrite is enabled

### Issue: Nginx not serving index.html
**Solution:**
- Add `index index.html;` directive
- Ensure `try_files` includes `/index.html`

## Quick Checklist

- [ ] Files uploaded to correct web root directory
- [ ] `.htaccess` file is in web root (Apache)
- [ ] `mod_rewrite` enabled (Apache)
- [ ] `AllowOverride All` set (Apache)
- [ ] Nginx `try_files` configured correctly (Nginx)
- [ ] File permissions are correct (755 for directories, 644 for files)
- [ ] Server restarted after configuration changes
- [ ] Error logs checked for specific errors

## Still Having Issues?

1. Check server error logs for specific error messages
2. Verify the domain DNS points to the correct server
3. Check if SSL certificate is properly configured
4. Ensure firewall allows HTTP/HTTPS traffic

