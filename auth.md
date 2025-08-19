## Setup
- npm init
- entry point - initial or main file of prgm
- import -> type = module (package.json)
- critical info in .env / .env.sample
- npm install express -> builds web servers and APIs, easier than plain nodejs
    - get - read data (fetch)
    - post - create data (send data to server)
    - put - update data
    - delete - remove data
- req on routes(/) then callback execute
- npm i -D nodemon -> monitor and reload (-D : dev dependencies)
- to run scripts -> npm run dev/start
- npm i dotenv -> loads env var into process env
- CORS - cross origin resource sharing (client -> frontend -> backend)
    - cors i.e origin, methods, allowheaders, credentials
    - cors err are resolve on backend
    - cors err - the browser blocks a request to a server because the server has not allowed that origin
- backend --> ORM (sql) / ODM (nosql) --> Database (sql / nosql) 
- backend --> mongoose --> mongoDB
- mongoDB connection
    - create cluster, admin
    - ip whitelisting
    - load mongo_url in env
    - db fn 
- 







### semantic version
- major.minor.patch
- MAJOR → increase when you make breaking changes that are not backward compatible
- MINOR → increase when you add features that are backward compatible
- PATCH → increase when you fix bugs without changing features
- ^ allow minor and patch updates
- ~ allow only patch updates
- star* any version
