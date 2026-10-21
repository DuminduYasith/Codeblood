import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export const metadata: Metadata = {
  title: { default:'Mora Hiking Club | The Trail Never Ends', template:'%s | Mora Hiking Club'},
  description:'Discover hiking events, community memories and membership with Mora Hiking Club at the University of Moratuwa.',
  icons:{icon:'/images/mhc-icon.png'},
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><SiteHeader/><main id="main-content">{children}</main><SiteFooter/></body></html>;
}
