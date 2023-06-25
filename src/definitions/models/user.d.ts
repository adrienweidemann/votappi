import { USER } from "../../configs/models.config";

export type UserRole = (typeof USER.ROLE)[keyof typeof USER.ROLE];

export interface AuthenticatedUser {
  id: number;
  name: string;
  token: string;
  role: UserRole;
}
