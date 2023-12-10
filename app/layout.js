import { Inter } from 'next/font/google';
import './globals.css';
import Layout from './components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HeatWise',
  description:
    'Mapping the Future of Energy: Efficient, Integrated, Enlightened',
  icons: {
    icon: ['/favicon/favicon.ico?v=4'],
    apple: ['/favicon/apple-touch-icon.png>v=4'],
    shortcut: ['/favicon/apple-touch-icon.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Layout>
          <div className={'h-screen'}>{children}</div>
        </Layout>
      </body>
    </html>
  );
}
