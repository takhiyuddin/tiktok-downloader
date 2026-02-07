import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", ...props }, ref) => {
        const baseStyle = "inline-flex items-center justify-center h-12 px-6 rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed";
        const variants = {
            primary: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm",
            secondary: "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50",
        };

        return (
            <button ref={ref} className={`${baseStyle} ${variants[variant]} ${className || ""}`} {...props} />
        );
    }
);
Button.displayName = "Button";