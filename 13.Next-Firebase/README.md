# Run the container
docker run --name next-firebase -p 4000:3000 -v $PWD:/web -w /web -d -it next-firebase-image bash