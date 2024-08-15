

## Reproduction for convex auth password reset email not working.

1. Setup convex auth and configure it for nextjs app router with the necessary providers as given in the doc.
2. Define auth middleware as well [https://labs.convex.dev/auth/authz/nextjs][https://labs.convex.dev/auth/authz/nextjs]
3. Email reset setup as given in the docs. [https://labs.convex.dev/auth/config/passwords#email-reset-setup][https://labs.convex.dev/auth/config/passwords#email-reset-setup]
4. After all that is done, when i try to send the password reset link, gives and error `Uncaught Error: InvalidAccountId at retrieveAccount`
5. I am 100% sure, the given email has an account on my database.
6. I have also setup resend api key in my dev deployment environment variables
7. Funnily enough if i directly use the email with and account like this in the resend config `to: ['foo@gmail.com']`, it works. But it doesn't work if i use  `to: [email]`, which i can confirm after logging the email is coming from client as a string.
