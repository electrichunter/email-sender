# Email Gönderim Sistemi

Bu proje, React.js (Frontend), Next.js (Backend), Nodemailer (SMTP entegrasyonu) ve BullMQ (Job Queue) kullanarak **otomatik e-posta gönderim sistemi** oluşturmak için geliştirilmiştir. Docker kullanarak Redis kurulumu yapılmıştır. 

## 🚀 Özellikler
- Birden fazla e-posta adresine aynı anda gönderim.
- Gönderilecek e-postaların işlenmesi için **BullMQ** ile Job Queue kullanımı.
- **Nodemailer** ile SMTP entegrasyonu (Gmail destekli).
- `src/data/emailData.tsx` dosyasından email verilerini alma.

---

## 🔧 Gereksinimler
- Node.js (v18.x ve üzeri)
- Docker (Redis için)
- Gmail hesabı ve **Uygulama Şifresi**

---

## ⚙️ Kurulum ve Çalıştırma
1. **Depoyu klonla**
```bash
git clone https://github.com/kullaniciadi/email-sender.git
cd email-sender
```

2. **Gerekli paketleri yükle**
```bash
npm install
```

3. **Docker ile Redis'i başlat**
```bash
docker run -d --name redis-email-sender -p 6379:6379 redis
```

4. **.env Dosyasını Yapılandır**
`.env` dosyasını ana dizine ekleyip şu şekilde doldur:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seninmail@gmail.com
SMTP_PASSWORD=uygulama-sifresi-buraya
```

> 📌 **Not:** Gmail hesabında **2 Adımlı Doğrulama** aktif olmalıdır ve **Uygulama Şifresi** kullanılmalıdır. [Nasıl alınır?](https://support.google.com/mail/answer/185833)

5. **Projeyi Çalıştır**
- **Backend (Next.js) Çalıştır**
```bash
npm run dev
```
- **Job Queue (Worker) Başlat**
```bash
npm run worker
```

---

## 📂 Proje Yapısı
```
📁 src
├── app
│   └── api
│       └── send-email
│           └── route.ts
├── data
│   └── emailData.tsx
└── lib
    └── queue.ts
```

- **`emailData.tsx`**: Gönderilecek e-posta verilerini içerir.
- **`queue.ts`**: BullMQ ile job queue işlemlerini yönetir.
- **`route.ts`**: Next.js API Route, e-posta gönderim isteklerini alır.

---

## 📧 Gmail SMTP Ayarları
Gmail'de doğrudan şifre yerine **uygulama şifresi** kullanılmalıdır.
- [Google Hesabı](https://myaccount.google.com) → **Güvenlik** → **2 Adımlı Doğrulama**
- **Uygulama Şifreleri** kısmından yeni bir şifre oluştur ve `.env` dosyasına ekle.

> Eğer hâlâ sorun yaşıyorsanız, `SMTP_PORT` olarak `465` ve `SMTP_SECURE=true` deneyebilirsiniz.

---

## ❗️ Olası Hatalar ve Çözümleri
- **Invalid login: 535-5.7.8 Username and Password not accepted.**
    - Uygulama şifresini doğru girdiğinden emin ol.
    - Gmail'den şüpheli giriş denemelerini kontrol et ve "Bendim" diyerek onayla.

- **Redis Bağlantı Hatası**
    - Redis'in doğru çalışıp çalışmadığını kontrol et:
    ```bash
    docker ps
    ```
    - Eğer çalışmıyorsa yeniden başlat:
    ```bash
    docker start redis-email-sender
    ```

---

## 🤝 Katkıda Bulunma
1. **Fork** edip kendi deposuna kopyala.
2. Yeni bir özellik için **branch** oluştur: `git checkout -b feature/yeni-ozellik`
3. **Commit** yap: `git commit -m 'Yeni özellik eklendi'`
4. **Push** et: `git push origin feature/yeni-ozellik`
5. **Pull Request** gönder.

---

## 📄 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.

---

## 📞 İletişim
- **Geliştirici:** Ömer Faruk Uysal
- **E-posta:** ouysal155@gmail.com
- **GitHub:** [electrichunter](https://github.com/electrichunter)

---

Bu projeyi kullanarak katkıda bulunmak ve geliştirmeler yapmak serbesttir. Yıldızlayarak destek olmayı unutmayın! ⭐
