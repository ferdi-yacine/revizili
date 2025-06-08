import AuthProvider from "./components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "Revizili",
  description: "Platforme",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
