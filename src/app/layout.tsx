import type { Metadata } from "next";
import "../app/styles/globals.css"
import Nav from "./components/common/nav-bar";
import Footer from "./components/common/footer";
export const metadata: Metadata = {
  title: {
    template: "Workly",
    default: "Workly"
  },
  description: "Website for young professionals",
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
        <Footer />
      </body>
    </html>
  );
}
