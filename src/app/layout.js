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
        <a
          href="https://wa.me/5493885178485"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          style={{ backgroundColor: "#25D366" }}
          aria-label="Contactar por WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="white"
            className="w-8 h-8"
          >
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.637 2.14 8.115L0 32l8.085-2.12A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.765-1.853l-.485-.287-5.022 1.317 1.34-4.9-.316-.503A13.27 13.27 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.778c-.398-.199-2.354-1.161-2.72-1.294-.365-.133-.631-.199-.897.199-.266.398-1.03 1.294-1.263 1.56-.232.265-.465.298-.863.1-.398-.2-1.682-.62-3.204-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.175-.811.18-.178.398-.465.597-.698.2-.232.266-.398.398-.664.133-.265.067-.498-.033-.697-.1-.2-.897-2.162-1.23-2.96-.324-.777-.653-.672-.897-.684l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.323s1.428 3.854 1.627 4.12c.2.265 2.81 4.29 6.808 6.017.951.41 1.693.655 2.272.838.954.303 1.823.26 2.51.158.765-.114 2.354-.962 2.687-1.89.332-.929.332-1.726.232-1.89-.1-.166-.365-.265-.763-.464z" />
          </svg>
        </a>
      </body>
    </html>
  );
}