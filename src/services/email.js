import nodemailer from 'nodemailer'
 async function sendEmail(dest, subject, message , attachments=[]) {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.nodeMailerEmail, // generated ethereal user
            pass: process.env.nodeMailerPassword, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Route" < ${process.env.nodeMailerEmail}>`, // sender address
        to: dest, // list of receivers
        subject, // Subject line
        html: message, // html body
        attachments
    });
    return info
}
export default sendEmail





// import sgMail from '@sendgrid/mail';
// async function sendEmail(dest,messege,subject) {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     const msg = {
//       to: dest,
//       from:"hatemwork86@gmail.com" ,  // Use the email address or domain you verified above
//       subject:subject ,
//       text: 'and easy to do anywhere, even with Node.js',
//       html: messege,
//     };
//     //ES6
//     sgMail
//       .send(msg)
//       .then(() => {}, error => {
//         console.error(error);
    
//         if (error.response) {
//           console.error(error.response.body)
//         }
//       }); 
// }