import { BaseSliceTypes } from '.';

export type AuthSliceTypes = BaseSliceTypes<{
  accessToken: string | null;
  isLogin: boolean;
}>;

export type LoginPayload = {
  email: string;
  password: string;
};
