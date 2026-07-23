// FloatingIcon — 84px diameter, larger shadow, blue SVG icon
const FloatingIcon = ({ icon, style = {} }) => {
  const icons = {
    shield: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 3L5 7.5V15C5 21.08 9.84 26.76 16 28C22.16 26.76 27 21.08 27 15V7.5L16 3Z"
          fill="#2563EB"
          fillOpacity="0.12"
        />
        <path
          d="M16 3L5 7.5V15C5 21.08 9.84 26.76 16 28C22.16 26.76 27 21.08 27 15V7.5L16 3Z"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 15.5L14.5 18.5L20.5 12.5"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    analytics: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <rect x="5"  y="16" width="5"  height="11" rx="1.5" fill="#2563EB" />
        <rect x="13.5" y="10" width="5"  height="17" rx="1.5" fill="#2563EB" />
        <rect x="22" y="5"  width="5"  height="22" rx="1.5" fill="#2563EB" />
        <line x1="3" y1="28" x2="29" y2="28" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    calendar: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="7" width="24" height="22" rx="3" stroke="#2563EB" strokeWidth="2" fill="#2563EB" fillOpacity="0.10" />
        <path d="M4 13H28" stroke="#2563EB" strokeWidth="2" />
        <path d="M11 4V10" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 4V10" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <path d="M11.5 20L14.5 23L20.5 17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return (
    <div
      style={{
        width: '84px',
        height: '84px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        ...style,
      }}
    >
      {icons[icon]}
    </div>
  );
};

export default FloatingIcon;
