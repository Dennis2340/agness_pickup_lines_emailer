const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const pickupLines = require('./pickline') ;

// Replace with your actual email and password
const emailUser = 'kamaradennis36@gmail.com';
const emailPass = 'yxarahewlfdgkkwr';

// Replace with recipient's email
const recipientEmail = 'deniskamara23@gmail.com';

// Initialize day counter
let dayCounter = 0;

// Send email using nodemailer
async function sendEmail(pickUpLine) {
    
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    },
    tls: {
        rejectUnauthorized: false
      }
  });
  const mailOptions = {
    from: emailUser,
    to: recipientEmail,
    subject: 'Daily Pick-up Line',
    text: pickUpLine
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


// Fetch pick-up lines and send email daily for the next 100 days
async function scheduleEmails() {
  while (dayCounter < pickupLines.length) {
    const pickUpLine = pickupLines[dayCounter];
    console.log(`Scheduled email for day ${dayCounter + 1}`);
    console.log('Email content:', pickUpLine);
    await sendEmail(pickUpLine);

    dayCounter++; // Increment the counter

    // Schedule the next email after 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay
  }

  console.log('Email scheduling complete.');
}

// Start scheduling emails
scheduleEmails();

console.log("done");