'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2,LockKeyhole,Mail,UserRound,ArrowRight,Info,Phone,UserCheck,GraduationCap,Building2,Hash,Crown,CalendarDays } from 'lucide-react';
type Mode='login'|'register'|'reset';
export default function AuthForm({mode}:{mode:Mode}){
 const [notice,setNotice]=useState('');const [password,setPassword]=useState('');const [confirmation,setConfirmation]=useState('');
 const [isUndergraduate,setIsUndergraduate]=useState(true);
 const [membershipPlan,setMembershipPlan]=useState<'annual'|'lifetime'>('annual');
 const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();if(mode==='register'&&password!==confirmation){setNotice('Passwords do not match.');return;}setNotice(mode==='register'?'The registration form is ready for FastAPI integration. No personal data was stored.':mode==='reset'?'Password reset needs a FastAPI endpoint. No reset email has been sent.':'This is a frontend preview. No session was created; connect FastAPI authentication to enable sign in.');};
 return <div className="auth-screen shell"><div className="auth-visual"><span className="hero-kicker">Welcome to Mora Hiking Club</span><h1>Your journey<br/>begins here.</h1><p>Adventure, community and discovery — all on the same trail.</p><em>The Trail Never Ends</em></div><div className="auth-form-panel"><span className="eyebrow">Member access</span><h2>{mode==='login'?'Welcome back':mode==='register'?'Create your account':'Reset your password'}</h2><p>{mode==='login'?'Sign in to access your MHC member experience.':mode==='register'?'Start your membership journey by entering your details.':'Enter your email to request a password reset.'}</p><div className="demo-notice"><Info size={16}/> Frontend demo only — not connected to FastAPI authentication.</div><form onSubmit={submit}>
  {mode==='register'&&(
   <>
    <label className="field"><span>Full name</span><div><UserRound size={18}/><input required name="name" type="text" placeholder="Enter your full name" autoComplete="name"/></div></label>
    <div className="field-row">
     <label className="field"><span>Gender</span><div><UserCheck size={18}/><select required name="gender" defaultValue=""><option value="" disabled>Select gender</option><option value="male">Male</option><option value="female">Female</option></select></div></label>
     <label className="field"><span>Mobile number</span><div><Phone size={18}/><input required name="phone" type="tel" placeholder="07X XXX XXXX" autoComplete="tel"/></div></label>
    </div>
    <label className="field"><span>Member type</span><div><GraduationCap size={18}/><select name="memberType" value={isUndergraduate?'undergraduate':'other'} onChange={e=>setIsUndergraduate(e.target.value==='undergraduate')}><option value="undergraduate">Undergraduate Student</option><option value="other">Other / General Member</option></select></div></label>
    {isUndergraduate&&(
     <div className="field-row">
      <label className="field"><span>Student index number</span><div><Hash size={18}/><input required={isUndergraduate} name="indexNumber" type="text" placeholder="e.g. 210045B" autoComplete="off"/></div></label>
      <label className="field"><span>Faculty</span><div><Building2 size={18}/><select required={isUndergraduate} name="faculty" defaultValue=""><option value="" disabled>Select faculty</option><option value="Engineering">Faculty of Engineering</option><option value="Information Technology">Faculty of Information Technology</option><option value="Architecture">Faculty of Architecture</option><option value="Business">Faculty of Business</option><option value="Medicine">Faculty of Medicine</option></select></div></label>
     </div>
    )}
    <div className="field">
     <span>Membership duration</span>
     <div className="plan-selector">
      <button
       type="button"
       className={`plan-card ${membershipPlan==='annual'?'active':''}`}
       onClick={()=>setMembershipPlan('annual')}
       aria-pressed={membershipPlan==='annual'}
      >
       <CalendarDays size={20}/>
       <div>
        <strong>Annual Membership</strong>
        <small>Valid for 1 academic year</small>
       </div>
      </button>
      <button
       type="button"
       className={`plan-card ${membershipPlan==='lifetime'?'active':''}`}
       onClick={()=>setMembershipPlan('lifetime')}
       aria-pressed={membershipPlan==='lifetime'}
      >
       <Crown size={20}/>
       <div>
        <strong>Lifetime Membership</strong>
        <small>Permanent club member access</small>
       </div>
      </button>
     </div>
     <input type="hidden" name="membershipPlan" value={membershipPlan}/>
    </div>
   </>
  )}
  <label className="field"><span>{mode==='register'?'University email address':'Email address'}</span><div><Mail size={18}/><input required name="email" type="email" placeholder="name@example.com" autoComplete="email"/></div></label>
  {mode!=='reset'&&<label className="field"><span>Password</span><div><LockKeyhole size={18}/><input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete={mode==='register'?'new-password':'current-password'}/></div></label>}
  {mode==='register'&&<label className="field"><span>Confirm password</span><div><CheckCircle2 size={18}/><input required minLength={8} type="password" value={confirmation} onChange={e=>setConfirmation(e.target.value)} placeholder="Confirm your password" autoComplete="new-password"/></div></label>}
  <button type="submit" className="button button-pine block">{mode==='login'?'Sign in':mode==='register'?'Create account':'Request reset'} <ArrowRight size={18}/></button>
  {notice&&<div className="form-feedback" role="status">{notice}</div>}
 </form><div className="auth-links">{mode==='login'?<><Link href="/register">Create an account</Link><Link href="/reset">Forgot password?</Link></>:<Link href="/login">← Back to sign in</Link>}</div><Link href="/dashboard" className="demo-dashboard-link">View sample member dashboard →</Link></div></div>
}
