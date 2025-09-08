import { Button } from "@/components/ui/button";
import instagramIcon from "@/assets/icons/instagram.jpg";
import tiktokIcon from "@/assets/icons/icons8-tiktok-logo-50.jpg";
import whatsappIcon from "@/assets/icons/icons8-whatsapp-50.jpg";
import mailIcon from "@/assets/icons/icons8-gmail-50.jpg";

const ContactSection = () => {
  const socialLinks = [
    { name: "Instagram", icon: instagramIcon, href: "https://www.instagram.com/social__shani?igsh=bDY0YXowZGw5Zm05&utm_source=qr", color: "hover:text-pink-400" },
    { name: "TikTok", icon: tiktokIcon, href: "https://www.tiktok.com/@shanibasa?_t=ZS-8zAqm2xUObo&_r=1", color: "hover:text-purple-400" },
    { name: "WhatsApp", icon: whatsappIcon, href: "https://wa.me/message/D4AOECDSG35YE1", color: "hover:text-green-400" },
  ];

  return (
    <section id="contact-section" dir="rtl" className="section-padding relative overflow-hidden text-right" style={{ background: 'var(--gradient-dark-plum)' }}>
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="section-title--light mb-8">
          בואו נעבוד יחד
        </h2>
        
        <p className="cinematic-text--dark max-w-2xl mx-auto mb-12">
          אם הגעתם לפה ועוד לא השתכנעתם אז תיצרו קשר ונדבר ביחד על אסטרטגיה עד הפרט הכי קטן
        </p>
        
        
        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-cinematic-black/50 backdrop-blur-sm border border-gold/20 p-8 text-center rounded-2xl">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <img src={whatsappIcon} alt="WhatsApp" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-cream">וואטסאפ</h3>
            <p className="text-cream/70 mb-4">מענה מהיר במיוחד</p>
            <Button className="btn-gold" asChild>
              <a href="https://wa.me/message/D4AOECDSG35YE1" target="_blank" rel="noreferrer">
              הודעה עכשיו
              </a>
            </Button>
          </div>
          
          <div className="bg-cinematic-black/50 backdrop-blur-sm border border-gold/20 p-8 text-center rounded-2xl">
            <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <img src={mailIcon} alt="Email" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-cream">אימייל</h3>
            <p className="text-cream/70 mb-4">פירוט פרויקט וקבצים</p>
            <Button className="btn-gold" asChild>
              <a href="mailto:basashani@gmail.com">שלחו מייל</a>
            </Button>
          </div>

          <div className="bg-cinematic-black/50 backdrop-blur-sm border border-gold/20 p-8 text-center rounded-2xl">
            <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-8 h-8 text-cream" fill="currentColor">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.4 20.02 3.98 13.6 3.98 5a1 1 0 011-1H8.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-cream">טלפון</h3>
            <p className="text-cream/70 mb-4">שיחה מהירה או פרטים דחופים</p>
            <Button className="btn-gold" asChild>
              <a href="tel:+972533361206">התקשרו עכשיו</a>
            </Button>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="border-t border-gold/20 pt-12">
          <h4 className="text-xl font-semibold mb-8 text-cream">
            עקבו אחרי
          </h4>
          <div className="flex justify-center gap-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-gold/10 transition-all duration-300 ${social.color}`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  <img src={social.icon} alt={social.name} className="w-6 h-6" />
                </span>
                <span className="text-sm font-medium text-cream">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;