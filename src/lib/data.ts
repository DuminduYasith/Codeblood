export type Difficulty = 'Beginner' | 'Moderate' | 'Challenging';
export type HikingEvent = {
  slug: string;
  name: string;
  date: string;
  location: string;
  distance: string;
  difficulty: Difficulty;
  kind: 'Day hike' | 'Weekend trek' | 'Nature walk';
  description: string;
  cover: string;
};
export const events: HikingEvent[] = [
  { slug: 'riverston-nature-walk', name: 'Riverston Nature Walk', date: '2026-11-07', location: 'Matale', distance: '5 km', difficulty: 'Beginner', kind: 'Nature walk', description: 'Explore breathtaking highland scenery with the hiking community.', cover: '/images/ridge.jpg' },
  { slug: 'belihuloya-waterfall', name: 'Belihuloya Waterfall Trail', date: '2026-11-14', location: 'Belihuloya', distance: '6 km', difficulty: 'Beginner', kind: 'Nature walk', description: 'A refreshing day through green forests and waterfall landscapes.', cover: '/images/forest.jpg' },
  { slug: 'ella-rock-sunrise', name: 'Ella Rock Sunrise Trek', date: '2026-11-21', location: 'Ella', distance: '8.5 km', difficulty: 'Moderate', kind: 'Day hike', description: 'Experience the unforgettable sunrise and dramatic mountain ridges above Ella.', cover: '/images/sunrise.jpg' },
  { slug: 'hanthana-ridge', name: 'Hanthana Ridge Hike', date: '2026-12-05', location: 'Kandy', distance: '6.2 km', difficulty: 'Beginner', kind: 'Day hike', description: 'Follow a memorable ridge route with sweeping views of the hills.', cover: '/images/ridgeview.jpg' },
  { slug: 'liptons-seat', name: "Lipton's Seat Sunrise Walk", date: '2026-12-12', location: 'Haputale', distance: '4 km', difficulty: 'Beginner', kind: 'Nature walk', description: 'Enjoy an early morning walk through the misty highlands.', cover: '/images/summit.jpg' },
  { slug: 'knuckles-forest-trail', name: 'Knuckles Forest Trail', date: '2026-12-19', location: 'Matale', distance: '12 km', difficulty: 'Challenging', kind: 'Weekend trek', description: 'A full day among the extraordinary forests of the Knuckles region.', cover: '/images/team.jpg' },
];
export type MediaAlbum = {slug: string; name: string; date: string; count: number; members: number; cover: string; destination: string};
export const albums: MediaAlbum[] = [
 {slug:'gombaniya',name:'Gombaniya Ridge Hike',date:'2026-01-12',count:248,members:18,cover:'/images/ridge.jpg',destination:'Gombaniya'},
 {slug:'kotaganga',name:'Kotaganga Eli Hatha Trek',date:'2026-03-05',count:320,members:24,cover:'/images/forest.jpg',destination:'Kotaganga'},
 {slug:'kabaragala',name:'Kabaragala Exploration',date:'2026-05-17',count:189,members:16,cover:'/images/hiker.jpg',destination:'Kabaragala'},
 {slug:'rappelling',name:'Rappelling Adventure',date:'2026-09-28',count:412,members:32,cover:'/images/rapelling.jpg',destination:'Rappelling'},
];
export type GalleryPhoto = {id: number; src: string; alt: string; title: string; tag: string; event: string; photographer: string; quality: number};
export const gallery: GalleryPhoto[] = [
 {id:1,src:'/images/ridge.jpg',alt:'Hiker in a scenic mountain landscape',title:'Above the clouds',tag:'Landscape',event:'gombaniya',photographer:'Member A',quality:96},
 {id:2,src:'/images/forest.jpg',alt:'Misty forest at the trail',title:'Misty mountain trail',tag:'Misty trails',event:'kotaganga',photographer:'Member B',quality:87},
 {id:3,src:'/images/hiker.jpg',alt:'Hiker looking toward the mountains',title:'On the ridgeline',tag:'Landscape',event:'kabaragala',photographer:'Member C',quality:93},
 {id:4,src:'/images/rapelling.jpg',alt:'Club member rappelling along a cliff',title:'Into the adventure',tag:'Rappelling',event:'rappelling',photographer:'Member D',quality:92},
 {id:5,src:'/images/pinksky.jpg',alt:'Sunset across a distant mountain range',title:'Golden hour',tag:'Sunrise',event:'gombaniya',photographer:'Member E',quality:91},
 {id:6,src:'/images/camp.jpg',alt:'Outdoor camping scene',title:'Camping memories',tag:'Camping',event:'kotaganga',photographer:'Member F',quality:90},
 {id:7,src:'/images/team.jpg',alt:'Group of hikers in a lush forest',title:'Together on the trail',tag:'Team',event:'kotaganga',photographer:'Member G',quality:86},
 {id:8,src:'/images/cliff.jpg',alt:'Distant green mountain valleys',title:'Mountains forever',tag:'Landscape',event:'kabaragala',photographer:'Member H',quality:88},
 {id:9,src:'/images/summit.jpg',alt:'Hiker celebrating on a mountaintop',title:'The summit feeling',tag:'Landscape',event:'gombaniya',photographer:'Member I',quality:92},
 {id:10,src:'/images/rope.jpg',alt:'Hikers using climbing ropes',title:'Team adventure',tag:'Rappelling',event:'rappelling',photographer:'Member J',quality:84},
 {id:11,src:'/images/ridgeview.jpg',alt:'Wide hillside and blue sky',title:'Highland light',tag:'Landscape',event:'kabaragala',photographer:'Member K',quality:89},
 {id:12,src:'/images/sunrise.jpg',alt:'Sun rising over a mountain landscape',title:'Morning in the hills',tag:'Sunrise',event:'gombaniya',photographer:'Member L',quality:94},
 {id:13,src:'/images/rapelling2.jpg',alt:'Rappelling equipment and climber',title:'One step further',tag:'Rappelling',event:'rappelling',photographer:'Member M',quality:90},
];
export const leaderboard = [
 {name:'Nethmi Perera',events:12,actions:6,points:240},
 {name:'Dulanjana Silva',events:11,actions:5,points:225},
 {name:'Sanjana Fernando',events:10,actions:5,points:210},
 {name:'Tharindu Jayasuriya',events:9,actions:4,points:190},
 {name:'Ayeshi Rathnayake',events:8,actions:4,points:170},
];
export const formatDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'});
