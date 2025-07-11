import { type ReactElement } from 'react';

type varients = "primary" | "secondary";

interface Buttonprops {
  varient: varients;
  text: String;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const varientStyles = {
  primary: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 ",
  secondary: "bg-purple-100 text-purple-700 hover:bg-purple-200 active:bg-purple-300 "
};

const defaultStyle =
  "px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm";

export const Button = (props: Buttonprops) => {
  return (
    <button
      onClick={props.onClick}
      className={`${varientStyles[props.varient]} ${defaultStyle} ${
        props.fullWidth ? "w-full flex justify-center items-center" : ""
      } ${props.loading ? "opacity-50" : "cursor-pointer"}`}
      disabled={props.loading}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
      {props.text}
    </button>
  );
};
