pushd %~dp0

cd backendServer
cd Modules
cd Offline-Translation-Server

start /min cmd /c "activate.bat" 

cd ..
cd ..
cd ..

cd userInterface
start userInterface.exe


