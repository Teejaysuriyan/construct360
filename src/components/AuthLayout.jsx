import { useState } from 'react';
import Logo from './Logo';
import PhoneInput, { COUNTRIES } from './PhoneInput';
import PrimaryButton from './PrimaryButton';
import AuthFooter from './AuthFooter';
import PromoPanel from './PromoPanel';
import OtpForm from './OtpForm';
import HelpPanel from './HelpPanel';
import CreatePasswordForm from './CreatePasswordForm';
import SuccessScreen from './SuccessScreen';

const VALID_PHONE = '9876543211';

/**
 * AuthLayout Component
 *
 * Manages the 4-step authentication flow:
 *   Step 1 — phone:    Phone number entry
 *   Step 2 — otp:      6-digit OTP verification
 *   Step 3 — password: Create account password
 *   Step 4 — success:  Full-screen confirmation screen
 */
const AuthLayout = () => {
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [phoneError, setPhoneError] = useState('');

  const isComplete = phoneNumber.length === selectedCountry.length;

  const handleSendOtp = () => {
    if (!isComplete) return;
    if (phoneNumber === VALID_PHONE) {
      setPhoneError('');
      setStep('otp');
    } else {
      setPhoneError('This number is not registered. Please try again.');
    }
  };

  // Success screen takes over the full viewport
  if (step === 'success') {
    return <SuccessScreen key="success" />;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">

        {/* ── LEFT PANEL ── */}
        <div className="auth-left">
          <div className="auth-content">
            <div key={step} className="screen-enter" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {step === 'phone' && (
                <>
                  <Logo />
                  <h1 className="auth-heading">Create Your Account</h1>
                  <p className="auth-description">
                    Create your account to start managing projects.
                    <br />
                    Track teams, tasks, materials, and progress in one place.
                  </p>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <PhoneInput
                      value={phoneNumber}
                      onChange={(val) => {
                        setPhoneNumber(val);
                        if (phoneError) setPhoneError('');
                      }}
                      selectedCountry={selectedCountry}
                      onCountryChange={(country) => {
                        setSelectedCountry(country);
                        setPhoneNumber('');
                        setPhoneError('');
                      }}
                      submitError={phoneError}
                      onSubmit={handleSendOtp}
                    />
                  </div>
                  <PrimaryButton disabled={!isComplete} onClick={handleSendOtp} />
                  <AuthFooter />
                </>
              )}

              {step === 'otp' && (
                <OtpForm
                  phoneNumber={phoneNumber}
                  countryCode={selectedCountry.code}
                  onChangeNumber={() => { setStep('phone'); setPhoneError(''); }}
                  onVerified={() => setStep('password')}
                />
              )}

              {step === 'password' && (
                <CreatePasswordForm onSubmit={() => setStep('success')} />
              )}

            </div>{/* end screen-enter */}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="auth-right">
          <div key={step} className="screen-enter" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {step === 'phone' ? (
              <PromoPanel />
            ) : step === 'otp' ? (
              <HelpPanel />
            ) : (
              <HelpPanel
                title="Secure Your Account"
                description={`Create a strong password to protect your workspace.\nYour credentials are fully encrypted to keep your projects, teams, and data safe.`}
                supportCardText={`Our support team is always available to\nhelp you secure your workspace.`}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
