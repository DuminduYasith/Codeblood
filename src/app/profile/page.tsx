import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageNotice } from '@/components/UI';
import ProfileForm from '@/components/ProfileForm';
export default function ProfilePage(){return <div className="shell section"><Link className="back-link" href="/dashboard"><ArrowLeft size={17}/> Dashboard</Link><div className="eyebrow">Member area</div><h1>My profile</h1><p className="page-desc">Manage the public member details that appear in your experience.</p><PageNotice>Sample member profile. Saving needs authentication and FastAPI endpoints.</PageNotice><ProfileForm/></div>}
