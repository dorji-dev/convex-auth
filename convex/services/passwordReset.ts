import Resend from "@auth/core/providers/resend";
import { alphabet, generateRandomString } from "oslo/crypto";
import { Resend as ResendAPI } from "resend";

export const ResendOTPPasswordReset = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    console.log({ email });
    const { error } = await resend.emails.send({
      from: "Lhakhang Service <kk@resend.dev>",
      to: [email],
      subject: `Reset your password in Lhakhang Service`,
      text: "Your password reset code is " + token,
    });

    if (error) {
      throw new Error("Could not send");
    }
  },
});
