const nodemailer = require("nodemailer");
const csv = require("csv-parser");
const { google } = require("googleapis");
const fs = require("fs");
const config = require("./config.js");

const OAuth2_client = new google.auth.OAuth2(
  config.client_id,
  config.client_secret,
  "https://developers.google.com/oauthplayground"
);
OAuth2_client.setCredentials({ refresh_token: config.refresh_token });

const send_mail = async () => {
  const accessToken = await OAuth2_client.getAccessToken();
  console.log(accessToken);
  const transport = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.user,
      clientId: config.client_id,
      clientSecret: config.client_secret,
      refreshToken: config.refresh_token,
      accessToken: accessToken,
    },
  });
  // console.log(transport);
  fs.createReadStream("example.csv")
    .pipe(csv())
    .on("data", (row) => {
      // send an email to each recipient
      let mailOptions = {
        from: config.user,
        to: row.email,
        subject: "Certificate for " + row.name,
        html:
          "<p>Dear " +
          row.name +
          ",</p><p>Please find attached your certificate.</p>",
        attachments: [
          {
            filename: "certificate.pdf",
            path: "certificate.pdf",
          },
        ],
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    })
    .on("end", () => {
      console.log("Finished sending emails");
    });
};
send_mail();
