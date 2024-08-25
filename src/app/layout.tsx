import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Provider } from './provider';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export default RootLayout;
