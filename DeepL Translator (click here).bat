pushd %~dp0

cd backendServer
start /min cmd /c "activateDeepLserver.bat" 

cd ..

cd userInterface
start userInterface.exe


