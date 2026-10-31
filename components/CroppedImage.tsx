import Image from "next/image";
import type { Crop } from "@/lib/content";

type CroppedImageProps = {
  src: string;
  crop?: Crop;
  alt?: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  /** Figma sprite crops stretch the image to the crop box instead of covering it. */
  fit?: "cover" | "fill";
};

/** Fills its positioned parent, reproducing a Figma image fill crop when `crop` is given. */
export function CroppedImage({ src, crop, alt = "", sizes, preload, className, fit = "cover" }: CroppedImageProps) {
  if (!crop) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <span
      className="absolute block max-w-none"
      style={{
        left: `${crop.left}%`,
        top: `${crop.top}%`,
        width: `${crop.width}%`,
        height: `${crop.height}%`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={`${fit === "fill" ? "object-fill" : "object-cover"} ${className ?? ""}`}
      />
    </span>
  );
}
