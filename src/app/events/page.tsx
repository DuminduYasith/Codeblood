import type { Metadata } from 'next';
import { PageHero, PageNotice } from '@/components/UI';
import EventsExplorer from '@/components/EventsExplorer';
export const metadata: Metadata = { title: 'Hiking Events' };
export default function EventsPage() { return <>
  <PageHero eyebrow="Mora Hiking Club / Events" title="Explore the trails ahead." description="Every trail is a new story. Browse adventures and find the right experience for you." image="/images/ridgeview.jpg"/>
  <div className="shell" style={{paddingTop:20}}><PageNotice>All event dates shown in this starter are fictional demo entries, not confirmed club bookings.</PageNotice></div>
  <EventsExplorer/>
</>}
