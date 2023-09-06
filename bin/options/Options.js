"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const prompts_1 = __importDefault(require("prompts"));
const confirm = async (message) => {
    const { value } = await (0, prompts_1.default)({
        type: "confirm",
        name: "value",
        message: message ?? "Select the correct option",
    });
    return value;
};
const select = async (choices) => {
    const { value } = await (0, prompts_1.default)({
        type: choices.multipleSelection ? "multiselect" : "select",
        name: "value",
        message: choices.message ?? "Select the correct option",
        instructions: false,
        choices: choices.options.map((op) => ({
            title: op.name ?? "",
            description: op.message,
            value: op.payload,
            selected: op.defaultCheck ?? false,
        })),
        initial: 0,
    });
    return Array.isArray(value) ? value : [value];
};
exports.options = {
    select,
    confirm,
};
