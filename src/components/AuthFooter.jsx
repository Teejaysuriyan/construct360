/**
 * AuthFooter Component
 * 
 * Renders the bottom portion of the authentication form, containing:
 * - Redirect link to the account sign-in page ("Already have an account? Sign in").
 * - Dynamic disclosure statement link block to the "Terms of Service" and "Privacy Policy".
 */
const AuthFooter = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'clamp(14px, 2vh, 20px)' }}>

    {/* Redirect link section */}
    <p
      style={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontSize: '13px',
        color: '#111827',
        margin: 0,
        textAlign: 'center',
      }}
    >
      Already have an account?{' '}
      <a
        href="#"
        style={{
          color: '#2563EB',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        Sign in
      </a>
    </p>

    {/* Legal disclosure agreements */}
    <p
      style={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontSize: '12px',
        color: '#9CA3AF',
        marginTop: 'clamp(12px, 1.5vh, 18px)',
        marginBottom: 0,
        textAlign: 'center',
        lineHeight: '18px',
      }}
    >
      By continuing, you agree to our{' '}
      <a
        href="#"
        style={{ color: '#2563EB', textDecoration: 'underline' }}
      >
        Terms
      </a>
      {' '}and{' '}
      <br />
      <a
        href="#"
        style={{ color: '#2563EB', textDecoration: 'underline' }}
      >
        Privacy Policy
      </a>
      . this content
    </p>
  </div>
);

export default AuthFooter;
