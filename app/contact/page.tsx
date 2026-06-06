// app/contact/page.tsx
'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      name: 'نام و نام خانوادگی',
      email: 'آدرس ایمیل',
      phone: 'شماره تماس (اختیاری)',
      message: 'متن پیام',
      send: 'ارسال پیام',
      sending: 'در حال ارسال...',
    },

    contactInfo: {
      title: 'اطلاعات تماس',
      phone: '09938059549',
      email: 'info@intelrain.com',
      emailSupport: 'support@intelrain.com',
      hours: 'شنبه تا پنجشنبه: ۹ صبح تا ۶ عصر',
      hoursSupport: '۲۴ ساعته، ۷ روز هفته',
    },

    success: 'پیام شما با موفقیت ارسال شد! به زودی با شما تماس می‌گیریم.',
    error: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.',
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      setError('');
    },
    []
  );

  const validate = () => {
    if (formData.name.length < 2) return 'نام باید حداقل ۲ کاراکتر باشد';
    if (!formData.email.includes('@')) return 'ایمیل معتبر نیست';
    if (formData.message.length < 10) return 'پیام باید حداقل ۱۰ کاراکتر باشد';
    return null;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
      const res = await fetch(`${API_URL}/api/contacts/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || data?.error || content.error);
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : content.error;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white pt-24"
      style={{
        background: 'radial-gradient(circle at 20% 30%, #111827, #000000 60%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {content.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* فرم تماس - 3 ستون */}
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
                    <div className="bg-red-500/20 border border-red-500 p-3 rounded-lg text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">{content.form.name}</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder= "امیرحسن عادلی"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-500 focus:outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">{content.form.email}</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="amir@example.com"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-500 focus:outline-none transition"
                        required
                      />
                    </div>

                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">{content.form.phone}</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="09938059549"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-indigo-500 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">{content.form.message}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="پیام خود را بنویسید..."
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg resize-none focus:border-indigo-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold disabled:opacity-50 hover:scale-105 transition duration-300"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {content.form.sending}
                      </span>
                    ) : (
                      content.form.send
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* اطلاعات تماس - 2 ستون */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* اطلاعات اصلی */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                <span className="text-indigo-400">📍</span> {content.contactInfo.title}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">📞</div>
                  <div>
                    <p className="text-xs text-gray-400">تلفن</p>
                    <p className="text-sm font-medium">{content.contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">✉️</div>
                  <div>
                    <p className="text-xs text-gray-400">ایمیل</p>
                    <p className="text-sm font-medium">{content.contactInfo.email}</p>
                    <p className="text-xs text-gray-500 mt-1">پشتیبانی: {content.contactInfo.emailSupport}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">🕒</div>
                  <div>
                    <p className="text-xs text-gray-400">ساعات کاری</p>
                    <p className="text-sm">{content.contactInfo.hours}</p>
                    <p className="text-xs text-gray-500 mt-1">پشتیبانی: {content.contactInfo.hoursSupport}</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}