import Image from "next/image";

type Props = {
  path: string;
  title?: string;
  height?: string;
  showShadow?: boolean;
};
export default function CardImage({ path, title, height = "full" , showShadow = true }: Props) {
  return (
    <div className={` h-${height} will-change-transform overflow-hidden w-full ${showShadow && "shadow-light  border-border dark:border-darkBorder bg-main font-base dark:shadow-dark"} `}>
      <Image
        src={path}
        title={title}
        alt={title || "comic title"}
        className=" w-full h-full  "
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}
