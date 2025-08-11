import { useSearchParams } from "next/navigation";
import { localStorageKeys } from "../enum";
import { getLocalItem } from "../localstorage";

export default function useSharedVariables() {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const registeredDeviceId =
    getLocalItem<string>(localStorageKeys.REGISTERED_DEVICE_ID) || "";
  const userInfo = getLocalItem<{ userId: string; name: string; phone: string }>(
    localStorageKeys.USER_INFO
  );
  return {
    registeredDeviceId,
    queryParams,
    userInfo,
  };
}
