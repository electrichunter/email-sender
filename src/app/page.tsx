"use client";

import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form inputlarının değişimini yönetir
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form gönderildiğinde çağrılır
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // "to" alanındaki e-posta adreslerini virgüllere göre ayırarak diziye çeviriyoruz
      const emailArray = formData.to.split(",").map(email => email.trim());
      const requestBody = {
        emails: emailArray,
        subject: formData.subject,
        text: formData.message,
      };

      // POST isteğiyle verileri API'ye gönderiyoruz
      const response = await axios.post("/api/send-email", requestBody);

      // Başarılı yanıt aldıysak formu sıfırlayıp başarı mesajı gösteriyoruz
      if (response.status === 200) {
        setSuccess("E-posta başarıyla gönderildi!");
        setFormData({ to: "", subject: "", message: "" });
      } else {
        setError("E-posta gönderilirken bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      setError("E-posta gönderilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">E-posta Gönder</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="to"
          placeholder="Alıcı E-posta (Virgülle ayırarak birden fazla ekleyin)"
          value={formData.to}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="subject"
          placeholder="Konu"
          value={formData.subject}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <textarea
          name="message"
          placeholder="Mesaj"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default Page;
