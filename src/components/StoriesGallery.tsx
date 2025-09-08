import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useWheelSnapScroll } from "@/hooks/useWheelSnapScroll";

const StoriesGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useWheelSnapScroll(containerRef, ".story-card");

  // Enlarge card size (layout) after short hover delay
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const hoverTimersRef = useRef<Array<number | null>>([]);

  const BASE_CARD_WIDTH = 280; // px (matches .story-card in index.css)
  const BASE_CARD_HEIGHT = 440; // px

  const getCardStyle = (isExpanded: boolean): CSSProperties => ({
    width: isExpanded ? BASE_CARD_WIDTH * 1.3 : BASE_CARD_WIDTH,
    height: isExpanded ? BASE_CARD_HEIGHT * 1.3 : BASE_CARD_HEIGHT,
    transition:
      "width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1)",
  });

  // Easy to reorder stories - just change the array order
  const storyImages = [
    "/story5.jpg",
    "/story1.jpg",
    "/story2.jpg",
    "/story3.JPG",
  
    "/story7.JPG",
    "/story6.jpg",
      "/story9.jpg",
     "/story15.jpg",
    "/story11.jpg",
    "/story12.JPG", 
    "/story13.JPG",
    "/story14.JPG",
   
 
 
    
  ];

  return (
    <section
      id="stories"
      dir="rtl"
      className="section-padding relative overflow-hidden text-right"
    >

      <div className="max-w-8xl mx-auto relative">
        <motion.h2
          className="section-title text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          סיפורים שמתחברים לאנשים
        </motion.h2>

        <motion.p
          className="cinematic-text text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          גם הסטורי שלכם יכול להראות ככה.
        </motion.p>

        {/* Smooth Horizontal Scroll Container */}
        <div className="relative">
          <div
            ref={containerRef}
            dir="ltr" // ensure left→right scrollLeft
            className="overflow-x-auto overflow-y-hidden pb-8 scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
          >
          <motion.div
            className="flex gap-6 md:gap-8 lg:gap-12 min-w-max px-4 sm:px-6 md:px-8 lg:px-12"
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            dragElastic={0.1}
          >
            {storyImages.map((src, index) => (
              <motion.div
                key={index}
                className="story-card group relative overflow-hidden snap-center rounded-3xl"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                // Animate actual size so layout grows, not a zoom crop
                style={getCardStyle(expandedIndex === index)}
                onHoverStart={() => {
                  if (hoverTimersRef.current[index]) {
                    window.clearTimeout(hoverTimersRef.current[index]!);
                  }
                  hoverTimersRef.current[index] = window.setTimeout(() => {
                    setExpandedIndex(index);
                  }, 500);
                }}
                onHoverEnd={() => {
                  const t = hoverTimersRef.current[index];
                  if (t) window.clearTimeout(t);
                  hoverTimersRef.current[index] = null;
                  if (expandedIndex === index) setExpandedIndex(null);
                }}
                viewport={{ once: true }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-black/0" />
              </motion.div>
            ))}
          </motion.div>
          </div>

          {/* Scroll hint arrows */}
          <ScrollHintArrow containerRef={containerRef} direction="right" />
          <ScrollHintArrow containerRef={containerRef} direction="left" />
        </div>
      </div>
    </section>
  );
};

export default StoriesGallery;

// Hint arrow component (styled to match warm aesthetic)
const ScrollHintArrow = ({ containerRef, direction = 'right' }: { containerRef: React.RefObject<HTMLDivElement>; direction?: 'left' | 'right' }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      const atStart = el.scrollLeft <= 4;
      setShow(
        hasOverflow && ((direction === 'right' && !atEnd) || (direction === 'left' && !atStart))
      );
    };
    update();
    el.addEventListener('scroll', update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [containerRef]);

  if (!show) return null;

  const onClick = () => {
    const el = containerRef.current;
    if (!el) return;
    const delta = el.clientWidth * 0.8 * (direction === 'right' ? 1 : -1);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <button
      aria-label={direction === 'right' ? "גלילה ימינה לעוד סיפורים" : "גלילה שמאלה לעוד סיפורים"}
      onClick={onClick}
      className={`hidden md:flex items-center justify-center absolute ${direction === 'right' ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/35 hover:bg-black/50 text-white backdrop-blur-sm ring-1 ring-white/20 shadow-lg transition`}
    >
      {direction === 'right' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      )}
    </button>
  );
};
