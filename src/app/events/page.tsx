import type { Metadata } from 'next';
import { PageHero } from '@/components/UI';
import EventsViewManager from '@/components/EventsViewManager';

export const metadata: Metadata = {
  title: 'Hiking Events & Live Trail Tracking',
  description: 'Explore upcoming hiking adventures, live Google Map event tracking, and trail navigation with Mora Hiking Club.',
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Mora Hiking Club / Event Operations"
        title="Explore the trails ahead."
        description="Comprehensive event scheduling, candidate route optimization, and live GPS tracking for official Mora Hiking Club expeditions."
        image="/images/ridgeview.jpg"
      />
      <EventsViewManager />
    </>
  );
}
