import Image from "next/image";

interface PhotoTileProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function PhotoTile({ src, alt, label, className = "", priority, sizes }: PhotoTileProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
        className="object-cover"
      />
      {label && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
          <span className="font-display absolute bottom-4 left-4 text-sm tracking-[0.2em] text-white uppercase">
            {label}
          </span>
        </>
      )}
    </div>
  );
}
