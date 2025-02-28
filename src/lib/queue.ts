import { Queue, Worker, Job } from 'bullmq';
import nodemailer from 'nodemailer';
import Redis from 'ioredis';

interface EmailJobData {
  to: string;
  subject: string;
  text: string;
  smtpConfig: SMTPConfig;
}

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

const redisConnection = new Redis({
  maxRetriesPerRequest: null,  // HATAYI ÖNLER
  enableReadyCheck: false
});

export const emailQueue = new Queue<EmailJobData>('emailQueue', {
  connection: redisConnection
});

new Worker<EmailJobData>('emailQueue', async (job: Job<EmailJobData>) => {
  const { to, subject, text, smtpConfig } = job.data;

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass
    }
  });

  try {
    await transporter.sendMail({
      from: `"Otomatik Gönderici" <${smtpConfig.user}>`,
      to,
      subject,
      text,
    });
    console.log(`E-posta gönderildi: ${to}`);
  } catch (error) {
    console.error(`Hata oluştu: ${to}`, error);
  }
}, {
  connection: redisConnection,
  limiter: {
    max: 1,          // Aynı anda sadece 1 iş çalışsın
    duration: 5000   // Her 5 saniyede bir e-posta gönder
  }
});
