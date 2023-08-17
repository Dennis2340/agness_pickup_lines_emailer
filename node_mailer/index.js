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

console.log("testing")


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
function scheduleEmails() {
    if (dayCounter < 100) { // Limit to 100 days
      if (pickupLines.length > 0) {
        const randomIndex = dayCounter % pickupLines.length;
        const randomPickUpLine = pickupLines[randomIndex];
        console.log(`Scheduled email for day ${dayCounter + 1}`);
        console.log('Email content:', randomPickUpLine);
        sendEmail(randomPickUpLine);
  
        dayCounter++; // Increment the counter after sending email
  
        // Schedule the next email after a delay (e.g., 24 hours)
        const delayMs =  4000 // 24 hours in milliseconds 24 * 60 * 60 * 1000;
        setTimeout(scheduleEmails, delayMs);
      }
    } else {
      console.log('Email scheduling complete.');
    }
  }
  

  // Start scheduling emails
  scheduleEmails();

console.log("done")
