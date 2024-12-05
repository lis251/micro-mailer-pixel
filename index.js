const express = require("express");
const mysql = require('mysql2/promise');

const { sendEmailApi } = require('./send_email.js');

const app=express();

//const cityMail='spb'
//const cityMail='Москва'
//const cityMail='Московская область'
//const cityMail='Новгородская область'
//const cityMail='Новосибирская область'
//const cityMail='Свердловская область'
//const cityMail='Челябинская область'
//const cityMail='Ростовская область'
//const cityMail='Кемеровская область'
//const cityMail='Нижегородская область'
//const cityMail='Башкортастан республика'
const cityMail='Красноярский край'


    var all_email;
    var ListEmailSended='';

    function delay() {
        return new Promise(resolve => setTimeout(resolve, 10000));
    }

    async function delayedSendEmail(mailSend, clientId) {
        // мы можем использовать await для Promise
        // который возвращается из delay

        await delay();
        await sendEmailApi(mailSend, clientId)

        const con_cloud = await mysql.createConnection({host: "37.140.195.179", user: "weblife", password: '30890863089086', database: "wl_crm"});

        const $query="UPDATE `base_medicals_companies` SET `is_sended`=1 WHERE `id`='"+clientId+"'";
        con_cloud.execute($query);

        console.log(mailSend+' : '+clientId);
    }
      

      async function getAllEmail(req, res){

        console.log('!!!')
        
        const con_cloud = await mysql.createConnection({host: "37.140.195.179", user: "weblife", password: '30890863089086', database: "wl_crm"});
        
        const $select="SELECT * FROM `base_medicals_companies` where email is not null and is_sended!=1 and  `city` LIKE '"+cityMail+"' AND `type` LIKE 'Диагностические центры' limit 50"; //5126
        [all_email, fields3] = await con_cloud.execute($select);

        
        for(const client of all_email){
            
            let email=client.email;
            let email_arr=email.split(',')
            let clientId=client.id;            
            
            for(const mail of email_arr){

                let mailSend=mail; 
                ListEmailSended+=mailSend+'; '       

                await delayedSendEmail(mailSend, clientId)
            }            
        }
        
        res.status(200).json({
            messge: ListEmailSended,
            select: $select,
        })
      }

      //getAllEmail()

      app.get('/sendmail', getAllEmail)
     
      
app.listen(4000,(err)=> {
    if(err){
        return console.log(err);
    }

    console.log('Server Ok')
})