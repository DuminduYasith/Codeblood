import Link from 'next/link';
import Image from 'next/image';
export default function SiteFooter(){
 return <footer className="site-footer"><div className="shell footer-main">
   <div><Link href="/" aria-label="Mora Hiking Club home"><Image src="/images/mhc-white-logo.png" alt="Mora Hiking Club" width={190} height={74}/></Link><p className="tagline">The Trail Never Ends</p></div>
   <div><h4>Explore</h4><Link href="/events">Upcoming hikes</Link><Link href="/membership">Membership</Link><Link href="/achievements">Achievements</Link></div>
   <div><h4>Community</h4><Link href="/media">Media gallery</Link><Link href="/competitions">Photography challenge</Link><Link href="/about">About the club</Link></div>
   <div><h4>Mora Hiking Club</h4><p>University of Moratuwa<br/>Sri Lanka</p><p>Hike · Explore · Preserve · Belong</p></div>
 </div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Mora Hiking Club — UI prototype</span><span>Made for the trail, with care for nature.</span></div></footer>
}
