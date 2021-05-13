pushd %~dp0

cd backendServer
start /min cmd /c "activateOfflineBackend.bat" 

cd ..

cd offlineTranslation
start /min cmd /c "activateOfflineTranslationServer.bat" 

cd ..

cd userInterface
start userInterface.exe


