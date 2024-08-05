import { Navbar } from "@/components/navbar";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
