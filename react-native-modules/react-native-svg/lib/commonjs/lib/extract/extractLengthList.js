"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractLengthList;
const spaceReg = /\s+/;
const commaReg = /,/g;
function extractLengthList(lengthList) {
  if (Array.isArray(lengthList)) {
    return lengthList;
  } else if (typeof lengthList === 'number') {
    return [lengthList];
  } else if (typeof lengthList === 'string') {
    return lengthList.trim().replace(commaReg, ' ').split(spaceReg);
  } else {
    return [];
  }
}
//# sourceMappingURL=extractLengthList.js.map