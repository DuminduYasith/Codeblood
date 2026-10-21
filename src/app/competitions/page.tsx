import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Camera } from 'lucide-react';
import { PageHero,PageNotice } from '@/components/UI';
const photos=[{title:'Mountain sunrise',image:'/images/sunrise.jpg'},{title:'Along the ridgeline',image:'/images/ridgeview.jpg'},{title:'The forest trail',image:'/images/forest.jpg'}];
export default function CompetitionsPage(){return <><PageHero eyebrow="Media / Competitions" title="Trail Photography Challenge" description="Explore community creativity through stunning memories on the trail."/><section className="shell section"><PageNotice>Example photography competition. Voting and publishing need server-side rules and moderation.</PageNotice><div className="cards-grid three" style={{marginTop:25}}>{photos.map(p=><div className="gallery-entry" key={p.title}><div className="event-image"><Image src={p.image} alt={p.title} fill sizes="33vw"/></div><div className="entry-body"><Camera size={22}/><h3>{p.title}</h3><p>Community submission — example</p></div></div>)}</div><Link href="/media" className="back-link" style={{marginTop:40}}><ArrowLeft size={17}/> Back to media gallery</Link></section></>}
