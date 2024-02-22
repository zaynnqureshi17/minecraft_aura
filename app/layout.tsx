import "./globals.css";
import "./data-tables-css.css";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Providers> */}
      <body>{children}</body>
      {/* </Providers> */}
    </html>
  );
}
