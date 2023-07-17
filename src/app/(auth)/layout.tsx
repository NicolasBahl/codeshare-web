import React from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-row">
        <div className="hidden h-screen w-1/2 md:block">
          <div className="relative h-screen w-full">
            <Image
              width={1920}
              height={2900}
              src="/images/auth-bg.jpg"
              alt="code thinking"
              className="h-full w-full object-cover"
            />
            <Image
              src="/codeshare.png"
              alt="Logo"
              width={1800}
              height={306}
              className=" absolute left-8 top-10 z-20 w-[200px]"
            />
          </div>
        </div>
        <div className="flex h-screen w-full flex-1 justify-center px-5 md:px-0">
          {children}
        </div>
      </div>
    </section>
  );
}
