import "./globals.css";
import { Navbar, Footer, Providers } from "@/components";

export const metadata = {
  title: "Mon Buddhist Students Society | MBSS",
  description: "Academic student organization representing Buddhist students at Mahachulalongkornrajavidyalaya University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
