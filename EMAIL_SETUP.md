# Email Setup Instructions

This guide will help you set up EmailJS to make the contact form functional.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Submission - {{topic}}

From: {{from_name}} <{{from_email}}>
Topic: {{topic}}

Message:
{{message}}

---
This message was sent from the Obsidians website contact form.
```

4. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (e.g., `user_abc123xyz`)

## Step 5: Update Configuration

1. Open `src/config/email.ts`
2. Replace the placeholder values with your actual EmailJS credentials:

```typescript
export const emailConfig = {
  serviceId: 'your_service_id_here',     // From Step 2
  templateId: 'your_template_id_here',   // From Step 3
  publicKey: 'your_public_key_here',     // From Step 4
  teamEmail: 'your-team@email.com'       // Your actual team email
};
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the footer contact form
3. Fill out and submit the form
4. Check your email inbox for the message

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Emails not received**: Verify your EmailJS service is properly configured
- **Template errors**: Ensure all template variables match the ones used in the code
- **Rate limits**: EmailJS free plan has monthly limits (200 emails/month)

## Security Notes

- The public key is safe to expose in client-side code
- EmailJS handles the actual email sending securely
- No sensitive credentials are stored in your frontend code

## Alternative Setup (Environment Variables)

For production deployments, you can use environment variables:

1. Create a `.env.local` file:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_TEAM_EMAIL=your-team@email.com
```

2. Update `src/config/email.ts`:
```typescript
export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_obsidians',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  teamEmail: import.meta.env.VITE_TEAM_EMAIL || 'team@obsidians.com'
};
```