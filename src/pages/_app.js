import "@/styles/globals.css";
import "../styles/global.css";
import "nes.css/css/nes.min.css";
import { Roboto } from "next/font/google";


const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        html, body, pre, code, kbd, samp {
          font-family: 'Press Start 2P', monospace;
        }
        
        /* Override NES.css default font size for better readability */
        .nes-text, .nes-btn, .nes-input, .nes-textarea, .nes-dialog {
          font-size: 12px;
          line-height: 1.5;
        }
        
        /* Custom pixel-perfect styling */
        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          font-size: 12px;
          line-height: 1.5;
        }
        
        .pixel-text-sm {
          font-family: 'Press Start 2P', monospace;
          font-size: 8px;
          line-height: 1.4;
        }
        
        .pixel-text-lg {
          font-family: 'Press Start 2P', monospace;
          font-size: 16px;
          line-height: 1.6;
        }
      `}</style>
      <main className={`${roboto.variable} antialiased`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}