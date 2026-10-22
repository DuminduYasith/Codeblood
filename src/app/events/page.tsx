import type { Metadata } from 'next';
import { PageHero } from '@/components/UI';
import EventManagementStudio from '@/components/EventManagementStudio';

export const metadata: Metadata = {
  title: 'Hiking Events, Calendar & Live Tracking',
  description: 'Explore upcoming hiking events calendar, admin route optimization, and real-time Google Map trail tracking with Mora Hiking Club.',
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Mora Hiking Club / Event Operations"
        title="Explore the trails ahead."
        description="Official event scheduler, upcoming hiking calendar, candidate route optimization, and live GPS tracking for Mora Hiking Club expeditions."
        image="/images/ridgeview.jpg"
      />
      <EventManagementStudio />
    </>
  );
}
