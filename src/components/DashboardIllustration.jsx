/**
 * DashboardIllustration Component
 * 
 * Renders the mockup card window (# Window Card) inside the promotional panel.
 * It simulates a browser interface with red, yellow, green title buttons, 
 * search bar mockup, and a list of employees with custom avatar images.
 * 
 * Base Dimensions: 380px width x 300px height.
 * Positioned exactly centered vertically with the concentric circles at top: 370px, right: -80px.
 */
const DashboardIllustration = () => {
  return (
    <div
      style={{
        position: 'absolute',
        right: '-80px',
        top: '370px', // Centered vertically relative to the blue circles (Y-center: 520px)
        width: '380px',
        height: '300px',
        borderRadius: '18px',
        backgroundColor: '#ffffff',
        boxShadow: '0 24px 60px rgba(0,0,0,0.16)',
        overflow: 'hidden',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Browser Mockup Window Header ── */}
      <div
        style={{
          backgroundColor: '#F3F4F6',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          borderBottom: '1px solid #E5E7EB',
          flexShrink: 0,
        }}
      >
        {/* Red, Yellow, Green Window Action Dots */}
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444', flexShrink: 0 }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B', flexShrink: 0 }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22C55E', flexShrink: 0 }} />
        
        {/* Mock Address Bar */}
        <div style={{ flex: 1, marginLeft: '12px', height: '22px', borderRadius: '6px', backgroundColor: '#E5E7EB' }} />
      </div>

      {/* ── Mockup Card Data Content ── */}
      <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top Mock Header Stats Block */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', alignItems: 'center' }}>
          <div style={{ height: '32px', borderRadius: '6px', backgroundColor: '#D1D5DB', width: '45%' }} />
          <div style={{ height: '12px', borderRadius: '5px', backgroundColor: '#E5E7EB', flex: 1 }} />
        </div>

        {/* Row 1: Employee Mockup Data (Avatar + Title Text block) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderBottom: '1px solid #F3F4F6',
          }}
        >
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <img src="https://i.pravatar.cc/44?img=47" alt="avatar 1" width="44" height="44" style={{ display: 'block' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ height: '11px', borderRadius: '5px', backgroundColor: '#D1D5DB', width: '68%' }} />
            <div style={{ height: '8px', borderRadius: '4px', backgroundColor: '#E5E7EB', width: '48%' }} />
          </div>
        </div>

        {/* Row 2: Employee Mockup Data (Avatar + Title Text block) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            paddingTop: '10px',
            paddingBottom: '4px',
          }}
        >
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <img src="https://i.pravatar.cc/44?img=12" alt="avatar 2" width="44" height="44" style={{ display: 'block' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ height: '11px', borderRadius: '5px', backgroundColor: '#D1D5DB', width: '58%' }} />
            <div style={{ height: '8px', borderRadius: '4px', backgroundColor: '#E5E7EB', width: '40%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardIllustration;
