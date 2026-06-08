import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-6 py-24 overflow-hidden bg-black">

      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[140px] opacity-30" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-pink-500 rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-400 rounded-full blur-[160px] opacity-15" />
      </div>

      {/* title */}
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-5xl text-white">
        مهندسی{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
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
            border border-white/30
            text-gray-100
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
            bg-gradient-to-r from-cyan-500 to-purple-600
            text-white
            font-semibold
            shadow-lg shadow-cyan-500/30
            hover:scale-105 active:scale-95
            transition-all duration-300
            inline-block
          "
        >
          شروع همکاری
        </Link>

      </div>

      {/* scroll hint */}
      <div className="absolute bottom-10 text-gray-400 text-xs tracking-widest animate-pulse">
        برای کشف بیشتر اسکرول کنید
      </div>
    </section>
  );
};

export default Hero;