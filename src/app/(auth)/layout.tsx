import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-row">
        <div className="hidden h-screen w-1/2 md:block">
          <img
            src="/images/auth-bg.webp"
            alt="code thinking"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex h-screen w-full flex-1 justify-center px-5 md:px-0">
          {children}
        </div>
      </div>
    </section>
  );
}
