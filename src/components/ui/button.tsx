import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("flex items-center justify-center transition-colors", {
  variants: {
    variant: {
      solid: "font-mono text-eyebrow uppercase bg-ink text-paper hover:bg-signal hover:text-ink",
      outline:
        "font-mono text-eyebrow uppercase border border-ink text-ink hover:bg-ink hover:text-paper",
      icon: "border border-rule text-ink hover:border-ink hover:bg-ink hover:text-paper",
      step: "border border-ink/30 text-ink hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal",
    },
    size: {
      sm: "px-4 py-2",
      md: "px-4 py-3.5",
      lg: "px-6 py-4",
      iconSm: "h-7 w-7",
      iconMd: "h-8 w-8",
    },
  },
  defaultVariants: { variant: "solid", size: "sm" },
});

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
