import "@/styles/globals.css";
import "../styles/global.css";
import { Roboto } from "next/font/google";


const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${roboto.variable} antialiased`}>
      <Component {...pageProps} />
    </main>
  );
}