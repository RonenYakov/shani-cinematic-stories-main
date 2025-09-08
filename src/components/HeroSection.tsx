import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const HeroSection = () => {
  const scrollToWork = () => {
    const workSection = document.getElementById('videos-warm');
    workSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    contactSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero">
      {/* Background video (replace src with your file/URL) */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src="/video-glam.mov" /* Insert your video file name or URL here */
      />

      {/* Soft gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/30" />
      
      {/* Content */}
{/* Content */}
    <div className="relative z-10 text-center max-w-7xl mx-auto section-padding">
    {/* Logo lockup */}
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="relative inline-flex items-center justify-center">
      {/* soft glass/pill behind logo */}
      <div className="absolute inset-0 -z-10 rounded-3xl
                      bg-white/30 dark:bg-white/20
                      backdrop-blur-md ring-1 ring-white/40
                      shadow-[0_20px_80px_-20px_rgba(0,0,0,0.35)]" /> 
          <img src="/shani-logo2.png" alt="שני בסה – ניהול סושיאל" className="mx-auto h-[24vw] max-h-64 md:h-[18vw] md:max-h-72 lg:h-[14vw] lg:max-h-96 drop-shadow-2xl px-6 py-3" />
        </div>
      </motion.div>
        
        {/* Main Headlines - Luxury Typography */}
        <motion.h1 className="cinematic-hero-text mb-6 !text-cream drop-shadow leading-[1.1] max-w-[18ch] md:max-w-[22ch] mx-auto" initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1.5,
        delay: 0.3,
        ease: "easeOut"
      }}>
          <span className="block">הסושיאל שלכם צריך להרגיש כמו סיפור</span>
          <span className="block">שנשאר בלב - לא כמו פרסומת</span>
        </motion.h1>
        
        {/* Tagline - Warm entrance */}
        <motion.p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-10 text-[#C8A97E]" initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        delay: 0.6,
        ease: "easeOut"
      }}>
          אני <span className="font-semibold">שני בסה</span> אני מספרת את הסיפור האמיתי של העסק שלך – בוידאו עדין, אנושי ומדויק – כדי שאנשים יתחברו אליך,יזכרו אותך ויבחרו בך
        </motion.p>
        
        {/* CTA Buttons - Luxury styling */}
        <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center" initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        delay: 0.9,
        ease: "easeOut"
      }}>
          <Button className="btn-hero-primary" onClick={scrollToWork} aria-label="צפו בעבודות">
            צפו בעבודות
          </Button>
          <Button className="btn-hero-primary" onClick={scrollToContact} aria-label="בואו נכיר">
            בואו נכיר (10 ד׳)
          </Button>
        </motion.div>

        {/* Micro-trust line under buttons */}
        <motion.p className="text-sm text-white/80 mt-4 text-center" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 1.1,
        ease: "easeOut"
      }}>
          עשרות לקוחות ממליצים • תהליך שקוף מהיום הראשון
        </motion.p>
        
        {/* Scroll Indicator - Between buttons */}
        <motion.div className="flex flex-col items-center gap-2 mt-12" initial={{
        opacity: 0
      }} animate={{
        opacity: 1,
        y: [0, 8, 0]
      }} transition={{
        opacity: {
          delay: 1.2,
          duration: 0.5
        },
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }}>
          <span className="text-sm tracking-wide text-[#7a6a56]">גללו לעוד</span>
          <div className="w-8 h-12 border-2 border-primary/60 rounded-full flex justify-center bg-white/10 backdrop-blur-sm mx-[4px]">
            <motion.div animate={{
            y: [0, 16, 0]
          }} transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }} className="w-1.5 h-4 bg-primary rounded-full mt-2 mx-[2px] px-px py-px" />
          </div>
        </motion.div>
      </div>
    </section>;
};
export default HeroSection;