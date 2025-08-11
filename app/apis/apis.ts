import axios from "axios";
import { API_CONSTANTS } from "./apiConstants";
import axiosInstance from "./axiosInstance";
import { IAddContact, IRegisterDevice, IRequestOtp, IVerifyOtp } from "./types";
import { getCookie } from "../utils/cookies";

const getRefreshToken = () => {
  const refreshToken = getCookie("token")?.refreshToken;
  return refreshToken;
};
/**
 * Get Refresh token
 * @param deviceId
 * @returns
 */
export const getRefreshAccessToken = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}${API_CONSTANTS.refreshToken}`,
    {
      refreshToken: getRefreshToken(),
    }
  );
  return res?.data?.response;
};

export const registerDevice = async (payload: IRegisterDevice) => {
  const res = await axiosInstance().post(API_CONSTANTS.registerDevice, payload);
  return res?.data?.data;
};
export const requestOtp = async (payload: IRequestOtp) => {
  const res = await axiosInstance().post(API_CONSTANTS.requestOtp, payload);
  return res?.data?.data;
};
export const verifyOtp = async (payload: IVerifyOtp) => {
  const res = await axiosInstance().post(API_CONSTANTS.verifyOtp, payload);
  return res?.data?.data;
};
export const addContact = async (payload: IAddContact) => {
  const res = await axiosInstance().post(API_CONSTANTS.addContact, payload);
  return res?.data?.data;
};
export const getContacts = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getContacts);
  return res?.data?.data;
};
export const updateContact = async (contactId: string, payload: IAddContact) => {
  const res = await axiosInstance().put(
    API_CONSTANTS.updateContact(contactId),
    payload
  );
  return res?.data?.data;
};
export const deleteContact = async (contactId: string) => {
  const res = await axiosInstance().delete(
    API_CONSTANTS.deleteContact(contactId)
  );
  return res?.data?.data;
};
