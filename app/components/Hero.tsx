import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-6 py-24 overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[140px] opacity-25" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-600 rounded-full blur-[120px] opacity-20" />
      </div>

      {/* title */}
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-5xl">
        مهندسی{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          هوش مصنوعی
        </span>{" "}
        برای عصر جدید
      </h1>

      {/* description */}
      <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
        اینتل‌رین سیستم‌های هوش مصنوعی در سطح سازمانی، پلتفرم‌های هوشمند داده،
        و راه‌حل‌های اتوماسیون هوشمند را برای شرکت‌های آینده‌نگر می‌سازد.
      </p>

      {/* buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">

        <Link
          href="/portfolio"
          className="
            px-10 py-4 rounded-xl
            border border-white/20
            text-gray-200
            hover:bg-white hover:text-black
            transition-all duration-300
            inline-block
          "
        >
          مشاهده نمونه کارها
        </Link>

        <Link
          href="/contact"
          className="
            px-10 py-4 rounded-xl
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-white
            font-semibold
            shadow-lg shadow-indigo-500/20
            hover:scale-105 active:scale-95
            transition-all duration-300
            inline-block
          "
        >
          شروع همکاری
        </Link>

      </div>

      {/* scroll hint */}
      <div className="absolute bottom-10 text-gray-500 text-xs tracking-widest animate-pulse">
        برای کشف بیشتر اسکرول کنید
      </div>
    </section>
  );
};

export default Hero;