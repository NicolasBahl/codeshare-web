// import {
//   AiOutlineHome,
//   AiOutlineCompass,
//   AiOutlineQuestion,
//   AiOutlineMessage,
// } from "react-icons/ai";
// import "@/styles/post.css";
// import Link from "next/link";
// import { IconType } from "react-icons";
// import React from "react";
// import SearchBar from "./NavigationBar/searchBar";

// interface Link {
//   icon: IconType;
//   name: string;
//   path: string;
// }
// const Menu = () => {
//   const links: Link[] = [
//     { icon: AiOutlineHome, name: "Home", path: "/home" },
//     { icon: AiOutlineCompass, name: "Explore Topics", path: "/explore" },
//     { icon: AiOutlineQuestion, name: "My Topics", path: "/topics" },
//     { icon: AiOutlineMessage, name: "My Answers", path: "/answers" },
//   ];
//   return (
//     <div className="max-w-xs flex items-center justify-center w-full bg-neutral-50 flex-col h-screen ">
//       <div className="text-gray-500">
//         <div className="flex items-center flex-col justify-center">
//           <h1 className="p-4 ml-8 font text-2xl ">Menu</h1>
//           <SearchBar
//           searchBarStyle="hidden md:flex"
//             onChange={(e) => {
//               console.log(e.target.value);
//             }}
//           />
//           {links.map((link, index) => {
//             return (
//               <Link
//                 key={index}
//                 href={link.path}
//                 className="flex p-4 items-center hover:bg-blue-200 w-full"
//               >
//                 {React.createElement(link.icon, {
//                   style: { fontSize: "25px" },
//                 })}
//                 <span className="p-4 ">{link.name}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;


import React from 'react';
import { AiOutlineHome, AiOutlineCompass, AiOutlineQuestion, AiOutlineMessage } from 'react-icons/ai';
import Link from 'next/link';
import "@/styles/post.css";

export default function Menu() {
  const menuItems = [
    { icon: <AiOutlineHome style={{ fontSize: '25px' }} />, label: 'Home', link: '/' },
    { icon: <AiOutlineCompass style={{ fontSize: '25px' }} />, label: 'Explore Topics', link: '/' },
    { icon: <AiOutlineQuestion style={{ fontSize: '25px' }} />, label: 'My Topics', link: '/' },
    { icon: <AiOutlineMessage style={{ fontSize: '25px' }} />, label: 'My Answers', link: '/' },
  ];

  return (
<div className="flex">
      <div className="">
        {/* <div className="flex ml-20 mt-28 h-screen"> */}
          {/* Contenu du menu */}
          <div className="flex flex-col items-start ml-20 mt-20 w-56 text-gray-500">
            <div className="flex-col flex w-80">
              <h1 className="p-4 ml-8">Menu</h1>
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex p-2 hover:border-l-8 hover:border-blue-800 items-center hover:text-blue-800 hover:bg-blue-200 focus:bg-blue-200"
                >
                  {item.icon}
                  <Link href={item.link} className="p-4">
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}
