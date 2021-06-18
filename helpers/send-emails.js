const mailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

// Creating a transporter
const transporter = mailer.createTransport({
    host: process.env.STMP_HOST,
    port: process.env.STMP_PORT,
    auth: {
        user: process.env.STMP_USER,
        pass: process.env.STMP_PASS
    }
});

// Read HTML
const readHTML = (path, id_user, userName) => {
    // Read the html to send
    const filePath = path.join(__dirname, path);
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        id_user,
        userName
    };
    return template(replacements);
}

function sendEmail(emailData) {
    try {
        const { email, subject, message, path, id_user, userName } = emailData;
        const htmlToSend = readHTML(path, id_user, userName);

        // Send the email
        transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: subject,
                text: message,
                html: htmlToSend
            })
            .then(_ => {
                console.log("Email sent on " + new Date())
            })
            .catch(error => {
                console.log(error)
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendEmail
}