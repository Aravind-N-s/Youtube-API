# Youtube-API
#### Project Statement
- To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.
#### Pre-Requisites
##### IGNORE IF ENVIRONMENT IS ALREADY SET UP
Download and Install [NodeJS](https://nodejs.org/en/)
Install the package manager [npm](http://npmjs.com/).

#### Initial Set-up
Use the package manager [npm](http://npmjs.com/) to install node packages required.
```npm
npm install
```
##### The following settings have to be set in the .env file to run the app
```
PORT=9000
QUERY= <Your choice of query/ default to cricket>
USERNAME_FIELD=email
PASSWORD_FIELD=password
TOKEN_SECRET=<Your Token Secret>
MONGODB_URI=<Your KEY>
ELASTIC_LOGSTASH_UR =<Your KEY>
YOUTUBE_KEY=<Your KEY>
```

##### At the root folder run the following command to launch the project
```npm
npm run dev
```
##### To view API Documentation, Make Sure the .jsdoc config file exists then run the following command
```npm
npm run doc
```
view the output at the docs folder in the root directory.

# Testing
 - The following conditions have to be met to run the test cases
#### Initial Set-up
- Create a .env.test file with the following credentials
```
HOST=http://localhost:9000
EMAIL=<any email of your choice>
PASSWORD=<password with greater than 6 letters>
```
Following which please run the Application with
```npm
npm run start
```
Subsequently run the following commands for the output of the test cases
```npm
npm run test
```

# Docker
 - The following commands will containerize the application and help you run it locally
#### Initial Set-up
- Create a .env file with the above credentials

Use the below commands to create and image
```docker
docker images build . -t youtube-api-project
```
On successful build use the below command to run the container on the local system
```npm
docker run -p 9000:90000 -it youtube-api-project
```