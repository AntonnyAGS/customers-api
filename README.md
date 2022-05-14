# Customers API

## To run it (development mode)
```
docker-compose up
```
or

```
docker-compose up --build -V //To ensure that new packages from node_modules will be installed
```

## To build it (production mode)
```
docker build -t customers-api .
```
And to run production mode: 
```
docker run customers-api
``` 

## Requisites
1. Save an customer
2. Update an customer
3. Search an customer by id