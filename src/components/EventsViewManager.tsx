'use client';

import { useState } from 'react';
import { Calendar, Activity, Compass, Shield } from 'lucide-react';
import EventsExplorer from '@/components/EventsExplorer';
import EventManagementStudio from '@/components/EventManagementStudio';

export default function EventsViewManager() {
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('admin');

  return (
    <div>
      {/* Top Experience Switcher */}
      <div className="shell" style={{ paddingTop: '28px' }}>
        <div
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--forest)',
                background: 'var(--pale)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              Event Mode
            </span>
            <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 700 }}>
              {viewMode === 'admin'
                ? 'Admin & Expedition Management (Live GPS, Best Route & Creation)'
                : 'Public Events Directory & Monthly Calendar'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className={`button small ${viewMode === 'admin' ? 'button-pine' : 'button-outline'}`}
              onClick={() => setViewMode('admin')}
              style={{ fontSize: '13px' }}
            >
              <Activity size={15} />
              <span>Admin Operations & Live Tracking</span>
              <span
                style={{
                  background: '#ff4747',
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: 900,
                  padding: '1px 6px',
                  borderRadius: '100px',
                  marginLeft: '4px',
                }}
              >
                LIVE
              </span>
            </button>

            <button
              type="button"
              className={`button small ${viewMode === 'public' ? 'button-pine' : 'button-outline'}`}
              onClick={() => setViewMode('public')}
              style={{ fontSize: '13px' }}
            >
              <Calendar size={15} />
              <span>Public Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'admin' ? <EventManagementStudio /> : <EventsExplorer />}
    </div>
  );
}
