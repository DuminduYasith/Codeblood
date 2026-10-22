'use client';
import { useRef,useState } from 'react';
import { UploadCloud,CheckCircle2,Image as PhotoIcon,X,AlertCircle } from 'lucide-react';
import { albums } from '@/lib/data';
type AcceptedPhoto={name:string;url:string;size:number;dimensions:string};
const MAX_SIZE=10*1024*1024;
const MIN_WIDTH=1200,MIN_HEIGHT=800;
export default function PhotoUpload(){
 const ref=useRef<HTMLInputElement>(null);
 const [event,setEvent]=useState(albums[0].slug);
 const [photos,setPhotos]=useState<AcceptedPhoto[]>([]);
 const [messages,setMessages]=useState<string[]>([]);
 const onFiles=async(files:FileList|null)=>{
  if(!files)return;
  const accepted:AcceptedPhoto[]=[];const errors:string[]=[];
  for(const file of Array.from(files)){
   if(!['image/jpeg','image/png','image/webp'].includes(file.type)){errors.push(`${file.name}: JPG, PNG or WebP required.`);continue;}
   if(file.size>MAX_SIZE){errors.push(`${file.name}: maximum size is 10 MB.`);continue;}
   const url=URL.createObjectURL(file);
   const dim=await new Promise<{width:number;height:number}|null>(resolve=>{const image=new window.Image();image.onload=()=>resolve({width:image.naturalWidth,height:image.naturalHeight});image.onerror=()=>resolve(null);image.src=url;});
   if(!dim||dim.width<MIN_WIDTH||dim.height<MIN_HEIGHT){errors.push(`${file.name}: minimum 1200×800 px.`);URL.revokeObjectURL(url);continue;}
   accepted.push({name:file.name,url,size:file.size,dimensions:`${dim.width}×${dim.height}`});
  }
  setPhotos(prev=>[...prev,...accepted]);setMessages(errors);
  if(ref.current)ref.current.value='';
 };
 const remove=(index:number)=>{setPhotos(prev=>{URL.revokeObjectURL(prev[index].url);return prev.filter((_,i)=>i!==index);})};
 return <section className="upload-workspace" id="upload"><div className="upload-text"><span className="upload-symbol"><UploadCloud size={25}/></span><div className="eyebrow soft-eyebrow">Member photo upload</div><h2>Share your next adventure.</h2><p>Add photos to the right hiking album, check image requirements, and manage your contributions — all in one place.</p><label htmlFor="upload-event">Choose an event</label><select id="upload-event" value={event} onChange={e=>setEvent(e.target.value)}>{albums.map(a=><option key={a.slug} value={a.slug}>{a.name}</option>)}</select><input type="file" ref={ref} accept="image/jpeg,image/png,image/webp" multiple hidden onChange={e=>void onFiles(e.target.files)}/><div className="button-row"><button type="button" className="button button-neon" onClick={()=>ref.current?.click()}><UploadCloud size={17}/> Select photos</button><a href="#gallery" className="button button-outline-light">Browse gallery</a></div><small className="upload-rules"><CheckCircle2 size={14}/> JPG, PNG, WebP <span>·</span> Min 1200×800 px <span>·</span> Max 10 MB each</small></div>
 <div className="upload-illustration"><div className="upload-mosaic"><img src="/images/summit.jpg" alt="Hiker standing on a highland summit"/><img src="/images/ridge.jpg" alt="Mountain ridgeline"/><img src="/images/sunrise.jpg" alt="Sunrise landscape"/></div><span className="upload-caption"><PhotoIcon size={16}/> Your event memories, organized</span></div>
 {(messages.length>0||photos.length>0)&&<div className="upload-output"><div className="eyebrow soft-eyebrow">Selected Photos</div>{messages.map((m,i)=><p className="upload-error" key={i}><AlertCircle size={15}/>{m}</p>)}{photos.length>0&&<><p className="upload-success"><CheckCircle2 size={16}/> {photos.length} valid image(s) ready for submission.</p><div className="upload-thumbs">{photos.map((p,i)=><div className="upload-thumb" key={`${p.url}-${i}`}><img src={p.url} alt={p.name}/><button onClick={()=>remove(i)} aria-label={`Remove ${p.name}`}><X size={14}/></button><span>{p.name} · {p.dimensions}</span></div>)}</div></>}</div>}
 </section>
}
