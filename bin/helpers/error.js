"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const better_ajv_errors_1 = __importDefault(require("better-ajv-errors"));
const handleError = (schema, smartScripts, errors) => {
    const output = (0, better_ajv_errors_1.default)(schema, smartScripts, errors, {
        indent: 2,
    });
    return output;
};
exports.handleError = handleError;
