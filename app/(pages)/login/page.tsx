"use client";
import useHook from "./useHook";
import Button from "../../shared/Button";
import InputField from "../../shared/InputField";
const Login = () => {
  const { details, handleChange, handleSubmit, isSendingOtp, isVerifyingOtp } =
    useHook();
  const isSubmitting = details?.otpId ? isVerifyingOtp : isSendingOtp;
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#111b21_0%,_#0b141a_55%)] px-4 py-10">
      <form
        className="mx-auto mt-12 w-full max-w-md rounded-2xl border border-[#2a3942] bg-[#111b21]/95 p-6 shadow-2xl shadow-black/40 backdrop-blur"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-[#e9edef]">WhatsApp Login</h1>
          <p className="text-sm text-[#8696a0]">
            {details?.otpId
              ? "Enter the OTP sent to your phone"
              : "Continue with your phone number"}
          </p>
        </div>

        <div className="space-y-4">
          {details?.otpId ? (
            <InputField
              type="tel"
              placeholder="Enter 6-digit OTP"
              className="text-center tracking-[0.3em]"
              value={details?.otp}
              onChange={handleChange}
              name="otp"
              maxLength={6}
              disabled={isSubmitting}
            />
          ) : (
            <InputField
              type="tel"
              placeholder="Enter your phone number"
              className="text-center"
              value={details?.phone}
              onChange={handleChange}
              name="phone"
              disabled={isSubmitting}
            />
          )}

          <Button
            type="submit"
            className="h-11 w-full"
            isLoading={isSubmitting}
            loadingText={details?.otpId ? "Verifying..." : "Sending OTP..."}
          >
            {details?.otpId ? "Verify OTP" : "Request OTP"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
