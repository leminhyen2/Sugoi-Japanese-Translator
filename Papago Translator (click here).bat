pushd %~dp0

cd backendServer
cd Modules
cd Papago-Server

start /min cmd /c "activate.bat" 

cd ..
cd ..
cd ..

cd userInterface
start userInterface.exe


