'use client';

import { useState } from 'react';

type TabType = 'story' | 'mission' | 'values';

type TeamMember = {
  name: string;
  role: string;
  icon: string;
  expertise: string[];
  bio?: string;
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabType>('story');

  const content = {
    title: 'درباره اینتل‌رین',
    description:
      'ما تیمی از محققان، مهندسان و رویاپردازان هوش مصنوعی هستیم که به ساخت سیستم‌های هوشمند برای حل مسائل دنیای واقعی اختصاص داریم.',

    stats: [
      { value: '2024', label: 'تاسیس', icon: '📅' },
      { value: '۱۵۰+', label: 'پروژه انجام شده', icon: '🚀' },
      { value: '۵۰+', label: 'متخصص هوش مصنوعی', icon: '👥' },
      { value: '۹۸٪', label: 'رضایت مشتری', icon: '⭐' },
      { value: '۲۴/۷', label: 'پشتیبانی', icon: '🛡️' },
    ],

    story: {
      title: 'داستان ما',
      icon: '📖',
      paragraphs: [
        'اینتل‌رین در سال 2024 توسط تیمی از محققان و مهندسان هوش مصنوعی تأسیس شد...',
      ],
    },

    mission: {
      title: 'ماموریت ما',
      icon: '🎯',
      text:
        'دموکراتیزه کردن هوش مصنوعی و قابل دسترس ساختن آن برای کسب‌وکارها در هر اندازه.',
    },

    vision: {
      title: 'چشم‌انداز ما',
      icon: '👁️',
      text:
        'دنیایی که در آن پتانسیل انسانی با سیستم‌های هوشمند تقویت می‌شود.',
    },

    values: [
      { title: 'نوآوری', desc: 'فناوری‌های جدید', icon: '💡' },
      { title: 'اخلاق', desc: 'هوش مصنوعی مسئول', icon: '🛡️' },
      { title: 'تعالی', desc: 'کیفیت بالا', icon: '🏆' },
    ],

    team: {
      title: 'تیم رهبری',
      members: [
        {
          name: 'امیرحسن عادلی',
          role: 'مدیرعامل',
          icon: '👨‍💻',
          expertise: ['ML', 'DL'],
          bio: 'متخصص هوش مصنوعی و معماری سیستم‌ها',
        } satisfies TeamMember,
      ],
    },
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'story', label: '📖 داستان ما' },
    { id: 'mission', label: '🎯 ماموریت' },
    { id: 'values', label: '💎 ارزش‌ها' },
  ];

  return (
    <div className="min-h-screen text-white bg-black">

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {content.title}
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          {content.description}
        </p>
      </section>

      {/* Stats */}
      <section className="px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {content.stats.map((stat, idx) => (
          <div key={idx} className="bg-white/5 p-4 rounded-xl text-center">
            <div>{stat.icon}</div>
            <div className="text-indigo-400 font-bold">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Tabs */}
      <section className="px-6 py-12 max-w-4xl mx-auto">

        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full transition ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/10 text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Story */}
        {activeTab === 'story' && (
          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="text-2xl mb-4">{content.story.title}</h3>
            {content.story.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-300 mb-3">
                {p}
              </p>
            ))}
          </div>
        )}

        {/* Mission */}
        {activeTab === 'mission' && (
          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="text-2xl mb-4">{content.mission.title}</h3>
            <p className="text-gray-300">{content.mission.text}</p>
          </div>
        )}

        {/* Values */}
        {activeTab === 'values' && (
          <div className="grid md:grid-cols-3 gap-4">
            {content.values.map((v, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-xl">
                <div className="text-3xl">{v.icon}</div>
                <h4 className="font-bold">{v.title}</h4>
                <p className="text-gray-400 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* Team */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h3 className="text-3xl text-center mb-10">
          {content.team.title}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {content.team.members.map((m, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl">
              <div className="text-4xl">{m.icon}</div>
              <h4 className="text-xl font-bold">{m.name}</h4>
              <p className="text-indigo-400">{m.role}</p>
              <p className="text-gray-400 text-sm mt-2">
                {m.bio}
              </p>

              <div className="flex gap-2 flex-wrap mt-3">
                {m.expertise.map((e, i) => (
                  <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}