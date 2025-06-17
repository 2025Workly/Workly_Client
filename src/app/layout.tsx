import type { Metadata } from "next";
import "../app/styles/globals.css";
import Nav from "./components/common/nav-bar";
import FooterWrapper from "./components/common/footer-wrapper";
export const metadata: Metadata = {
  title: {
    template: "Workly",
    default: "Workly",
  },
  description: "Website for young professionals",
  icons: {
    icon: "/images/w.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
