# Installing PHP and Composer for Laravel Backend

Since you don't have PHP/Composer installed, here are options to run Phase 1:

## Option 1: Install PHP & Composer (Recommended for Full Laravel)

### For Windows:

1. **Download PHP:**
   - Visit: https://windows.php.net/download/
   - Download PHP 8.1+ (Thread Safe version)
   - Extract to `C:\php`
   - Add `C:\php` to your PATH environment variable

2. **Download Composer:**
   - Visit: https://getcomposer.org/download/
   - Download and run `Composer-Setup.exe`
   - It will auto-detect PHP

3. **Verify installation:**
   ```powershell
   php --version
   composer --version
   ```

4. **Install Laravel:**
   ```bash
   composer global require laravel/installer
   ```

## Option 2: Use XAMPP (Easier)

1. **Download XAMPP:**
   - Visit: https://www.apachefriends.org/
   - Download XAMPP for Windows
   - Install it (includes PHP, MySQL, Apache)

2. **Install Composer:**
   - Download from: https://getcomposer.org/download/
   - Run `Composer-Setup.exe`

3. **Create Laravel project:**
   ```bash
   composer create-project laravel/laravel my-laravel-app
   ```

## Option 3: Use Docker (Advanced)

If you have Docker installed, you can use Laravel Sail:
```bash
docker run --rm -v ${PWD}:/app composer create-project laravel/laravel my-laravel-app
```

## Option 4: Alternative - Standalone PHP API

I can create a simplified standalone PHP API that doesn't require Laravel framework - just pure PHP with MySQL. Would you like me to create that?

---

**Note:** For now, you can work on Phase 2 and Phase 3 without PHP. Phase 2 needs the Laravel API to be running, but Phase 3 can work with mock data if needed.




