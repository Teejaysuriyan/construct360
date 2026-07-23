/**
 * PrimaryButton Component
 * 
 * Renders the state-reflective submit action button ("Send OTP").
 * Transitions dynamically:
 * - Disabled: Light grey background (#E5E7EB), grey text (#9CA3AF), no shadow, cursor disabled.
 * - Active: Vibrant blue background (#2563EB), white text (#ffffff), active click cursor, drop shadow.
 */
const PrimaryButton = ({ children = 'Send OTP', onClick, disabled = true }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    id="send-otp-btn"
    aria-label="Send OTP"
    className="auth-button"
    style={{
      width: '100%',
      maxWidth: '430px',
      height: '48px', // Adjusted to 48px
      borderRadius: '8px',
      backgroundColor: disabled ? '#E5E7EB' : '#2563EB',
      color: disabled ? '#9CA3AF' : '#ffffff',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '15px', // Balanced for 48px height
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled ? 'none' : '0 4px 12px rgba(37,99,235,0.2)',
      marginTop: '16px',
      letterSpacing: '0',
      transition: 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
    }}
  >
    {children}
  </button>
);

export default PrimaryButton;
