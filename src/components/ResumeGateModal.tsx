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

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-ink placeholder:text-[#8d8071] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/25 transition-colors";
  const inputStyle = { background: '#FFFDF9', border: '1px solid #E2D9CC' };
  const labelCls = "block text-sm font-medium mb-1.5 text-ink";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(31,27,23,0.55)', backdropFilter: 'blur(5px)' }} onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="relative w-full max-w-md rounded-2xl p-8 bg-cream" style={{ border: '1px solid #E2D9CC', boxShadow: '0 24px 60px rgba(31,27,23,0.28)' }}>
        <button onClick={closeModal} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-lg text-muted-ink" onMouseEnter={(e) => e.currentTarget.style.background = '#EAE2D6'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        {isSuccess ? (
          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(178,74,46,0.12)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B24A2E" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
            </div>
            <h3 className="font-serif text-2xl text-ink mb-2">You're all set!</h3>
            <p className="text-muted-ink text-sm mb-6">Your resume is downloading now.</p>
            <button onClick={closeModal} className="px-6 py-2 rounded-lg bg-deep-charcoal text-cream text-sm font-semibold">Close</button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(178,74,46,0.12)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B24A2E" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <h2 className="font-serif text-2xl text-ink mb-1">Get My Resume</h2>
              <p className="text-muted-ink text-sm">Share your details to access the full resume</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelCls}>Work Email <span className="text-terracotta">*</span></label>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} onBlur={handleEmailBlur} placeholder="you@company.com" required className={inputCls} style={{ ...inputStyle, border: emailError ? '1px solid #B24A2E' : '1px solid #E2D9CC' }}/>
                {emailError && <p className="text-terracotta text-xs mt-1">{emailError}</p>}
              </div>
              <div>
                <label className={labelCls}>Company <span className="text-terracotta">*</span></label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your organization" required className={inputCls} style={inputStyle}/>
              </div>
              <div>
                <label className={labelCls}>I'm reaching out as a...</label>
                <div className="relative">
                  <select value={role} onChange={(e) => setRole(e.target.value)} className={inputCls + " appearance-none cursor-pointer pr-10"} style={inputStyle}>
                    <option value="">Select your role</option>
                    <option value="founder">Founder / CEO</option>
                    <option value="marketing">Marketing Leader</option>
                    <option value="growth">Growth / Product Lead</option>
                    <option value="hr">HR / Talent</option>
                    <option value="media">Media / Agency</option>
                    <option value="investor">Investor</option>
                    <option value="other">Other</option>
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C5248" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div>
                <label className={labelCls}>What brings you here?</label>
                <div className="relative">
                  <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className={inputCls + " appearance-none cursor-pointer pr-10"} style={inputStyle}>
                    <option value="">Select one (optional)</option>
                    <option value="consulting">Consulting / Advisory</option>
                    <option value="hire">Hiring for a role</option>
                    <option value="audit">Marketing audit</option>
                    <option value="collab">Collaboration</option>
                    <option value="curious">Just exploring</option>
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C5248" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={callback} onChange={(e) => setCallback(e.target.checked)} className="sr-only"/>
                  <span className="w-5 h-5 rounded flex items-center justify-center transition-colors" style={{ border: `2px solid ${callback ? '#B24A2E' : '#C9BCA8'}`, background: callback ? '#B24A2E' : 'transparent' }}>
                    {callback && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F7F3EC" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>}
                  </span>
                  <span className="text-sm text-muted-ink">I'd like a callback to discuss further</span>
                </label>
              </div>
              {callback && (
                <div>
                  <label className={labelCls}>Phone <span className="text-muted-ink font-normal">(optional)</span></label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98XXX XXXXX" className={inputCls} style={inputStyle}/>
                </div>
              )}
              <button type="submit" disabled={isLoading} className="w-full py-3.5 rounded-xl font-semibold text-cream transition-colors mt-2 bg-terracotta hover:bg-[#A8431F]" style={{ opacity: isLoading ? 0.7 : 1 }}>
                {isLoading ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4"/></svg>Submitting...</span> : 'Download Resume'}
              </button>
            </form>
            <p className="flex items-center justify-center gap-2 text-xs text-muted-ink mt-4"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Your information is secure and will only be used to personalize our conversation.</p>
          </>
        )}
      </div>
    </div>
  );
}
