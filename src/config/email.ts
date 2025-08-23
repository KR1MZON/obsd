// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your Public Key from the Integration page
// 6. Replace the values below with your actual EmailJS credentials

export const emailConfig = {
  serviceId: 'service_icg32xx', // Replace with your EmailJS service ID
  templateId: 'template_o9k5xt5t', // Replace with your EmailJS template ID
  publicKey: '6UnxxkXJ0Kn5nEzFY', // Replace with your EmailJS public key
  teamEmail: 'toutevery@gmail.com' // Replace with your team's actual email
};

// Example EmailJS template variables that should be set up in your EmailJS template:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{topic}} - Selected topic
// {{message}} - Message content
// {{to_email}} - Team email (optional, can be set directly in EmailJS)