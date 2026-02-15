# Resend API Configuration

To enable the contact form email functionality, you need to set up your Resend API key:

## Steps:

1. **Sign up for Resend** (if you haven't already):
   - Go to https://resend.com
   - Create a free account

2. **Get your API Key**:
   - Navigate to API Keys in your Resend dashboard
   - Create a new API key
   - Copy the key

3. **Add the API key to your environment**:
   - Open `.env.local` file in your project root
   - Replace `your_resend_api_key_here` with your actual API key:
     ```
     RESEND_API_KEY=re_abcdefghijklmnopqrstuvwxyz123456
     ```

4. **Restart your development server**:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

## Optional: Add Your Custom Domain

Currently using Resend's test domain (`onboarding@resend.dev`). To use your own domain:

1. Add and verify your domain in Resend dashboard
2. Update line 22 in `/app/api/contact/route.ts`:
   ```typescript
   from: "Portfolio Contact <contact@yourdomain.com>",
   ```

## Testing

Once configured, test the contact form on your portfolio to ensure emails are being sent to `dewandameena1098@gmail.com`.
