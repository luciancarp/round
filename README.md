### Prerequisites

- NodeJS
- npm
- yarn

### Install and run on local machine

- Make sure you have all the prerequisites installed

Run the following commands:

```
yarn full-install
```

```
yarn dev
```

### All commands:

Install node.js server

```
yarn install
```

Install React client

```
yarn client-install
```

Install both the React client and the node.js server

```
yarn full-install
```

Start normal node.js server

```
yarn start
```

Start server using nodemon, which restarts it everytime there is a change in the source code

```
yarn server
```

Start React client development server

```
yarn client
```

Start both the server in nodemon and the React dev server

- They will both run in parallel using 'concurrently'
- Used when developing

```
yarn dev
```

### Set Up .env

Example of .env file:

```
MONGO_URI=mongodb://<dbuser>:<dbpassword>@ds026898.mlab.com:26898/web-tech
SECRET_OR_KEY=secret
```

### Visual Studio Code Extensions

- Prettier

## Deployment

```
git push heroku master
```

## Built With

Front-end:

- React
- Redux
- styled-components

Back-end:

- ExpressJS
- MongoDb
- Mongoose
- bcrypt
- JsonWebToken
- Passport
- Google Cloud Storage

## Author

- **Lucian Carp**
