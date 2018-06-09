import nodemailer from 'nodemailer';
import moment from 'moment';
import winston from 'winston';

const mailer = (email, date, center) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  var mailOptions = {
    from: 'idrees.ibraheem@gmail.com',
    to: `${email}`,
    subject: 'Notification of Center Bookings',
    html: `<h1>Notice of Cancellation of Your Event</h1><p>Hi, <br/>
          Due to circumstances beyond our control we regret to inform you 
          hat your event 
          <br/>scheduled for ${moment(date).format(
            'DD MMMM YYYY'
          )} at ${center} has been cancelled. 
          Please reschedule for a different date and center and and if 
          you want to a refund,<br/> send a reply to this email asking for
            a refund and we will get back to you ASAP.<br/>
  <br />
  <span />
    Signed<br />
    Events-Manager</p>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      winston.info(error); // eslint-disable-line
    } else {
      winston.info('Email sent: ' + info.response); // eslint-disable-line
    }
  });
};

export default mailer;
