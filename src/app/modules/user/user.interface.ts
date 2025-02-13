import { Model, Types } from "mongoose";

export interface TUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  isActive?: boolean;
  role: "customer" | string;
  isDeleted?: boolean;
  isVerified?: boolean;
  isMasterAdmin?: boolean;
  passwordChangedAt?: string;
}

export interface TUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string, lean?: boolean): Promise<TUser>;
  isUserVarified(email: string): Promise<boolean>;
  findUserRoleByEmail(email: string): Promise<string>;
  matchUserPassword(
    userPassword: string,
    databasePassword: string
  ): Promise<boolean>;
}
