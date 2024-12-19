const express = require("express");
const mysql = require('mysql2/promise');
const env = process.env.NODE_ENV || 'dbmysql';

const { sendEmailApi } = require('./send_email.js');

const app=express();

const { config } = require('./config.js');
const mysqlConfig = config[env];

const cityMail='spb'
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
//const cityMail='Красноярский край'


    var all_email;
    var ListEmailSended='';

    function delay() {
        return new Promise(resolve => setTimeout(resolve, 10000));
    }

    async function delayedSendEmail(mailSend, clientId,taskId) {
        // мы можем использовать await для Promise
        // который возвращается из delay

        await delay();
        let resultMailSend=await sendEmailApi(mailSend, clientId,taskId)

        const con_cloud = await mysql.createConnection({
            ...mysqlConfig,
        });

        if(resultMailSend){
            const $query="UPDATE `wl_mailer_tasks_items` SET `is_sended`=1 WHERE `id`='"+clientId+"'";
            con_cloud.execute($query);

            console.log(mailSend+' : '+clientId);
        }
        else{
            
            const $query="UPDATE `wl_mailer_tasks_items` SET `error`="+resultMailSend+" WHERE `id`='"+clientId+"'";
            con_cloud.execute($query);
            console.log('Error, mail no send: '+mailSend+' : '+clientId);
        }        
    }
      

      async function getAllEmail(req, res){

        //console.log('!!!')
        
        const con_cloud = await mysql.createConnection({
            ...mysqlConfig,
        });
        
        const $select="SELECT * FROM `wl_mailer_tasks_items` where email is not null and is_sended!=1 and  `city` LIKE '"+cityMail+"' limit 50"; //5126
        [all_email, fields3] = await con_cloud.execute($select);

        
        for(const client of all_email){
            
            let email=client.email;
            let email_arr=email.split(',')
            let clientId=client.id;            
            let taskId=client.task_id;
            
            for(const mail of email_arr){

                let mailSend=mail; 
                ListEmailSended+=mailSend+'; '       

                await delayedSendEmail(mailSend, clientId, taskId)
                //console.log(mailSend);
            }            
        }
        
        res.status(200).json({
            messge: ListEmailSended,
            select: $select,
        })
      }

      //getAllEmail()

      app.get('/sendmail', getAllEmail)
     
      
app.listen(30000,(err)=> {
    if(err){
        return console.log(err);
    }

    console.log('Server Ok')
})