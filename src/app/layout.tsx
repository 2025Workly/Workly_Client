import type { Metadata } from "next";
import "../styles/globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div>test</div>
      </body>
    </html>
  );
}
