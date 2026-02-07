import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`flex h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all ${className}`}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";