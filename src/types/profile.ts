import { BaseSliceTypes } from '.';

export type ProfileTypes = {
  name: string;
  email: string;
  website: string;
  createAt: Date | null;
  updateAt: Date | null;
};
export type ProfileSliceTypes = BaseSliceTypes<ProfileTypes>;
