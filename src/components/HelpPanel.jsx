import { useRef, useState, useEffect } from 'react';

// Headset agent icon SVG
const SupportIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C6.48 2 2 6.48 2 12V20C2 21.1 2.9 22 4 22H8V14H4V12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12V14H16V22H20C21.1 22 22 21.1 22 20V12C22 6.48 17.52 2 12 2Z"
      fill="#2563EB"
    />
    <path
      d="M19 14H20V20H19V14ZM5 14H4V20H5V14Z"
      fill="#2563EB"
    />
  </svg>
);

const HelpPanel = ({
  title = "Almost There!",
  description = "Enter the one-time passcode to securely verify your number\nand finish creating your account",
  supportCardText = "Having trouble creating account? Our support\nteam is here to help."
}) => {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const updateScale = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) {
        const scaleW = w / 700;
        const scaleH = h / 940;
        setScale(Math.min(scaleW, scaleH));
      } else {
        setScale(1);
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="promo-panel-container"
    >
      <div
        style={{
          width: '700px',
          height: '940px',
          position: 'absolute',
          top: 0,
          left: 0,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          borderRadius: '24px',
          overflow: 'hidden',
        }}
      >
        {/* Main Blue Panel Canvas Background */}
        <div
          style={{
            width: '700px',
            height: '940px',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            background: '#2B5BE8',
          }}
        >
          {/* Subtle noise texture */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.12,
              pointerEvents: 'none',
              zIndex: 1,
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>

          {/* ── 1. Top Background Circle ── */}
          <div
            style={{
              position: 'absolute',
              width: '816px',
              height: '830px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0D3DBB 0%, #144AD9 100%)',
              top: '-280px',
              left: '-60px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* ── 2. Middle Background Circle ── */}
          <div
            style={{
              position: 'absolute',
              width: '700px',
              height: '700px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0D3DBB 0%, #144AD9 100%)',
              top: '300px',
              right: '-180px',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* ── 3. Bottom Background Circle (zIndex 3) ── */}
          <div
            style={{
              position: 'absolute',
              width: '720px',
              height: '720px',
              borderRadius: '50%',
              background: '#1553F8',
              bottom: '-290px',
              left: '-10px',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {/* ── 4. Header Typography (Almost There!) ── */}
          <div
            style={{
              position: 'absolute',
              top: '48px',
              left: '48px',
              maxWidth: '600px',
              zIndex: 10,
            }}
          >
            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '48px',
                lineHeight: '56px',
                color: '#ffffff',
                margin: 0,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '520px',
                marginTop: '16px',
                marginBottom: 0,
                lineHeight: '28px',
                letterSpacing: '0px',
                whiteSpace: 'pre-line',
              }}
            >
              {description}
            </p>
          </div>

          {/* ── 5. Vector Speech-Bubble Styled Help Container (561px × 319px body + tail) ── */}
          <div
            style={{
              position: 'absolute',
              bottom: '130px',
              left: '70px',
              width: '561px',
              height: '287px',
              zIndex: 5,
            }}
          >
            {/* 100% Vector SVG speech bubble — tail extends below the div bounds */}
            <svg
              width="561"
              height="323"
              viewBox="0 0 561 323"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', top: 0, left: 0, width: '561px', height: '323px', overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="speechBubbleGrad" x1="280.5" y1="0" x2="280.5" y2="323" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7BA5FF" stopOpacity="0.60" />
                  <stop offset="100%" stopColor="#0F2E72" stopOpacity="1.00" />
                </linearGradient>
              </defs>
              <path
                d="M 0,24 A 24 24 0 0 1 24,0 H 537 A 24 24 0 0 1 561,24 V 263 A 24 24 0 0 1 537,287 H 160 L 12,323 A 12 12 0 0 1 0,315 V 24 Z"
                fill="url(#speechBubbleGrad)"
                stroke="rgba(255, 255, 255, 0.20)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Container Text overlay — inside the rectangle body only */}
            <div
              style={{
                position: 'relative',
                zIndex: 6,
                padding: '36px',
                height: '287px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: '32px',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  Need Help?
                </h3>
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: 0,
                    marginTop: '12px',
                    lineHeight: '24px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {supportCardText}
                </p>
              </div>

              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '28px',
                  color: '#ffffff',
                  letterSpacing: '-0.5px',
                }}
              >
                support @example.com
              </span>
            </div>
          </div>

          {/* ── 6. Floating Support Badge — half overlaps card bottom, half on tail ── */}
          <div
            style={{
              position: 'absolute',
              bottom: '75px',
              left: '124px',
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              backgroundColor: '#D2E3FC',
              boxShadow: '0 12px 32px rgba(0,0,0,0.20)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9,
            }}
          >
            <SupportIcon />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpPanel;
