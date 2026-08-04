import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import type { ImageSet } from "@/assets/generated/images";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type ParallaxImageProps = {
  image: ImageSet;
  alt: string;
  sizes?: string;
  className?: string;
  strength?: number;
};

export function ParallaxImage({
  image,
  alt,
  sizes = "100vw",
  className = "",
  strength = 60,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {inView ? (
        <ParallaxImageActive image={image} alt={alt} sizes={sizes} strength={strength} containerRef={ref} />
      ) : (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-[calc(100%+8rem)] w-full -translate-y-16 object-cover"
        />
      )}
    </div>
  );
}

function ParallaxImageActive({
  image,
  alt,
  sizes,
  strength,
  containerRef,
}: Required<Omit<ParallaxImageProps, "className">> & { containerRef: RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <motion.img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={alt}
      style={{ y }}
      className="absolute inset-0 h-[calc(100%+8rem)] w-full -translate-y-16 object-cover"
      loading="lazy"
      decoding="async"
    />
  );
}

