"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middleware/validateRequest");
const chat_validations_1 = require("./chat.validations");
const chat_controller_1 = require("./chat.controller");
const router = (0, express_1.Router)();
router.post("/create", (0, validateRequest_1.validateRequest)(chat_validations_1.chatValidationSchema.createChatValidationSchema), chat_controller_1.ChatControllers.createChat);
exports.chatRoutes = router;
