'use client';

import { useState, useCallback } from 'react';
import { fetchAPI } from '../lib/baseApi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const content = {
    title: 'تماس با ما',
    subtitle: 'ما مشتاق شنیدن نظرات شما هستیم',

    form: {
      title: 'ارسال پیام',
      send: 'ارسال پیام',
      sending: 'در حال ارسال...',
    },

    contactInfo: {
      title: 'اطلاعات تماس',
      phone: '09938059549',
      email: 'info@intelrain.com',
      hours: 'شنبه تا پنجشنبه: ۹ صبح تا ۶ عصر',
    },

    success: 'پیام شما با موفقیت ارسال شد! به زودی با شما تماس می‌گیریم.',
    error: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.',
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setError('');
    },
    []
  );

  const validate = () => {
    if (formData.name.trim().length < 2) return 'نام خود را وارد کنید';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) return 'ایمیل معتبر وارد کنید';
    if (formData.message.trim().length < 10) return 'پیام باید حداقل ۱۰ کاراکتر باشد';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (isLoading) return;
    setIsLoading(true);
    setError('');

    try {
      await fetchAPI('/contacts/submit/', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      });

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : content.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white pt-24" style={{ background: 'radial-gradient(circle at 20% 30%, #111827, #000 60%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {content.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* فرم */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-indigo-400">✉️</span> {content.form.title}
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-400 text-lg">{content.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-500/20 border border-red-500 p-3 rounded-lg text-sm text-red-300">{error}</div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="نام کامل"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-500 outline-none transition"
                    />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ایمیل"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-500 outline-none transition"
                    />
                  </div>

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="شماره تماس (اختیاری)"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-500 outline-none transition"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="پیام خود را بنویسید..."
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg resize-none focus:border-indigo-500 outline-none transition"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold disabled:opacity-50 hover:scale-105 transition duration-300"
                  >
                    {isLoading ? content.form.sending : content.form.send}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* اطلاعات */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-5 text-indigo-300">{content.contactInfo.title}</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <p>📞 {content.contactInfo.phone}</p>
                <p>✉️ {content.contactInfo.email}</p>
                <p>🕒 {content.contactInfo.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}