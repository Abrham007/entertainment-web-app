import Nav from "@/components/Nav";
import { FC } from "react";

const PrivateLayout: FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <main className="bg-blue-950 max-w-screen min-h-screen overflow-hidden w-full flex flex-col gap-6 sm:gap-8 sm:p-6 lg:p-8 lg:flex-row">
      <Nav />
      <div className="flex-1 flex flex-col gap-6 sm:gap-8 ml-4 sm:ml-0">
        {children}
      </div>
    </main>
  );
};

export default PrivateLayout;
