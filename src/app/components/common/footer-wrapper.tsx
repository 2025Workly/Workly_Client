"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/home";

  return <Footer isHome={isHome} />;
}
