"use client";
import useHook from "./useHook";
import Button from "../../shared/Button";
import InputField from "../../shared/InputField";
const Login = () => {
  const { details, handleChange, handleSubmit } = useHook();
  return (
    <form
      className="flex flex-col items-center justify-center bg-neutral-900 h-screen gap-4"
      onSubmit={handleSubmit}
    >
      {details?.otpId ? (
        <InputField
          type="tel"
          placeholder="Enter your otp"
          className="text-center"
          value={details?.otp}
          onChange={handleChange}
          name="otp"
          maxLength={6}
        />
      ) : (
        <InputField
          type="tel"
          placeholder="Enter your phone number"
          className="text-center"
          value={details?.phone}
          onChange={handleChange}
          name="phone"
        />
      )}
      <Button>Register</Button>
    </form>
  );
};

export default Login;
