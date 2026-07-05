interface PlaceholderArtProps {
  palette: [string, string];
  label?: string;
  className?: string;
}

export default function PlaceholderArt({ palette, label, className = "" }: PlaceholderArtProps) {
  const [from, to] = palette;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 10px)",
        }}
      />
      {label && (
        <span className="font-display relative text-sm tracking-[0.2em] text-white/80 uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
