const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   '979762289869-aoq8fmeec636rir0apqe6oura98qvj4j.apps.googleusercontent.com', // ClientID
//   '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', // Client Secret
//   // "https://developers.google.com/oauthplayground" // Redirect URL
//   "https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9" // Redirect URL
// );

// oauth2Client.setCredentials({
//   refresh_token: '1//04k2WorQ1MlBvCgYIARAAGAQSNwF-L9IrZI36i7EIwLdM_5DSCmQIcrv6_inrid95OZiOQEivH89DHWdohCPEd984DmUXcPsHEMM'
// });
// const accessToken = oauth2Client.getAccessToken();

class MailService {
  constructor() {
  //   this.transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     secure: true,
  //     auth: {
  //         type: "OAuth2",
  //         user: 'bubyryehordev@gmail.com', 
  //         clientId: '979762289869-aoq8fmeec636rir0apqe6oura98qvj4j.apps.googleusercontent.com',
  //         clientSecret: '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',
  //         refreshToken: '1//04k2WorQ1MlBvCgYIARAAGAQSNwF-L9IrZI36i7EIwLdM_5DSCmQIcrv6_inrid95OZiOQEivH89DHWdohCPEd984DmUXcPsHEMM',
  //         accessToken: accessToken
  //     },
  //     tls: {
  //         rejectUnauthorized: false
  //     }
  // });
  }

  async sendActivationMail(to, link) {
    // await this.transporter.sendMail(
    //   {
    //     from:'strivetestmail@gmail.com',
    //     to,
    //     subject: `Account activation ${process.env.API_URL}`,
    //     text: '',
    //     html: 
    //           `
    //             <div>
    //               <h1>Use this link to activate your account:</h1>
    //               <a href=${link} />
    //             </div>
    //           `,
    //   })
  //   const mailOptions = {
  //       from: 'strivetestmail@gmail.com', // sender
  //       to, // receiver
  //       subject: `Account activation ${process.env.API_URL}`, // Subject
  //       html: `
  //                   <div>
  //                     <h1>Use this link to activate your account:</h1>
  //                     <a href=${link} />
  //                   </div>
  //                 `,// html body
  //     }
  //     await this.transport.sendMail(mailOptions,function(err,result){
  //       if(err){
  //         // res.send({
  //         //   message:err
  //         // })
  //         console.log('');
  //         console.log('MAILER SERVICE ERROR --->', err);
  //         console.log('');
  //       }else{
  //         transport.close();
  //         // res.send({
  //         //   message:'Email has been sent: check your inbox!'
  //         // })
  //         console.log('');
  //         console.log('Email has been sent: check your inbox!');
  //         console.log('');
  //       }
  //     })
  // };
  }
}

module.exports = new MailService();