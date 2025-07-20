@echo off
pushd %~dp0
cd Server
node test-env-server.js
popd
pause 