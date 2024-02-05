import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement>{
    color: string
}

const CircleColor = ({color, ...rest}: IProps) => {
    return (
        <span className="w-4 h-4 rounded-full cursor-pointer" style={{backgroundColor : color}} {...rest}></span>
    )
}

export default CircleColor;