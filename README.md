
# PXO SERVER

Server de PXO


![Logo](https://www.hondaoptima.com/static/dealer-20108/logo.png)


## Run Locally

Clone the project

```bash
  git clone https://github.com/gpoptima/pxo-server
```

Go to the project directory

```bash
  cd pxo-app
```

Install dependencies

```bash
  yarn
```

Start the dev server 

```bash
  yarn dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USERNAME= "root"`

`DB_PASSWORD= "mypassword"`

`DB_DATABASE= "mydb"`

`DB_HOST= "127.0.0.1"`

`DIALECT = "mysql"`

`MORGAN= "yes"` # or no

`JWT_SECRET= ""`

`JWT_EXPIRATION= ""`

`JWT_ALGORITHMS= ""`

`AWS_USER= ""`

`AWS_PASSWORD= ""`

`EMAIL_SENDER= ""`
## Authors

- [@Jocobii](https://github.com/Jocobii)


## Tech

- Express
- MySql
- Sequelize

## Related

- Eslint with airbnb config
- Husky with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)



## License

[MIT](https://choosealicense.com/licenses/mit/)

