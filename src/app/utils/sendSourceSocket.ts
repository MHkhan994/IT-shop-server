import { getIO } from "../../socket";
import { TSingleSourceResponse } from "../interface/common";
import { Admin } from "../modules/admin/admin.model";

export type TSendSourceSocket<T> = {
  payload: TSingleSourceResponse<T>;
  ignore?: string[];
  event: string;
};

export const sendSourceSocket = async <T>({
  payload,
  ignore,
  event,
}: TSendSourceSocket<T>) => {
  const exceptRooms = ignore ?? "";

  const admins = await Admin.findAllVerifiedAdmins();
  const io = getIO();
  for (const admin of admins) {
    io.to(`${String(admin.user?._id)}`)
      .except([...exceptRooms])
      .emit(event, payload);
  }
};
