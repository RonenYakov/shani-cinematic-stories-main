import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section
      id="about"
      dir="rtl"
      className="section-padding relative overflow-hidden text-right text-neutral-900 dark:text-white"
      style={{ background: 'var(--gradient-about)' }}
    >
      {/* עדין בלבד ברקע */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-primary/15 dark:bg-primary/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* כותרת ראשית */}
        <motion.h2
          className="section-title text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          למה לבחור בי
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-10">
          {/* תמונה */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-cinematic">
              <img
                src="/profile.JPG"
                alt="שני בסה — יוצרת תוכן"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/0 dark:bg-black/10" />
            </div>
          </motion.div>

          {/* טקסט מקוצר + "מי אני" גדול */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-[#C8A97E] text-xl md:text-2xl font-bold mb-2">מי אני</p>
            

            <p className="text-[17px] leading-relaxed text-neutral-800 dark:text-white/90 max-w-[48ch]">
              אני <span className="font-semibold">שני בסה</span>, בת 22. אחרי 7 באוקטובר והטרגדיה האישית שלי החלטתי לקחת אומץ
              ולהפוך את מה שתמיד היה בי-צילום עריכה-דרך חיים. אני מאמינה שתוכן טוב מתחיל באנשים:
              במבט, בתנועה הקטנה, ובמשפט הנכון ברגע הנכון. המטרה שלי פשוטה: לתפוס את הרגעים האלה,
              לעטוף אותם בסיפור, ולהפוך אותם לקשר שאנשים מרגישים.
              ובך כך להפוך את האירוע שלכם לבלתי נשכח או את העסק שלכם לריווחי מאי פעם.
            </p>

            {/* ציטוט – פס זהב בשמאל (RTL) */}
            <p className="mt-4 text-neutral-700 dark:text-white/80 italic border-l-4 border-[#C8A97E] pl-4">
              פחות רעש. יותר רגש אמיתי.
            </p>
          </motion.div>
        </div>

        {/* האסטרטגיה שלי (בקצרה) – כדי שבלטה תהיה ברורה */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h4 className="text-lg md:text-xl font-bold mb-3">האסטרטגיה שלי (בקצרה)</h4>
          <div className="flex flex-wrap gap-3">
            {[
              ["01", "הקשבה", "שיחת היכרות להבנת מטרות וקהל"],
              ["02", "מסגור", "תכנית: פורמטים, מסרים ולו״ז"],
              ["03", "צילום ועריכה", "פתיח 0–3 שניות, קול אנושי"],
              ["04", "אופטימיזציה", "מדידה שבועית ושיפורים"],
            ].map(([num, title, sub]) => (
              <div
                key={num}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 px-4 py-2"
              >
                <span className="text-[#C8A97E] font-semibold">{num}</span>
                <span className="font-medium">{title}</span>
                <span className="text-xs text-neutral-600 dark:text-white/70">· {sub}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* שלוש סיבות קצרות — נשאר, כדי לשדר ערך בלי עומס */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
            <div className="text-[#C8A97E] font-bold mb-2">סיפור שמרגישים</div>
            <p className="text-sm text-neutral-800 dark:text-white/85">
              וידאו אנושי עם פתיח 0–3 שניות וקצב נכון — כדי לעצור גלילה ולהישאר.
            </p>
          </div>

          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
            <div className="text-[#C8A97E] font-bold mb-2">תהליך שקוף ונעים</div>
            <p className="text-sm text-neutral-800 dark:text-white/85">
              תכנית קצרה, צילומים נעימים, דוח תוצאות — בלי הפתעות, עם אחריות.
            </p>
          </div>

          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
            <div className="text-[#C8A97E] font-bold mb-2">מותאם אליכם</div>
            <p className="text-sm text-neutral-800 dark:text-white/85">
              מותג, כלה או עסק מקומי — נתחיל קטן, נמדוד, ונשפר יחד.
            </p>
          </div>
        </motion.div>

        {/* ↓ הסרתי את השורה התחתונה (“עשרות לקוחות…”) כפי שביקשת */}
      </div>
    </section>
  );
};

export default AboutSection;



