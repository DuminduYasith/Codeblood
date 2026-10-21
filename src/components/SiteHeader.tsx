'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, UserRound } from 'lucide-react';
const links = [
  {label:'Home',href:'/'},
  {label:'Events',href:'/events'},
  {label:'Membership',href:'/membership'},
  {label:'Achievements',href:'/achievements'},
  {label:'Media',href:'/media'},
  {label:'About',href:'/about'},
];
export default function SiteHeader() {
  const pathname = usePathname();
  const [open,setOpen] = useState(false);
  const [dark,setDark] = useState(false);
  useEffect(()=>{ setOpen(false); },[pathname]);
  useEffect(()=>{const enabled = window.localStorage.getItem('mhc-theme') === 'dark';setDark(enabled);document.documentElement.dataset.theme = enabled ? 'dark' : 'light';},[]);
  const toggleTheme=()=>{const next=!dark;setDark(next);document.documentElement.dataset.theme=next?'dark':'light';window.localStorage.setItem('mhc-theme',next?'dark':'light');};
  const active=(href:string)=> href==='/' ? pathname==='/' : pathname.startsWith(href);
  return <header className="site-header">
    <div className="shell nav-wrap">
      <Link className="site-brand" href="/" aria-label="Mora Hiking Club — Home"><Image className="brand-light" src="/images/mhc-official-logo.png" alt="Mora Hiking Club" width={192} height={74} priority/><Image className="brand-dark" src="/images/mhc-white-logo.png" alt="" width={192} height={74}/></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(l=><Link key={l.href} className={`nav-item ${active(l.href)?'active':''}`} href={l.href} aria-current={active(l.href)?'page':undefined}>{l.label}</Link>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark?'light':'dark'} theme`}>{dark?<Sun size={20}/>:<Moon size={20}/>}</button>
        <Link className="button button-outline sign-in" href="/login"><UserRound size={17}/> Sign in</Link>
        <button className="icon-button menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<Menu size={23}/>}</button>
      </div>
    </div>
    {open&&<nav className="mobile-nav" aria-label="Mobile navigation">{links.map(l=><Link href={l.href} key={l.href} className={active(l.href)?'active':''}>{l.label}</Link>)}<Link href="/login">Sign in</Link></nav>}
  </header>
}
