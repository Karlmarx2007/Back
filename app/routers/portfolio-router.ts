import { Router } from 'express';
import nodemailer from 'nodemailer';

export const portfolioRouter = Router();

portfolioRouter.post('/send-email', async (req, res) => {
  const emailData = req.body;
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kmatuke@gmail.com',
      pass: 'qpobaujkmvfktoom',
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  try {
    const mail = await transport.sendMail({
      from: emailData.email,
      to: 'kmatuke@gmail.com',
      subject: emailData.subject,
      text: emailData.message
    });
    res.status(200).send({ msg: mail })
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }

  
})
