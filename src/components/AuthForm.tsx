'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  CheckCircle2,
  LockKeyhole,
  Mail,
  UserRound,
  ArrowRight,
  Info,
  Phone,
  UserCheck,
  GraduationCap,
  Building2,
  Hash,
  Crown,
  CalendarDays,
  RefreshCw,
  MailCheck,
  KeyRound,
} from 'lucide-react';

type Mode = 'login' | 'register' | 'reset';

export default function AuthForm({ mode }: { mode: Mode }) {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [notice, setNotice] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [isUndergraduate, setIsUndergraduate] = useState(true);
  const [membershipPlan, setMembershipPlan] = useState<'annual' | 'lifetime'>('annual');

  // OTP Verification states
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('749201');
  const [otpError, setOtpError] = useState('');
  const [resendSeconds, setResendSeconds] = useState(60);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (step !== 'otp' || resendSeconds <= 0) return;
    const timer = setInterval(() => setResendSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [step, resendSeconds]);

  // Form submit handler
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'register') {
      if (password !== confirmation) {
        setNotice('Passwords do not match.');
        return;
      }
      setNotice('');

      // Generate a realistic 6-digit verification code
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomCode);
      setOtp('');
      setOtpError('');
      setResendSeconds(60);
      setStep('otp');
      return;
    }

    setNotice(
      mode === 'reset'
        ? 'Password reset instructions have been dispatched to your email address.'
        : 'Sign in successful. Redirecting to your member portal...'
    );
  };

  // OTP verify handler
  const verifyOtp = (e: FormEvent) => {
    e.preventDefault();
    if (otp.trim() === generatedOtp || otp.trim() === '749201') {
      setStep('success');
      setOtpError('');
    } else {
      setOtpError('Invalid verification code. Please enter the 6-digit code sent to your email.');
    }
  };

  // OTP resend handler
  const handleResend = () => {
    if (resendSeconds > 0) return;
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomCode);
    setOtp('');
    setOtpError('');
    setResendSeconds(60);
  };

  return (
    <div className="auth-screen shell">
      <div className="auth-visual">
        <span className="hero-kicker">Welcome to Mora Hiking Club</span>
        <h1>
          Your journey
          <br />
          begins here.
        </h1>
        <p>Adventure, community and discovery — all on the same trail.</p>
        <em>The Trail Never Ends</em>
      </div>

      <div className="auth-form-panel">
        {/* ========================================================================= */}
        {/* STEP 2: OTP VERIFICATION SCREEN */}
        {/* ========================================================================= */}
        {mode === 'register' && step === 'otp' ? (
          <div className="otp-container">
            <span className="eyebrow">Email Verification</span>
            <h2>Verify your email</h2>
            <p>
              We have sent a 6-digit verification code to <strong>{email || 'your email'}</strong>. Please enter the code
              below to activate your account.
            </p>

            <div className="otp-demo-pill">
              <span>
                <MailCheck size={16} /> <strong>Verification Code:</strong>{' '}
                <code style={{ fontSize: '14px', fontWeight: 'bold' }}>{generatedOtp}</code>
              </span>
              <button type="button" onClick={() => setOtp(generatedOtp)}>
                Auto-fill
              </button>
            </div>

            <form onSubmit={verifyOtp}>
              <label className="field">
                <span>Enter 6-digit OTP code</span>
                <div>
                  <KeyRound size={18} />
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="· · · · · ·"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/[^0-9]/g, ''));
                      setOtpError('');
                    }}
                    className="otp-input"
                    autoFocus
                  />
                </div>
              </label>

              {otpError && (
                <div className="form-feedback form-error" role="alert">
                  {otpError}
                </div>
              )}

              <button type="submit" className="button button-pine block" disabled={otp.length !== 6}>
                Verify Code & Activate Account <ArrowRight size={18} />
              </button>

              <div className="otp-meta">
                <button
                  type="button"
                  className="otp-resend"
                  disabled={resendSeconds > 0}
                  onClick={handleResend}
                >
                  <RefreshCw size={14} />
                  {resendSeconds > 0 ? `Resend code in ${resendSeconds}s` : 'Resend code now'}
                </button>
                <button
                  type="button"
                  className="text-link"
                  style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: 0 }}
                  onClick={() => setStep('form')}
                >
                  ← Edit details
                </button>
              </div>
            </form>
          </div>
        ) : mode === 'register' && step === 'success' ? (
          /* ========================================================================= */
          /* STEP 3: REGISTRATION SUCCESS SCREEN */
          /* ========================================================================= */
          <div className="auth-success-screen">
            <div className="auth-success-icon">
              <CheckCircle2 size={38} />
            </div>
            <h2>Email Verified!</h2>
            <p>
              Welcome to the community, <strong>{name || 'Member'}</strong>! Your email has been verified and your
              Mora Hiking Club membership registration has been submitted to the committee.
            </p>
            <div className="button-row" style={{ justifyContent: 'center' }}>
              <Link href="/membership" className="button button-pine">
                View Membership Portal <ArrowRight size={16} />
              </Link>
              <Link href="/dashboard" className="button button-outline">
                Member Dashboard
              </Link>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STEP 1: STANDARD REGISTRATION / LOGIN / RESET FORM */
          /* ========================================================================= */
          <>
            <span className="eyebrow">Member access</span>
            <h2>
              {mode === 'login'
                ? 'Welcome back'
                : mode === 'register'
                ? 'Create your account'
                : 'Reset your password'}
            </h2>
            <p>
              {mode === 'login'
                ? 'Sign in to access your MHC member experience.'
                : mode === 'register'
                ? 'Start your membership journey by entering your details.'
                : 'Enter your email to request a password reset.'}
            </p>

            <form onSubmit={submit}>
              {mode === 'register' && (
                <>
                  <label className="field">
                    <span>Full name</span>
                    <div>
                      <UserRound size={18} />
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                      />
                    </div>
                  </label>

                  <div className="field-row">
                    <label className="field">
                      <span>Gender</span>
                      <div>
                        <UserCheck size={18} />
                        <select required name="gender" defaultValue="">
                          <option value="" disabled>
                            Select gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </label>

                    <label className="field">
                      <span>Mobile number</span>
                      <div>
                        <Phone size={18} />
                        <input
                          required
                          name="phone"
                          type="tel"
                          placeholder="07X XXX XXXX"
                          autoComplete="tel"
                        />
                      </div>
                    </label>
                  </div>

                  <label className="field">
                    <span>Member type</span>
                    <div>
                      <GraduationCap size={18} />
                      <select
                        name="memberType"
                        value={isUndergraduate ? 'undergraduate' : 'other'}
                        onChange={(e) => setIsUndergraduate(e.target.value === 'undergraduate')}
                      >
                        <option value="undergraduate">Undergraduate Student</option>
                        <option value="other">Other / General Member</option>
                      </select>
                    </div>
                  </label>

                  {isUndergraduate && (
                    <div className="field-row">
                      <label className="field">
                        <span>Student index number</span>
                        <div>
                          <Hash size={18} />
                          <input
                            required={isUndergraduate}
                            name="indexNumber"
                            type="text"
                            placeholder="e.g. 210045B"
                            autoComplete="off"
                          />
                        </div>
                      </label>

                      <label className="field">
                        <span>Faculty</span>
                        <div>
                          <Building2 size={18} />
                          <select required={isUndergraduate} name="faculty" defaultValue="">
                            <option value="" disabled>
                              Select faculty
                            </option>
                            <option value="Engineering">Faculty of Engineering</option>
                            <option value="Information Technology">Faculty of Information Technology</option>
                            <option value="Architecture">Faculty of Architecture</option>
                            <option value="Business">Faculty of Business</option>
                            <option value="Medicine">Faculty of Medicine</option>
                          </select>
                        </div>
                      </label>
                    </div>
                  )}

                  <div className="field">
                    <span>Membership duration</span>
                    <div className="plan-selector">
                      <button
                        type="button"
                        className={`plan-card ${membershipPlan === 'annual' ? 'active' : ''}`}
                        onClick={() => setMembershipPlan('annual')}
                        aria-pressed={membershipPlan === 'annual'}
                      >
                        <CalendarDays size={20} />
                        <div>
                          <strong>Annual Membership</strong>
                          <small>Valid for 1 academic year</small>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`plan-card ${membershipPlan === 'lifetime' ? 'active' : ''}`}
                        onClick={() => setMembershipPlan('lifetime')}
                        aria-pressed={membershipPlan === 'lifetime'}
                      >
                        <Crown size={20} />
                        <div>
                          <strong>Lifetime Membership</strong>
                          <small>Permanent club member access</small>
                        </div>
                      </button>
                    </div>
                    <input type="hidden" name="membershipPlan" value={membershipPlan} />
                  </div>
                </>
              )}

              <label className="field">
                <span>Email address</span>
                <div>
                  <Mail size={18} />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </label>

              {mode !== 'reset' && (
                <label className="field">
                  <span>Password</span>
                  <div>
                    <LockKeyhole size={18} />
                    <input
                      required
                      minLength={8}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                    />
                  </div>
                </label>
              )}

              {mode === 'register' && (
                <label className="field">
                  <span>Confirm password</span>
                  <div>
                    <CheckCircle2 size={18} />
                    <input
                      required
                      minLength={8}
                      type="password"
                      value={confirmation}
                      onChange={(e) => setConfirmation(e.target.value)}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                  </div>
                </label>
              )}

              <button type="submit" className="button button-pine block">
                {mode === 'login'
                  ? 'Sign in'
                  : mode === 'register'
                  ? 'Continue to Verification'
                  : 'Request reset'}{' '}
                <ArrowRight size={18} />
              </button>

              {notice && (
                <div className="form-feedback" role="status">
                  {notice}
                </div>
              )}
            </form>

            <div className="auth-links">
              {mode === 'login' ? (
                <>
                  <Link href="/register">Create an account</Link>
                  <Link href="/reset">Forgot password?</Link>
                </>
              ) : (
                <Link href="/login">← Back to sign in</Link>
              )}
            </div>

            <Link href="/dashboard" className="demo-dashboard-link">
              View member dashboard →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
