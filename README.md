# express-ts restful api challenge

 TypeScript, NodeJS API to meet the code assignment requirements

## Requirements

* Docker
* MongoDB
* NodeJS version 8+

## Run in Docker

```
$ git clone https://github.com/alphana/express-ts.git
$ cd express-ts
$ docker-compose up -d
```
Check http://localhost:7817/docs

## Local development

### Installation
Change the MongoDB uri to connect to your database. 
Install the dependencies and devDependencies and start the server.

```
$ git clone https://github.com/alphana/express-ts.git
$ cd express-ts
$ npm install
$ npm run dev
```
Check http://localhost:7817/docs

## Heroku development
A connecting to challenge-xzwqd.mongodb.net/getir-case-study db version is deployed to heroku
Check https://challange-getir.herokuapp.com/docs

run following curl to check
```
curl --location --request POST 'https://challange-getir.herokuapp.com/api/record' \
--header 'Content-Type: application/json' \
--data-raw '{
"startDate": "2017-01-26",
"endDate": "2018-02-02",
"minCount": 0,
"maxCount": 30000
}'
```


