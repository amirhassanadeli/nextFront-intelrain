// app/identity/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function CompanyProfile() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // مخفی کردن navbar و footer
    const hideNavbarFooter = () => {
      const elements = document.querySelectorAll('nav, header, footer, .navbar, .footer');
      elements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    };
    
    hideNavbarFooter();
    
    const observer = new MutationObserver(() => {
      hideNavbarFooter();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  const companyInfo = {
    name: 'شرکت باران اندیشه داده و هوش',
    shortName: 'IntelRain',
    registration: 'شماره ثبت: ۲۶۴۰۶',
    nationalId: 'شناسه ملی: ۱۴۰۰۷۶۷۸۹۰',
    phone: '+98 998 241 5502',
    phoneDisplay2: '+98 998 241 5502',
    email: 'info@intelrain.com',
    emailSupport: 'support@intelrain.com',
    website: 'www.intelrain.com',
    employees: '۵۰+',
    description: 'پیشرو در هوش مصنوعی و داده‌کاوی | ارائه راهکارهای هوشمند سازمانی',
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!mounted) return null;

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{ 
        background: 'radial-gradient(circle at 20% 30%, #0f0f23, #000000 95%)',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
      }}
      dir="rtl"
    >
      {/* استایل مخفی کردن نوارها */}
      <style jsx global>{`
        nav, header, footer, .navbar, .footer {
          display: none !important;
        }
      `}</style>
      
      {/* پس‌زمینه درخشان */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[140px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* محتوای اصلی */}
      <div className="relative max-w-5xl mx-auto space-y-6">
        
        {/* هدر کارت */}
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-48 bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-pink-600/20 overflow-hidden">
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="absolute top-4 right-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-2xl">
                <span className="text-3xl font-black text-white">IR</span>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {companyInfo.shortName}
              </div>
              <div className="text-sm text-gray-400 mt-1">{companyInfo.registration}</div>
            </div>
          </div>

          {/* نام شرکت */}
          <div className="pt-6 pb-4 px-8 text-center border-b border-white/10">
            <h1 className="text-2xl font-bold text-white">{companyInfo.name}</h1>
            <p className="text-indigo-400 text-sm mt-2">{companyInfo.description}</p>
          </div>
        </div>
          
          {/* اطلاعات تماس */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/15 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-lg">📞</div>
              <h2 className="text-lg font-bold text-white">اطلاعات تماس با ما</h2>
            </div>
            
            <div className="space-y-4">
              <a href={`mailto:${companyInfo.email}`} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition">
                <div>
                  <p className="text-xs text-gray-500">ایمیل</p>
                  <p className="text-sm text-gray-200" dir="ltr">{companyInfo.email}</p>
                </div>
                <span className="text-indigo-400">✉️</span>
              </a>
              
              <a href={`https://${companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition">
                <div>
                  <p className="text-xs text-gray-500">وب‌سایت</p>
                  <p className="text-sm text-gray-200" dir="ltr">{companyInfo.website}</p>
                </div>
                <span className="text-indigo-400">🌐</span>
              </a>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition">

                <div>
                  <p className="text-xs text-gray-500">تلفن همراه</p>
                  <p className="text-sm font-mono text-gray-200" dir="ltr">{companyInfo.phoneDisplay2}</p>
                </div>

                <button onClick={() => handleCopy(companyInfo.phoneDisplay2, 'phone2')} className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/40 transition">
                  {copied === 'phone2' ? '✓' : '📋'}
                </button>
                
              </div>
              
            </div>
        </div>

        {/* فوتر */}
        <div className="text-center py-6">
          <p className="text-[10px] text-gray-500 tracking-wider">
            © ۱۴۰۴ {companyInfo.name} — تمامی حقوق محفوظ است
          </p>
        </div>
      </div>

      {/* نوتیفیکیشن کپی */}
      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium z-50 shadow-xl border border-indigo-500/30 animate-fade-in-up">
          ✓ کپی شد!
        </div>
      )}
    </div>
  );
}