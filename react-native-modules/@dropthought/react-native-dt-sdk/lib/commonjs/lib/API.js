"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiPostEvent = exports.apiGetVisibilityById = exports.apiGetProgramById = exports.sdkFetcher = void 0;

var _Fetcher = require("./Fetcher");

var _ProgramAPI = require("./ProgramAPI");

var _VisibilityAPI = require("./VisibilityAPI");

var _EventAPI = require("./EventAPI");

var _APIClient = require("./APIClient");

const sdkFetcher = new _Fetcher.Fetcher({
  baseURL: _APIClient.BASE_URL
});
/**
 * @param {APIGetProgramByIdParam} param
 * @param {RequestConfig=} requestConfig
 */

exports.sdkFetcher = sdkFetcher;

const apiGetProgramById = (param, requestConfig) => (0, _ProgramAPI.apiGetProgramById)(param, requestConfig, sdkFetcher);
/**
 * @param {string} visibilityId
 * @param {RequestConfig=} requestConfig
 */


exports.apiGetProgramById = apiGetProgramById;

const apiGetVisibilityById = (visibilityId, requestConfig) => (0, _VisibilityAPI.apiGetVisibilityById)(visibilityId, requestConfig, sdkFetcher);
/**
 *
 * @param {APIPostEventParam} param
 * @param {RequestConfig=} requestConfig
 */


exports.apiGetVisibilityById = apiGetVisibilityById;

const apiPostEvent = (param, requestConfig) => (0, _EventAPI.apiPostEvent)(param, requestConfig, sdkFetcher);
/**
 * @typedef {import('../data').APIGetProgramByIdParam} APIGetProgramByIdParam
 * @typedef {import('../data').APIPostEventParam} APIPostEventParam
 * @typedef {import('../data').RequestConfig} RequestConfig
 * @typedef {import('../data').InitializeParams} InitializeParams
 */


exports.apiPostEvent = apiPostEvent;
//# sourceMappingURL=API.js.map