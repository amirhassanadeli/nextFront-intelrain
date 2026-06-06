import Link from 'next/link';

const Footer = () => {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();

  const yearDisplay =
    currentYear > startYear
      ? `${startYear} - ${currentYear}`
      : `${startYear}`;

  const links: { label: string; href: string }[] = [
    { label: 'حریم خصوصی', href: '/privacy' },
    { label: 'درباره ما', href: '/about' },
    { label: 'تماس', href: '/contact' },
  ];

  return (
    <footer className="relative border-t border-white/10 py-12 mt-20">

      {/* خط درخشان */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* سمت چپ */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              © {yearDisplay}{' '}
              <span className="text-white font-semibold">
                اینتل‌رین
              </span>
              . تمامی حقوق محفوظ است.
            </p>

            <p className="text-xs text-gray-500 mt-2">
              ساخته شده با سیستم‌های هوشمند مبتنی بر هوش مصنوعی
            </p>
          </div>

          {/* لینک‌ها */}
          <div className="flex gap-6 text-sm">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white transition-all duration-300 relative group"
              >
                {link.label}

                {/* underline effect */}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-indigo-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* badge */}
          <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300">
            شرکت هوش مصنوعی
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;