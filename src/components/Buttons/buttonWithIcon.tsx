import { color } from "framer-motion";
import React from "react";
import { IconType } from "react-icons";

interface buttonsWithIconProps {
  onClick?: () => void;
  icon: IconType;
  buttonStyle?: string;
  buttonContent?: string;
  iconStyle?: string;
}

const ButtonWithIcon = (props: buttonsWithIconProps) => {
  const { onClick, icon, buttonStyle, buttonContent, iconStyle } = props;
  return (
    <button className={buttonStyle} onClick={onClick}>
      {React.createElement(icon, { className: iconStyle })}
      {buttonContent}
    </button>
  );
};

export default ButtonWithIcon;
