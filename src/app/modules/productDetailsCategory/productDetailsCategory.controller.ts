import {ProductDetailsCategoryServices} from "./productDetailsCategory.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import {Types} from "mongoose";

const createProductDetailsCategory = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await ProductDetailsCategoryServices.createProductDetailsCategoryIntoDB(payload);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "succesfull created product details category",
  });
});

const updateProductDetailsCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await ProductDetailsCategoryServices.updateProductDetailsCategoryIntoDB(id, payload);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: "succesfull updated product details category",
  });
});

export const ProductDetailsCategoryControllers = {
  createProductDetailsCategory,
  updateProductDetailsCategory,
};
