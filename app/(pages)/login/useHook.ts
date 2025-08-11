import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { requestOtp, verifyOtp } from "../../apis/apis";
import { decodeToken } from "../../utils/constants";
import { setCookie } from "../../utils/cookies";
import { localStorageKeys } from "../../utils/enum";
import useSharedVariables from "../../utils/hooks/useSharedVariables";
import { setLocalItem } from "../../utils/localstorage";

const useHook = () => {
  const router = useRouter();
  const [details, setDetails] = useState({
    phone: "",
    otp: "",
    otpId: "",
  });
  const { registeredDeviceId } = useSharedVariables();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (details?.otpId) {
      verifyOtpMutation(details?.otp);
    } else {
      sendOtp(details?.phone);
    }
  };

  const { mutate: sendOtp } = useMutation({
    mutationFn: (phone: string) =>
      requestOtp({
        identifier: phone,
        mode: "phone",
        registeredDeviceId,
      }),
    onSuccess: (res) => {
      setDetails((p) => ({ ...p, otpId: res?.id }));
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const { mutate: verifyOtpMutation } = useMutation({
    mutationFn: (otp: string) =>
      verifyOtp({
        otp,
        otpId: details?.otpId,
        mode: "phone",
      }),
    onSuccess: (res) => {
      setCookie(localStorageKeys.AUTH_TOKEN, JSON.stringify(res));
      const decodedToken = decodeToken(res?.accessToken);
      setLocalItem(localStorageKeys.USER_INFO, {
        userId: decodedToken?.userId,
        phone: details?.phone,
      });
      router.push("/home");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    details,
    handleChange,
    handleSubmit,
  };
};

export default useHook;
