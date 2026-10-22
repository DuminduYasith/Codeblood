'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  UsersRound,
  ShieldCheck,
  Crown,
  CalendarDays,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Bell,
  CreditCard,
  UserCheck,
  ArrowRight,
  Sparkles,
  Check,
  X,
  FileText,
  BadgeCheck,
  ExternalLink,
  History,
  Info,
} from 'lucide-react';
import {
  initialMembers,
  initialCategories,
  initialHistory,
  MemberRecord,
  MembershipStatus,
  MembershipHistoryItem,
} from '@/lib/membershipData';

type Tab = 'overview' | 'member' | 'admin' | 'categories' | 'history';

export default function MembershipManagement() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [members, setMembers] = useState<MemberRecord[]>(initialMembers);
  const [history, setHistory] = useState<MembershipHistoryItem[]>(initialHistory);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | MembershipStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [toast, setToast] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<MemberRecord | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = members.length;
    const active = members.filter((m) => m.status === 'Active').length;
    const pending = members.filter((m) => m.status === 'Pending').length;
    const expired = members.filter((m) => m.status === 'Expired').length;
    const lifetime = members.filter((m) => m.category === 'Undergraduate Lifetime').length;
    return { total, active, pending, expired, lifetime };
  }, [members]);

  // Filtered members for admin table
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchSearch =
        m.fullName.toLowerCase().includes(search.toLowerCase()) ||
        m.indexNumber.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.faculty.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || m.status === statusFilter;
      const matchCat = categoryFilter === 'All' || m.category === categoryFilter;
      return matchSearch && matchStatus && matchCat;
    });
  }, [members, search, statusFilter, categoryFilter]);

  // Action: Approve & Activate
  const handleApprove = (id: number) => {
    const target = members.find((m) => m.memberId === id);
    if (!target) return;

    setMembers((prev) =>
      prev.map((m) =>
        m.memberId === id
          ? {
              ...m,
              status: 'Active',
              feeStatus: 'Paid',
              paymentReference: m.paymentReference === 'PENDING_SLIP' ? 'VERIFIED-BY-ADMIN' : m.paymentReference,
            }
          : m
      )
    );

    const newAudit: MembershipHistoryItem = {
      historyId: Date.now(),
      memberId: target.memberId,
      memberName: target.fullName,
      previousStatus: target.status,
      newStatus: 'Active',
      changedBy: 'Admin (Committee Review)',
      changedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      reason: `Application approved and membership activated for ${target.indexNumber}.`,
    };
    setHistory((prev) => [newAudit, ...prev]);

    showToast(`✓ ${target.fullName} (${target.indexNumber}) has been approved and activated!`);
  };

  // Action: Send Expiry / Fee Reminder
  const handleSendReminder = (target: MemberRecord) => {
    const newAudit: MembershipHistoryItem = {
      historyId: Date.now(),
      memberId: target.memberId,
      memberName: target.fullName,
      previousStatus: target.status,
      newStatus: target.status,
      changedBy: 'FeeReminder Service',
      changedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      reason: `Automated fee / renewal reminder dispatched to ${target.email}.`,
    };
    setHistory((prev) => [newAudit, ...prev]);

    showToast(`🔔 Reminder dispatched to ${target.email} (${target.fullName})`);
  };

  return (
    <div className="membership-system">
      {/* Toast Alert */}
      {toast && (
        <div className="mm-toast" role="alert">
          <Sparkles size={16} />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} aria-label="Close notification">
            <X size={15} />
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="mm-tabs-wrapper">
        <div className="shell mm-tabs">
          <button
            className={`mm-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <ShieldCheck size={18} />
            <span>Plans & Eligibility</span>
          </button>
          <button
            className={`mm-tab-btn ${activeTab === 'member' ? 'active' : ''}`}
            onClick={() => setActiveTab('member')}
          >
            <BadgeCheck size={18} />
            <span>My Digital Member ID</span>
          </button>
          <button
            className={`mm-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            <UsersRound size={18} />
            <span>Committee Management</span>
            {stats.pending > 0 && <span className="mm-badge-count">{stats.pending}</span>}
          </button>
          <button
            className={`mm-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <FileText size={18} />
            <span>Category Rules</span>
          </button>
          <button
            className={`mm-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={18} />
            <span>Audit History</span>
          </button>
        </div>
      </div>

      <div className="shell mm-content">
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & PLANS */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="mm-section">
            <div className="mm-header-block">
              <span className="eyebrow">Official Club Membership</span>
              <h2>Choose your membership tier</h2>
              <p>
                Join the Mora Hiking Club at the University of Moratuwa. All active memberships grant access
                to certified expeditions, leadership trails, equipment rentals, and voting rights.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="mm-plans-grid">
              {/* Annual Plan */}
              <div className="mm-plan-card">
                <div className="mm-plan-header">
                  <div className="mm-plan-icon">
                    <CalendarDays size={24} />
                  </div>
                  <span className="mm-plan-tag">Renewable yearly</span>
                </div>
                <h3>Undergraduate Annual</h3>
                <div className="mm-price">
                  <strong>LKR 500</strong>
                  <span>/ academic year</span>
                </div>
                <p>Designed for undergraduate students who prefer yearly enrollment with the club.</p>
                <ul className="mm-plan-features">
                  <li>
                    <Check size={16} /> Free access to standard day hikes and orientation walks
                  </li>
                  <li>
                    <Check size={16} /> Member discount on safety gear & trail kits
                  </li>
                  <li>
                    <Check size={16} /> Digital Member ID Card with verified status
                  </li>
                  <li>
                    <Check size={16} /> Eligibility for photo competitions & badges
                  </li>
                  <li className="dimmed">
                    <X size={16} /> Requires yearly fee renewal & re-validation
                  </li>
                </ul>
                <Link href="/register" className="button button-outline block">
                  Select Annual Plan <ArrowRight size={16} />
                </Link>
              </div>

              {/* Lifetime Plan (Featured) */}
              <div className="mm-plan-card featured">
                <div className="mm-popular-badge">
                  <Crown size={14} /> Most Popular & Recommended
                </div>
                <div className="mm-plan-header">
                  <div className="mm-plan-icon highlighted">
                    <Crown size={24} />
                  </div>
                  <span className="mm-plan-tag highlight">One-Time Payment</span>
                </div>
                <h3>Undergraduate Lifetime</h3>
                <div className="mm-price">
                  <strong>LKR 1,500</strong>
                  <span>one-time fee</span>
                </div>
                <p>Permanent membership covering your entire university degree and lifetime alumni status.</p>
                <ul className="mm-plan-features">
                  <li>
                    <Check size={16} /> <strong>Permanent membership</strong> — no annual renewal required
                  </li>
                  <li>
                    <Check size={16} /> Priority registration for high-demand expeditions (Knuckles, Ella, Riverston)
                  </li>
                  <li>
                    <Check size={16} /> Official Mora Hiking Club member jersey patch & kit
                  </li>
                  <li>
                    <Check size={16} /> Full voting rights in the Annual General Meeting (AGM)
                  </li>
                  <li>
                    <Check size={16} /> Digital Gold Member ID with lifetime credential verification
                  </li>
                </ul>
                <Link href="/register" className="button button-neon block">
                  Join as Lifetime Member <ArrowRight size={16} />
                </Link>
              </div>

              {/* Alumni / Honorary */}
              <div className="mm-plan-card">
                <div className="mm-plan-header">
                  <div className="mm-plan-icon">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="mm-plan-tag">Special category</span>
                </div>
                <h3>Alumni & Staff</h3>
                <div className="mm-price">
                  <strong>LKR 1,000</strong>
                  <span>/ year</span>
                </div>
                <p>For past active committee members, alumni hikers, and university academic/support staff.</p>
                <ul className="mm-plan-features">
                  <li>
                    <Check size={16} /> Reconnect with the UoM outdoor community
                  </li>
                  <li>
                    <Check size={16} /> Mentor student leaders on expedition planning
                  </li>
                  <li>
                    <Check size={16} /> Access to annual reunion hikes & camping retreats
                  </li>
                  <li>
                    <Check size={16} /> Honorary mention on the club contributor board
                  </li>
                </ul>
                <Link href="/register" className="button button-outline block">
                  Register as Alumni <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Eligibility & Guidelines */}
            <div className="mm-guidelines-box">
              <div className="mm-guide-col">
                <h4>
                  <UserCheck size={20} /> Membership Eligibility
                </h4>
                <p>
                  To be approved as an active member, applicants must be registered students or staff of the
                  University of Moratuwa. Provide your student index number and official email upon registration.
                </p>
              </div>
              <div className="mm-guide-col">
                <h4>
                  <CreditCard size={20} /> Fee Obligation & Payment
                </h4>
                <p>
                  Payments can be made via bank transfer to the official Mora Hiking Club BOC Account (Account:
                  70451299, Katubedda Branch). Submit your transaction reference slip during or after signup for
                  committee approval.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MY DIGITAL MEMBER ID */}
        {/* ========================================================= */}
        {activeTab === 'member' && (
          <div className="mm-section">
            <div className="mm-split-member">
              {/* Digital Card Preview */}
              <div className="mm-card-container">
                <div className="mm-digital-card">
                  <div className="mm-card-top">
                    <div className="mm-card-logo">
                      <strong>MORA HIKING CLUB</strong>
                      <small>University of Moratuwa</small>
                    </div>
                    <span className="mm-status-pill active">
                      <span className="pulse-dot"></span> ACTIVE MEMBER
                    </span>
                  </div>

                  <div className="mm-card-body">
                    <div className="mm-card-avatar">DY</div>
                    <div className="mm-card-meta">
                      <h3>Dumindu Yasith</h3>
                      <p className="mm-card-index">Index: 210045B</p>
                      <p className="mm-card-faculty">Faculty of Information Technology</p>
                    </div>
                  </div>

                  <div className="mm-card-footer">
                    <div>
                      <span>Category</span>
                      <strong>Undergraduate Lifetime</strong>
                    </div>
                    <div>
                      <span>Validity</span>
                      <strong>Permanent (Lifetime)</strong>
                    </div>
                    <div className="mm-qr-simulator" title="QR Code verification credential">
                      <div className="qr-grid"></div>
                      <small>VERIFIED</small>
                    </div>
                  </div>
                </div>

                <div className="mm-card-actions">
                  <button
                    className="button button-pine small"
                    onClick={() => showToast('Digital Member Card downloaded as PDF/PNG!')}
                  >
                    <Download size={15} /> Download Digital ID Card
                  </button>
                  <Link href="/profile" className="button button-outline small">
                    Edit Profile Details
                  </Link>
                </div>
              </div>

              {/* Status and Fee Obligation Details */}
              <div className="mm-member-info-panel">
                <div className="eyebrow">Membership Record</div>
                <h3>Active Member Details</h3>

                <div className="mm-info-grid">
                  <div className="mm-info-item">
                    <span>Membership ID</span>
                    <strong>#MHC-2024-0101</strong>
                  </div>
                  <div className="mm-info-item">
                    <span>Membership Category</span>
                    <strong>Undergraduate Lifetime</strong>
                  </div>
                  <div className="mm-info-item">
                    <span>Start Date</span>
                    <strong>15 Feb 2024</strong>
                  </div>
                  <div className="mm-info-item">
                    <span>Expiry / Renewal</span>
                    <strong>Never (Lifetime Access)</strong>
                  </div>
                  <div className="mm-info-item">
                    <span>Fee Obligation Status</span>
                    <strong className="status-paid">✓ Paid in Full (LKR 1,500)</strong>
                  </div>
                  <div className="mm-info-item">
                    <span>Payment Reference</span>
                    <code>BOC-TXN-884920</code>
                  </div>
                  <div className="mm-info-item">
                    <span>Emergency Contact</span>
                    <strong>077 123 4567 (Parent)</strong>
                  </div>
                  <div className="mm-info-item">
                    <span>Hikes Participated</span>
                    <strong>6 certified trails</strong>
                  </div>
                </div>

                <div className="demo-notice">
                  <Info size={16} />
                  <span>
                    Your digital membership is active and synchronized with the committee registry. Show this card at
                    trail check-in points or equipment issue desks.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: COMMITTEE MANAGEMENT PORTAL (ADMIN VIEW) */}
        {/* ========================================================= */}
        {activeTab === 'admin' && (
          <div className="mm-section">
            <div className="mm-header-block">
              <span className="eyebrow">Committee Administration</span>
              <h2>Membership Registry & Application Review</h2>
              <p>
                Review incoming membership applications, assign categories, verify fee obligations, and dispatch
                reminders as defined in the system architecture.
              </p>
            </div>

            {/* Metrics */}
            <div className="mm-metrics-row">
              <div className="mm-metric-card">
                <span>Total Registrations</span>
                <h3>{stats.total}</h3>
                <small className="muted">All time members</small>
              </div>
              <div className="mm-metric-card active">
                <span>Active Members</span>
                <h3>{stats.active}</h3>
                <small className="text-forest">Verified & cleared</small>
              </div>
              <div className="mm-metric-card pending">
                <span>Pending Approvals</span>
                <h3>{stats.pending}</h3>
                <small className="text-amber">Requires committee action</small>
              </div>
              <div className="mm-metric-card expired">
                <span>Expired / Overdue</span>
                <h3>{stats.expired}</h3>
                <small className="text-red">Needs fee reminder</small>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mm-filter-bar">
              <div className="mm-search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search by name, student index, email or faculty..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button onClick={() => setSearch('')} aria-label="Clear search">
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="mm-chips-group">
                <span className="filter-label">Status:</span>
                {(['All', 'Active', 'Pending', 'Expired'] as const).map((s) => (
                  <button
                    key={s}
                    className={`chip ${statusFilter === s ? 'selected' : ''}`}
                    onClick={() => setStatusFilter(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mm-chips-group">
                <span className="filter-label">Category:</span>
                {['All', 'Undergraduate Annual', 'Undergraduate Lifetime', 'Alumni / Honorary'].map((c) => (
                  <button
                    key={c}
                    className={`chip ${categoryFilter === c ? 'selected' : ''}`}
                    onClick={() => setCategoryFilter(c)}
                  >
                    {c === 'All' ? 'All Plans' : c.replace('Undergraduate ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Members Table */}
            <div className="mm-table-wrapper">
              <table className="mm-table">
                <thead>
                  <tr>
                    <th>Member Details</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Fee Obligation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="mm-empty-row">
                        No members matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((m) => (
                      <tr key={m.memberId} className={m.status === 'Pending' ? 'row-pending' : ''}>
                        <td>
                          <div className="mm-member-cell">
                            <div className="mm-avatar-circle">{m.fullName.charAt(0)}</div>
                            <div>
                              <strong>{m.fullName}</strong>
                              <div className="mm-submeta">
                                <span>{m.indexNumber}</span> • <span>{m.faculty}</span>
                              </div>
                              <small className="muted">{m.email} • {m.phone}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`mm-cat-badge ${m.category.includes('Lifetime') ? 'lifetime' : 'annual'}`}>
                            {m.category.includes('Lifetime') ? <Crown size={12} /> : <CalendarDays size={12} />}
                            {m.category}
                          </span>
                        </td>
                        <td>
                          <span className={`mm-status-badge ${m.status.toLowerCase()}`}>
                            {m.status === 'Active' && <CheckCircle2 size={13} />}
                            {m.status === 'Pending' && <Clock size={13} />}
                            {m.status === 'Expired' && <AlertTriangle size={13} />}
                            {m.status}
                          </span>
                        </td>
                        <td>
                          <div className="mm-fee-cell">
                            <strong>LKR {m.feeAmount}</strong>
                            <span className={`mm-fee-tag ${m.feeStatus.toLowerCase()}`}>{m.feeStatus}</span>
                            <small className="muted font-mono">{m.paymentReference}</small>
                          </div>
                        </td>
                        <td>
                          <div className="mm-actions-cell">
                            {m.status === 'Pending' && (
                              <button
                                className="button button-pine mini"
                                onClick={() => handleApprove(m.memberId)}
                                title="Approve application and activate membership"
                              >
                                <Check size={14} /> Approve
                              </button>
                            )}

                            {(m.status === 'Expired' || m.feeStatus === 'Pending') && (
                              <button
                                className="button button-outline mini"
                                onClick={() => handleSendReminder(m)}
                                title="Send email & notification reminder"
                              >
                                <Bell size={13} /> Reminder
                              </button>
                            )}

                            <button
                              className="button button-white mini"
                              onClick={() => setSelectedMember(m)}
                              title="View full record details"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: CATEGORY RULES (CLASS DIAGRAM MembershipCategory) */}
        {/* ========================================================= */}
        {activeTab === 'categories' && (
          <div className="mm-section">
            <div className="mm-header-block">
              <span className="eyebrow">Data Model & Architecture</span>
              <h2>MembershipCategory Configuration</h2>
              <p>
                Reflects the business rules defined in the system's class diagram for category classification,
                fee amounts, renewal frequency, and eligibility rules.
              </p>
            </div>

            <div className="mm-category-cards">
              {initialCategories.map((cat) => (
                <div key={cat.categoryId} className="mm-category-card">
                  <div className="mm-cat-header">
                    <span className="cat-id">ID: #{cat.categoryId}</span>
                    <span className="cat-type">{cat.durationType} Membership</span>
                  </div>
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>

                  <div className="mm-cat-props">
                    <div>
                      <span>Fee Rule</span>
                      <strong>{cat.feeRule} (LKR {cat.amount})</strong>
                    </div>
                    <div>
                      <span>Requires Renewal</span>
                      <strong>{cat.requiresRenewal ? 'Yes (Yearly)' : 'No (Lifetime)'}</strong>
                    </div>
                    <div>
                      <span>Eligibility Criteria</span>
                      <p>{cat.eligibilityRules}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: AUDIT HISTORY (CLASS DIAGRAM MembershipHistory) */}
        {/* ========================================================= */}
        {activeTab === 'history' && (
          <div className="mm-section">
            <div className="mm-header-block">
              <span className="eyebrow">Audit & Traceability</span>
              <h2>MembershipHistory & Dispatch Log</h2>
              <p>
                Immutable record of membership status updates, approvals, category assignments, and automated fee
                reminders dispatched by the system.
              </p>
            </div>

            <div className="mm-history-list">
              {history.map((h) => (
                <div key={h.historyId} className="mm-history-card">
                  <div className="mm-history-header">
                    <div>
                      <strong>{h.memberName}</strong>
                      <span className="muted"> (Member #{h.memberId})</span>
                    </div>
                    <span className="history-time">{h.changedAt}</span>
                  </div>

                  <div className="mm-history-status-change">
                    <span className="badge-old">{h.previousStatus}</span>
                    <ArrowRight size={14} />
                    <span className="badge-new">{h.newStatus}</span>
                    <span className="changed-by">by {h.changedBy}</span>
                  </div>

                  <p className="history-reason">{h.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="mm-modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mm-modal-header">
              <h3>Member Record #{selectedMember.memberId}</h3>
              <button onClick={() => setSelectedMember(null)} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
            <div className="mm-modal-body">
              <div className="mm-modal-meta">
                <div className="mm-avatar-large">{selectedMember.fullName.charAt(0)}</div>
                <div>
                  <h4>{selectedMember.fullName}</h4>
                  <p className="muted">{selectedMember.email} • {selectedMember.phone}</p>
                  <span className={`mm-status-badge ${selectedMember.status.toLowerCase()}`}>
                    {selectedMember.status}
                  </span>
                </div>
              </div>

              <div className="mm-info-grid modal-grid">
                <div className="mm-info-item">
                  <span>Student Index</span>
                  <strong>{selectedMember.indexNumber}</strong>
                </div>
                <div className="mm-info-item">
                  <span>Faculty</span>
                  <strong>{selectedMember.faculty}</strong>
                </div>
                <div className="mm-info-item">
                  <span>Membership Category</span>
                  <strong>{selectedMember.category}</strong>
                </div>
                <div className="mm-info-item">
                  <span>Fee Obligation</span>
                  <strong>LKR {selectedMember.feeAmount} ({selectedMember.feeStatus})</strong>
                </div>
                <div className="mm-info-item">
                  <span>Payment Slip Ref</span>
                  <code>{selectedMember.paymentReference}</code>
                </div>
                <div className="mm-info-item">
                  <span>Emergency Contact</span>
                  <strong>{selectedMember.emergencyContact}</strong>
                </div>
                <div className="mm-info-item">
                  <span>Joined Date</span>
                  <strong>{selectedMember.joinedDate}</strong>
                </div>
                <div className="mm-info-item">
                  <span>Certified Hikes Completed</span>
                  <strong>{selectedMember.hikesCompleted} trails</strong>
                </div>
              </div>

              <div className="mm-modal-footer">
                {selectedMember.status === 'Pending' && (
                  <button
                    className="button button-pine small"
                    onClick={() => {
                      handleApprove(selectedMember.memberId);
                      setSelectedMember(null);
                    }}
                  >
                    <Check size={15} /> Approve & Activate Application
                  </button>
                )}
                <button
                  className="button button-outline small"
                  onClick={() => {
                    handleSendReminder(selectedMember);
                    setSelectedMember(null);
                  }}
                >
                  <Bell size={15} /> Send Reminder
                </button>
                <button className="button button-white small" onClick={() => setSelectedMember(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
