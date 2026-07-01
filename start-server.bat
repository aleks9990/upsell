@echo off
cd /d "%~dp0"
echo starting %date% %time% > server-launch.log
"C:\Users\Administrator\AppData\Local\Programs\Python\Python313\python.exe" static_server.py >> server-launch.log 2>&1
echo exited %errorlevel% %date% %time% >> server-launch.log
