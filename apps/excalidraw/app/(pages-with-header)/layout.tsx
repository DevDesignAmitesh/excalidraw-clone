import Header from "@/components/Header";
import { theme } from "@/constant";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="px-10" style={{ backgroundColor: theme.black }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
