import Image from 'next/image';
import type { Metadata } from 'next';
import { PageNotice } from '@/components/UI';
import { ArrowDown, Camera } from 'lucide-react';
import MediaExperience from '@/components/MediaExperience';
export const metadata:Metadata={title:'Media & Photo Gallery'};
export default function MediaPage(){return <><section className="media-hero"><div className="shell media-hero-grid"><div><div className="eyebrow">Mora Hiking Club / Media & Stories</div><h1>Capture. Curate.<br/><em>Share the trail.</em></h1><p>Explore event albums, upload your hiking photos and discover the best memories from our outdoor community.</p><div className="button-row"><a href="#upload" className="button button-neon"><Camera size={17}/> Upload memories</a><a href="#gallery" className="button button-outline">Explore gallery <ArrowDown size={17}/></a></div></div><div className="media-hero-photo"><Image src="/images/ridge.jpg" alt="Mora Hiking Club member overlooking a mountain valley" fill priority sizes="(max-width:880px) 100vw, 48vw"/><span className="photo-credit">Original MHC club photography</span></div></div></section><div className="shell" style={{paddingTop:18}}><PageNotice>Gallery totals, scoring and analytics shown below are sample data. Photos are club-provided; uploads currently remain in the browser only.</PageNotice></div><MediaExperience/></>}
