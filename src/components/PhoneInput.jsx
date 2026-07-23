import { useState, useRef, useEffect } from 'react';

// ── SVG FLAG RENDERERS ──

// Crisp vector SVG rendering of the Indian National Flag
export const IndiaFlag = () => (
  <svg
    width="22"
    height="15"
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: '2px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.05)' }}
  >
    <rect width="24" height="5.33" fill="#FF9933" />
    <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
    <rect y="10.66" width="24" height="5.34" fill="#138808" />
    <circle cx="12" cy="8" r="1.8" fill="none" stroke="#000080" strokeWidth="0.5" />
    <circle cx="12" cy="8" r="0.4" fill="#000080" />
  </svg>
);

// Crisp vector SVG rendering of the United States Flag
export const USFlag = () => (
  <svg
    width="22"
    height="15"
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: '2px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.05)' }}
  >
    <rect width="24" height="16" fill="#B22234" />
    <rect y="1.23" width="24" height="1.23" fill="#FFFFFF" />
    <rect y="3.69" width="24" height="1.23" fill="#FFFFFF" />
    <rect y="6.15" width="24" height="1.23" fill="#FFFFFF" />
    <rect y="8.61" width="24" height="1.23" fill="#FFFFFF" />
    <rect y="11.07" width="24" height="1.23" fill="#FFFFFF" />
    <rect y="13.53" width="24" height="1.23" fill="#FFFFFF" />
    <rect width="10.6" height="8.6" fill="#3C3B6E" />
    <circle cx="2" cy="2" r="0.4" fill="#FFFFFF" />
    <circle cx="5" cy="2" r="0.4" fill="#FFFFFF" />
    <circle cx="8" cy="2" r="0.4" fill="#FFFFFF" />
    <circle cx="3.5" cy="4.3" r="0.4" fill="#FFFFFF" />
    <circle cx="6.5" cy="4.3" r="0.4" fill="#FFFFFF" />
    <circle cx="2" cy="6.6" r="0.4" fill="#FFFFFF" />
    <circle cx="5" cy="6.6" r="0.4" fill="#FFFFFF" />
    <circle cx="8" cy="6.6" r="0.4" fill="#FFFFFF" />
  </svg>
);

// Crisp vector SVG rendering of the United Kingdom Flag (Union Jack)
export const UKFlag = () => (
  <svg
    width="22"
    height="15"
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ borderRadius: '2px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.05)' }}
  >
    <rect width="24" height="16" fill="#012169" />
    <path d="M0 0 L24 16 M0 16 L24 0" stroke="#FFFFFF" strokeWidth="2.5" />
    <path d="M0 0 L24 16 M0 16 L24 0" stroke="#C8102E" strokeWidth="1" />
    <path d="M12 0 V16 M0 8 H24" stroke="#FFFFFF" strokeWidth="4.5" />
    <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2.5" />
  </svg>
);

// List of supported country profiles for dialing selection
export const COUNTRIES = [
  { code: '+91', name: 'India', flag: IndiaFlag, length: 10, placeholder: 'Enter mobile number' },
  { code: '+1', name: 'United States', flag: USFlag, length: 10, placeholder: 'Enter mobile number' },
  { code: '+44', name: 'United Kingdom', flag: UKFlag, length: 10, placeholder: 'Enter mobile number' },
];

/**
 * PhoneInput Component
 * 
 * Renders a stateful, custom phone input field. 
 * Includes:
 * - A click-to-open country code selection dropdown with flag graphics.
 * - An input box that strictly restricts input values to digits only (0-9).
 * - Focus-triggered border outlines and shadows for polished UX.
 */
const PhoneInput = ({ value, onChange, selectedCountry, onCountryChange }) => {
  const [focused, setFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Closes the country selector dropdown automatically if a user clicks outside the list
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const ActiveFlag = selectedCountry.flag;

  // Sanitizer: strip all non-numeric characters on change event
  const handleInputChange = (e) => {
    const cleanVal = e.target.value.replace(/\D/g, '');
    onChange(cleanVal);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* ── Form Field Label ── */}
      <div style={{ width: '100%', maxWidth: '430px' }}>
        <label
          htmlFor="mobile-number"
          style={{
            display: 'block',
            textAlign: 'left',
            marginBottom: '6px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: '#374151',
          }}
        >
          Mobile Number
        </label>
      </div>

      {/* ── Input Box Container ── */}
      <div
        className="auth-input"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '430px',
          height: '48px', // Adjusted to 48px
          border: focused ? '1.5px solid #2563EB' : '1px solid #D1D5DB',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          paddingLeft: '14px',
          paddingRight: '14px',
          boxShadow: focused ? '0 0 0 3px rgba(37,99,235,0.08)' : 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          position: 'relative',
        }}
      >
        {/* Country Selector Dropdown Trigger Button */}
        <div
          ref={dropdownRef}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            paddingRight: '10px',
            userSelect: 'none',
            height: '100%',
          }}
        >
          <ActiveFlag />
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '15px', // Balanced for 48px height
              color: '#111827',
              marginLeft: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            {selectedCountry.code}
          </span>
          {/* Chevron Icon */}
          <svg style={{ marginLeft: '4px' }} width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Floating Dropdown Option List */}
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '52px', // Balanced for 48px height
                left: 0,
                backgroundColor: '#ffffff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                zIndex: 100,
                width: '180px',
                overflow: 'hidden',
              }}
            >
              {COUNTRIES.map((country) => {
                const ItemFlag = country.flag;
                return (
                  <div
                    key={country.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCountryChange(country);
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                      backgroundColor: selectedCountry.code === country.code ? '#F3F4F6' : 'transparent',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = selectedCountry.code === country.code ? '#F3F4F6' : 'transparent')}
                  >
                    <ItemFlag />
                    <span
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '14px',
                        color: '#374151',
                        marginLeft: '8px',
                      }}
                    >
                      {country.name} ({country.code})
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div
          style={{
            width: '1px',
            height: '20px',
            backgroundColor: '#E5E7EB',
            flexShrink: 0,
          }}
        />

        {/* ── Native Numeric Input Field ── */}
        <input
          id="mobile-number"
          type="tel"
          value={value}
          onChange={handleInputChange}
          placeholder={selectedCountry.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px', // Balanced for 48px height
            color: '#111827',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            flex: 1,
            width: '100%',
            paddingLeft: '10px',
          }}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
