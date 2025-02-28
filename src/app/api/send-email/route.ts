import { NextResponse } from 'next/server';
import { emailQueue } from '@/lib/queue';
import { emailData } from '@/data/emailData';

export async function POST() {
  const { emails, subject, text } = emailData;

  if (!emails || emails.length === 0) {
    return NextResponse.json({ success: false, message: 'E-posta adresi eksik' }, { status: 400 });
  }

  // Kuyruğa ekle
  for (const to of emails) {
    await emailQueue.add('sendEmail', {
      to,
      subject,
      text,
      smtpConfig: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        user: 'gmail-hesabin@gmail.com',
        pass: 'uygulama-sifresi'
      }
    });
  }

  return NextResponse.json({ success: true, message: 'E-posta kuyruğa eklendi' });
}
