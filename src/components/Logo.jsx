// Logo — Slightly increased size (160 × 76px)
const Logo = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
    }}
  >
    <img
      src="/logo.png"
      alt="Construct360 Logo"
      style={{
        width: '160px',
        height: '76px',
        objectFit: 'contain',
      }}
    />
  </div>
);

export default Logo;
