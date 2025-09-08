import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useWheelSnapScroll } from "@/hooks/useWheelSnapScroll";
import { useIsMobile } from "@/hooks/use-mobile";

const WeddingsVideoGallery = () => {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<{ src: string; type: 'image' | 'video'; title: string } | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const hoverTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Manual order + titles: edit this array freely
  const weddingMap = useMemo(() => (
    import.meta.glob('@/assets/weddings/*.{jpg,jpeg,png,webp,gif,mp4,mov,webm,HEIC,JPG,PNG}', { query: '?url', import: 'default', eager: true }) as Record<string, string>
  ), []);

  const srcFor = (file: string) => weddingMap[`/src/assets/weddings/${file}`] as string;

  const weddingMedia = ([ 
    { file: 'סושיאל חתונה.mov',title: 'סושיאל חתונה', type: 'video' as const },
    { file: 'SAVE THE DATE-W.mov', title: 'Save the Date', type: 'video' as const },
    {file:'proposel.mp4',title:'הצעה', type: 'video' as const },
    { file: 'חתונה-W.mov', title: 'חתונה', type: 'video' as const },
    {file:'gan.mov',title:'מסיבת סיום גן',type: 'video' as const },
    { file: 'רגעים קטנים חתונה-W.mov', title: 'רגעים קטנים', type: 'video' as const },
    { file: 'מסיבת אירוסין-W.mov', title: 'מסיבת אירוסין', type: 'video' as const },
    {file:'save the date.mov',title:'Save the Date', type: 'video' as const },
     ] as Array<{ file: string; title: string; type: 'image' | 'video' }>).map(m => ({ ...m, src: srcFor(m.file) }));

  // Mouse-wheel snap between items when hovered
  useWheelSnapScroll(containerRef, ".media-card");

  const isMobile = useIsMobile();
  return (
    <section id="videos-warm" dir="rtl" className="section-padding relative text-right">
      <div className="max-w-7xl mx-auto relative px-6">
        <motion.h2 
          className="section-title text-center mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          רגעים שמציתים רגש
        </motion.h2>
        
        <motion.p 
          className="cinematic-text text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          בעזרתי כל אירוע שלכם יראה כמו סרט
        </motion.p>

        {/* Smooth Horizontal Reel with snap + hover scale */}
        <div
          ref={containerRef}
          dir="ltr"
          className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-10"
          style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
        >
          <div className="flex gap-5 md:gap-7 lg:gap-10 min-w-max">
            {weddingMedia.map((item, index) => (
              <motion.article
                key={index}
                className="media-card relative rounded-3xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 snap-center w-[70vw] sm:w-[58vw] md:w-[48vw] lg:w-[40vw] xl:w-[34vw] aspect-[16/9] will-change-transform cursor-pointer"
                initial={{ opacity: 0, scale: 0.95, y: 26 }}
                whileInView={{ opacity: 1, scale: 1.03, y: 0 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onHoverStart={() => {
                  if (item.type === 'video') {
                    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                    hoverTimer.current = window.setTimeout(() => {
                      const v = videoRefs.current[index];
                      if (v) {
                        v.muted = false;
                        if (v.paused) {
                          try { v.currentTime = 0; void v.play(); } catch {}
                        }
                      }
                    }, 1000);
                  }
                }}
                onHoverEnd={() => {
                  if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                  const v = videoRefs.current[index];
                  if (v) {
                    v.muted = true;
                    // Keep playing as a muted preview; if you prefer pause, uncomment:
                    // v.pause();
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
                    loop
                    muted
                    playsInline
                    preload={isMobile ? "metadata" : "auto"}
                    onCanPlay={(e) => {
                      if (!isMobile) {
                        try { (e.currentTarget as HTMLVideoElement).play(); } catch {}
                      }
                    }}
                    aria-hidden="true"
                    ref={(el) => { videoRefs.current[index] = el; }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/0 pointer-events-none" />
                <div className="absolute inset-0 p-5 md:p-6 flex items-end z-10">
                  <div className="max-w-[80%]">
                    <h4 className="text-white font-extrabold text-lg md:text-2xl leading-tight drop-shadow">
                      {item.title}
                    </h4>
                    <div className="w-12 md:w-14 h-1 bg-white/80 rounded-full mt-2" />
                  </div>
                </div>
              </motion.article>
            ))}
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
      </div>
    </section>
  );
};

export default WeddingsVideoGallery;