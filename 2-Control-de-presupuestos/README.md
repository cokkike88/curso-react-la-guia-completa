# Run docker for first time
docker run --name budget-control -v $PWD:/web -u node -p 5566:5566 -it node bash
