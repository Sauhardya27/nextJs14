import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
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
    default: "Nimble Concepts Homepage",
    template: "%s | Nimble Concepts"
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
          </div>
        </SessionWrapper>
      </body>
    </html>
  )
}