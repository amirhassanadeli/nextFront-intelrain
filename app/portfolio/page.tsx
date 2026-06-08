'use client';

import { useEffect, useMemo, useState } from 'react';
import { getAllProjects } from './portfolioApi';

type Project = {
  id?: string | number;
  hash?: string;
  icon?: string;
  title: string;
  description?: string;
  results?: string;
  category?: string;
  tech?: string[];
};

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const content = {
    title: 'نمونه کارهای ما',
    subtitle:
      'راه‌حل‌های واقعی هوش مصنوعی که نتایج قابل اندازه‌گیری ارائه می‌دهند',

    heroText:
      'کشف کنید چگونه به کسب‌وکارها در صنایع مختلف کمک کرده‌ایم تا عملیات خود را با فناوری پیشرفته هوش مصنوعی متحول کنند.',

    filters: {
      all: 'همه پروژه‌ها',
      ai: 'اتوماسیون هوش مصنوعی',
      data: 'هوش داده',
      vision: 'بینایی کامپیوتر',
    },

    stats: {
      projects: '50+',
      clients: '75+',
      satisfaction: '90٪',
    },
  };

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      setLoading(true);
      setError('');

      try {
        const data = await getAllProjects();
        if (!isMounted) return;
        setProjects(data || []);
      } catch (err) {
        if (!isMounted) return;
        setError('خطا در بارگذاری پروژه‌ها.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;

    return projects.filter(
      (project) => (project.category ?? 'all') === filter
    );
  }, [projects, filter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
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
      <section className="text-center px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {content.title}
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
          {content.subtitle}
        </p>

        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {content.heroText}
        </p>
      </section>

      <section className="px-6 py-8">
        <div className="flex justify-center flex-wrap gap-4">
          {Object.entries(content.filters).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`
                px-6 py-3 rounded-xl text-sm font-medium
                transition-all duration-300
                border border-white/10
                ${
                  filter === key
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20'
                    : 'bg-white/5 hover:bg-white/10'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {filteredProjects.length === 0 && (
        <div className="text-center text-gray-400 py-24 text-xl">
          پروژه‌ای یافت نشد.
        </div>
      )}

      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id || project.hash}
              className="
                group
                bg-white/5
                backdrop-blur-md
                rounded-3xl
                border border-white/10
                hover:border-indigo-500
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-2xl hover:shadow-indigo-500/10
                overflow-hidden
              "
            >
              <div className="p-8">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {project.icon || '🚀'}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {project.title}
                </h3>

                <p className="text-gray-300 leading-relaxed text-sm mb-6">
                  {project.description}
                </p>

                <div className="border-t border-white/10 pt-5 mb-5">
                  <p className="text-indigo-400 text-sm font-semibold mb-2">
                    نتایج
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.results}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(project.tech || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="
                        text-xs
                        bg-white/10
                        border border-white/10
                        px-3 py-1
                        rounded-full
                        text-gray-300
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(content.stats).map(([key, value], idx) => (
            <div
              key={idx}
              className="text-center bg-white/5 rounded-2xl p-8 border border-white/10"
            >
              <div className="text-4xl md:text-5xl font-bold text-indigo-400">
                {value}
              </div>

              <div className="text-gray-400 mt-3">
                {key === 'projects' && 'پروژه'}
                {key === 'clients' && 'مشتری'}
                {key === 'satisfaction' && 'رضایت'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}