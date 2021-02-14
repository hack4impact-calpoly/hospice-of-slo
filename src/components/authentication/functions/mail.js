const mailer = require("nodemailer")
const { Welcome } = require("./welcome_template")

const getEmailData = (to, name, template) => {
    let data = null
    
    switch (template) {
        case "welcome":
            data = {
                from: 'Hospice SLO <hospice-slo@gmail.com>',
                to,
                subject: "Your Hospice SLO account has been created!",
                html: Welcome(name)
            }
            break
        // can have more cases to send email
        default: 
            data;
    }
    return data;
}
const sendEmail = (to, name, type) => {
    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "73rikamyb@gmail.com",
            pass: "ayyotestemail"
        }
    })
    
    const mail = getEmailData(to, name, type)

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error)
        } else {
            console.log("Sent email successfully")
        }
        smtpTransport.close()
    })
}

module.exports = { sendEmail }
