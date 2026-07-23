import { useState } from 'react';
import Logo from './Logo';
import PhoneInput, { COUNTRIES } from './PhoneInput';
import PrimaryButton from './PrimaryButton';
import AuthFooter from './AuthFooter';
import PromoPanel from './PromoPanel';

/**
 * AuthLayout Component
 * 
 * This is the main orchestrator for the authentication page layout. 
 * It manages the primary states for user registration (phone number and country code)
 * and structures the screen into a dual-panel responsive grid:
 * - Left Panel: Visual branding header, country-dropdown numeric phone input, submission button, and footer.
 * - Right Panel: Responsive, proportional SVG artwork showcase wrapper.
 */
const AuthLayout = () => {
  // state to store the sanitized numeric input typed by the user
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // state to track the active country profile (flag, dial code, expected digit length)
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  // Validation Check: Enables the Send OTP button only when phone length exactly matches the expected country limit
  const isValid = phoneNumber.length === selectedCountry.length;

  return (
    <div className="auth-wrapper">
      <div className="auth-container">

        {/* ═══════════════════════════════════════════════════
            LEFT SIDE PANEL — Authentication Form Column
            ═══════════════════════════════════════════════════ */}
        <div className="auth-left">
          <div className="auth-content">
            {/* Branding Logo Header */}
            <Logo />

            {/* Main Action Callout */}
            <h1 className="auth-heading">
              Create Your Account
            </h1>

            {/* Description Subtext */}
            <p className="auth-description">
              Create your account to start managing projects.
              <br />
              Track teams, tasks, materials, and progress in one place.
            </p>

            {/* Stateful Country Dropdown and Input Box */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <PhoneInput
                value={phoneNumber}
                onChange={setPhoneNumber}
                selectedCountry={selectedCountry}
                onCountryChange={(country) => {
                  setSelectedCountry(country);
                  setPhoneNumber(''); // Clear number dynamically on country swap
                }}
              />
            </div>

            {/* Submit Button (toggles state/colors automatically based on isValid validation) */}
            <PrimaryButton disabled={!isValid} />

            {/* Footer Navigation & Legal Terms */}
            <AuthFooter />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            RIGHT SIDE PANEL — Visual Promotional Showcase Artwork
            ═══════════════════════════════════════════════════ */}
        <div className="auth-right">
          <PromoPanel />
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
