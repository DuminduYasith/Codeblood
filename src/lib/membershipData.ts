export type MembershipStatus = 'Active' | 'Pending' | 'Expired' | 'Suspended';
export type DurationType = 'Annual' | 'Lifetime';
export type FeeStatus = 'Paid' | 'Pending' | 'Overdue';

export interface MembershipCategory {
  categoryId: number;
  name: string;
  description: string;
  feeRule: string;
  amount: number;
  durationType: DurationType;
  durationValue: number; // in years (0 for lifetime)
  requiresRenewal: boolean;
  eligibilityRules: string;
}

export interface MemberRecord {
  memberId: number;
  fullName: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  indexNumber: string;
  faculty: string;
  category: 'Undergraduate Annual' | 'Undergraduate Lifetime' | 'Alumni / Honorary';
  status: MembershipStatus;
  startDate: string;
  endDate: string;
  feeStatus: FeeStatus;
  feeAmount: number;
  paymentReference: string;
  emergencyContact: string;
  joinedDate: string;
  hikesCompleted: number;
}

export interface MembershipHistoryItem {
  historyId: number;
  memberId: number;
  memberName: string;
  previousStatus: string;
  newStatus: string;
  changedBy: string;
  changedAt: string;
  reason: string;
}

export const initialCategories: MembershipCategory[] = [
  {
    categoryId: 1,
    name: 'Undergraduate Annual',
    description: 'Yearly membership for enrolled University of Moratuwa students.',
    feeRule: 'LKR 500 per academic year',
    amount: 500,
    durationType: 'Annual',
    durationValue: 1,
    requiresRenewal: true,
    eligibilityRules: 'Enrolled undergraduate at UoM with active student registration.',
  },
  {
    categoryId: 2,
    name: 'Undergraduate Lifetime',
    description: 'Full lifetime membership covering entire degree duration and alumni status.',
    feeRule: 'LKR 1,500 one-time fee',
    amount: 1500,
    durationType: 'Lifetime',
    durationValue: 0,
    requiresRenewal: false,
    eligibilityRules: 'Enrolled undergraduate or graduate of University of Moratuwa.',
  },
  {
    categoryId: 3,
    name: 'Alumni / Honorary',
    description: 'Special club membership for past committee members and university staff.',
    feeRule: 'LKR 1,000 annual contribution',
    amount: 1000,
    durationType: 'Annual',
    durationValue: 1,
    requiresRenewal: true,
    eligibilityRules: 'Former active members or University of Moratuwa academic/support staff.',
  },
];

export const initialMembers: MemberRecord[] = [
  {
    memberId: 101,
    fullName: 'Dumindu Yasith',
    email: 'duminduyasiths@gmail.com',
    phone: '071 458 9201',
    gender: 'Male',
    indexNumber: '210045B',
    faculty: 'Faculty of Information Technology',
    category: 'Undergraduate Lifetime',
    status: 'Active',
    startDate: '2024-02-15',
    endDate: 'Permanent',
    feeStatus: 'Paid',
    feeAmount: 1500,
    paymentReference: 'BOC-TXN-884920',
    emergencyContact: '077 123 4567 (Parent)',
    joinedDate: '2024-02-15',
    hikesCompleted: 6,
  },
  {
    memberId: 102,
    fullName: 'Nethmi Perera',
    email: 'nethmi.p@uom.lk',
    phone: '077 234 5678',
    gender: 'Female',
    indexNumber: '200112C',
    faculty: 'Faculty of Engineering',
    category: 'Undergraduate Annual',
    status: 'Active',
    startDate: '2025-11-01',
    endDate: '2026-10-31',
    feeStatus: 'Paid',
    feeAmount: 500,
    paymentReference: 'COMM-TXN-492102',
    emergencyContact: '071 998 1234 (Brother)',
    joinedDate: '2023-01-10',
    hikesCompleted: 12,
  },
  {
    memberId: 103,
    fullName: 'Dulanjana Silva',
    email: 'dulanjana.s@uom.lk',
    phone: '070 345 6789',
    gender: 'Male',
    indexNumber: '210589T',
    faculty: 'Faculty of Information Technology',
    category: 'Undergraduate Lifetime',
    status: 'Active',
    startDate: '2024-03-20',
    endDate: 'Permanent',
    feeStatus: 'Paid',
    feeAmount: 1500,
    paymentReference: 'HNB-ONLINE-591024',
    emergencyContact: '077 654 3210 (Mother)',
    joinedDate: '2024-03-20',
    hikesCompleted: 11,
  },
  {
    memberId: 104,
    fullName: 'Kavindu Senanayake',
    email: 'kavindu.sen@uom.lk',
    phone: '076 892 1104',
    gender: 'Male',
    indexNumber: '220311D',
    faculty: 'Faculty of Engineering',
    category: 'Undergraduate Annual',
    status: 'Pending',
    startDate: '2026-10-20',
    endDate: '2027-10-19',
    feeStatus: 'Pending',
    feeAmount: 500,
    paymentReference: 'PENDING_SLIP',
    emergencyContact: '071 445 9922 (Father)',
    joinedDate: '2026-10-20',
    hikesCompleted: 0,
  },
  {
    memberId: 105,
    fullName: 'Ayeshi Rathnayake',
    email: 'ayeshi.rath@uom.lk',
    phone: '075 991 2345',
    gender: 'Female',
    indexNumber: '200422F',
    faculty: 'Faculty of Architecture',
    category: 'Undergraduate Annual',
    status: 'Active',
    startDate: '2025-11-15',
    endDate: '2026-11-14',
    feeStatus: 'Paid',
    feeAmount: 500,
    paymentReference: 'BOC-TXN-110294',
    emergencyContact: '077 882 1144 (Guardian)',
    joinedDate: '2023-08-01',
    hikesCompleted: 8,
  },
  {
    memberId: 106,
    fullName: 'Tharindu Jayasuriya',
    email: 'tharindu.j@uom.lk',
    phone: '078 123 9081',
    gender: 'Male',
    indexNumber: '210190K',
    faculty: 'Faculty of Business',
    category: 'Undergraduate Annual',
    status: 'Expired',
    startDate: '2024-09-01',
    endDate: '2025-08-31',
    feeStatus: 'Overdue',
    feeAmount: 500,
    paymentReference: 'RENEWAL_REQUIRED',
    emergencyContact: '072 334 5566 (Sister)',
    joinedDate: '2023-09-01',
    hikesCompleted: 9,
  },
  {
    memberId: 107,
    fullName: 'Chalani Wijesinghe',
    email: 'chalani.w@uom.lk',
    phone: '071 889 0012',
    gender: 'Female',
    indexNumber: '220914L',
    faculty: 'Faculty of Medicine',
    category: 'Undergraduate Lifetime',
    status: 'Pending',
    startDate: '2026-10-21',
    endDate: 'Permanent',
    feeStatus: 'Paid',
    feeAmount: 1500,
    paymentReference: 'PEOPLES-APP-902341',
    emergencyContact: '076 554 2211 (Mother)',
    joinedDate: '2026-10-21',
    hikesCompleted: 1,
  },
  {
    memberId: 108,
    fullName: 'Dr. Rohan Mendis',
    email: 'rohan.mendis@mora.ac.lk',
    phone: '077 334 1122',
    gender: 'Male',
    indexNumber: 'STAFF-042',
    faculty: 'Faculty of Engineering',
    category: 'Alumni / Honorary',
    status: 'Active',
    startDate: '2025-01-01',
    endDate: '2026-12-31',
    feeStatus: 'Paid',
    feeAmount: 1000,
    paymentReference: 'SALARY_DEDUCTION',
    emergencyContact: '011 265 0301 (Staff Office)',
    joinedDate: '2022-01-01',
    hikesCompleted: 15,
  },
];

export const initialHistory: MembershipHistoryItem[] = [
  {
    historyId: 501,
    memberId: 101,
    memberName: 'Dumindu Yasith',
    previousStatus: 'Pending',
    newStatus: 'Active',
    changedBy: 'Membership Secretary',
    changedAt: '2024-02-15 14:30',
    reason: 'Verified student index 210045B and lifetime payment BOC-TXN-884920',
  },
  {
    historyId: 502,
    memberId: 106,
    memberName: 'Tharindu Jayasuriya',
    previousStatus: 'Active',
    newStatus: 'Expired',
    changedBy: 'ReminderScheduler Service',
    changedAt: '2025-09-01 00:00',
    reason: 'Annual membership expired after 1 academic year. Renewal fee overdue.',
  },
  {
    historyId: 503,
    memberId: 102,
    memberName: 'Nethmi Perera',
    previousStatus: 'Pending',
    newStatus: 'Active',
    changedBy: 'President MHC',
    changedAt: '2025-11-01 10:15',
    reason: 'Annual renewal approved.',
  },
];
