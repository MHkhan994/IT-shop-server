import { Types } from "mongoose";
import { TCategory, TUpdateCategory } from "./category.interface";
import { Category } from "./category.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TAdminAndUser } from "../../interface/customRequest";
import {
  addNotifications,
  buildNotifications,
} from "../notification/notificaiton.utils";
import {
  sendSourceSocket,
  TSendSourceSocket,
} from "../../utils/sendSourceSocket";
import slugify from "slugify";

const createCategoryIntoDB = async (
  payload: TCategory,
  admin: TAdminAndUser
) => {
  const parent_id = payload.parent_id || null;

  console.log(payload);

  const slug = payload.slug || slugify(payload.name);

  const exist = await Category.findOne({
    slug,
    isDeleted: false,
  });

  if (exist) {
    throw new AppError(httpStatus.CONFLICT, "Category already exist");
  }

  const result = await Category.create({ ...payload, parent_id, slug });

  if (result) {
    const eventPayload: TSendSourceSocket<typeof result> = {
      payload: {
        data: result,
        actionType: "create",
        sourceType: "category",
      },
      event: "category",
      ignore: [`${admin.user?._id}`],
    };

    await sendSourceSocket(eventPayload);

    const notifications = await buildNotifications({
      actionType: "create",
      notificationType: "category",
      source: result._id,
      text: "added a category",
      thisAdmin: admin,
    });

    await addNotifications({ notifications, userFrom: admin });
  }

  return result;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Category.find({ isDeleted: false }).populate([
    {
      path: "product_details_categories",
      select: "-__v",
    },
  ]);

  return categories;
};
const getFeaturedCategoriesFromDB = async () => {
  const categories = await Category.find({ isDeleted: false, isFeatured: true })
    .limit(20)
    .populate([
      {
        path: "product_details_categories",
        select: "-__v",
      },
    ]);

  return categories;
};

const deleteCategoryFromDB = async (id: string, admin: TAdminAndUser) => {
  const exist = await Category.findById(id);

  if (exist) {
    const result = await Category.findByIdAndUpdate(id, { isDeleted: true });

    const eventPayload: TSendSourceSocket<typeof result> = {
      payload: {
        data: result,
        actionType: "delete",
        sourceType: "category",
      },
      event: "category",
      ignore: [`${admin.user?._id}`],
    };

    await sendSourceSocket(eventPayload);

    if (result) {
      const notifications = await buildNotifications({
        actionType: "delete",
        notificationType: "category",
        source: result._id,
        text: "deleted a category",
        thisAdmin: admin,
      });

      await addNotifications({ notifications, userFrom: admin });
    }
    return result;
  } else {
    throw new AppError(httpStatus.CONFLICT, "Categoy does not exist");
  }
};

const updateCategoryIntoDB = async (
  id: string,
  payload: TUpdateCategory,
  admin: TAdminAndUser
) => {
  const exist = await Category.findById(id);
  if (exist) {
    const update = await Category.findByIdAndUpdate(id, payload, { new: true });

    if (!update) {
      throw new AppError(httpStatus.CONFLICT, "Failed to update category");
    }

    const result = await Category.findById(id).populate([
      {
        path: "product_details_categories",
        select: "-__v",
      },
    ]);

    const eventPayload: TSendSourceSocket<typeof result> = {
      payload: {
        data: result,
        actionType: "update",
        sourceType: "category",
      },
      event: "category",
      ignore: [`${admin.user?._id}`],
    };

    await sendSourceSocket(eventPayload);

    if (result) {
      const notifications = await buildNotifications({
        actionType: "update",
        notificationType: "category",
        source: result._id,
        text: "updated a category",
        thisAdmin: admin,
      });

      await addNotifications({ notifications, userFrom: admin });
    }

    return result;
  } else {
    throw new AppError(httpStatus.CONFLICT, "Categoy does not exist");
  }
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id).populate([
    {
      path: "product_details_categories",
      select: "-__v",
    },
  ]);

  if (result === null) {
    throw new AppError(httpStatus.CONFLICT, "Categoy does not exist");
  }

  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  deleteCategoryFromDB,
  updateCategoryIntoDB,
  getSingleCategoryFromDB,
  getFeaturedCategoriesFromDB,
};
