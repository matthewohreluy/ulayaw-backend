import * as SibApiV3Sdk from 'sib-api-v3-typescript';
import * as dotenv from "dotenv";

const currentEnvironment = 'dev'

dotenv.config({path: `src/environment/${currentEnvironment}/.env`});


export const sendEmail = (userData: any, html: any) =>{
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.SIB_API!);
    apiInstance.sendTransacEmail(
        {
          'subject':'[ULAYAW] Confirm your email',
          'sender' : {'email':'support@ulayaw.com', 'name':'Ulayaw Support Team'},
          'to' : [{'email': userData.email, 'name':userData.firstName + ' ' + userData.lastName},],
          'htmlContent' : html,
        }
      ).then(function(data) {
      }, function(error) {
        console.error(error);
      });
}

export const sendCustomEmail = (data: any) =>{
  return new Promise((resolve, reject)=>{
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.SIB_API!);
  apiInstance.sendTransacEmail(
      {
        'subject':'[ULAYAW] ' + data.subject,
        'sender' : {'email': data.email, 'name':data.name},
        'to' : [{'email': data.receiver, 'name': data.receiverName},],
        'htmlContent' : data.message,
      }
    ).then(function(data) {
      resolve(data)
    }, function(error) {
      reject(error)
    });
  })
}


// const SibApiV3Sdk = require('sib-api-v3-typescript');

// let apiInstance = new SibApiV3Sdk.AccountApi()

 // Configure API key authorization: apiKey

// apiInstance.setApiKey(SibApiV3Sdk.AccountApiApiKeys.apiKey, 'YOUR API KEY');

// apiInstance.getAccount().then(function(data) {
//   console.log('API called successfully. Returned data: ' + data);
// }, function(error) {
//   console.error(error);
// });