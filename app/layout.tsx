import localFont from "next/font/local";
import ReactQueryClientProvider from "./components/ReactQueryClientProvider";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryClientProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
