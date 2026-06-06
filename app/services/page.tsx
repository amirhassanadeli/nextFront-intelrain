'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '../lib/api';

type Service = {
  hash?: string | number;
  icon?: string;
  title: string;
  description?: string;
  features?: string[];
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const content = {
    title: 'خدمات ما',
    subtitle: 'راه‌حل‌های پیشرفته هوش مصنوعی متناسب با نیازهای کسب‌وکار شما',
  };

  useEffect(() => {
    async function loadServices() {
      try {
        const result = await fetchAPI('/services/');

        const servicesWithFeatures: Service[] = (result || []).map(
          (service: Service) => ({
            ...service,
            features: service.features || [],
          })
        );

        setServices(servicesWithFeatures);
      } catch (err) {
        setError('خطا در بارگذاری خدمات.');
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          'radial-gradient(circle at 20% 30%, #111827, #000000 60%)',
      }}
    >
      <section className="text-center px-6 py-12 md:py-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          {content.title}
        </h2>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {content.subtitle}
        </p>
      </section>

      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.hash || index}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-indigo-500 transition-all duration-300 hover:scale-105 p-8"
            >
              <div className="text-6xl mb-4">
                {service.icon || '⚙️'}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="border-t border-white/10 pt-6">
                <p className="font-semibold mb-3 text-indigo-400">
                  ویژگی‌های کلیدی:
                </p>

                <ul className="space-y-2">
                  {(service.features || []).length > 0 ? (
                    (service.features || []).map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-400 flex items-center gap-2"
                      >
                        <span className="text-indigo-500">▹</span>
                        {feature}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400">
                      هیچ ویژگی ثبت نشده است
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}