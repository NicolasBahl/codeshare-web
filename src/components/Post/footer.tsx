import React from "react";
import ButtonWithIcon from "../Buttons/buttonWithIcon";
import { BiMessage } from "react-icons/bi";

interface FooterProps {
  author: string;
  onAuthorProfile: () => void;
}

const Footer = (props: FooterProps) => {
  const { author,  onAuthorProfile } = props;
  return (
    <div className="flex justify-between mt-4">
      <div className="flex items-center space-x-10">
        <p className="text-gray-500 text-sm pr-2">
          <span className="px-1">Posted by</span>
          <span className="text-blue-800 cursor-pointer" onClick={onAuthorProfile}>
            {author}
          </span>
        </p>
        {/* <p className="text-gray-500 text-sm">{createdAt.toDateString()}</p> */}
      </div>
      <ButtonWithIcon
        onClick={() => {
          console.log("commentaires cliqué");
        }}
        icon={BiMessage}
        buttonStyle={
          "text-gray-500 text-sm mr-2 flex justify-center items-center"
        }
        buttonContent={"20+"}
        iconStyle={"text-base"}
      />
    </div>
  );
};

export default Footer;
