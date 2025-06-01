import "./globals.css";

export const metadata = {
  title: "Revizili",
  description: "Platforme d'echange des informations fiscales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
