export interface IRegisterDevice {
  identifier: string;
  notificationToken: string;
  type: string;
}

export interface IRequestOtp {
  registeredDeviceId: string;
  mode: string;
  identifier: string;
}

export interface IVerifyOtp {
  otpId: string;
  mode: string;
  otp: string;
}

export interface IAddContact {
  name: string;
  phone: string;
  email: string;
}

export interface IContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}
