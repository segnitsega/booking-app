import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  light?: boolean;
};

export function BrandLogo({
  href = "#home",
  className = "",
  light = false,
}: BrandLogoProps) {
  const textClass = light ? "text-white" : "text-ink";

  return (
    <Link href={href} className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={[
          "relative flex size-9 items-center justify-center rounded-full",
          light ? "bg-white text-accent" : "bg-accent text-white",
        ].join(" ")}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none">
          <path
            d="M12 3.5L18.5 7.2V14.5L12 18.2L5.5 14.5V7.2L12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 8.2V15.2M9.2 11.2L12 8.2L14.8 11.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={`text-sm font-bold tracking-tight sm:text-base ${textClass}`}>
        BrandElevate
      </span>
    </Link>
  );
}
