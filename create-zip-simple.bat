@echo off
echo Creating shareable zip file...
echo This will exclude node_modules to keep file size small.
echo.

cd /d "%~dp0"
cd ..

powershell -ExecutionPolicy Bypass -File "beyondchats-task\create-shareable-zip.ps1"

echo.
echo Done! Check the parent folder for beyondchats-task-shareable.zip
pause



