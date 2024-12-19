const {config} = require('./config.js');
const nodemailer = require('nodemailer');

const env = process.env.NODE_ENV || 'configMail';

const mailConfig = config[env];

//let clientId
//let mailSend

async function sendEmailApi(email,clientId,taskId){
    //let testEmailAccount = await nodemailer.createTestAccount();

    console.log(mailConfig)
    
    let transporter = nodemailer.createTransport({
        ...mailConfig,
    });

    emailSubject='Отчет по кэшбэку';
    let emailHTML=`
    <!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <title></title>
</head>
<body>
 
    <div style="text-align: center;">
        <h2>Отчет по кэшбэку</h2>
    </div>
    <div style="text-align: center; background-color:aliceblue;">

            <h3>Возможности:</h3>

            <div style="width: 340px; margin: 0 auto; text-align: left; padding-bottom: 20px;">              
              
            </div>
      </div>
      <div style="text-align: center; background-color:aliceblue; padding-bottom: 20px;;">
            <div style="width: 480px; margin: 0 auto; ">
              <br>
              <div style="font-size: 22px; font-weight: solis;">
                Описание, видео, запрос на доступ к демо версии:
              </div>
              <br>
              <a href="#" target="_blank" style="display: inline-block; cursor: pointer;font-size: 22px;
              color: white;
              text-decoration: none;
              padding: .5em 2em;
              outline: none;
              border-width: 2px 0;
              border-style: solid none;
              border-color: #FDBE33 #000 #D77206;
              border-radius: 6px;
              background: linear-gradient(#F3AE0F, #E38916) #E38916;
              transition: 0.2s;"> Перейти</a>
            </div>
            <br>
            <br>
            <img width="1" height="1" src="https://crm.waldorf-xray.ru/pixel01.php?wl_pixel_id=${clientId}&trackn=${taskId}" >
            

    </div>
    <div style="text-align: center; padding-top: 20px;">
      <a style="color: #999" href="https://ru-weblife.ru/notmailsend" target="_blank">Отписаться</a>
    </div>

</body>
</html>`


let emailText=`
    Отчет по кэшбэку\n\n 

    Скачать:\n
                https://crm.waldorf-xray.ru/`

                //console.log('!!!');
    try {
        let result = await transporter.sendMail({
            from: '"ООО Вальдорф" <zakaz@ru-weblife.ru>',
            to: email,
            subject: emailSubject,
            text: emailText,
            html: emailHTML,
        });    
        return true;
    }
     catch (error) {
      console.log(error);
      return error;
    }
    
    //console.log(result);
}

module.exports = {sendEmailApi}