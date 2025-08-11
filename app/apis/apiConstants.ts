export const API_CONSTANTS = {
  registerDevice: `/auth/register`,
  refreshToken: `/auth/refresh`,
  requestOtp: `/auth/request-otp`,
  verifyOtp: `/auth/verify-otp`,
  addContact: `/contact`,
  getContacts: `/contact/list`,
  updateContact: (contactId: string) => `/contact/${contactId}`,
  deleteContact: (contactId: string) => `/contact/${contactId}`,
};
