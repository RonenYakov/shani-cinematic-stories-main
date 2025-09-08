import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useWheelSnapScroll } from "@/hooks/useWheelSnapScroll";
import { useIsMobile } from "@/hooks/use-mobile";

const BrandsVideoCarousel = () => {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<{ src: string; type: 'image' | 'video'; title: string } | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const hoverTimer = useRef<number | null>(null);

  // Manual order + text control using glob map
  const brandMap = useMemo(() => (
    import.meta.glob('@/assets/brands/*.{jpg,jpeg,png,webp,gif,mp4,mov,webm,JPG,PNG}', { query: '?url', import: 'default', eager: true }) as Record<string, string>
  ), []);

  const srcFor = (file: string) => brandMap[`/src/assets/brands/${file}`] as string;

  const baseBrands: Array<{ file: string; title: string; category: string; type: 'image' | 'video' }> = [
    
    { file: 'recomendations.mov', title: 'המלצות', category: 'סושיאל עסק', type: 'video' as const },
    { file: 'סרטון תדמית מסעדה-B.mov', title: 'תדמית מסעדה', category: 'קמפיין', type: 'video' as const },
    { file: 'סרטון תדמית גלמפינג-B.mov', title: 'גלמפינג', category: 'תדמית', type: 'video' as const },
    { file: 'ניהול סושיאל עסק-B.mov', title: 'ניהול סושיאל', category: 'סושיאל', type: 'video' as const },
    { file: 'ניהול סושיאל שאלון רחוב-B.mp4', title: 'שאלון רחוב', category: 'סושיאל עסק', type: 'video' as const },
    { file: 'סרטון תדמית מלון-B.mov', title: 'תדמית מלון', category: 'תדמית', type: 'video' as const },
    { file: 'ugc-B.mov', title: 'UGC', category: 'תוכן', type: 'video' as const },
    { file: 'שאלון רחוב-B.mov', title: ' שאלון רחוב', category: 'סושיאל עסק', type: 'video' as const },
    { file: 'copy_FB85CCF4-6B17-4A86-AC33-7B10A686BA22.mov',title: 'עגלת קפה', category: 'סושיאל עסק', type: 'video' as const },
  ];

  const brands = baseBrands.map(b => ({ ...b, src: srcFor(b.file) }));

  // wheel snap on hoverבית'פ
  const containerRef = useRef<HTMLDivElement>(null);
  useWheelSnapScroll(containerRef, ".brand-card");

  const isMobile = useIsMobile();
  return (
    <section id="videos-brands" dir="rtl" className="section-padding relative overflow-hidden text-right bg-[#010407]">
      {/* Rich, premium background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,169,126,0.25),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]" />
      </div>
      <div className="max-w-8xl mx-auto relative px-6">
        <motion.h2 
          className="section-title--light text-center mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          תוכן שמותגים סומכים עליו
        </motion.h2>
        
        <motion.p 
          className="cinematic-text text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
         אחרי עבודה עם מותגים מובילים כמו אקסל,מקדונלדס,רובי ביי ועוד אני בטוחה שאני האדם הנכון להפוך את העסק שלכם הכי גבוה שאפשר
        </motion.p>

        {/* Horizontal reel with snap & hover scale */}
        <div ref={containerRef} dir="ltr" className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-8" style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}>
          <div className="flex gap-6 md:gap-8 lg:gap-12 min-w-max">
            {brands.map((item, index) => (
              <motion.div
                key={index}
                className="brand-card relative rounded-3xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 snap-center w-[80vw] sm:w-[68vw] md:w-[56vw] lg:w-[48vw] xl:w-[42vw] aspect-[16/9] will-change-transform cursor-pointer"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onHoverStart={() => {
                  setHoveredVideo(index.toString());
                  if (item && item.type === 'video') {
                    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                    hoverTimer.current = window.setTimeout(() => {
                      const v = videoRefs.current[index];
                      if (v) {
                        try {
                          v.muted = false;
                          v.currentTime = 0;
                          void v.play();
                        } catch {}
                      }
                    }, 1000);
                  }
                }}
                onHoverEnd={() => {
                  setHoveredVideo(null);
                  if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                  const v = videoRefs.current[index];
                  if (v) {
                    v.muted = true;
                    v.pause();
                  }
                }}
                onClick={() => { setActiveItem(item); setLightboxOpen(true); }}
              >
                {item.type === 'image' ? (
                  <img src={item.src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                ) : (
                  <video
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay={!isMobile}
                    muted
                    loop
                    playsInline
                    preload={isMobile ? "metadata" : "auto"}
                    ref={(el) => { videoRefs.current[index] = el; }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-black/0 pointer-events-none" />
                {/* Text overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <span className="bg-black/30 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-2xl mb-2 leading-tight">{item.title}</h3>
                    <div className="w-16 h-1 bg-white/80 rounded-full group-hover:w-24 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Lightbox Viewer */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-0">
          <div className="relative w-full">
            {activeItem?.type === 'image' ? (
              <img src={activeItem.src} alt={activeItem.title} className="w-full h-full object-contain" />
            ) : (
              <video
                src={activeItem?.src}
                className="w-full h-full"
                controls
                autoPlay
                playsInline
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BrandsVideoCarousel;