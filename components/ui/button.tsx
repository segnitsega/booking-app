import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "light" | "ghost" | "outline";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-ink/90",
  accent: "bg-accent text-white hover:bg-accent-dark",
  light: "bg-white text-ink hover:bg-white/90",
  outline:
    "border border-border bg-white text-ink hover:bg-surface",
  secondary:
    "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15",
  ghost:
    "border border-white/50 bg-transparent text-white hover:bg-white/10",
};

const arrowClasses: Record<ButtonVariant, string> = {
  primary: "bg-white/15 text-white",
  accent: "bg-white/15 text-white",
  light: "bg-ink text-white",
  outline: "bg-ink text-white",
  secondary: "bg-white/15 text-white",
  ghost: "bg-white/15 text-white",
};

type CommonProps = {
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  showArrow = true,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span
          className={[
            "flex size-7 items-center justify-center rounded-full",
            arrowClasses[variant],
          ].join(" ")}
        >
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
