import { useState, useRef } from 'react';

/**
 * CreatePasswordForm Component
 *
 * Password peek behaviour:
 * - Input is always type="text" but we manually control the displayed value.
 * - When the user types a character, every char EXCEPT the last one shows as "•".
 *   The last character stays visible for 600 ms then also becomes "•".
 * - The eye icon toggles between showing all real characters vs all dots.
 * - Eye icon is hidden until there is at least one character.
 */
const CreatePasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [peeking, setPeeking] = useState(false);  // true for 600 ms after each keystroke
  const peekTimer = useRef(null);
  const inputRef = useRef(null);

  // Password strength rules
  const rules = [
    { label: 'Minimum 8 characters',                test: (p) => p.length >= 8 },
    { label: 'At least 1 uppercase letter (A-Z)',   test: (p) => /[A-Z]/.test(p) },
    { label: 'At least 1 lowercase letter (a-z)',   test: (p) => /[a-z]/.test(p) },
    { label: 'At least 1 number (0-9)',             test: (p) => /[0-9]/.test(p) },
    { label: 'At least 1 special character (!@#$%)',test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
  ];

  const ruleResults = rules.map((r) => r.test(password));
  const allPassed = ruleResults.every(Boolean);
  const touched = password.length > 0;

  // ── Trigger peek for 600 ms ──
  const triggerPeek = () => {
    if (showAll) return;
    setPeeking(true);
    clearTimeout(peekTimer.current);
    peekTimer.current = setTimeout(() => setPeeking(false), 600);
  };

  // ── Keyboard handler — we intercept every keystroke to manage the real password ──
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (allPassed) {
        onSubmit();
      }
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      setPassword((p) => p.slice(0, -1));
      setPeeking(false);
    } else if (e.key === 'Delete') {
      e.preventDefault();
      setPassword('');
      setPeeking(false);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      // Printable character typed
      e.preventDefault();
      setPassword((p) => p + e.key);
      triggerPeek();
    }
  };

  // ── Paste handler ──
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (text) {
      setPassword((p) => p + text);
      triggerPeek();
    }
  };

  // ── Build the display value ──
  // showAll      → show real characters
  // peeking      → dots for all but the last character; last character visible
  // neither      → all dots
  const buildDisplayValue = () => {
    if (showAll) return password;
    if (password.length === 0) return '';
    if (peeking) {
      return '•'.repeat(Math.max(0, password.length - 1)) + password[password.length - 1];
    }
    return '•'.repeat(password.length);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* ── Heading ── */}
      <h1 className="auth-heading">Create Password</h1>

      {/* ── Subtext ── */}
      <p className="auth-description" style={{ marginBottom: '32px' }}>
        Set a strong password to secure
        <br />
        your account.
      </p>

      {/* ── Password Field ── */}
      <div style={{ width: '100%', maxWidth: '430px' }}>
        <label
          htmlFor="create-password"
          style={{ display: 'block', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '14px', color: '#374151', marginBottom: '6px' }}
        >
          Password
        </label>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '48px',
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          paddingLeft: '14px',
          paddingRight: '10px',
        }}>
          <input
            id="create-password"
            ref={inputRef}
            type="text"
            value={buildDisplayValue()}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onChange={() => {}} // controlled — onChange is a no-op, keyDown handles everything
            placeholder="••••••••"
            autoComplete="new-password"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '18px',
              letterSpacing: '4px',
              color: '#111827',
              caretColor: '#2563EB',
            }}
          />

          {/* Eye icon — only visible when field has content */}
          {touched && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#9CA3AF', flexShrink: 0 }}
              aria-label={showAll ? 'Hide password' : 'Show password'}
            >
              {showAll ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              )}
            </button>
          )}
        </div>

        {/* ── Validation Checklist — space always reserved to prevent height jump ── */}
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', minHeight: touched ? 'auto' : '0px', overflow: 'hidden', width: '100%', maxWidth: '430px' }}>
          {touched && rules.map((rule, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {ruleResults[i] ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="#16A34A"/>
                    <path d="M5 8L7 10L11 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#D1D5DB" strokeWidth="1.5"/>
                  </svg>
                )}
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: ruleResults[i] ? '#16A34A' : '#9CA3AF', transition: 'color 0.2s ease' }}>
                  {rule.label}
                </span>
              </div>
          ))}
        </div>
      </div>

      {/* ── Create Account Button ── */}
      <button
        onClick={allPassed ? onSubmit : undefined}
        disabled={!allPassed}
        style={{
          width: '100%',
          maxWidth: '430px',
          height: '48px',
          borderRadius: '8px',
          backgroundColor: allPassed ? '#2563EB' : '#E5E7EB',
          color: allPassed ? '#ffffff' : '#9CA3AF',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '15px',
          border: 'none',
          cursor: allPassed ? 'pointer' : 'not-allowed',
          boxShadow: allPassed ? '0 4px 12px rgba(37,99,235,0.2)' : 'none',
          marginTop: '16px',
          transition: 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        Create Account
      </button>
    </div>
  );
};

export default CreatePasswordForm;
