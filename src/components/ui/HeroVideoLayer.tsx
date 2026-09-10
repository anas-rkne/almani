export function HeroVideoLayer({ src }: { src?: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
      {/* Fallback pattern or video (Temporarily hidden to view updates) */}
      {/* 
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        src={src || "https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_24fps.mp4"}
      />
      */}
      {/* Modern gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-l from-slate-950/80 via-transparent to-transparent" />
    </div>
  );
}
