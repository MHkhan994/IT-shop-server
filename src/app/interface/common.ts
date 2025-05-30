import { TNotification } from "../modules/notification/notification.interface";

export type TSingleSourceResponse<T> = {
  data: T;
  actionType: TNotification["actionType"];
  sourceType: TNotification["notificationType"];
};
