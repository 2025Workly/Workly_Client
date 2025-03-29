import type { Metadata } from "next";
import "../app/styles/globals.css"
import Nav from "./components/nav-bar";
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
      </body>
    </html>
  );
}
