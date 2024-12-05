
const nodemailer = require('nodemailer');

//let clientId
//let mailSend

async function sendEmailApi(email,clientId){
    //let testEmailAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'mail.ru-weblife.ru',
        port: 25,
        secure: false,
        auth: {
            user: 'zakaz@ru-weblife.ru',
            pass: 'jJ4xL1vI6p',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    emailSubject='Программное обеспечение для медицинских и диагностических центров, хранение и просмотра исследований через любой веб браузер.';
    let emailHTML=`
    <!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <title></title>
</head>
<body>
 
    <div style="text-align: center;">
        <h2>Комплексное программное обеспечение для медицинских и диагностических организаций.<br> 
            Ведения учета, хранение и просмотр исследований через любой веб браузер из любой ОС.</h2>
    </div>
    <div style="text-align: center; background-color:aliceblue;">

            <h3>Возможности:</h3>

            <div style="width: 340px; margin: 0 auto; text-align: left; padding-bottom: 20px;">              
              <ul>
                <li>Облако хранения снимков</li>
                <li>Просмотр снимков(КТ и др.) из любого Веб-броузера</li>
                <li>ЦРМ для для всех сотрудников компании</li>
                <li>В ЦРМ есть города и центры для сетевых компаний</li>
                <li>Личный кабинет для клиентов и партнеров</li>
                <li>Специализированное ПО для работы со снимками</li>
              </ul>
            </div>
      </div>
      <div style="text-align: center;">
            <img width="400" src="https://ru-weblife.ru/wp-content/uploads/2024/07/diag_001.jpg" >
      </div>
      <div style="text-align: center; background-color:aliceblue; padding-bottom: 20px;;">
            <div style="width: 480px; margin: 0 auto; ">
              <br>
              <div style="font-size: 22px; font-weight: solis;">
                Описание, видео, запрос на доступ к демо версии:
              </div>
              <br>
              <a href="https://ru-weblife.ru/diagcenter/?wl_pixel_id=${clientId}" target="_blank" style="display: inline-block; cursor: pointer;font-size: 22px;
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
            <img src="https://ru-weblife.ru/price001.jpg" >
            <img width="1" height="1" src="https://ru-weblife.ru/pixel01.php?wl_pixel_id=${clientId}" >
            

    </div>
    <div style="text-align: center; padding-top: 20px;">
      <a style="color: #999" href="https://ru-weblife.ru/notmailsend" target="_blank">Отписаться</a>
    </div>

</body>
</html>`


let emailText=`
    Комплексное программное обеспечение для медицинских и диагностических организаций.<br> 
            Ведения учета, хранение и просмотр исследований через любой веб браузер из любой ОС\n\n 

            Возможности:\n
            Облако хранения снимков
                - Просмотр снимков(КТ и др.) из любого Веб-броузера\n
                - ЦРМ для для всех сотрудников компании\n
                - В ЦРМ есть города и центры для сетевых компаний\n
                - Личный кабинет для клиентов и партнеров</li>\n
                - Специализированное ПО для работы со снимками\n\n
                Описание, видео, запрос на доступ к демо версии:\n
                https://ru-weblife.ru/diagcenter/`

                //console.log('!!!');
    try {
        let result = await transporter.sendMail({
            from: '"Веб Лайф" <zakaz@ru-weblife.ru>',
            to: email,
            subject: emailSubject,
            text: emailText,
            html: emailHTML,
        });    
    }
     catch (error) {
      console.log(error);
    }
    
    //console.log(result);
}

module.exports = {sendEmailApi}