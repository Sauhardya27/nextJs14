import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import SessionWrapper from './component/SessionWrapper'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: {
    default: "Next.js 14 Homepage",
    template: "%s | Next.js 14"
  },
  description: 'Next.js starter app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className={`${poppins.className} ${inter.className}`}>
        <SessionWrapper>
          <div className='container'>
            <Navbar />
            {children}
            <Footer />
          </div>
        </SessionWrapper>
      </body>
    </html>
  )
}