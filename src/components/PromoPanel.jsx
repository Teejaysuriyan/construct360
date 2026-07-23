import { useRef, useState, useEffect } from 'react';
import FloatingIcon from './FloatingIcon';
import DashboardIllustration from './DashboardIllustration';

/**
 * PromoPanel Component
 * 
 * Renders the promotional vector artwork (blue background card, layered circles,
 * centered browser dashboard mock, floating status icons, and headers).
 * 
 * Proportional Scaling System:
 * It utilizes a ResizeObserver to track container boundaries, automatically scaling
 * all sub-elements (nested in a fixed 700px x 940px coordinate viewport) using CSS transforms.
 * This guarantees the exact visual layout is maintained across any screen size/resolution.
 */
const PromoPanel = () => {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    
    // Calculates the ideal scale multiplier based on container's width/height bounding box
    const updateScale = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) {
        // Keeps aspect ratio intact by locking to the smaller scale dimension
        const scaleW = w / 700;
        const scaleH = h / 940;
        setScale(Math.min(scaleW, scaleH));
      } else {
        setScale(1);
      }
    };

    updateScale();
    
    // Observes resize events on container wrapper to maintain alignment at all times
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="promo-panel-container"
      style={{
        width: '100%',
        maxWidth: '700px', // Slightly increased width from 670px per request
        height: '100%',
        maxHeight: '100%',
        aspectRatio: '700 / 940',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 0,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 
        This is the inner scaled canvas block.
        Everything nested here references the absolute base coordinates of 700px x 940px.
      */}
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
          {/* Subtle noise grid texture overlay */}
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

          {/* ── 1. Top Light Accent Circle (#0D3DBB / #144AD9 gradient) ── */}
          <div
            style={{
              position: 'absolute',
              width: '740px',
              height: '740px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0D3DBB 0%, #144AD9 100%)',
              top: '-180px',
              left: '-30px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* ── 2. Bottom Deep Dark Circle (#002FAB) ── */}
          <div
            style={{
              position: 'absolute',
              width: '720px',
              height: '720px',
              borderRadius: '50%',
              background: '#002FAB',
              bottom: '-290px', // Moved lower from -250px
              left: '-10px',   // Shifted right from -70px
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* ── 3. Outer Blue Circle (Ellipse 9) ── */}
          <div
            style={{
              position: 'absolute',
              width: '580px',
              height: '580px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #3D7BF5 0%, #2154E1 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.20)',
              right: '-100px', // Center coordinates X: 510px, Y: 520px
              top: '230px',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {/* ── 4. Inner Blue Circle (Ellipse 8) ── */}
          <div
            style={{
              position: 'absolute',
              width: '360px',
              height: '360px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #609DFF 0%, #3B74F6 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              right: '10px', // Perfectly concentric with Ellipse 9 center
              top: '340px',
              pointerEvents: 'none',
              zIndex: 4,
            }}
          />

          {/* ── 5. Dashboard Card Mockup (# Window Card) ── */}
          <DashboardIllustration />

          {/* ── 6. Floating Icon Badges (Positioned perfectly on the outer circle's edge) ── */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 6 }}>
            {/* Shield Badge: Top-left circumference edge (315°) - Adjusted for 110px width */}
            <FloatingIcon
              icon="shield"
              style={{
                top: '260px',
                left: '250px',
              }}
            />

            {/* Analytics Badge: Middle-left horizontal edge (180°) - Adjusted for 110px width */}
            <FloatingIcon
              icon="analytics"
              style={{
                top: '465px',
                left: '165px',
              }}
            />

            {/* Calendar Badge: Bottom-left circumference edge (225°) - Adjusted for 110px width */}
            <FloatingIcon
              icon="calendar"
              style={{
                top: '670px',
                left: '250px',
              }}
            />
          </div>

          {/* ── 7. Header Typography Title & Description Subtitle ── */}
          <div
            style={{
              position: 'absolute',
              top: '48px',
              left: '48px',
              maxWidth: '520px',
              zIndex: 10,
            }}
          >
            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '48px', // Adjusted to 48px
                lineHeight: '56px',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Streamline your
              <br />
              organization
            </h2>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: '20px', // Adjusted to 20px
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '380px',
                marginTop: '16px',
                marginBottom: 0,
                lineHeight: '28px',
                letterSpacing: '0px',
              }}
            >
              Manage employees easily with the CRM dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPanel;
