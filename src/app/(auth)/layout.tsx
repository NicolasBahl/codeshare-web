import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white">
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
            <Link href={"/"}>
              <Image
                src="/codeshare.png"
                alt="Logo"
                width={1800}
                height={306}
                className=" absolute left-8 top-10 z-20 w-[200px]"
              />
            </Link>
          </div>
        </div>
        <div className="flex h-screen w-full flex-1 justify-center px-5 md:px-0">
          {children}
        </div>
      </div>
    </section>
  );
}
