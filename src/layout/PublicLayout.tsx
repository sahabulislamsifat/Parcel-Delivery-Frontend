import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="grow-1 w-11/12 mx-auto">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default PublicLayout;
