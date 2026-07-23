import Logo from './Logo';

/**
 * SuccessScreen Component
 *
 * Full-width account creation confirmation screen.
 * Clean white background container, dark text, static green checkmark, and blue CTA button.
 */
const SuccessScreen = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% -30%, #2563EB 0%, #1D4ED8 35%, #ffffff 75%)',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      {/* ── Main card ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#ffffff',
          border: '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '56px 48px 52px',
          maxWidth: '560px',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
        }}
      >
        {/* ── Static Checkmark ── */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            style={{ display: 'block' }}
          >
            {/* Green circle */}
            <circle
              cx="32" cy="32" r="32"
              fill="#22C55E"
            />
            {/* Tick path */}
            <path
              d="M19 33L28 42L45 22"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ── Heading ── */}
        <h1
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: '32px',
            color: '#111827',
            margin: 0,
            lineHeight: '1.2',
          }}
        >
          Account Created!
        </h1>

        {/* ── Subtext ── */}
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: '#4B5563',
            marginTop: '14px',
            marginBottom: '32px',
            lineHeight: '26px',
            maxWidth: '460px',
          }}
        >
          Welcome aboard! Your account is ready. Start managing projects, teams, and tasks in one place.
        </p>

        {/* ── CTA Button ── */}
        <button
          onClick={() => alert('Redirecting to dashboard…')}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '12px',
            backgroundColor: '#2563EB',
            color: '#ffffff',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.25)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.25)';
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
