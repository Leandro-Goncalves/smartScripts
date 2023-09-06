"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptScriptsSchema = exports.execScriptsSchema = void 0;
exports.execScriptsSchema = {
    $id: "execScriptsSchema",
    type: "object",
    required: ["exec", "type"],
    properties: {
        confirmToExec: { type: "string", nullable: true },
        exec: { type: "string" },
        type: {
            type: "string",
            const: "exec",
        },
    },
    additionalProperties: false,
    errorMessage: {
        required: {
            exec: "exec is required",
            type: "type exec required",
        },
    },
};
exports.scriptScriptsSchema = {
    $id: "scriptScriptsSchema",
    type: "object",
    required: ["script", "type"],
    properties: {
        confirmToExec: { type: "string", nullable: true },
        script: { type: "string" },
        type: {
            type: "string",
            const: "script",
        },
    },
    additionalProperties: false,
    errorMessage: {
        required: {
            exec: "exec is required",
            type: "type script required",
        },
    },
};
