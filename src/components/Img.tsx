import type { ImageSet } from "@/assets/generated/images";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  image: ImageSet;
  alt: string;
  sizes: string;
  priority?: boolean;
  intrinsic?: boolean;
};

export function Img({ image, alt, sizes, priority = false, intrinsic = false, ...rest }: Props) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={alt}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      {...(intrinsic ? { width: image.width, height: image.height } : {})}
      {...rest}
    />
  );
}
