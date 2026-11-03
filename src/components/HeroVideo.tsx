import { useLoopWhenVisible } from "./CardVideo";

// The case study hero as a muted looping clip. The still hero image is the poster, so it shows while the
// video loads, on browsers that block autoplay, and with reduced motion.
export function HeroVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const video = useLoopWhenVisible();
  return (
    <video
      ref={video}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
