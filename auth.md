## Auth

### Project Setup
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
    - req: client --> server (req.body, req.params(url path), req.header, req.method, req.query)
    - res: server --> client (res.status(), res.send())
- npm i -D nodemon -> monitor and reload (-D : dev dependencies) , alternative pm2, node-dev
- to run scripts -> npm run dev/start
- npm i dotenv -> loads env var into process env
    - process.env is global obj
    - .env --- dotenv ---- process.env (contains all env variables)
- CORS - cross origin resource sharing (client -> frontend -> backend)
    - cors i.e origin, methods, allowheaders, credentials
    - cors err are resolve on backend
    - cors err - the browser blocks a request to a server because the server has not allowed that origin
    - rules to allow/block cross origin req


### DB Connection
- backend --> ORM (sql) / ODM (nosql) --> Database (sql / nosql) 
- backend --> mongoose --> mongoDB
- mongoDB connection
    - create cluster, admin
    - ip whitelisting
    - load mongo_url in env
    - db fn 
- model
    - schemas
    - db structure


### Layers of Express
- route
    - define which URL and which HTTP method will trigger some code (controller)
    - URL -> controller
    - http methods: get, post, delete, put

- controller
    - fn that handle req & res
    - route -> controller -> fetch data from services / db -> response
    - (req, res) => {// logic}
    - event driven architecture nodejs -> fn runs based on event

- service
    - actual logic 
    - usually logic written inside controllers itself

- model
    - represents schema/ structure of db
    - User: model created from schema (class) / whole user collection
    - user: instance of user / one document from that collection
    - hook: presave <- save -> postsave

- middleware
    - req --> middleware --> controller --> res
    - to add common ft across routes w/o repeating code
    - signature (req, res, next)

- utils
    - small reusable functions, not tied to routes or req/res
    - hashing, file uploader, email sender

- config
    - files that hold settings and environment- specific values
    - for diff config (dev, test, prod)
    - db connect, .env


### Node Lib.
- nodemailer: used to send emails from your server (node lib)
- mailtrap: testing emails
- bcryptjs: password hashing w/ salt, can't reverse (one-way)
- crypto: genrate gibbrish token/string
- jsonwebtoken (JWT)
    - used for authentication and authorization
    - user log in once and then prove who they are with a token instead of sending username and password every time
    - to protect routes (only users with a valid token can access)
- cookie-parser
    - used to read cookies sent by the client (browser)
    - cookies: small data stored in broswer, automatically sends them to the server with every request


### Auth Controllers
- RegisterUser
    - get data
    - validate
    - find existingUser based on email
    - if not then create new user
    - create (crypto) and save verification token in db
    - send email w/ verify/:token route (nodemailer)
    - send success status to user
- VerifyUser
    - get data from URL (params)
    - validate
    - find user based on token
    - isVerified True
    - remove verification token
    - save user in db
- Login
    - get data
    - validate
    - find user based on password
    - compare userentered pass and db pass
    - generate and send jwt token w/ cookies
- GetMe
    - find user based on user.id from cookies
    - res user w/o pass
- Logout User
    - overide auth cookies jwt token with empty string
    - expire cookie immediately
    - res
- Forgot Password
    - get email
    - validate email 
    - find user based on email
    - create resetPassword token & expiry
    - save user
    - send email w/ reset: token route
- Reset Password
    - get token and new password
    - find user based on resettoken and validate w/ expiry
    - update password in user
    - undefine/ clear resettoken and expiry
    - save user


### Cookies
* Cookies are small data stored by websites on your browser
* They remember login info, preferences, or shopping carts
* Your browser sends them back to the site on future visits
* Some last only during the session, others persist for a set time


### Stateless auth
* Server doesn’t store session data
* After login, server gives client a signed token
* Client sends the token with each request
* Server verifies the token on every request

### semantic version
- major.minor.patch
- MAJOR → increase when you make breaking changes that are not backward compatible
- MINOR → increase when you add features that are backward compatible
- PATCH → increase when you fix bugs without changing features
- ^ allow minor and patch updates
- ~ allow only patch updates
- star* any version
