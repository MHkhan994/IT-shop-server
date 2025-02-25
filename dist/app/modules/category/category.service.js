"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const category_model_1 = require("./category.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const notificaiton_utils_1 = require("../notification/notificaiton.utils");
const sendSourceSocket_1 = require("../../utils/sendSourceSocket");
const createCategoryIntoDB = (payload, admin) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parent_id = payload.parent_id || null;
    const result = yield category_model_1.Category.create(Object.assign(Object.assign({}, payload), { parent_id }));
    if (result) {
        const eventPayload = {
            payload: {
                data: result,
                actionType: "create",
                sourceType: "category",
            },
            event: "category",
            ignore: [`${(_a = admin.user) === null || _a === void 0 ? void 0 : _a._id}`],
        };
        yield (0, sendSourceSocket_1.sendSourceSocket)(eventPayload);
        const notifications = yield (0, notificaiton_utils_1.buildNotifications)({
            actionType: "create",
            notificationType: "category",
            source: result._id,
            text: "added a category",
            thisAdmin: admin,
        });
        yield (0, notificaiton_utils_1.addNotifications)({ notifications, userFrom: admin });
    }
    return result;
});
const getAllCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.Category.find({ isDeleted: false }).populate([
        {
            path: "product_details_categories",
            select: "-__v",
        },
    ]);
    const categoryTree = categories;
    return categoryTree;
});
const deleteCategoryFromDB = (id, admin) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const exist = yield category_model_1.Category.findById(id);
    if (exist) {
        const result = yield category_model_1.Category.findByIdAndUpdate(id, { isDeleted: true });
        const eventPayload = {
            payload: {
                data: result,
                actionType: "delete",
                sourceType: "category",
            },
            event: "category",
            ignore: [`${(_a = admin.user) === null || _a === void 0 ? void 0 : _a._id}`],
        };
        yield (0, sendSourceSocket_1.sendSourceSocket)(eventPayload);
        if (result) {
            const notifications = yield (0, notificaiton_utils_1.buildNotifications)({
                actionType: "delete",
                notificationType: "category",
                source: result._id,
                text: "deleted a category",
                thisAdmin: admin,
            });
            yield (0, notificaiton_utils_1.addNotifications)({ notifications, userFrom: admin });
        }
        return result;
    }
    else {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Categoy does not exist");
    }
});
const updateCategoryIntoDB = (id, payload, admin) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const exist = yield category_model_1.Category.findById(id);
    if (exist) {
        const update = yield category_model_1.Category.findByIdAndUpdate(id, payload, { new: true });
        if (!update) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "Failed to update category");
        }
        const result = yield category_model_1.Category.findById(id).populate([
            {
                path: "product_details_categories",
                select: "-__v",
            },
        ]);
        const eventPayload = {
            payload: {
                data: result,
                actionType: "update",
                sourceType: "category",
            },
            event: "category",
            ignore: [`${(_a = admin.user) === null || _a === void 0 ? void 0 : _a._id}`],
        };
        yield (0, sendSourceSocket_1.sendSourceSocket)(eventPayload);
        if (result) {
            const notifications = yield (0, notificaiton_utils_1.buildNotifications)({
                actionType: "update",
                notificationType: "category",
                source: result._id,
                text: "updated a category",
                thisAdmin: admin,
            });
            yield (0, notificaiton_utils_1.addNotifications)({ notifications, userFrom: admin });
        }
        return result;
    }
    else {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Categoy does not exist");
    }
});
const getSingleCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findById(id).populate([
        {
            path: "product_details_categories",
            select: "-__v",
        },
    ]);
    if (result === null) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Categoy does not exist");
    }
    return result;
});
exports.CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    deleteCategoryFromDB,
    updateCategoryIntoDB,
    getSingleCategoryFromDB,
};
