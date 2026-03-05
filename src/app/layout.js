import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Perfumania - Catalogo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${playfair.className} ${montserrat.className}`}>
        {children}
      </body>
    </html>
  );
}