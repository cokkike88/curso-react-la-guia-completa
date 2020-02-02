# Run docker for first time
docker run --name patient-manager -v $PWD:/web -u node -p 5566:5566 -it node bash
