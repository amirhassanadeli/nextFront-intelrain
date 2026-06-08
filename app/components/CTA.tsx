import Link from 'next/link';

const CTA = () => {
  return (
    <section className="relative py-32 border-t border-white/5 overflow-hidden bg-black">

      {/* background glow */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="w-[650px] h-[450px] bg-cyan-500/20 rounded-full blur-[160px]" />
        <div className="absolute w-[350px] h-[350px] bg-purple-500/15 rounded-full blur-[140px]" />
        <div className="absolute w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center">

        <span className="text-xs tracking-[0.35em] uppercase text-gray-500">
          بیایید همکاری کنیم
        </span>

        <h3 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
          بیایید سیستم‌های <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            هوشمند را با هم بسازیم
          </span>
        </h3>

        <p className="mt-8 text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          آماده‌اید کسب‌وکار خود را با هوش مصنوعی متحول کنید؟ بیایید سیستم‌های مقیاس‌پذیر،
          خطوط لوله اتوماسیون و محصولات هوشمند متناسب با رشد شما را طراحی کنیم.
        </p>

        {/* buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/contact"
            className="
              px-10 py-4 rounded-xl
              bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
              text-white font-semibold
              shadow-lg shadow-cyan-500/20
              hover:scale-105 active:scale-95
              transition-all duration-300
              inline-block
            "
          >
            تماس با اینتل‌رین
          </Link>

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

        </div>

        <p className="mt-10 text-xs text-gray-500 tracking-wide">
          مورد اعتماد استارتاپ‌ها و تیم‌های سازمانی هوش مصنوعی در سراسر جهان
        </p>

      </div>
    </section>
  );
};

export default CTA;