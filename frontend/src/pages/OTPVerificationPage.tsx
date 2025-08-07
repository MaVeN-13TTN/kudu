import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EnvelopeSimple, ArrowLeft, Check } from '@phosphor-icons/react';

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [resendCooldown, setResendCooldown] = React.useState(0);
  const [isVerified, setIsVerified] = React.useState(false);
  const otpRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    // Start countdown for resend button
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  React.useEffect(() => {
    // Focus first input on mount
    otpRefs.current[0]?.focus();
  }, []);

  React.useEffect(() => {
    // Redirect to signup if no email in state
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (value && newOtp.every(digit => digit !== '')) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus last filled input or next empty one
    const lastIndex = Math.min(pastedData.length, 5);
    otpRefs.current[lastIndex]?.focus();

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleVerifyOtp(pastedData);
    }
  };

  const handleVerifyOtp = async (otpCode: string = otp.join('')) => {
    if (otpCode.length !== 6) {
      setError('Please enter a complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any 6-digit code except 000000
      if (otpCode === '000000') {
        throw new Error('Invalid verification code');
      }

      setIsVerified(true);
      
      // Wait a moment to show success state, then redirect to login
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Email verified successfully! Please log in to continue.',
            type: 'success'
          }
        });
      }, 1500);

    } catch {
      setError('Invalid verification code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendCooldown(60);
    setError('');
    
    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success feedback could be added here
    } catch {
      setError('Failed to resend code. Please try again.');
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h1>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified. Redirecting you to login...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-800 p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <EnvelopeSimple className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
          <p className="text-amber-100">
            We've sent a 6-digit code to
          </p>
          <p className="text-white font-semibold">{email}</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
            {/* OTP Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center space-x-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => otpRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200"
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || otp.some(digit => !digit)}
              className="w-full bg-gradient-to-r from-amber-900 to-orange-800 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-800 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-3">Didn't receive the code?</p>
            <button
              onClick={handleResendOtp}
              disabled={resendCooldown > 0}
              className="text-amber-900 hover:text-amber-700 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
            </button>
          </div>

          {/* Back to Sign Up */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center text-gray-600 hover:text-amber-900 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
