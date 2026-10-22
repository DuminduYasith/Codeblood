import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Mountain,
  ArrowRight,
  CheckCircle2,
  Navigation,
  Compass,
  Activity,
  Shield,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { events, formatDate } from '@/lib/data';
import { Eyebrow } from '@/components/UI';
import { initialManagedEvents } from '@/lib/eventManagementData';

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: events.find((e) => e.slug === slug)?.name || 'Event' };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  // Find managed event metadata if available
  const managed = initialManagedEvents.find((m) => m.slug === slug);
  const bestRoute = managed?.routes.find((r) => r.isRecommended) || managed?.routes[0];

  return (
    <div className="shell section">
      <Link className="back-link" href="/events">
        <ArrowLeft size={17} /> Back to Events
      </Link>

      <div className="event-detail-heading">
        <div>
          <Eyebrow>Mora Hiking Club / Expedition Operations</Eyebrow>
          <h1>{event.name}</h1>
          <p>{event.description}</p>
        </div>
        <span className="tag">{event.difficulty}</span>
      </div>

      <div className="detail-layout">
        <div>
          <div className="large-cover">
            <Image src={event.cover} alt={event.name} fill sizes="(max-width:880px) 100vw, 65vw" />
          </div>

          <section className="details-copy">
            <h2>About this expedition</h2>
            <p>
              Experience the outdoors with the Mora Hiking Club community. All participants must report to the official
              gathering venue on time for safety briefings, equipment checks, and cohort group assignments.
            </p>

            {/* Official Selected Best Route Box */}
            {bestRoute && (
              <div
                style={{
                  background: 'var(--panel)',
                  border: '2px solid var(--mora)',
                  borderRadius: '18px',
                  padding: '24px',
                  margin: '26px 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      background: 'var(--forest)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 900,
                      padding: '4px 10px',
                      borderRadius: '100px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Committee Approved Best Path
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--forest)' }}>
                    Safety Score: {bestRoute.safetyScore}/100
                  </span>
                </div>

                <h3 style={{ margin: '0 0 8px', fontSize: '20px' }}>{bestRoute.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 16px' }}>
                  {bestRoute.description}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                    background: 'var(--soft)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                  }}
                >
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: 900 }}>
                      TRAIL DISTANCE
                    </span>
                    <strong>{bestRoute.distanceKm} km</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: 900 }}>
                      ELEVATION GAIN
                    </span>
                    <strong>+{bestRoute.elevationGainM} m</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: 900 }}>
                      EST. DURATION
                    </span>
                    <strong>{bestRoute.estimatedDuration}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Google Maps Location Preview */}
            <div style={{ margin: '30px 0' }}>
              <h3>Trailhead & Map Location</h3>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--line)', marginTop: '12px' }}>
                <iframe
                  title="Google Maps Trailhead Location"
                  width="100%"
                  height="300"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location + ' Sri Lanka')}&z=13&output=embed`}
                ></iframe>
              </div>
            </div>

            <h3>Expedition Checklist</h3>
            <ul>
              {[
                'Standard hiking footwear with good grip',
                '2L refillable water bottle or hydration pack',
                'Lightweight rain jacket / poncho',
                'Personal first aid kit & whistle',
                'Respect for nature and Zero-Trace ethics',
              ].map((i) => (
                <li key={i}>
                  <CheckCircle2 size={18} />
                  {i}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="booking-panel">
          <Eyebrow>Logistics & Route</Eyebrow>
          <h3>Expedition Summary</h3>

          <div className="fact">
            <CalendarDays size={18} />
            <div>
              <small>Date & Time</small>
              <strong>
                {formatDate(event.date)} {managed ? `• ${managed.time}` : '• 05:30 AM'}
              </strong>
            </div>
          </div>

          <div className="fact">
            <MapPin size={18} />
            <div>
              <small>Gathering Venue</small>
              <strong>{managed?.gatheringVenue || 'University of Moratuwa Main Gate'}</strong>
            </div>
          </div>

          <div className="fact">
            <Navigation size={18} />
            <div>
              <small>Destination Location</small>
              <strong>{event.location}</strong>
            </div>
          </div>

          <div className="fact">
            <Mountain size={18} />
            <div>
              <small>Distance & Grade</small>
              <strong>
                {event.distance} • {event.difficulty}
              </strong>
            </div>
          </div>

          {managed?.tracking.safetyStatus && (
            <div className="fact">
              <Shield size={18} />
              <div>
                <small>Safety Status</small>
                <strong style={{ color: 'var(--forest)' }}>{managed.tracking.safetyStatus}</strong>
              </div>
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link className="button button-pine block" href="/events">
              <Activity size={16} /> Open Live GPS Tracking
            </Link>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ' Sri Lanka')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline block"
            >
              Open in Google Maps <ExternalLink size={14} />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
