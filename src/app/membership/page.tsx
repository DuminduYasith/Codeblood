import { PageHero } from '@/components/UI';
import MembershipManagement from '@/components/MembershipManagement';

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Mora Hiking Club / Membership System"
        title="Adventure is better together."
        description="Official membership management portal for the University of Moratuwa Mora Hiking Club. Manage your member credentials, annual and lifetime plans, and committee approvals."
        image="/images/team.jpg"
      />
      <MembershipManagement />
    </>
  );
}
