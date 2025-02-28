// src/data/emailData.tsx

export const emailData = {
    emails: [  'jipit33838@arinuse.com'], // Gönderilecek e-posta adreslerini buraya ekle
    subject: 'Örnek Konu', // E-posta konusu
    text: 'Bu bir test e-postasıdır.', // E-posta içeriği
    smtpConfig: {
      host: 'smtp.gmail.com', // Gmail SMTP sunucusu
      port: 587,              // Gmail için TLS portu
      secure: false,          // TLS kullanımı (587 portu için false olmalı)
      user: 'ouysal155@gmail.com', // Buraya kendi Gmail adresini yaz
      pass: 'cfer qecn jash koas ' // Google'dan aldığın uygulama şifresini buraya gir
    }
  };
  