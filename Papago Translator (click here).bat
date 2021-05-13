pushd %~dp0

cd backendServer
start /min cmd /c "activatePapagoServer.bat" 

cd ..

cd userInterface
start userInterface.exe


