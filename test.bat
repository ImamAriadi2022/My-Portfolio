@echo off
echo ========================================
echo    Testing React Portfolio
echo ========================================
echo.

echo Installing dependencies...
call npm install

echo.
echo Starting development server...
echo Check console for any errors with particles.js
echo.

call npm run dev

pause
