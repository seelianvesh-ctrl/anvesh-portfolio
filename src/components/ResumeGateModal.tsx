import { useState, useEffect } from 'react';

const BLOCKED_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
  'icloud.com', 'me.com', 'mac.com', 'aol.com', 'protonmail.com',
  'mail.com', 'ymail.com', 'fastmail.com', 'zoho.com',
  'yandex.com', 'gmx.com', 'gmx.net',
  'rediffmail.com', 'indiatimes.com', 'sify.com',
  'proton.me', 'hey.com',
];

interface ResumeGateModalProps {
  resumeUrl: string;
  onSuccess?: () => void;
}

export default function ResumeGateModal({ resumeUrl = '/resume.pdf', onSuccess }: ResumeGateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [purpose, setPurpose] = useState('');
  const [callback, setCallback] = useState(false);
  const [phone, setPhone] = useState('');

  const isPersonalEmail = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    if (BLOCKED_DOMAINS.includes(domain)) return true;
    if (domain.endsWith('.edu') || domain.includes('.ac.')) return true;
    return false;
  };

  useEffect(() => {
    (window as any).openResumeGate = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };
    return () => { delete (window as any).openResumeGate; };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setIsSuccess(false);
    setEmailError('');
    document.body.style.overflow = '';
  };

  const handleEmailBlur = () => {
    if (email && isPersonalEmail(email)) setEmailError('Please use your work email address');
    else setEmailError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPersonalEmail(email)) { setEmailError('Please use your work email address'); return; }
    setIsLoading(true);

    const formData = { email, company, role, purpose, callback, phone: callback ? phone : '', timestamp: new Date().toISOString() };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwpNYpDCo1TCypkcPVRsiHtYhnHDO19ZSc5OIQrOZEyd2D9h5GUBDd61QHSTmPufBnrFw/exec', {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });

      setIsSuccess(true);
      onSuccess?.();
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Anvesh_Seeli_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
    } catch (error) { console.error('Error:', error); setIsLoading(false); }
  };

  if (!isOpen) return null;

  const inputCls = "w-full border border-hairline bg-paper px-3.5 py-3 font-body text-[0.92rem] text-ink placeholder:text-[#8d8071] transition-colors duration-200 focus:border-terracotta focus:outline-none";
  const labelCls = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-ink";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto p-4 py-10"
      style={{ background: 'rgba(31,27,23,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
      role="dialog"
      aria-modal="true"
      aria-label="Get My Resume"
    >
      <div className="relative w-full max-w-md border border-hairline bg-cream px-7 py-8 md:px-9" style={{ boxShadow: '0 30px 70px rgba(31,27,23,0.3)' }}>
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center text-muted-ink transition-colors hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-hairline" style={{ background: 'rgba(178,74,46,0.08)' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#B24A2E" strokeWidth="1.25"><polyline points="20,6 9,17 4,12"/></svg>
            </div>
            <h3 className="font-serif text-2xl font-medium text-ink mb-2">You&apos;re all set!</h3>
            <p className="font-body text-[0.95rem] text-muted-ink mb-7">Your resume is downloading now.</p>
            <button onClick={closeModal} className="bg-ink px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream transition-colors hover:bg-terracotta cursor-pointer">Close</button>
          </div>
        ) : (
          <>
            <div className="mb-7 border-b border-hairline pb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-terracotta">Resume</p>
              <h2 className="mt-3 font-serif text-[1.7rem] font-medium leading-tight text-ink">Get My Resume</h2>
              <p className="mt-2 font-body text-[0.92rem] text-muted-ink">Share your details to access the full resume</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelCls} htmlFor="resume-gate-email">Work Email <span className="text-terracotta">*</span></label>
                <input id="resume-gate-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} onBlur={handleEmailBlur} placeholder="you@company.com" required className={inputCls} style={{ borderColor: emailError ? '#B24A2E' : undefined }}/>
                {emailError && <p className="mt-1.5 font-body text-xs text-terracotta">{emailError}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="resume-gate-company">Company <span className="text-terracotta">*</span></label>
                <input id="resume-gate-company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your organization" required className={inputCls}/>
              </div>
              <div>
                <label className={labelCls} htmlFor="resume-gate-role">I&apos;m reaching out as a...</label>
                <div className="relative">
                  <select id="resume-gate-role" value={role} onChange={(e) => setRole(e.target.value)} className={inputCls + " cursor-pointer appearance-none pr-10"}>
                    <option value="">Select your role</option>
                    <option value="founder">Founder / CEO</option>
                    <option value="marketing">Marketing Leader</option>
                    <option value="growth">Growth / Product Lead</option>
                    <option value="hr">HR / Talent</option>
                    <option value="media">Media / Agency</option>
                    <option value="investor">Investor</option>
                    <option value="other">Other</option>
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C5248" strokeWidth="1.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div>
                <label className={labelCls} htmlFor="resume-gate-purpose">What brings you here?</label>
                <div className="relative">
                  <select id="resume-gate-purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} className={inputCls + " cursor-pointer appearance-none pr-10"}>
                    <option value="">Select one (optional)</option>
                    <option value="consulting">Consulting / Advisory</option>
                    <option value="hire">Hiring for a role</option>
                    <option value="audit">Marketing audit</option>
                    <option value="collab">Collaboration</option>
                    <option value="curious">Just exploring</option>
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C5248" strokeWidth="1.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div>
                <label className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" checked={callback} onChange={(e) => setCallback(e.target.checked)} className="sr-only"/>
                  <span
                    className="flex h-[18px] w-[18px] items-center justify-center border transition-colors duration-200"
                    style={{ borderColor: callback ? '#B24A2E' : '#C9BCA8', background: callback ? '#B24A2E' : 'transparent' }}
                  >
                    {callback && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F7F3EC" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>}
                  </span>
                  <span className="font-body text-[0.9rem] text-muted-ink">I&apos;d like a callback to discuss further</span>
                </label>
              </div>
              {callback && (
                <div>
                  <label className={labelCls} htmlFor="resume-gate-phone">Phone <span className="text-muted-ink/70">(optional)</span></label>
                  <input id="resume-gate-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98XXX XXXXX" className={inputCls}/>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 bg-terracotta py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-[#a8431f] disabled:cursor-wait disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4"/></svg>
                    Submitting...
                  </>
                ) : (
                  'Download Resume'
                )}
              </button>
            </form>
            <p className="mt-5 flex items-center justify-center gap-2 font-body text-[0.78rem] text-muted-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Your information is secure and will only be used to personalize our conversation.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
