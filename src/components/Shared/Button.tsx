import { ButtonHTMLAttributes, ReactNode, memo } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
    className?: string;
    width?: "w-full" | "w-fit";
}

const Button = ({children, className, width = "w-full", ...rest}: IProps) => {
    return (
        <button className={`${className} ${width} p-2 rounded-lg text-white`} {...rest}>{children}</button>
    )
}

export default memo(Button);