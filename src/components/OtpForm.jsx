import { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const CORRECT_OTP = '123456';

/**
 * ChangeNumberModal Component
 */
const ChangeNumberModal = ({ onCancel, onConfirm }) => ReactDOM.createPortal(
  <div
    style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}
    onClick={onCancel}
  >
    <div
      style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '40px 36px 36px', width: '100%', maxWidth: '660px', margin: '0 16px', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px', color: '#111827', margin: 0, textAlign: 'center' }}>
        Change mobile number?
      </h2>
      <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '16px', color: '#6B7280', margin: 0, textAlign: 'center', lineHeight: '24px' }}>
        Changing your mobile number will reset this sign-up process. You'll need to verify the new number before creating your account.
      </p>
      <div style={{ display: 'flex', gap: '20px', width: 'auto', marginTop: '12px' }}>
        <button onClick={onCancel}
          style={{ width: '180px', height: '44px', borderRadius: '8px', border: '1px solid #D2E3FC', backgroundColor: '#fff', color: '#111827', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '15px', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}>
          Cancel
        </button>
        <button onClick={onConfirm}
          style={{ width: '180px', height: '44px', borderRadius: '8px', border: 'none', backgroundColor: '#4F7DF2', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '15px', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3B68DF')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4F7DF2')}>
          Change Number
        </button>
      </div>
    </div>
  </div>,
  document.body
);

/**
 * OtpForm Component
 *
 * OTP states: idle → error (wrong code, red) | success (correct code, green → auto-advance)
 * Resend: clears boxes, shows success toast, starts 30s countdown via useEffect chain.
 */
const OtpForm = ({ phoneNumber, countryCode, onChangeNumber, onVerified }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [otpStatus, setOtpStatus] = useState('idle'); // 'idle' | 'error' | 'success'
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  const isComplete = otp.every((v) => v !== '');
  const enteredOtp = otp.join('');

  // ── Reliable useEffect-based countdown ──
  // Every time resendCountdown is a positive number, schedule a 1-second decrement.
  // Cleanup cancels the timer if the component unmounts or countdown resets mid-flight.
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const id = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [resendCountdown]);

  // Auto-focus first box on mount
  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  // Auto-advance to password screen 2.2 seconds after correct OTP to allow viewing checkmark
  useEffect(() => {
    if (otpStatus !== 'success') return;
    const t = setTimeout(() => onVerified(), 2200);
    return () => clearTimeout(t);
  }, [otpStatus]);

  // Auto-reset OTP input boxes 1.5 seconds after incorrect verification attempt
  useEffect(() => {
    if (otpStatus !== 'error') return;
    const t = setTimeout(() => {
      setOtp(new Array(6).fill(''));
      setOtpStatus('idle');
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    }, 2000);
    return () => clearTimeout(t);
  }, [otpStatus]);

  const handleChange = (element, index) => {
    // Reset error/success when user starts re-typing
    if (otpStatus !== 'idle') setOtpStatus('idle');
    setResendSuccess(false);

    const value = element.value.replace(/\D/g, '');
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (index < 5 && inputRefs.current[index + 1]) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setShowModal(true);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isComplete) {
        handleVerify();
      }
    } else if (e.key === 'Backspace') {
      if (otpStatus !== 'idle') setOtpStatus('idle');
      const newOtp = [...otp];
      if (otp[index] !== '') {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0 && inputRefs.current[index - 1]) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').substring(0, 6);
    if (pasteData.length === 6) {
      setOtp(pasteData.split(''));
      inputRefs.current[5].focus();
      setOtpStatus('idle');
    }
  };

  const handleVerify = () => {
    if (!isComplete) return;
    if (enteredOtp === CORRECT_OTP) {
      setOtpStatus('success');
    } else {
      setOtpStatus('error');
    }
  };

  const handleResend = () => {
    if (resendCountdown > 0) return;
    setOtp(new Array(6).fill(''));
    setOtpStatus('idle');
    setResendSuccess(true);
    if (inputRefs.current[0]) inputRefs.current[0].focus();
    // The useEffect chain on resendCountdown handles the tick-down automatically
    setResendCountdown(30);
  };

  // Derive box border color per state
  const getBoxStyle = (val) => {
    if (otpStatus === 'success') return { border: '1.5px solid #16A34A', boxShadow: '0 0 0 3px rgba(22,163,74,0.10)' };
    if (otpStatus === 'error') return { border: '1.5px solid #DC2626', boxShadow: '0 0 0 3px rgba(220,38,38,0.08)' };
    if (val !== '') return { border: '1.5px solid #2563EB', boxShadow: '0 0 0 3px rgba(37,99,235,0.08)' };
    return { border: '1px solid #D1D5DB', boxShadow: 'none' };
  };

  // Derive button props
  const getButtonProps = () => {
    if (otpStatus === 'success') {
      return { label: null, disabled: true, bg: '#2563EB', color: '#fff' };
    }
    if (otpStatus === 'error') {
      return { label: 'Verify OTP', disabled: true, bg: '#E5E7EB', color: '#9CA3AF' };
    }
    if (isComplete) {
      return { label: 'Verify OTP', disabled: false, bg: '#2563EB', color: '#fff' };
    }
    return { label: 'Verify OTP', disabled: true, bg: '#E5E7EB', color: '#9CA3AF' };
  };

  const btn = getButtonProps();

  const formatCountdown = (s) => `00:${String(s).padStart(2, '0')}`;

  return (
    <>
      {showModal && (
        <ChangeNumberModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => { setShowModal(false); onChangeNumber(); }}
        />
      )}

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* ── Heading ── */}
        <h1 className="auth-heading" style={{ fontSize: '30px', fontWeight: 600, color: '#111827', margin: 0 }}>
          Verify Your Mobile
        </h1>

        {/* ── Subheading ── */}
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#6B7280', textAlign: 'center', marginTop: '12px', marginBottom: '32px', lineHeight: '20px' }}>
          Enter the 6-digit OTP sent to
          <br />
          <span style={{ fontWeight: 500, color: '#374151', marginTop: '4px', display: 'inline-block' }}>
            {countryCode} {phoneNumber}
          </span>
        </p>

        {/* ── OTP Box Group ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '430px', gap: '10px' }}>
          {otp.map((data, index) => (
            <input
              key={index}
              type="tel"
              maxLength={1}
              value={data}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={otpStatus === 'success'}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                textAlign: 'center',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: otpStatus === 'success' ? '#16A34A' : otpStatus === 'error' ? '#DC2626' : '#111827',
                outline: 'none',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                ...getBoxStyle(data),
              }}
              placeholder={data === '' ? '-' : ''}
            />
          ))}
        </div>

        {/* ── Status messages below OTP boxes ── */}
        <div style={{ width: '100%', maxWidth: '430px', minHeight: '0px', marginTop: '6px' }}>
          {/* Invalid OTP error */}
          {otpStatus === 'error' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#DC2626', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#DC2626" strokeWidth="1.2" />
                <path d="M8 4.5V9" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="8" cy="11.5" r="0.8" fill="#DC2626" />
              </svg>
              Invalid OTP. Please try again
            </div>
          )}
          {/* Resend success toast */}
          {resendSuccess && otpStatus !== 'error' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16A34A', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#16A34A" />
                <path d="M5 8L7 10L11 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              A new code has been sent to {countryCode} {phoneNumber}
            </div>
          )}
        </div>

        {/* ── Verify / Send / Verified Button ── */}
        <style>{`
          @keyframes drawTick {
            from { stroke-dashoffset: 15; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes popCircle {
            0%   { transform: scale(0); opacity: 0; }
            60%  { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
        <button
          onClick={!btn.disabled ? handleVerify : undefined}
          disabled={btn.disabled}
          style={{
            width: '100%',
            maxWidth: '430px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: btn.bg,
            color: btn.color,
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '15px',
            border: 'none',
            cursor: btn.disabled ? 'not-allowed' : 'pointer',
            boxShadow: btn.disabled && otpStatus !== 'success' ? 'none' : '0 4px 12px rgba(37,99,235,0.2)',
            marginTop: otpStatus === 'error' || resendSuccess ? '10px' : '16px',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {otpStatus === 'success' ? (
            <>
              <span>Verified</span>
              {/* Animated green filled circle with drawing tick */}
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                style={{ flexShrink: 0 }}
              >
                <circle
                  cx="8" cy="8" r="8"
                  fill="#22C55E"
                  style={{ 
                    animation: 'popCircle 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
                    transformOrigin: '50% 50%',
                    transformBox: 'fill-box'
                  }}
                />
                <path
                  d="M4.5 8.5L7 11L11.5 6"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="15"
                  strokeDashoffset="15"
                  style={{ 
                    animation: 'drawTick 0.35s ease 0.25s both',
                    transformOrigin: '50% 50%',
                    transformBox: 'fill-box'
                  }}
                />
              </svg>
            </>
          ) : (
            btn.label
          )}
        </button>

        {/* ── Resend Row ── */}
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#111827', marginTop: '24px', marginBottom: 0, textAlign: 'center' }}>
          Didn't receive the OTP?{' '}
          {resendCountdown > 0 ? (
            <span style={{ color: '#9CA3AF', fontWeight: 400 }}>
              Resend OTP in <span style={{ color: '#2563EB', fontWeight: 600 }}>{formatCountdown(resendCountdown)}</span>
            </span>
          ) : (
            <a href="#" onClick={(e) => { e.preventDefault(); handleResend(); }} style={{ color: '#2563EB', fontWeight: 500, textDecoration: 'none' }}>
              Resend OTP
            </a>
          )}
        </p>

        {/* ── Change Number ── */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setShowModal(true); }}
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#2563EB', fontWeight: 500, textDecoration: 'none', marginTop: '28px' }}
        >
          Change Number
        </a>
      </div>
    </>
  );
};

export default OtpForm;
