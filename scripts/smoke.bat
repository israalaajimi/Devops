@echo off

set URL=%1
echo Testing %URL%

curl -s --head %URL% | find "200" > nul

if %ERRORLEVEL%==0 (
    echo PASS > smoke_result.txt
    exit /b 0
) else (
    echo FAIL > smoke_result.txt
    exit /b 1
)
