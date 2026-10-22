'use client';
import { useMemo,useState } from 'react';
import { EventCard } from '@/components/UI';
import { events, formatDate } from '@/lib/data';
import { ChevronLeft,ChevronRight,CalendarDays } from 'lucide-react';
const filters=['All experiences','Day hikes','Weekend treks','Beginner friendly'];
export default function EventsExplorer(){
 const [filter,setFilter]=useState('All experiences');
 const [month,setMonth]=useState(10); // November, 0-indexed
 const [selected,setSelected]=useState<string|null>(null);
 const filtered=useMemo(()=>events.filter(e=>filter==='All experiences'||(filter==='Day hikes'&&e.kind==='Day hike')||(filter==='Weekend treks'&&e.kind==='Weekend trek')||(filter==='Beginner friendly'&&e.difficulty==='Beginner')),[filter]);
 const firstDay=new Date(2026,month,1).getDay();const totalDays=new Date(2026,month+1,0).getDate();
 const cells=Array.from({length:Math.ceil((firstDay+totalDays)/7)*7},(_,i)=>i-firstDay+1);
 const selectedEvent=events.find(e=>e.date===selected);
 return <div className="shell section first-section">
  <div className="filter-bar">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={`chip ${filter===f?'selected':''}`} aria-pressed={filter===f}>{f}</button>)}<span className="muted filter-side">{filtered.length} upcoming adventures</span></div>
  <div className="cards-grid three">{filtered.map(e=><EventCard key={e.slug} event={e}/>)}</div>
  <section className="calendar-section" aria-label="Hiking events calendar"><div className="section-title"><div><div className="eyebrow">Events calendar</div><h2>Plan your next trail</h2><p>Official club schedule of upcoming day hikes, summits and expeditions.</p></div></div><div className="calendar-layout">
   <div className="calendar-panel"><div className="calendar-head"><button aria-label="Previous month" onClick={()=>{setMonth(Math.max(10,month-1));setSelected(null)}} disabled={month<=10} className="icon-button"><ChevronLeft size={19}/></button><strong>{new Date(2026,month,1).toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</strong><button aria-label="Next month" onClick={()=>{setMonth(Math.min(11,month+1));setSelected(null)}} disabled={month>=11} className="icon-button"><ChevronRight size={19}/></button></div><div className="calendar-grid">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d} className="weekday">{d}</div>)}{cells.map((day,i)=>{const iso=`2026-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;const has=events.some(e=>e.date===iso);return <button key={i} disabled={day<1||day>totalDays||!has} className={`calendar-date ${has?'has-event':''} ${selected===iso?'selected':''}`} onClick={()=>setSelected(iso)} aria-label={has?`View event on ${iso}`:undefined}>{day>0&&day<=totalDays?day:''}{has&&<span className="event-dot"/>}</button>})}</div></div>
   <div className="calendar-side"><div className="cal-icon"><CalendarDays size={23}/></div><h3>{selectedEvent?selectedEvent.name:'Upcoming events'}</h3><p>{selectedEvent?`${formatDate(selectedEvent.date)} · ${selectedEvent.location}`:'Select a highlighted date to view scheduled event details.'}</p><div className="calendar-list">{events.filter(e=>new Date(`${e.date}T12:00:00`).getMonth()===month).map(e=><button key={e.slug} onClick={()=>setSelected(e.date)} className={`calendar-list-row ${selected===e.date?'active':''}`}><span>{new Date(`${e.date}T12:00:00`).getDate()} {new Date(`${e.date}T12:00:00`).toLocaleDateString('en-GB',{month:'short'})}</span><strong>{e.name}</strong></button>)}</div></div>
  </div></section>
 </div>
}
