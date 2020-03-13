# Run docker for first time
docker run --name react-container -v $PWD:/web -w /web -u node -p 5566:5566 -it node bash

# enter the container run
npm install

# exit the container and remove the container
docker rm -fv react-container

# create container with docker-compose
docker-compose up -d