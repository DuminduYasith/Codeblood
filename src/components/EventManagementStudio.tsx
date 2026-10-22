'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Compass,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Eye,
  Award,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity,
  Phone,
  Hospital,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Sliders,
  Check,
  X,
  Footprints,
  Calendar as CalendarIcon,
  ShieldAlert,
  PhoneCall,
  HeartPulse,
  UserCheck,
  Users,
  Building2,
  Printer,
  Plus,
  Trash2,
  FileText,
  MessageSquare,
} from 'lucide-react';
import {
  initialManagedEvents,
  ManagedHikingEvent,
  RouteOption,
  Difficulty,
  EventKind,
  OCMemberContact,
  FirstAidCommitteeContact,
} from '@/lib/eventManagementData';

type SubView = 'calendar' | 'live-tracking' | 'route-optimizer' | 'emergency-view' | 'create' | 'list';

export default function EventManagementStudio() {
  const [events, setEvents] = useState<ManagedHikingEvent[]>(initialManagedEvents);
  const [selectedEventId, setSelectedEventId] = useState<number>(1);
  const [subView, setSubView] = useState<SubView>('calendar');
  const [toast, setToast] = useState<string | null>(null);

  // Calendar state
  const [calendarMonth, setCalendarMonth] = useState(10); // November (0-indexed: 10 = Nov)
  const [calendarYear, setCalendarYear] = useState(2026);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>('2026-11-07');
  const [calendarFilter, setCalendarFilter] = useState('All experiences');

  // Form states for Event Creation
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-12-05');
  const [time, setTime] = useState('05:30 AM');
  const [gatheringVenue, setGatheringVenue] = useState('University of Moratuwa Main Gate');
  const [destinationLocation, setDestinationLocation] = useState('Hanthana Mountain Range, Kandy');
  const [distance, setDistance] = useState('6.2 km');
  const [difficulty, setDifficulty] = useState<Difficulty>('Moderate');
  const [kind, setKind] = useState<EventKind>('Day hike');
  const [capacity, setCapacity] = useState(35);
  const [routeA_Name, setRouteA_Name] = useState('Ridge Trail & Seven Peaks Path');
  const [routeB_Name, setRouteB_Name] = useState('Forest Valley & Water Reservoir Route');

  // Pre-Hike Emergency Setup states for Event Creation
  const [mainHeadName, setMainHeadName] = useState('Dumindu Yasith');
  const [mainHeadPhone, setMainHeadPhone] = useState('071 458 9201');
  const [mainHeadRole, setMainHeadRole] = useState('Expedition Head & Chief Navigator');
  const [mainHeadId, setMainHeadId] = useState('EN220194 - CSE');
  const [mainHeadBlood, setMainHeadBlood] = useState('A+');
  const [hospitalName, setHospitalName] = useState('Peradeniya Teaching Hospital');
  const [hospitalPhone, setHospitalPhone] = useState('081 238 8001');
  const [hospitalAddress, setHospitalAddress] = useState('Galaha Road, Peradeniya, Kandy');
  const [hospitalDistance, setHospitalDistance] = useState('8.2');
  const [firstAidLeadName, setFirstAidLeadName] = useState('Dr. Thilina Alwis (UoM Medical Center Liaison)');
  const [firstAidLeadPhone, setFirstAidLeadPhone] = useState('077 912 3456');
  const [firstAidKitId, setFirstAidKitId] = useState('MHC-TRAUMA-KIT-04');
  const [firstAidQual, setFirstAidQual] = useState('St. John Ambulance Certified First Responder (Level 3)');
  const [ocLeadName, setOcLeadName] = useState('Kavindu Bandara');
  const [ocLeadPhone, setOcLeadPhone] = useState('075 321 8890');
  const [ocLeadRole, setOcLeadRole] = useState('Safety & Transport Marshall');

  // Dynamic forms inside Emergency View
  const [isAddingOc, setIsAddingOc] = useState(false);
  const [newOcName, setNewOcName] = useState('');
  const [newOcRole, setNewOcRole] = useState('');
  const [newOcPhone, setNewOcPhone] = useState('');
  const [newOcWhatsapp, setNewOcWhatsapp] = useState('');
  const [newOcResp, setNewOcResp] = useState('');

  const [isAddingFa, setIsAddingFa] = useState(false);
  const [newFaName, setNewFaName] = useState('');
  const [newFaQual, setNewFaQual] = useState('');
  const [newFaPhone, setNewFaPhone] = useState('');
  const [newFaKit, setNewFaKit] = useState('');
  const [newFaDuty, setNewFaDuty] = useState('');

  const selectedEvent = events.find((e) => e.eventId === selectedEventId) || events[0];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Calendar days calculation
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const cells = Array.from(
    { length: Math.ceil((firstDay + totalDays) / 7) * 7 },
    (_, i) => i - firstDay + 1
  );

  const monthName = new Date(calendarYear, calendarMonth, 1).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  // Events filtered for calendar
  const filteredEventsForCalendar = useMemo(() => {
    return events.filter((e) => {
      if (calendarFilter === 'All experiences') return true;
      if (calendarFilter === 'Day hikes') return e.kind === 'Day hike';
      if (calendarFilter === 'Weekend treks') return e.kind === 'Weekend trek';
      if (calendarFilter === 'Beginner friendly') return e.difficulty === 'Beginner';
      return true;
    });
  }, [events, calendarFilter]);

  // Selected event on the calendar date
  const calendarSelectedEvent =
    events.find((e) => e.date === selectedCalendarDate) ||
    events.find((e) => {
      const d = new Date(e.date);
      return d.getMonth() === calendarMonth && d.getFullYear() === calendarYear;
    }) ||
    events[0];

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  // Handle Create Event
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();

    const newEventId = Date.now();
    const newRoutes: RouteOption[] = [
      {
        routeId: newEventId + 1,
        name: routeA_Name,
        trailCode: 'HTH-RDG-01',
        distanceKm: parseFloat(distance) || 6.2,
        elevationGainM: 410,
        estimatedDuration: '4.0 Hours',
        terrainType: 'Grassland ridge, rock steps and pine scrub',
        difficulty: difficulty,
        safetyScore: 92,
        scenicRating: 4.8,
        description: 'Open vista trail along the peak spine with constant wind breezes and excellent panoramic views of Kandy basin.',
        waterSources: false,
        isRecommended: true,
        hazards: ['Exposed rock scrambles near peaks 4 and 5', 'Sudden cloud cover'],
        waypoints: [
          { name: 'Kandy Base Road Trailhead', lat: 7.2536, lng: 80.6278, elevation: 620, order: 1 },
          { name: 'Pine Forest Rest Arbor', lat: 7.2488, lng: 80.6312, elevation: 840, order: 2 },
          { name: 'Peak 4 Ridge Saddle', lat: 7.2441, lng: 80.6345, elevation: 1020, order: 3 },
          { name: 'Tower Summit Ridge', lat: 7.2395, lng: 80.638, elevation: 1180, order: 4 },
        ],
      },
      {
        routeId: newEventId + 2,
        name: routeB_Name,
        trailCode: 'HTH-VAL-02',
        distanceKm: (parseFloat(distance) || 6.2) + 1.8,
        elevationGainM: 320,
        estimatedDuration: '4.5 Hours',
        terrainType: 'Shaded secondary forest and tea estate fringe',
        difficulty: 'Beginner',
        safetyScore: 96,
        scenicRating: 4.3,
        description: 'Gentler gradient through tea paths with reliable water points. Safer for larger student cohorts.',
        waterSources: true,
        isRecommended: false,
        hazards: ['Leeches during damp mornings'],
        waypoints: [
          { name: 'Estate Bungalow Entry', lat: 7.256, lng: 80.625, elevation: 580, order: 1 },
          { name: 'Forest Stream Cross', lat: 7.251, lng: 80.629, elevation: 790, order: 2 },
          { name: 'Upper Plantation Ridge', lat: 7.242, lng: 80.635, elevation: 960, order: 3 },
        ],
      },
    ];

    const newEvent: ManagedHikingEvent = {
      eventId: newEventId,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'new-hike',
      title: title || 'Hanthana Ridge Traverse',
      description: description || 'Scenic ridge hike over the famous Seven Peaks overlooking Kandy and Hantana forest reserve.',
      date,
      time,
      gatheringVenue,
      destinationLocation,
      distance,
      difficulty,
      kind,
      capacity,
      enrolledCount: 1,
      cover: '/images/ridgeview.jpg',
      status: 'Scheduled',
      selectedRouteId: newRoutes[0].routeId,
      routes: newRoutes,
      tracking: {
        currentLat: 7.2536,
        currentLng: 80.6278,
        currentAltitude: 620,
        progressPercentage: 0,
        speedKmH: 0,
        hikerCountOnTrail: capacity,
        safetyStatus: 'Normal (Safe)',
        lastCheckInTime: 'Scheduled (Not started)',
        activeCheckpointIndex: 0,
        checkpoints: [
          { id: 1, title: 'Gathering & Roll Call', venue: gatheringVenue, scheduledTime: time, status: 'Pending', lat: 6.7969, lng: 79.9018 },
          { id: 2, title: 'Trailhead Arrival', venue: destinationLocation, scheduledTime: '08:30 AM', status: 'Pending', lat: 7.2536, lng: 80.6278 },
          { id: 3, title: 'Mid-Way Ridge Rest', venue: 'Peak 4 Saddle', scheduledTime: '11:00 AM', status: 'Pending', lat: 7.2441, lng: 80.6345 },
          { id: 4, title: 'Summit Completion', venue: 'Tower Peak', scheduledTime: '01:30 PM', status: 'Pending', lat: 7.2395, lng: 80.638 },
        ],
        routeCoordinates: [
          [7.2536, 80.6278],
          [7.2488, 80.6312],
          [7.2441, 80.6345],
          [7.2395, 80.638],
        ],
      },
      contacts: [
        { contactId: 1, name: mainHeadName || 'Dumindu Yasith', role: 'Expedition Lead', phone: mainHeadPhone || '071 458 9201', responsibility: 'Group navigation and check-ins' },
      ],
      mainHead: {
        name: mainHeadName || 'Dumindu Yasith',
        role: mainHeadRole || 'Expedition Head & Chief Navigator',
        phone: mainHeadPhone || '071 458 9201',
        alternatePhone: '077 889 4432',
        universityId: mainHeadId || 'EN220194 - CSE',
        bloodGroup: mainHeadBlood || 'A+ (Positive)',
        email: 'dumindu.y@uom.lk',
      },
      ocMembers: [
        {
          id: 1,
          name: ocLeadName || 'Kavindu Bandara',
          role: ocLeadRole || 'Safety & Transport Marshall',
          phone: ocLeadPhone || '075 321 8890',
          whatsapp: '+94753218890',
          responsibility: 'Trailhead roll call, pace control, emergency radio sync',
        },
        {
          id: 2,
          name: 'Sanduni Weerasinghe',
          role: 'Logistics & Attendance In-Charge',
          phone: '076 991 2234',
          whatsapp: '+94769912234',
          responsibility: 'Bus transit coordinator, emergency extraction vehicle driver liaison',
        },
      ],
      firstAidCommittee: [
        {
          id: 1,
          name: firstAidLeadName || 'Dr. Thilina Alwis (UoM Medical Center Liaison)',
          qualification: firstAidQual || 'St. John Ambulance Certified First Responder (Level 3)',
          phone: firstAidLeadPhone || '077 912 3456',
          assignedKitNumber: firstAidKitId || 'MHC-TRAUMA-KIT-04',
          priorityDuty: 'Primary triage, anaphylaxis (EpiPen), fracture splinting',
        },
      ],
      hospital: {
        hospitalId: 10,
        name: hospitalName || 'Peradeniya Teaching Hospital',
        phone: hospitalPhone || '081 238 8001',
        emergencyHotline: `${hospitalPhone || '081 238 8001'} (Emergency Room) / 1990 (Suwa Seriya)`,
        address: hospitalAddress || 'Galaha Road, Peradeniya, Kandy',
        distanceKm: parseFloat(hospitalDistance) || 8.2,
        traumaCareAvailable: true,
      },
      preHikeClearance: {
        isClearedBeforeHike: true,
        hospitalNotified: true,
        firstAidKitsInspected: true,
        ocBriefingCompleted: true,
        emergencyRadioChecked: true,
        clearedByAdminName: 'MHC Safety Committee (Configured Before Hike)',
        clearedAtTimestamp: 'Pre-Hike Safety Clearance Approved',
      },
    };

    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEventId(newEvent.eventId);
    setSelectedCalendarDate(newEvent.date);
    showToast(`✓ New hiking event "${newEvent.title}" created successfully!`);
    setSubView('route-optimizer');
  };

  // Handle Best Path Selection
  const handleSelectBestRoute = (routeId: number) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.eventId === selectedEvent.eventId) {
          return {
            ...e,
            selectedRouteId: routeId,
            routes: e.routes.map((r) => ({
              ...r,
              isRecommended: r.routeId === routeId,
            })),
          };
        }
        return e;
      })
    );
    const chosen = selectedEvent.routes.find((r) => r.routeId === routeId);
    showToast(`⭐ "${chosen?.name}" set as official best path for ${selectedEvent.title}!`);
  };

  // Simulate advancing the hiker group along the trail
  const handleSimulateAdvance = () => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.eventId === selectedEvent.eventId) {
          const currentIdx = e.tracking.activeCheckpointIndex;
          const nextIdx = (currentIdx + 1) % e.tracking.checkpoints.length;
          const pct = Math.min(100, Math.round(((nextIdx + 1) / e.tracking.checkpoints.length) * 100));

          const nextCoord = e.tracking.routeCoordinates[nextIdx % e.tracking.routeCoordinates.length];
          const newAltitude = 1100 + nextIdx * 110;

          const updatedCheckpoints = e.tracking.checkpoints.map((cp, idx) => {
            if (idx < nextIdx) return { ...cp, status: 'Completed' as const, actualTime: cp.actualTime || '09:15 AM' };
            if (idx === nextIdx) return { ...cp, status: 'In Progress' as const, actualTime: 'Just now' };
            return { ...cp, status: 'Pending' as const };
          });

          return {
            ...e,
            status: pct === 100 ? 'Completed' : 'Live on Trail',
            tracking: {
              ...e.tracking,
              activeCheckpointIndex: nextIdx,
              progressPercentage: pct,
              currentLat: nextCoord[0],
              currentLng: nextCoord[1],
              currentAltitude: newAltitude,
              lastCheckInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              speedKmH: pct === 100 ? 0 : 2.7,
              checkpoints: updatedCheckpoints,
            },
          };
        }
        return e;
      })
    );
    showToast(`📍 Live GPS updated: Advanced to checkpoint #${selectedEvent.tracking.activeCheckpointIndex + 2}!`);
  };

  // Reset live tracking simulation
  const handleResetSimulation = () => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.eventId === selectedEvent.eventId) {
          const firstCoord = e.tracking.routeCoordinates[0];
          return {
            ...e,
            status: 'Live on Trail',
            tracking: {
              ...e.tracking,
              activeCheckpointIndex: 0,
              progressPercentage: 15,
              currentLat: firstCoord[0],
              currentLng: firstCoord[1],
              currentAltitude: 1100,
              speedKmH: 2.5,
              lastCheckInTime: '08:30 AM',
              checkpoints: e.tracking.checkpoints.map((cp, idx) => ({
                ...cp,
                status: idx === 0 ? 'Completed' : idx === 1 ? 'In Progress' : 'Pending',
              })),
            },
          };
        }
        return e;
      })
    );
    showToast('🔄 Live tracking simulation reset to trailhead start.');
  };

  // Pre-Hike Emergency Handlers (Configured Before Hiking Starts)
  const handleAddOcMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOcName.trim() || !newOcPhone.trim()) {
      showToast('⚠️ Please enter member name and phone number.');
      return;
    }
    const newMember: OCMemberContact = {
      id: Date.now(),
      name: newOcName.trim(),
      role: newOcRole.trim() || 'Organizing Committee Marshall',
      phone: newOcPhone.trim(),
      whatsapp: newOcWhatsapp.trim() ? `+94${newOcWhatsapp.trim().replace(/^0/, '')}` : undefined,
      responsibility: newOcResp.trim() || 'Trailhead hiker support & patrol communication',
    };
    setEvents((prev) =>
      prev.map((ev) =>
        ev.eventId === selectedEvent.eventId
          ? { ...ev, ocMembers: [...ev.ocMembers, newMember] }
          : ev
      )
    );
    setNewOcName('');
    setNewOcRole('');
    setNewOcPhone('');
    setNewOcWhatsapp('');
    setNewOcResp('');
    setIsAddingOc(false);
    showToast(`✓ OC Member ${newMember.name} added to pre-hike directory!`);
  };

  const handleRemoveOcMember = (id: number) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.eventId === selectedEvent.eventId
          ? { ...ev, ocMembers: ev.ocMembers.filter((m) => m.id !== id) }
          : ev
      )
    );
    showToast('✓ OC member removed from emergency directory.');
  };

  const handleAddFaMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaName.trim() || !newFaPhone.trim()) {
      showToast('⚠️ Please enter responder name and mobile number.');
      return;
    }
    const newFa: FirstAidCommitteeContact = {
      id: Date.now(),
      name: newFaName.trim(),
      qualification: newFaQual.trim() || 'St. John Ambulance Certified First Responder',
      phone: newFaPhone.trim(),
      assignedKitNumber: newFaKit.trim() || `MHC-TRAUMA-KIT-0${selectedEvent.firstAidCommittee.length + 1}`,
      priorityDuty: newFaDuty.trim() || 'Primary Triage, Heatstroke & Sprain Immobilization',
    };
    setEvents((prev) =>
      prev.map((ev) =>
        ev.eventId === selectedEvent.eventId
          ? { ...ev, firstAidCommittee: [...ev.firstAidCommittee, newFa] }
          : ev
      )
    );
    setNewFaName('');
    setNewFaQual('');
    setNewFaPhone('');
    setNewFaKit('');
    setNewFaDuty('');
    setIsAddingFa(false);
    showToast(`✓ First Aid responder ${newFa.name} assigned to pre-hike medical roster!`);
  };

  const handleRemoveFaMember = (id: number) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.eventId === selectedEvent.eventId
          ? { ...ev, firstAidCommittee: ev.firstAidCommittee.filter((fa) => fa.id !== id) }
          : ev
      )
    );
    showToast('✓ First Aid responder removed from medical squad.');
  };

  const handleTogglePreHikeCheck = (
    key: 'hospitalNotified' | 'firstAidKitsInspected' | 'ocBriefingCompleted' | 'emergencyRadioChecked'
  ) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.eventId === selectedEvent.eventId) {
          const updated = {
            ...ev.preHikeClearance,
            [key]: !ev.preHikeClearance[key],
          };
          const allChecked =
            updated.hospitalNotified &&
            updated.firstAidKitsInspected &&
            updated.ocBriefingCompleted &&
            updated.emergencyRadioChecked;
          return {
            ...ev,
            preHikeClearance: {
              ...updated,
              isClearedBeforeHike: allChecked,
              clearedAtTimestamp: allChecked
                ? new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) + ' (Verified Before Hike)'
                : 'Pending Final Verification',
            },
          };
        }
        return ev;
      })
    );
    showToast('✓ Pre-hike safety clearance checklist updated.');
  };

  const handleSignOffPreHike = () => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.eventId === selectedEvent.eventId) {
          const current = ev.preHikeClearance.isClearedBeforeHike;
          return {
            ...ev,
            preHikeClearance: {
              ...ev.preHikeClearance,
              isClearedBeforeHike: !current,
              hospitalNotified: true,
              firstAidKitsInspected: true,
              ocBriefingCompleted: true,
              emergencyRadioChecked: true,
              clearedByAdminName: 'MHC Safety & Operations Executive',
              clearedAtTimestamp: !current
                ? new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) + ' (Verified Before Hike)'
                : 'Clearance Revoked for Pre-Hike Re-audit',
            },
          };
        }
        return ev;
      })
    );
    showToast(
      !selectedEvent.preHikeClearance.isClearedBeforeHike
        ? '✓ Pre-Hike Safety Clearance Approved & Certified!'
        : '⚠️ Pre-Hike Safety Clearance set to Pending Re-audit.'
    );
  };

  const handlePrintDossier = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const activeBestRoute =
    selectedEvent.routes.find((r) => r.routeId === selectedEvent.selectedRouteId) || selectedEvent.routes[0];

  return (
    <div className="event-mgmt-studio">
      {/* Toast Notification */}
      {toast && (
        <div className="mm-toast" role="alert">
          <Sparkles size={16} />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} aria-label="Close notification">
            <X size={15} />
          </button>
        </div>
      )}

      {/* Mode Navigation Tabs */}
      <div className="studio-tabs-bar">
        <div className="shell studio-tabs">
          <button
            className={`studio-tab-btn ${subView === 'calendar' ? 'active' : ''}`}
            onClick={() => setSubView('calendar')}
          >
            <CalendarIcon size={17} />
            <span>Events Calendar (Upcoming Hikes)</span>
          </button>

          <button
            className={`studio-tab-btn ${subView === 'live-tracking' ? 'active' : ''}`}
            onClick={() => setSubView('live-tracking')}
          >
            <Activity size={17} />
            <span>Live Trail Tracking (Google Maps)</span>
            <span className="live-pulse-badge">LIVE</span>
          </button>

          <button
            className={`studio-tab-btn ${subView === 'route-optimizer' ? 'active' : ''}`}
            onClick={() => setSubView('route-optimizer')}
          >
            <Compass size={17} />
            <span>Best Path Decision Studio</span>
          </button>

          <button
            className={`studio-tab-btn ${subView === 'emergency-view' ? 'active' : ''}`}
            onClick={() => setSubView('emergency-view')}
          >
            <ShieldAlert size={17} />
            <span>Emergency Readiness & Contacts</span>
            <span className="emergency-alert-badge">PRE-HIKE</span>
          </button>

          <button
            className={`studio-tab-btn ${subView === 'create' ? 'active' : ''}`}
            onClick={() => setSubView('create')}
          >
            <PlusCircle size={17} />
            <span>Create Hiking Event</span>
          </button>

          <button
            className={`studio-tab-btn ${subView === 'list' ? 'active' : ''}`}
            onClick={() => setSubView('list')}
          >
            <CalendarDays size={17} />
            <span>All Scheduled Events ({events.length})</span>
          </button>
        </div>
      </div>

      <div className="shell studio-content">
        {/* ========================================================================= */}
        {/* VIEW 0: REACT UI EVENTS CALENDAR (UPCOMING HIKES) */}
        {/* ========================================================================= */}
        {subView === 'calendar' && (
          <div className="studio-section">
            <div className="studio-header-row">
              <div>
                <span className="eyebrow">Interactive Event Scheduler</span>
                <h2>Upcoming Hiking Events Calendar</h2>
                <p>
                  Browse official club events by date. Select any highlighted trail date on the calendar to view
                  details, gathering venues, and launch live Google Map tracking.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="button button-pine" onClick={() => setSubView('create')}>
                  <PlusCircle size={17} /> Create Event
                </button>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="filter-bar" style={{ marginBottom: '25px' }}>
              {['All experiences', 'Day hikes', 'Weekend treks', 'Beginner friendly'].map((f) => (
                <button
                  key={f}
                  onClick={() => setCalendarFilter(f)}
                  className={`chip ${calendarFilter === f ? 'selected' : ''}`}
                  aria-pressed={calendarFilter === f}
                >
                  {f}
                </button>
              ))}
              <span className="muted filter-side">
                {filteredEventsForCalendar.length} scheduled club adventures
              </span>
            </div>

            {/* Calendar Layout */}
            <div className="calendar-layout">
              {/* Calendar Monthly Grid Component */}
              <div className="calendar-panel">
                <div className="calendar-head">
                  <button
                    aria-label="Previous month"
                    onClick={handlePrevMonth}
                    className="icon-button"
                  >
                    <ChevronLeft size={19} />
                  </button>
                  <strong>{monthName}</strong>
                  <button
                    aria-label="Next month"
                    onClick={handleNextMonth}
                    className="icon-button"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>

                <div className="calendar-grid">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="weekday">
                      {d}
                    </div>
                  ))}

                  {cells.map((day, i) => {
                    const iso = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(
                      day
                    ).padStart(2, '0')}`;
                    const hasEvent = events.some((e) => e.date === iso);
                    const isSelected = selectedCalendarDate === iso;

                    return (
                      <button
                        key={i}
                        disabled={day < 1 || day > totalDays || !hasEvent}
                        className={`calendar-date ${hasEvent ? 'has-event' : ''} ${
                          isSelected ? 'selected' : ''
                        }`}
                        onClick={() => {
                          setSelectedCalendarDate(iso);
                          const matched = events.find((e) => e.date === iso);
                          if (matched) setSelectedEventId(matched.eventId);
                        }}
                        aria-label={hasEvent ? `View event on ${iso}` : undefined}
                      >
                        {day > 0 && day <= totalDays ? day : ''}
                        {hasEvent && <span className="event-dot" />}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '12px',
                    color: 'var(--muted)',
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--line)',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span className="event-dot" style={{ position: 'static' }} /> Green dot indicates scheduled hike
                  </span>
                </div>
              </div>

              {/* Selected Event Details & Upcoming Hikes Side Panel */}
              <div className="calendar-side" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div className="cal-icon">
                    <CalendarDays size={22} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--forest)',
                        fontWeight: 900,
                      }}
                    >
                      Selected Adventure
                    </span>
                    <h3 style={{ margin: '2px 0 0', fontSize: '18px' }}>
                      {calendarSelectedEvent.title}
                    </h3>
                  </div>
                </div>

                {/* Event Summary Card */}
                <div
                  style={{
                    background: 'var(--soft)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    fontSize: '13px',
                    marginBottom: '18px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CalendarDays size={15} className="text-forest" />
                    <strong>
                      {calendarSelectedEvent.date} at {calendarSelectedEvent.time}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <MapPin size={15} className="text-forest" style={{ marginTop: '2px' }} />
                    <div>
                      <span>
                        <strong>Gathering Venue:</strong> {calendarSelectedEvent.gatheringVenue}
                      </span>
                      <small className="muted" style={{ display: 'block' }}>
                        Destination: {calendarSelectedEvent.destinationLocation}
                      </small>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Compass size={15} className="text-forest" />
                    <span>
                      {calendarSelectedEvent.distance} • {calendarSelectedEvent.difficulty} ({calendarSelectedEvent.kind})
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <button
                    className="button button-pine small"
                    onClick={() => {
                      setSelectedEventId(calendarSelectedEvent.eventId);
                      setSubView('live-tracking');
                    }}
                  >
                    <Activity size={15} /> Open Live Google Map Tracking
                  </button>

                  <button
                    className="button button-outline small"
                    onClick={() => {
                      setSelectedEventId(calendarSelectedEvent.eventId);
                      setSubView('route-optimizer');
                    }}
                  >
                    <Compass size={15} /> Evaluate Best Path ({calendarSelectedEvent.routes.length} options)
                  </button>

                  <button
                    className="button button-outline small"
                    onClick={() => {
                      setSelectedEventId(calendarSelectedEvent.eventId);
                      setSubView('emergency-view');
                    }}
                  >
                    <ShieldAlert size={15} /> Pre-Hike Emergency Dossier
                  </button>
                </div>

                {/* Other Events this Month */}
                <h4 style={{ margin: 'auto 0 10px', fontSize: '13px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Hikes in {monthName}
                </h4>
                <div className="calendar-list" style={{ marginTop: '0', maxHeight: '170px', overflowY: 'auto' }}>
                  {events
                    .filter((e) => {
                      const d = new Date(e.date);
                      return d.getMonth() === calendarMonth && d.getFullYear() === calendarYear;
                    })
                    .map((e) => (
                      <button
                        key={e.eventId}
                        onClick={() => {
                          setSelectedCalendarDate(e.date);
                          setSelectedEventId(e.eventId);
                        }}
                        className={`calendar-list-row ${
                          selectedCalendarDate === e.date ? 'active' : ''
                        }`}
                      >
                        <span>{new Date(e.date).getDate()} {new Date(e.date).toLocaleDateString('en-GB', { month: 'short' })}</span>
                        <strong>{e.title}</strong>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1: LIVE TRAIL TRACKING (GOOGLE MAPS) */}
        {/* ========================================================================= */}
        {subView === 'live-tracking' && (
          <div className="studio-section">
            <div className="studio-header-row">
              <div>
                <span className="eyebrow">Real-Time Event Navigation</span>
                <h2>Live Event Tracking — Google Maps</h2>
                <p>
                  Monitor ongoing hiking expeditions in real time with live GPS telemetry, altitude tracking, checkpoint
                  verification, and safety status.
                </p>
              </div>

              <div className="event-picker-box">
                <label>Select Active Hike:</label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(Number(e.target.value))}
                >
                  {events.map((ev) => (
                    <option key={ev.eventId} value={ev.eventId}>
                      {ev.title} ({ev.status})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Telemetry KPI Bar */}
            <div className="live-kpi-bar">
              <div className="kpi-item">
                <span className="kpi-label">GPS Location</span>
                <strong className="kpi-value">
                  {selectedEvent.tracking.currentLat.toFixed(4)}° N, {selectedEvent.tracking.currentLng.toFixed(4)}° E
                </strong>
                <small className="muted">{selectedEvent.destinationLocation}</small>
              </div>

              <div className="kpi-item">
                <span className="kpi-label">Current Altitude</span>
                <strong className="kpi-value">{selectedEvent.tracking.currentAltitude} m</strong>
                <small className="text-forest">Highland Ridge</small>
              </div>

              <div className="kpi-item">
                <span className="kpi-label">Hiker Cohort</span>
                <strong className="kpi-value">{selectedEvent.tracking.hikerCountOnTrail} Hikers</strong>
                <small className="muted">All accounted for</small>
              </div>

              <div className="kpi-item">
                <span className="kpi-label">Speed</span>
                <strong className="kpi-value">{selectedEvent.tracking.speedKmH} km/h</strong>
                <small className="muted">Paced trail walk</small>
              </div>

              <div className="kpi-item">
                <span className="kpi-label">Safety Beacon</span>
                <strong className="kpi-value safety-green">
                  <span className="pulse-dot"></span> {selectedEvent.tracking.safetyStatus}
                </strong>
                <small className="muted">Last sync: {selectedEvent.tracking.lastCheckInTime}</small>
              </div>
            </div>

            {/* Google Map + Live Feed Layout */}
            <div className="live-tracking-layout">
              <div className="map-panel">
                <div className="map-toolbar">
                  <div className="map-title-info">
                    <MapPin size={17} className="text-forest" />
                    <strong>{selectedEvent.title}</strong>
                    <span className="map-route-name">• {activeBestRoute.name}</span>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                      selectedEvent.gatheringVenue
                    )}&destination=${encodeURIComponent(selectedEvent.destinationLocation)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-outline mini"
                  >
                    Open in Google Maps <ExternalLink size={13} />
                  </a>
                </div>

                {/* Google Maps Interactive Satellite Frame */}
                <div className="google-map-container">
                  <iframe
                    title="Live Google Map Hike Tracking"
                    width="100%"
                    height="450"
                    style={{ border: 0, borderRadius: '16px' }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${selectedEvent.tracking.currentLat},${selectedEvent.tracking.currentLng}&z=14&t=k&output=embed`}
                  ></iframe>

                  <div className="live-map-overlay-badge">
                    <span className="pulse-dot"></span>
                    <strong>Hiker Group Location</strong>
                    <small>
                      {selectedEvent.tracking.currentLat.toFixed(4)}°, {selectedEvent.tracking.currentLng.toFixed(4)}°
                    </small>
                  </div>
                </div>

                {/* Simulation Control Bar */}
                <div className="sim-control-bar">
                  <div className="sim-info">
                    <span>
                      <strong>Interactive Tracking Simulation:</strong> Advance the hiker cohort along the trail to test
                      live GPS, waypoint completion, and elevation shifts.
                    </span>
                  </div>
                  <div className="sim-buttons">
                    <button className="button button-pine small" onClick={handleSimulateAdvance}>
                      <Footprints size={15} /> Advance Checkpoint (+25%)
                    </button>
                    <button className="button button-outline small" onClick={handleResetSimulation}>
                      <RefreshCw size={14} /> Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Trail Progress & Checkpoints Sidebar */}
              <div className="trail-status-sidebar">
                <div className="trail-progress-card">
                  <div className="progress-top">
                    <span>Trail Progress</span>
                    <strong>{selectedEvent.tracking.progressPercentage}% Completed</strong>
                  </div>
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${selectedEvent.tracking.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="checkpoints-container">
                  <h4>
                    <Navigation size={17} /> Waypoint Check-In Timeline
                  </h4>
                  <div className="checkpoint-list">
                    {selectedEvent.tracking.checkpoints.map((cp, idx) => (
                      <div
                        key={cp.id}
                        className={`checkpoint-row ${
                          cp.status === 'Completed'
                            ? 'cp-completed'
                            : cp.status === 'In Progress'
                            ? 'cp-active'
                            : 'cp-pending'
                        }`}
                      >
                        <div className="cp-indicator">
                          {cp.status === 'Completed' ? (
                            <CheckCircle2 size={16} />
                          ) : cp.status === 'In Progress' ? (
                            <span className="cp-pulse-dot" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>
                        <div className="cp-details">
                          <strong>{cp.title}</strong>
                          <span className="cp-venue">{cp.venue}</span>
                          <div className="cp-meta">
                            <span>Sched: {cp.scheduledTime}</span>
                            {cp.actualTime && <span className="text-forest">• Reached: {cp.actualTime}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="emergency-contact-box">
                  <h4>
                    <Shield size={16} /> Safety & Medical Support
                  </h4>
                  <div className="contact-row">
                    <Phone size={14} />
                    <div>
                      <strong>Lead: {selectedEvent.contacts[0]?.name}</strong>
                      <small className="muted">{selectedEvent.contacts[0]?.phone}</small>
                    </div>
                  </div>
                  <div className="contact-row">
                    <Hospital size={14} />
                    <div>
                      <strong>{selectedEvent.hospital?.name}</strong>
                      <small className="muted">
                        {selectedEvent.hospital?.phone} ({selectedEvent.hospital?.distanceKm} km away)
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: BEST PATH DECISION STUDIO */}
        {/* ========================================================================= */}
        {subView === 'route-optimizer' && (
          <div className="studio-section">
            <div className="studio-header-row">
              <div>
                <span className="eyebrow">Trail Navigation Architecture</span>
                <h2>Decide the Best Path for Hiking</h2>
                <p>
                  As an administrator, evaluate candidate trail routes based on distance, elevation gradient, terrain,
                  safety score, and water availability to select the official path.
                </p>
              </div>

              <div className="event-picker-box">
                <label>Hike Under Evaluation:</label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(Number(e.target.value))}
                >
                  {events.map((ev) => (
                    <option key={ev.eventId} value={ev.eventId}>
                      {ev.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="routes-comparison-grid">
              {selectedEvent.routes.map((route) => {
                const isSelected = route.routeId === selectedEvent.selectedRouteId;

                return (
                  <div
                    key={route.routeId}
                    className={`route-card ${isSelected ? 'route-card-best' : ''}`}
                  >
                    {isSelected && (
                      <div className="best-path-badge">
                        <Award size={14} /> Official Recommended Best Path
                      </div>
                    )}

                    <div className="route-header">
                      <div>
                        <span className="route-code">{route.trailCode}</span>
                        <h3>{route.name}</h3>
                      </div>
                      <span className={`route-diff-pill ${route.difficulty.toLowerCase()}`}>
                        {route.difficulty}
                      </span>
                    </div>

                    <p className="route-desc">{route.description}</p>

                    <div className="route-stats-grid">
                      <div className="route-stat">
                        <span>Distance</span>
                        <strong>{route.distanceKm} km</strong>
                      </div>
                      <div className="route-stat">
                        <span>Elevation Gain</span>
                        <strong>+{route.elevationGainM} m</strong>
                      </div>
                      <div className="route-stat">
                        <span>Est. Duration</span>
                        <strong>{route.estimatedDuration}</strong>
                      </div>
                      <div className="route-stat">
                        <span>Safety Score</span>
                        <strong className={route.safetyScore >= 90 ? 'text-forest' : 'text-amber'}>
                          {route.safetyScore} / 100
                        </strong>
                      </div>
                    </div>

                    <div className="route-extra-info">
                      <div>
                        <span>Terrain Type:</span>
                        <strong>{route.terrainType}</strong>
                      </div>
                      <div>
                        <span>Water Points:</span>
                        <strong>{route.waterSources ? 'Available along trail' : 'None (carry 2L+)'}</strong>
                      </div>
                    </div>

                    <div className="route-hazards">
                      <span>Hazards & Conditions:</span>
                      <ul>
                        {route.hazards.map((h, i) => (
                          <li key={i}>
                            <AlertTriangle size={13} /> {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="route-waypoints-box">
                      <span>Waypoints ({route.waypoints.length}):</span>
                      <ol>
                        {route.waypoints.map((wp) => (
                          <li key={wp.order}>
                            {wp.name} <small>({wp.elevation}m)</small>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="route-card-footer">
                      {isSelected ? (
                        <div className="selected-active-note">
                          <CheckCircle2 size={16} /> Selected as Official Trail
                        </div>
                      ) : (
                        <button
                          className="button button-pine block"
                          onClick={() => handleSelectBestRoute(route.routeId)}
                        >
                          <Check size={16} /> Set as Best Path
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2.5: EMERGENCY READINESS, HOSPITAL & CONTACTS (BEFORE HIKE STARTS) */}
        {/* ========================================================================= */}
        {subView === 'emergency-view' && (
          <div className="studio-section">
            {/* Header + Event Selector */}
            <div className="studio-header-row">
              <div>
                <span className="eyebrow">Pre-Expedition Safety Operations</span>
                <h2>Emergency Readiness & Contacts Directory</h2>
                <p>
                  Comprehensive emergency profile configured prior to departure: Nearest hospital & ambulance hotlines,
                  expedition main head, organizing committee (OC) contacts, and first aid committee responders.
                </p>
              </div>

              <div className="event-picker-box">
                <label>Select Hike:</label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(Number(e.target.value))}
                >
                  {events.map((ev) => (
                    <option key={ev.eventId} value={ev.eventId}>
                      {ev.title} ({ev.status})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Emergency Speed Dial Hotline Bar */}
            <div className="emergency-quick-bar">
              <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--muted)', alignSelf: 'center' }}>
                Emergency Speed Dial:
              </span>
              <a href="tel:1990" className="quick-dial-btn" style={{ background: '#ff4747', color: '#fff', borderColor: '#ff4747' }}>
                <PhoneCall size={14} /> 1990 Ambulance (Suwa Seriya)
              </a>
              <a href={`tel:${selectedEvent.hospital.phone.replace(/[^0-9+]/g, '')}`} className="quick-dial-btn">
                <Hospital size={14} /> {selectedEvent.hospital.name.split(' ')[0]} Hospital Desk: {selectedEvent.hospital.phone.split('/')[0]}
              </a>
              <a href={`tel:${selectedEvent.mainHead.phone.replace(/[^0-9+]/g, '')}`} className="quick-dial-btn">
                <UserCheck size={14} /> Main Head ({selectedEvent.mainHead.name}): {selectedEvent.mainHead.phone}
              </a>
              <a href="tel:119" className="quick-dial-btn">
                <Shield size={14} /> 119 Police Hotline
              </a>
            </div>

            {/* Pre-Hike Clearance Status Banner */}
            <div className={`pre-hike-banner ${selectedEvent.preHikeClearance.isClearedBeforeHike ? '' : 'pending'}`}>
              <div className="pre-hike-info">
                <h4>
                  {selectedEvent.preHikeClearance.isClearedBeforeHike ? (
                    <>
                      <CheckCircle2 size={19} color="#16a34a" />
                      <span>Pre-Hike Safety Clearance: Approved & Cleared</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={19} color="#f59e0b" />
                      <span>Pre-Hike Safety Clearance: Pending Protocol Verification</span>
                    </>
                  )}
                </h4>
                <p>
                  Status: <strong>{selectedEvent.preHikeClearance.clearedAtTimestamp}</strong> • Audited by {selectedEvent.preHikeClearance.clearedByAdminName}
                </p>
              </div>

              <div className="pre-hike-actions">
                <button
                  type="button"
                  className="button button-pine small"
                  onClick={handleSignOffPreHike}
                >
                  <Check size={15} />
                  {selectedEvent.preHikeClearance.isClearedBeforeHike ? 'Re-Audit Protocol' : 'Certify Pre-Hike Clearance'}
                </button>
                <button
                  type="button"
                  className="button button-outline small"
                  onClick={handlePrintDossier}
                >
                  <Printer size={15} /> Print Emergency Card
                </button>
              </div>
            </div>

            {/* Pre-Hike Safety Protocol Checklist (Configured & Checked Before Departure) */}
            <div className="checklist-card">
              <div className="checklist-card-header">
                <h3>
                  <FileText size={17} /> Mandatory Pre-Hike Safety Checklist (Completed Before Trail Departure)
                </h3>
                <span className="emergency-badge-tag">Pre-Expedition Requirement</span>
              </div>

              <div className="checklist-grid">
                <button
                  type="button"
                  className={`checklist-item-btn ${selectedEvent.preHikeClearance.hospitalNotified ? 'checked' : ''}`}
                  onClick={() => handleTogglePreHikeCheck('hospitalNotified')}
                >
                  <div className="check-box">
                    {selectedEvent.preHikeClearance.hospitalNotified && <Check size={14} />}
                  </div>
                  <div className="checklist-text">
                    <strong>Nearest Hospital Notified</strong>
                    <span>{selectedEvent.hospital.name} notified with hike schedule & group count</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`checklist-item-btn ${selectedEvent.preHikeClearance.firstAidKitsInspected ? 'checked' : ''}`}
                  onClick={() => handleTogglePreHikeCheck('firstAidKitsInspected')}
                >
                  <div className="check-box">
                    {selectedEvent.preHikeClearance.firstAidKitsInspected && <Check size={14} />}
                  </div>
                  <div className="checklist-text">
                    <strong>First Aid Kits Inspected & Sealed</strong>
                    <span>Trauma packs, splints, tourniquets, and EpiPens checked</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`checklist-item-btn ${selectedEvent.preHikeClearance.ocBriefingCompleted ? 'checked' : ''}`}
                  onClick={() => handleTogglePreHikeCheck('ocBriefingCompleted')}
                >
                  <div className="check-box">
                    {selectedEvent.preHikeClearance.ocBriefingCompleted && <Check size={14} />}
                  </div>
                  <div className="checklist-text">
                    <strong>OC Roles & Trail Marshalls Briefed</strong>
                    <span>Pace control, tail-sweep assignments, and checkpoint schedule locked</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`checklist-item-btn ${selectedEvent.preHikeClearance.emergencyRadioChecked ? 'checked' : ''}`}
                  onClick={() => handleTogglePreHikeCheck('emergencyRadioChecked')}
                >
                  <div className="check-box">
                    {selectedEvent.preHikeClearance.emergencyRadioChecked && <Check size={14} />}
                  </div>
                  <div className="checklist-text">
                    <strong>VHF Radio & Mobile Batteries Charged</strong>
                    <span>Emergency frequencies synced with trailhead base camp</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Top Command 2 Columns: Main Head + Nearest Hospital */}
            <div className="emergency-two-col">
              {/* Card 1: Main Head of the Event */}
              <div className="emergency-card">
                <div className="emergency-card-header">
                  <div className="emergency-card-title">
                    <UserCheck size={26} />
                    <div>
                      <h3>Main Head of the Event</h3>
                      <p>Chief expedition commander & primary decision maker</p>
                    </div>
                  </div>
                  <span className="emergency-badge-tag">Expedition Lead</span>
                </div>

                <div className="emergency-details-table">
                  <div className="emergency-row">
                    <span className="row-label">Full Name</span>
                    <span className="row-value">{selectedEvent.mainHead.name}</span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Role / Designation</span>
                    <span className="row-value">{selectedEvent.mainHead.role}</span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">University Index / Faculty</span>
                    <span className="row-value">{selectedEvent.mainHead.universityId}</span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Primary Mobile</span>
                    <span className="row-value" style={{ color: 'var(--forest)' }}>
                      <strong>{selectedEvent.mainHead.phone}</strong>
                    </span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Alternate Emergency Phone</span>
                    <span className="row-value">{selectedEvent.mainHead.alternatePhone}</span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Blood Group</span>
                    <span className="row-value">{selectedEvent.mainHead.bloodGroup}</span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Emergency Email</span>
                    <span className="row-value">{selectedEvent.mainHead.email}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <a
                    href={`tel:${selectedEvent.mainHead.phone.replace(/[^0-9+]/g, '')}`}
                    className="contact-call-btn"
                  >
                    <PhoneCall size={14} /> Call Main Head
                  </a>
                  <a
                    href={`https://wa.me/94${selectedEvent.mainHead.phone.replace(/[^0-9]/g, '').replace(/^0/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-wa-btn"
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Card 2: Nearest Hospital & Ambulance Contacts */}
              <div className="emergency-card">
                <div className="emergency-card-header">
                  <div className="emergency-card-title">
                    <Hospital size={26} />
                    <div>
                      <h3>Nearest Hospital & Ambulance</h3>
                      <p>Designated primary medical evacuation center</p>
                    </div>
                  </div>
                  <span className="emergency-badge-tag" style={{ background: '#fee2e2', color: '#b91c1c' }}>
                    24/7 Casualty
                  </span>
                </div>

                <div className="emergency-details-table">
                  <div className="emergency-row">
                    <span className="row-label">Hospital Name</span>
                    <span className="row-value">{selectedEvent.hospital.name}</span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Casualty / ER Direct Line</span>
                    <span className="row-value" style={{ color: '#b91c1c' }}>
                      <strong>{selectedEvent.hospital.phone}</strong>
                    </span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Ambulance Hotlines</span>
                    <span className="row-value">
                      {selectedEvent.hospital.emergencyHotline || '1990 (Suwa Seriya EMS)'}
                    </span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Distance from Trailhead</span>
                    <span className="row-value">
                      {selectedEvent.hospital.distanceKm} km (Approx. {Math.round(selectedEvent.hospital.distanceKm * 1.5)} mins transit)
                    </span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Address</span>
                    <span className="row-value">{selectedEvent.hospital.address}</span>
                  </div>
                  <div className="emergency-row">
                    <span className="row-label">Facilities Standby</span>
                    <span className="row-value">Trauma Unit, Snakebite Antivenom, Blood Bank</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <a
                    href={`tel:${selectedEvent.hospital.phone.replace(/[^0-9+]/g, '')}`}
                    className="contact-call-btn"
                    style={{ background: '#b91c1c' }}
                  >
                    <PhoneCall size={14} /> Call Hospital ER
                  </a>
                  <a
                    href="tel:1990"
                    className="contact-call-btn"
                    style={{ background: '#ea580c' }}
                  >
                    <HeartPulse size={14} /> Call 1990 Ambulance
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedEvent.hospital.name + ' ' + selectedEvent.hospital.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-wa-btn"
                    style={{ background: '#3b82f6' }}
                  >
                    <ExternalLink size={14} /> Hospital Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Section 3: First Aid Committee Responders */}
            <div className="emergency-section-title">
              <div>
                <h3>
                  <HeartPulse size={20} color="#dc2626" /> First Aid & Medical Committee (Pre-Assigned Squad)
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                  Certified emergency responders traveling with the hiking cohort equipped with certified trauma kits.
                </p>
              </div>

              <button
                type="button"
                className="button button-outline small"
                onClick={() => setIsAddingFa(!isAddingFa)}
              >
                <Plus size={15} /> {isAddingFa ? 'Close Form' : 'Add First Aid Responder'}
              </button>
            </div>

            {/* Add First Aid Responder Form (Before Hike Starts) */}
            {isAddingFa && (
              <form className="prehike-add-box" onSubmit={handleAddFaMember}>
                <h4 style={{ margin: '0 0 14px', fontSize: '15px' }}>
                  Assign Certified First Aid Responder (Pre-Hike Setup)
                </h4>
                <div className="form-row three-col">
                  <label className="field">
                    <span>Full Name</span>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Minoli Jayasuriya"
                      value={newFaName}
                      onChange={(e) => setNewFaName(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>Qualification / Certifications</span>
                    <input
                      required
                      type="text"
                      placeholder="e.g. St. John Ambulance Level 2"
                      value={newFaQual}
                      onChange={(e) => setNewFaQual(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>Direct Mobile Number</span>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 077 123 4567"
                      value={newFaPhone}
                      onChange={(e) => setNewFaPhone(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label className="field">
                    <span>Assigned Medical Kit ID</span>
                    <input
                      type="text"
                      placeholder="e.g. MHC-TRAUMA-KIT-02"
                      value={newFaKit}
                      onChange={(e) => setNewFaKit(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>Designated Duty on Trail</span>
                    <input
                      type="text"
                      placeholder="e.g. Dehydration, sprains & wound management"
                      value={newFaDuty}
                      onChange={(e) => setNewFaDuty(e.target.value)}
                    />
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button type="submit" className="button button-pine small">
                    <Plus size={14} /> Add First Aider to Pre-Hike Roster
                  </button>
                  <button
                    type="button"
                    className="button button-outline small"
                    onClick={() => setIsAddingFa(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="emergency-contact-grid">
              {selectedEvent.firstAidCommittee.map((fa) => (
                <div key={fa.id} className="contact-person-card">
                  <div className="contact-person-top">
                    <div className="contact-person-meta">
                      <h4>{fa.name}</h4>
                      <span>{fa.qualification}</span>
                    </div>
                    <span className="emergency-badge-tag" style={{ background: '#fee2e2', color: '#b91c1c' }}>
                      {fa.assignedKitNumber}
                    </span>
                  </div>

                  <div className="contact-person-duty">
                    <strong>Pre-Hike Duty:</strong> {fa.priorityDuty}
                  </div>

                  <div className="contact-person-actions">
                    <a
                      href={`tel:${fa.phone.replace(/[^0-9+]/g, '')}`}
                      className="contact-call-btn"
                    >
                      <PhoneCall size={13} /> {fa.phone}
                    </a>
                    {selectedEvent.firstAidCommittee.length > 1 && (
                      <button
                        type="button"
                        className="button button-outline small"
                        style={{ padding: '6px 10px', marginLeft: 'auto', color: '#b91c1c' }}
                        onClick={() => handleRemoveFaMember(fa.id)}
                        title="Remove from roster"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Section 4: Organizing Committee (OC) Contacts Directory */}
            <div className="emergency-section-title">
              <div>
                <h3>
                  <Users size={20} color="var(--forest)" /> Organizing Committee (OC) Member Directory
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                  All direct contact numbers of the hike Organizing Committee marshalls, logistics leads, and tail sweeps.
                </p>
              </div>

              <button
                type="button"
                className="button button-outline small"
                onClick={() => setIsAddingOc(!isAddingOc)}
              >
                <Plus size={15} /> {isAddingOc ? 'Close Form' : 'Add OC Member'}
              </button>
            </div>

            {/* Add OC Member Form (Before Hike Starts) */}
            {isAddingOc && (
              <form className="prehike-add-box" onSubmit={handleAddOcMember}>
                <h4 style={{ margin: '0 0 14px', fontSize: '15px' }}>
                  Register OC Member (Configured Before Hiking Starts)
                </h4>
                <div className="form-row three-col">
                  <label className="field">
                    <span>Full Name</span>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Kavindu Bandara"
                      value={newOcName}
                      onChange={(e) => setNewOcName(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>OC Role / Responsibility</span>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Safety Marshall & Tail Sweep"
                      value={newOcRole}
                      onChange={(e) => setNewOcRole(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>Contact Phone</span>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 071 458 9201"
                      value={newOcPhone}
                      onChange={(e) => setNewOcPhone(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label className="field">
                    <span>WhatsApp Number (Optional)</span>
                    <input
                      type="tel"
                      placeholder="e.g. 071 458 9201"
                      value={newOcWhatsapp}
                      onChange={(e) => setNewOcWhatsapp(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>Assigned Trail Task</span>
                    <input
                      type="text"
                      placeholder="e.g. Hiker roll call at checkpoints, VHF radio monitoring"
                      value={newOcResp}
                      onChange={(e) => setNewOcResp(e.target.value)}
                    />
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button type="submit" className="button button-pine small">
                    <Plus size={14} /> Add OC Member to Pre-Hike Directory
                  </button>
                  <button
                    type="button"
                    className="button button-outline small"
                    onClick={() => setIsAddingOc(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="emergency-contact-grid">
              {selectedEvent.ocMembers.map((oc) => (
                <div key={oc.id} className="contact-person-card">
                  <div className="contact-person-top">
                    <div className="contact-person-meta">
                      <h4>{oc.name}</h4>
                      <span>{oc.role}</span>
                    </div>
                    <span className="emergency-badge-tag">OC Member</span>
                  </div>

                  <div className="contact-person-duty">
                    <strong>Pre-Hike Assignment:</strong> {oc.responsibility}
                  </div>

                  <div className="contact-person-actions">
                    <a
                      href={`tel:${oc.phone.replace(/[^0-9+]/g, '')}`}
                      className="contact-call-btn"
                    >
                      <PhoneCall size={13} /> {oc.phone}
                    </a>
                    {oc.whatsapp && (
                      <a
                        href={`https://wa.me/${oc.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-wa-btn"
                      >
                        <MessageSquare size={13} /> WhatsApp
                      </a>
                    )}
                    {selectedEvent.ocMembers.length > 1 && (
                      <button
                        type="button"
                        className="button button-outline small"
                        style={{ padding: '6px 10px', marginLeft: 'auto', color: '#b91c1c' }}
                        onClick={() => handleRemoveOcMember(oc.id)}
                        title="Remove OC member"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: CREATE HIKING EVENT WITH LOCATION, TIME, AND VENUE */}
        {/* ========================================================================= */}
        {subView === 'create' && (
          <div className="studio-section">
            <div className="studio-header-block">
              <span className="eyebrow">Admin Event Creation</span>
              <h2>Schedule a New Hiking Event</h2>
              <p>
                Configure the event details including gathering venue, destination location, departure time, capacity,
                and preliminary candidate trail paths.
              </p>
            </div>

            <form className="event-create-form" onSubmit={handleCreateEvent}>
              <div className="form-card-panel">
                <h3>1. Event Details</h3>
                <div className="form-row">
                  <label className="field">
                    <span>Event Title</span>
                    <div>
                      <Navigation size={18} />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Hanthana Seven Peaks Expedition"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>Event Category</span>
                    <div>
                      <Compass size={18} />
                      <select value={kind} onChange={(e) => setKind(e.target.value as EventKind)}>
                        <option value="Day hike">Day hike</option>
                        <option value="Weekend trek">Weekend trek</option>
                        <option value="Nature walk">Nature walk</option>
                      </select>
                    </div>
                  </label>
                </div>

                <label className="field">
                  <span>Description & Objectives</span>
                  <div style={{ padding: '8px 14px' }}>
                    <textarea
                      required
                      rows={3}
                      style={{
                        width: '100%',
                        border: 0,
                        background: 'transparent',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                      placeholder="Describe the adventure, scenery, trail characteristics and prerequisites..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </label>
              </div>

              {/* Gathering Venue, Location, Date and Time */}
              <div className="form-card-panel">
                <h3>2. Venue, Location & Scheduling (Required)</h3>

                <div className="form-row">
                  <label className="field">
                    <span>Gathering Venue (Departure Point)</span>
                    <div>
                      <MapPin size={18} />
                      <input
                        required
                        type="text"
                        placeholder="e.g. University of Moratuwa Main Gate / Katubedda"
                        value={gatheringVenue}
                        onChange={(e) => setGatheringVenue(e.target.value)}
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>Destination Location</span>
                    <div>
                      <MapPin size={18} />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Hanthana Mountain Range, Kandy District"
                        value={destinationLocation}
                        onChange={(e) => setDestinationLocation(e.target.value)}
                      />
                    </div>
                  </label>
                </div>

                <div className="form-row three-col">
                  <label className="field">
                    <span>Departure Date</span>
                    <div>
                      <CalendarDays size={18} />
                      <input
                        required
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>Reporting Time</span>
                    <div>
                      <Clock size={18} />
                      <input
                        required
                        type="text"
                        placeholder="e.g. 05:30 AM"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>Approx Distance</span>
                    <div>
                      <Sliders size={18} />
                      <input
                        required
                        type="text"
                        placeholder="e.g. 6.8 km"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                      />
                    </div>
                  </label>
                </div>

                <div className="form-row">
                  <label className="field">
                    <span>Trail Difficulty</span>
                    <div>
                      <Sliders size={18} />
                      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                        <option value="Beginner">Beginner (Mild gradient)</option>
                        <option value="Moderate">Moderate (Some steep climbs)</option>
                        <option value="Challenging">Challenging (Ropes / Scree)</option>
                      </select>
                    </div>
                  </label>

                  <label className="field">
                    <span>Participant Capacity</span>
                    <div>
                      <input
                        required
                        type="number"
                        min={10}
                        max={100}
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Candidate Paths for Route Selection */}
              <div className="form-card-panel">
                <h3>3. Candidate Hiking Paths for Evaluation</h3>
                <p className="muted" style={{ fontSize: '13px', margin: '-5px 0 16px' }}>
                  Provide initial trail options so the committee can compare and decide the best path.
                </p>

                <div className="form-row">
                  <label className="field">
                    <span>Candidate Route A (Primary Option)</span>
                    <div>
                      <Compass size={18} />
                      <input
                        required
                        type="text"
                        value={routeA_Name}
                        onChange={(e) => setRouteA_Name(e.target.value)}
                        placeholder="e.g. Ridge Crest & Summit Trail"
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>Candidate Route B (Alternative Valley / Forest Option)</span>
                    <div>
                      <Compass size={18} />
                      <input
                        required
                        type="text"
                        value={routeB_Name}
                        onChange={(e) => setRouteB_Name(e.target.value)}
                        placeholder="e.g. Forest Stream & Shaded Contour Route"
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Pre-Hike Emergency Setup Section */}
              <div className="form-card-panel">
                <h3>4. Pre-Expedition Emergency Roster (Configured Before Hiking Starts)</h3>
                <p className="muted" style={{ fontSize: '13px', margin: '-5px 0 16px' }}>
                  Assign the expedition main head, nearest hospital contacts, and lead first aid responder prior to trail departure.
                </p>

                <div className="form-row three-col">
                  <label className="field">
                    <span>Main Head of the Event</span>
                    <div>
                      <UserCheck size={18} />
                      <input
                        required
                        type="text"
                        value={mainHeadName}
                        onChange={(e) => setMainHeadName(e.target.value)}
                        placeholder="e.g. Dumindu Yasith"
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>Main Head Primary Phone</span>
                    <div>
                      <Phone size={18} />
                      <input
                        required
                        type="tel"
                        value={mainHeadPhone}
                        onChange={(e) => setMainHeadPhone(e.target.value)}
                        placeholder="e.g. 071 458 9201"
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>Main Head Student Reg / Role</span>
                    <div>
                      <input
                        type="text"
                        value={mainHeadRole}
                        onChange={(e) => setMainHeadRole(e.target.value)}
                        placeholder="e.g. Expedition Head & Navigator"
                      />
                    </div>
                  </label>
                </div>

                <div className="form-row three-col">
                  <label className="field">
                    <span>Nearest Hospital Name</span>
                    <div>
                      <Hospital size={18} />
                      <input
                        required
                        type="text"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        placeholder="e.g. Peradeniya Teaching Hospital"
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>Hospital Emergency Line</span>
                    <div>
                      <PhoneCall size={18} />
                      <input
                        required
                        type="tel"
                        value={hospitalPhone}
                        onChange={(e) => setHospitalPhone(e.target.value)}
                        placeholder="e.g. 081 238 8001 / 1990"
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>Distance to Hospital (km)</span>
                    <div>
                      <input
                        required
                        type="number"
                        step="0.1"
                        value={hospitalDistance}
                        onChange={(e) => setHospitalDistance(e.target.value)}
                        placeholder="e.g. 8.2"
                      />
                    </div>
                  </label>
                </div>

                <div className="form-row">
                  <label className="field">
                    <span>Hospital Physical Address</span>
                    <div>
                      <MapPin size={18} />
                      <input
                        required
                        type="text"
                        value={hospitalAddress}
                        onChange={(e) => setHospitalAddress(e.target.value)}
                        placeholder="e.g. Galaha Road, Peradeniya, Kandy"
                      />
                    </div>
                  </label>
                </div>

                <div className="form-row">
                  <label className="field">
                    <span>First Aid Lead Responder</span>
                    <div>
                      <HeartPulse size={18} />
                      <input
                        required
                        type="text"
                        value={firstAidLeadName}
                        onChange={(e) => setFirstAidLeadName(e.target.value)}
                        placeholder="e.g. Dr. Thilina Alwis (Certified First Responder)"
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>First Aid Lead Mobile</span>
                    <div>
                      <Phone size={18} />
                      <input
                        required
                        type="tel"
                        value={firstAidLeadPhone}
                        onChange={(e) => setFirstAidLeadPhone(e.target.value)}
                        placeholder="e.g. 077 912 3456"
                      />
                    </div>
                  </label>
                </div>

                <div className="form-row">
                  <label className="field">
                    <span>Primary OC Safety Marshall</span>
                    <div>
                      <Users size={18} />
                      <input
                        required
                        type="text"
                        value={ocLeadName}
                        onChange={(e) => setOcLeadName(e.target.value)}
                        placeholder="e.g. Kavindu Bandara"
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>OC Safety Marshall Mobile</span>
                    <div>
                      <Phone size={18} />
                      <input
                        required
                        type="tel"
                        value={ocLeadPhone}
                        onChange={(e) => setOcLeadPhone(e.target.value)}
                        placeholder="e.g. 075 321 8890"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-actions-row">
                <button type="submit" className="button button-pine">
                  <PlusCircle size={18} /> Create Event & Open Path Optimizer
                </button>
                <button
                  type="button"
                  className="button button-outline"
                  onClick={() => setSubView('calendar')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: ALL SCHEDULED EVENTS DIRECTORY */}
        {/* ========================================================================= */}
        {subView === 'list' && (
          <div className="studio-section">
            <div className="studio-header-row">
              <div>
                <span className="eyebrow">Event Operations</span>
                <h2>All Scheduled Club Hikes</h2>
                <p>Manage existing expeditions, check current routing decisions, and switch to live tracking.</p>
              </div>

              <button className="button button-pine" onClick={() => setSubView('create')}>
                <PlusCircle size={17} /> Schedule New Event
              </button>
            </div>

            <div className="events-mgmt-grid">
              {events.map((ev) => (
                <div key={ev.eventId} className="event-mgmt-card">
                  <div className="em-card-header">
                    <div>
                      <span className={`em-status-badge ${ev.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {ev.status}
                      </span>
                      <h3>{ev.title}</h3>
                    </div>
                    <span className="em-diff-tag">{ev.difficulty}</span>
                  </div>

                  <div className="em-details-list">
                    <div>
                      <CalendarDays size={14} />
                      <span>
                        {ev.date} at {ev.time}
                      </span>
                    </div>
                    <div>
                      <MapPin size={14} />
                      <span>
                        <strong>Venue:</strong> {ev.gatheringVenue}
                      </span>
                    </div>
                    <div>
                      <Compass size={14} />
                      <span>
                        <strong>Destination:</strong> {ev.destinationLocation}
                      </span>
                    </div>
                    <div>
                      <Sliders size={14} />
                      <span>
                        {ev.distance} • Capacity: {ev.enrolledCount} / {ev.capacity} hikers
                      </span>
                    </div>
                  </div>

                  <div className="em-card-footer">
                    <button
                      className="button button-pine small"
                      onClick={() => {
                        setSelectedEventId(ev.eventId);
                        setSubView('live-tracking');
                      }}
                    >
                      <Activity size={14} /> Live Google Map Tracking
                    </button>

                    <button
                      className="button button-outline small"
                      onClick={() => {
                        setSelectedEventId(ev.eventId);
                        setSubView('route-optimizer');
                      }}
                    >
                      <Compass size={14} /> Best Path Studio
                    </button>

                    <button
                      className="button button-outline small"
                      onClick={() => {
                        setSelectedEventId(ev.eventId);
                        setSubView('emergency-view');
                      }}
                    >
                      <ShieldAlert size={14} /> Emergency Dossier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
