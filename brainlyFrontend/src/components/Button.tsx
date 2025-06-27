import { type ReactElement } from 'react'

type varients = "primary" | "secondary"

interface Buttonprops { 
    varient : varients;
    size  : "sm" | "md" | "lg";
    text : String;
    startIcon ? : ReactElement;
    endIcon ? : ReactElement;
    onClick ? : () => void;
}

const varientStyles = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-400 text-purple-600"
} 

const defaultStyle = " p-4 flex item-centre"

const sizeStyle = {
  "sm" : "py-1 px-2 text-sm rounded-md",
  "md" : "py-2 px-4 text-md rounded-md",
  "lg" : "py-4 px-6 text-lg rounded-lg",
}

export const Button = (props : Buttonprops) => {
  return (
    <button className ={`${varientStyles[props.varient]} ${defaultStyle} ${sizeStyle[props.size]}`}>
        {props.startIcon ? <div className = 'pr-2'>{props.startIcon}</div> : null}{props.text}{props.endIcon}
    </button>
  )
}

