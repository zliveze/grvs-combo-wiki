import "@/styles/globals.css";
import { ThemeProvider } from 'next-themes';
import DefaultLayout from '@/components/layout/defaultLayout';

export default function App({ Component, pageProps }) {
  // Sử dụng getLayout nếu component có định nghĩa, hoặc dùng DefaultLayout
  const getLayout = Component.getLayout || ((page) => (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  ));

  return (
    <ThemeProvider attribute="class">
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}
