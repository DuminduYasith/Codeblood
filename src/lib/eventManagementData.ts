export type Difficulty = 'Beginner' | 'Moderate' | 'Challenging';
export type EventKind = 'Day hike' | 'Weekend trek' | 'Nature walk';
export type EventStatus = 'Scheduled' | 'Live on Trail' | 'Completed' | 'Draft';

export interface RouteWaypoint {
  name: string;
  lat: number;
  lng: number;
  elevation: number;
  order: number;
}

export interface RouteOption {
  routeId: number;
  name: string;
  trailCode: string;
  distanceKm: number;
  elevationGainM: number;
  estimatedDuration: string;
  terrainType: string;
  difficulty: Difficulty;
  safetyScore: number; // 0 - 100
  scenicRating: number; // 1 - 5
  description: string;
  waterSources: boolean;
  isRecommended: boolean;
  waypoints: RouteWaypoint[];
  hazards: string[];
}

export interface CheckpointStatus {
  id: number;
  title: string;
  venue: string;
  scheduledTime: string;
  actualTime?: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  lat: number;
  lng: number;
}

export interface LiveTrackingState {
  currentLat: number;
  currentLng: number;
  currentAltitude: number;
  progressPercentage: number;
  speedKmH: number;
  hikerCountOnTrail: number;
  safetyStatus: 'Normal (Safe)' | 'Weather Watch' | 'Emergency Alert';
  lastCheckInTime: string;
  activeCheckpointIndex: number;
  checkpoints: CheckpointStatus[];
  routeCoordinates: Array<[number, number]>;
}

export interface EventContactPerson {
  contactId: number;
  name: string;
  role: string;
  phone: string;
  responsibility: string;
}

export interface HospitalContactInfo {
  hospitalId: number;
  name: string;
  phone: string;
  emergencyHotline?: string;
  address: string;
  distanceKm: number;
  traumaCareAvailable?: boolean;
}

export interface MainHeadContact {
  name: string;
  role: string;
  phone: string;
  alternatePhone: string;
  universityId: string;
  bloodGroup: string;
  email: string;
}

export interface OCMemberContact {
  id: number;
  name: string;
  role: string;
  phone: string;
  whatsapp?: string;
  responsibility: string;
}

export interface FirstAidCommitteeContact {
  id: number;
  name: string;
  qualification: string;
  phone: string;
  assignedKitNumber: string;
  priorityDuty: string;
}

export interface PreHikeClearance {
  isClearedBeforeHike: boolean;
  hospitalNotified: boolean;
  firstAidKitsInspected: boolean;
  ocBriefingCompleted: boolean;
  emergencyRadioChecked: boolean;
  clearedByAdminName: string;
  clearedAtTimestamp: string;
}

export interface ManagedHikingEvent {
  eventId: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  gatheringVenue: string;
  destinationLocation: string;
  distance: string;
  difficulty: Difficulty;
  kind: EventKind;
  capacity: number;
  enrolledCount: number;
  cover: string;
  status: EventStatus;
  selectedRouteId: number;
  routes: RouteOption[];
  tracking: LiveTrackingState;
  contacts: EventContactPerson[];
  hospital: HospitalContactInfo;
  mainHead: MainHeadContact;
  ocMembers: OCMemberContact[];
  firstAidCommittee: FirstAidCommitteeContact[];
  preHikeClearance: PreHikeClearance;
}

export const initialManagedEvents: ManagedHikingEvent[] = [
  {
    eventId: 1,
    slug: 'riverston-nature-walk',
    title: 'Riverston Gap & Mini World’s End',
    description: 'Traverse the misty highland ridge with panoramic views of the Knuckles conservation range and Theldeniya valley.',
    date: '2026-11-07',
    time: '05:30 AM',
    gatheringVenue: 'University of Moratuwa (Main Gate / Bus Bay)',
    destinationLocation: 'Riverston Gap, Matale District',
    distance: '5.2 km',
    difficulty: 'Beginner',
    kind: 'Nature walk',
    capacity: 40,
    enrolledCount: 36,
    cover: '/images/ridge.jpg',
    status: 'Live on Trail',
    selectedRouteId: 101,
    routes: [
      {
        routeId: 101,
        name: 'Ridge View & Mini World’s End (Recommended)',
        trailCode: 'RIV-RIDGE-01',
        distanceKm: 5.2,
        elevationGainM: 340,
        estimatedDuration: '3.5 Hours',
        terrainType: 'Paved trail & highland grass ridge',
        difficulty: 'Beginner',
        safetyScore: 95,
        scenicRating: 4.9,
        description: 'Optimal safety and scenery ratio. Well-marked trail, safe for mixed fitness levels with low wind exposure along the lower spur.',
        waterSources: true,
        isRecommended: true,
        hazards: ['Gusty mountain wind at summit', 'Afternoon fog reduces visibility'],
        waypoints: [
          { name: 'Riverston Base Trailhead', lat: 7.5284, lng: 80.7317, elevation: 1100, order: 1 },
          { name: 'Pine Forest Rest Point', lat: 7.5312, lng: 80.7351, elevation: 1220, order: 2 },
          { name: 'Telecommunication Tower Spur', lat: 7.5345, lng: 80.7388, elevation: 1360, order: 3 },
          { name: 'Mini World’s End Cliff Lookout', lat: 7.5381, lng: 80.7424, elevation: 1424, order: 4 },
        ],
      },
      {
        routeId: 102,
        name: 'Pitawala Pathana & Sera Ella Water Trail',
        trailCode: 'RIV-PATHANA-02',
        distanceKm: 7.8,
        elevationGainM: 520,
        estimatedDuration: '5.0 Hours',
        terrainType: 'Pygmy forest and rocky riverbeds',
        difficulty: 'Moderate',
        safetyScore: 82,
        scenicRating: 4.7,
        description: 'More demanding descent into the river valley with slippery rock sections near waterfall crossings.',
        waterSources: true,
        isRecommended: false,
        hazards: ['Slippery wet granite', 'Leeches during rainy spells'],
        waypoints: [
          { name: 'Pitawala Pathana Gate', lat: 7.545, lng: 80.749, elevation: 980, order: 1 },
          { name: 'Rock Canyon Crossing', lat: 7.551, lng: 80.755, elevation: 840, order: 2 },
          { name: 'Sera Ella Waterfall Cave', lat: 7.558, lng: 80.761, elevation: 760, order: 3 },
        ],
      },
      {
        routeId: 103,
        name: 'Direct Scramble Incline',
        trailCode: 'RIV-DIRECT-03',
        distanceKm: 3.9,
        elevationGainM: 490,
        estimatedDuration: '2.5 Hours',
        terrainType: 'Steep scree slope & scrub',
        difficulty: 'Challenging',
        safetyScore: 68,
        scenicRating: 4.2,
        description: 'High gradient climb with loose gravel. Prone to erosion and requires ropes on wet days.',
        waterSources: false,
        isRecommended: false,
        hazards: ['Loose rockfall risk', 'Steep drop-offs without safety railings'],
        waypoints: [
          { name: 'South Slope Trailhead', lat: 7.525, lng: 80.734, elevation: 1050, order: 1 },
          { name: 'Scree Gully', lat: 7.531, lng: 80.739, elevation: 1290, order: 2 },
          { name: 'Ridge Peak', lat: 7.538, lng: 80.742, elevation: 1424, order: 3 },
        ],
      },
    ],
    tracking: {
      currentLat: 7.5345,
      currentLng: 80.7388,
      currentAltitude: 1360,
      progressPercentage: 65,
      speedKmH: 2.8,
      hikerCountOnTrail: 36,
      safetyStatus: 'Normal (Safe)',
      lastCheckInTime: '09:42 AM',
      activeCheckpointIndex: 2,
      checkpoints: [
        {
          id: 1,
          title: 'Departure & Roll Call',
          venue: 'UoM Main Gate',
          scheduledTime: '05:30 AM',
          actualTime: '05:40 AM',
          status: 'Completed',
          lat: 6.7969,
          lng: 79.9018,
        },
        {
          id: 2,
          title: 'Trailhead Arrival & Briefing',
          venue: 'Riverston Base Camp',
          scheduledTime: '08:15 AM',
          actualTime: '08:20 AM',
          status: 'Completed',
          lat: 7.5284,
          lng: 80.7317,
        },
        {
          id: 3,
          title: 'Tower Spur Waypoint Check-In',
          venue: 'Elevation 1,360m Checkpoint',
          scheduledTime: '09:40 AM',
          actualTime: '09:42 AM',
          status: 'In Progress',
          lat: 7.5345,
          lng: 80.7388,
        },
        {
          id: 4,
          title: 'Mini World’s End Summit Reached',
          venue: 'Observation Cliff',
          scheduledTime: '11:00 AM',
          status: 'Pending',
          lat: 7.5381,
          lng: 80.7424,
        },
        {
          id: 5,
          title: 'Descent & Return Assembly',
          venue: 'Matale Rest Pavilion',
          scheduledTime: '02:30 PM',
          status: 'Pending',
          lat: 7.5284,
          lng: 80.7317,
        },
      ],
      routeCoordinates: [
        [7.5284, 80.7317],
        [7.5298, 80.7332],
        [7.5312, 80.7351],
        [7.5329, 80.7369],
        [7.5345, 80.7388],
        [7.5362, 80.7405],
        [7.5381, 80.7424],
      ],
    },
    contacts: [
      {
        contactId: 1,
        name: 'Nethmi Perera',
        role: 'Expedition Head',
        phone: '077 234 5678',
        responsibility: 'Group lead, trail navigation, safety decisions',
      },
      {
        contactId: 2,
        name: 'Dumindu Yasith',
        role: 'Deputy Coordinator',
        phone: '071 458 9201',
        responsibility: 'GPS tracking, check-in log, emergency radio',
      },
    ],
    mainHead: {
      name: 'Nethmi Perera',
      role: 'Expedition Head & Lead Mountain Navigator',
      phone: '077 234 5678',
      alternatePhone: '071 889 4432',
      universityId: 'EN214902 - Dept. of Mechanical Eng.',
      bloodGroup: 'O+ (Positive)',
      email: 'nethmi.perera@uom.lk',
    },
    ocMembers: [
      {
        id: 1,
        name: 'Dumindu Yasith',
        role: 'Safety Marshall & Live GPS Coordinator',
        phone: '071 458 9201',
        whatsapp: '+94714589201',
        responsibility: 'Live GPS telemetry, emergency VHF channel monitoring, checkpoint logs',
      },
      {
        id: 2,
        name: 'Kavindu Bandara',
        role: 'Logistics & Transport Marshall',
        phone: '075 321 8890',
        whatsapp: '+94753218890',
        responsibility: 'Bus transit coordinator, emergency extraction vehicle driver liaison',
      },
      {
        id: 3,
        name: 'Sanduni Weerasinghe',
        role: 'Roll-Call & Hiker Welfare In-Charge',
        phone: '076 991 2234',
        whatsapp: '+94769912234',
        responsibility: 'Hiker registration roster, emergency medical form verification',
      },
      {
        id: 4,
        name: 'Tharusha Senaratne',
        role: 'Rear Guard (Tail-Sweep Marshall)',
        phone: '078 114 7720',
        whatsapp: '+94781147720',
        responsibility: 'Tail patrol, ensuring buddy system adherence, rear group pacing',
      },
    ],
    firstAidCommittee: [
      {
        id: 1,
        name: 'Dr. Thilina Alwis (Medical Liaison)',
        qualification: 'St. John Ambulance Certified First Responder (Level 3)',
        phone: '077 912 3456',
        assignedKitNumber: 'MHC-TRAUMA-KIT-01',
        priorityDuty: 'Primary triage, anaphylaxis (EpiPen), fracture stabilization & oxygen pack',
      },
      {
        id: 2,
        name: 'Minoli Jayasuriya',
        qualification: 'Red Cross Certified Wilderness First Aider',
        phone: '071 678 1234',
        assignedKitNumber: 'MHC-FIRST-AID-KIT-02',
        priorityDuty: 'Dehydration, heat exhaustion, wound dressings & anti-leech repellent',
      },
    ],
    hospital: {
      hospitalId: 1,
      name: 'Matale District Base Hospital',
      phone: '066 222 2261',
      emergencyHotline: '066 222 2265 (Casualty Unit) / 1990 (Suwa Seriya)',
      address: 'Trincomalee Street, Matale',
      distanceKm: 28.5,
      traumaCareAvailable: true,
    },
    preHikeClearance: {
      isClearedBeforeHike: true,
      hospitalNotified: true,
      firstAidKitsInspected: true,
      ocBriefingCompleted: true,
      emergencyRadioChecked: true,
      clearedByAdminName: 'MHC Safety Committee (Dumindu Yasith)',
      clearedAtTimestamp: '2026-11-06 06:00 PM (Verified Before Hike)',
    },
  },
  {
    eventId: 2,
    slug: 'ella-rock-sunrise',
    title: 'Ella Rock Sunrise Trek',
    description: 'Ascend through tea estates and eucalyptus forest to witness sunrise over the southern plains.',
    date: '2026-11-21',
    time: '04:15 AM',
    gatheringVenue: 'Ella Railway Station Platform 1',
    destinationLocation: 'Ella Rock Summit, Badulla District',
    distance: '8.5 km',
    difficulty: 'Moderate',
    kind: 'Day hike',
    capacity: 35,
    enrolledCount: 30,
    cover: '/images/sunrise.jpg',
    status: 'Scheduled',
    selectedRouteId: 201,
    routes: [
      {
        routeId: 201,
        name: 'Railway Track & Waterfall Bridge Route (Recommended)',
        trailCode: 'ELL-RAIL-01',
        distanceKm: 8.5,
        elevationGainM: 580,
        estimatedDuration: '4.5 Hours',
        terrainType: 'Railway ballast, tea footpaths, forest rocks',
        difficulty: 'Moderate',
        safetyScore: 91,
        scenicRating: 5.0,
        description: 'Classic route crossing Kithal Ella iron bridge and gradual eucalyptus forest ascent.',
        waterSources: true,
        isRecommended: true,
        hazards: ['Active train track section (walk on shoulder)', 'Steep root climb before summit'],
        waypoints: [
          { name: 'Ella Railway Station', lat: 6.8687, lng: 81.0469, elevation: 1041, order: 1 },
          { name: 'Kithal Ella Waterfall Bridge', lat: 6.8612, lng: 81.0442, elevation: 1060, order: 2 },
          { name: 'Tea Plantation Fork', lat: 6.8588, lng: 81.0458, elevation: 1140, order: 3 },
          { name: 'Ella Rock Summit Lookout', lat: 6.8569, lng: 81.0478, elevation: 1320, order: 4 },
        ],
      },
      {
        routeId: 202,
        name: 'Ravana Valley Ravine Trail',
        trailCode: 'ELL-RAV-02',
        distanceKm: 10.2,
        elevationGainM: 710,
        estimatedDuration: '6.0 Hours',
        terrainType: 'Dense scrub & rocky valley stream',
        difficulty: 'Challenging',
        safetyScore: 74,
        scenicRating: 4.6,
        description: 'Longer wilderness path passing ancient cave openings with heavy boulder hopping.',
        waterSources: true,
        isRecommended: false,
        hazards: ['Flash rain water swells', 'Dense thorny undergrowth'],
        waypoints: [
          { name: 'Ravana Temple Base', lat: 6.854, lng: 81.052, elevation: 920, order: 1 },
          { name: 'Cave Valley Plateau', lat: 6.855, lng: 81.049, elevation: 1180, order: 2 },
          { name: 'Ella Rock Peak', lat: 6.8569, lng: 81.0478, elevation: 1320, order: 3 },
        ],
      },
    ],
    tracking: {
      currentLat: 6.8687,
      currentLng: 81.0469,
      currentAltitude: 1041,
      progressPercentage: 0,
      speedKmH: 0,
      hikerCountOnTrail: 30,
      safetyStatus: 'Normal (Safe)',
      lastCheckInTime: 'Scheduled (Not started)',
      activeCheckpointIndex: 0,
      checkpoints: [
        {
          id: 1,
          title: 'Station Gathering & Roll Call',
          venue: 'Ella Railway Station',
          scheduledTime: '04:15 AM',
          status: 'Pending',
          lat: 6.8687,
          lng: 81.0469,
        },
        {
          id: 2,
          title: 'Kithal Ella Bridge Crossing',
          venue: 'Railway Milepost 166',
          scheduledTime: '05:00 AM',
          status: 'Pending',
          lat: 6.8612,
          lng: 81.0442,
        },
        {
          id: 3,
          title: 'Summit Sunrise Point',
          venue: 'Ella Rock Cliff',
          scheduledTime: '06:15 AM',
          status: 'Pending',
          lat: 6.8569,
          lng: 81.0478,
        },
      ],
      routeCoordinates: [
        [6.8687, 81.0469],
        [6.865, 81.0455],
        [6.8612, 81.0442],
        [6.8588, 81.0458],
        [6.8569, 81.0478],
      ],
    },
    contacts: [
      {
        contactId: 1,
        name: 'Dulanjana Silva',
        role: 'Expedition Head',
        phone: '070 345 6789',
        responsibility: 'Trail Leader & Navigation',
      },
    ],
    mainHead: {
      name: 'Dulanjana Silva',
      role: 'Expedition Head & Lead Mountain Guide',
      phone: '070 345 6789',
      alternatePhone: '072 445 1190',
      universityId: 'EN203118 - Dept. of Civil Eng.',
      bloodGroup: 'B+ (Positive)',
      email: 'dulanjana.silva@uom.lk',
    },
    ocMembers: [
      {
        id: 1,
        name: 'Rashmika Fernando',
        role: 'Railway Safety Marshall & Trail Guide',
        phone: '071 889 0012',
        whatsapp: '+94718890012',
        responsibility: 'Railway track corridor safety, headlight equipment checks',
      },
      {
        id: 2,
        name: 'Akindu Perera',
        role: 'Logistics & Radio Communication Lead',
        phone: '077 554 9912',
        whatsapp: '+94775549912',
        responsibility: 'Emergency radio relay with Ella Police Post, backup lighting gear',
      },
      {
        id: 3,
        name: 'Sachini Wickramasinghe',
        role: 'Hiker Welfare & Tail-Sweep Marshall',
        phone: '076 332 1198',
        whatsapp: '+94763321198',
        responsibility: 'Tail patrol, hiker pacing, ensuring buddy system adherence',
      },
    ],
    firstAidCommittee: [
      {
        id: 1,
        name: 'Charith Disanayake',
        qualification: 'St. John Ambulance Certified First Responder (Level 2)',
        phone: '077 881 2233',
        assignedKitNumber: 'MHC-TRAUMA-KIT-03',
        priorityDuty: 'Night hike slip/fall trauma, joint immobilization, emergency evacuation coordination',
      },
    ],
    hospital: {
      hospitalId: 2,
      name: 'Badulla Provincial General Hospital',
      phone: '055 222 2261',
      emergencyHotline: '055 222 2264 (Emergency Unit) / 1990 (Suwa Seriya)',
      address: 'Hospital Road, Badulla',
      distanceKm: 21.0,
      traumaCareAvailable: true,
    },
    preHikeClearance: {
      isClearedBeforeHike: true,
      hospitalNotified: true,
      firstAidKitsInspected: true,
      ocBriefingCompleted: true,
      emergencyRadioChecked: true,
      clearedByAdminName: 'MHC Safety Committee (Dulanjana Silva)',
      clearedAtTimestamp: '2026-11-20 07:30 PM (Verified Before Hike)',
    },
  },
];
