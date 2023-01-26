# What is IT - API

Welcome to `What is IT` - a user-friendly API for deciphering abbreviated IT terms.

## DEV

Build Docker image from project root:

```
$ docker build -t aleksbelic/what-is-it-api .
```

Image can also be built using public GitHub repo:

```
$ docker build -t aleksbelic/what-is-it-api https://github.com/aleksbelic/what-is-it-api.git
```

Scan new image for vulnerabilities with Snyk:

```
$ docker scan aleksbelic/what-is-it-api
```

Create new container from image:

```
$ docker run -p {YOUR_PORT}:3000 --name {YOUR_NEW_CONTAINER_NAME} aleksbelic/what-is-it-api
```

e.g.

```
$ docker run -p 3003:3000 --name what-is-it-api aleksbelic/what-is-it-api
```

Run your new container:

```
$ docker start {YOUR_NEW_CONTAINER_NAME}
```

Publish image changes to Docker Hub (make sure you're logged in with `docker login` command):

```
$ docker push aleksbelic/what-is-it-api
```
