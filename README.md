# micro-mailer-pixel

## need created file - config.js
```js
const config = {
    dbmysql: {
        host: "localhost", 
        user: "root", 
        password: '', 
        database: "db"
    },  
    configMail: {
        host: 'mail.domain.com',
        port: 25,
        secure: false,
        auth: {
            user: 'name@mail.domain.com',
            pass: 'password',
        },
        tls: {
            rejectUnauthorized: false
        
        },
      }
  };

  module.exports = {config};
  ```