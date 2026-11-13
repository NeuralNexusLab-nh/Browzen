(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.acorn = {}));
})(this, (function (exports) { 'use strict';

  // This file was generated. Do not modify manually!
  var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];

  // This file was generated. Do not modify manually!
  var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];

  // This file was generated. Do not modify manually!
  var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0897-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0cf3\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ece\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\u30fb\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f\uff65";

  // This file was generated. Do not modify manually!
  var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c8a\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7cd\ua7d0\ua7d1\ua7d3\ua7d5-\ua7dc\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";

  // These are a run-length and offset encoded representation of the
  // >0xffff code points that are a valid part of identifiers. The
  // offset starts at 0x10000, and each pair of numbers represents an
  // offset to the next range, and then a size of the range.

  // Reserved word lists for various dialects of the language

  var reservedWords = {
    3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
    5: "class enum extends super const export import",
    6: "enum",
    strict: "implements interface let package private protected public static yield",
    strictBind: "eval arguments"
  };

  // And the keywords

  var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

  var keywords$1 = {
    5: ecma5AndLessKeywords,
    "5module": ecma5AndLessKeywords + " export import",
    6: ecma5AndLessKeywords + " const class extends export import super"
  };

  var keywordRelationalOperator = /^in(stanceof)?$/;

  // ## Character categories

  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

  // This has a complexity linear to the value of the code. The
  // assumption is that looking up astral identifier characters is
  // rare.
  function isInAstralSet(code, set) {
    var pos = 0x10000;
    for (var i = 0; i < set.length; i += 2) {
      pos += set[i];
      if (pos > code) { return false }
      pos += set[i + 1];
      if (pos >= code) { return true }
    }
    return false
  }

  // Test whether a given character code starts an identifier.

  function isIdentifierStart(code, astral) {
    if (code < 65) { return code === 36 }
    if (code < 91) { return true }
    if (code < 97) { return code === 95 }
    if (code < 123) { return true }
    if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code)) }
    if (astral === false) { return false }
    return isInAstralSet(code, astralIdentifierStartCodes)
  }

  // Test whether a given character is part of an identifier.

  function isIdentifierChar(code, astral) {
    if (code < 48) { return code === 36 }
    if (code < 58) { return true }
    if (code < 65) { return false }
    if (code < 91) { return true }
    if (code < 97) { return code === 95 }
    if (code < 123) { return true }
    if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code)) }
    if (astral === false) { return false }
    return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes)
  }

  // ## Token types

  // The assignment of fine-grained, information-carrying type objects
  // allows the tokenizer to store the information it has about a
  // token in a way that is very cheap for the parser to look up.

  // All token type variables start with an underscore, to make them
  // easy to recognize.

  // The `beforeExpr` property is used to disambiguate between regular
  // expressions and divisions. It is set on all token types that can
  // be followed by an expression (thus, a slash after them would be a
  // regular expression).
  //
  // The `startsExpr` property is used to check if the token ends a
  // `yield` expression. It is set on all token types that either can
  // directly start an expression (like a quotation mark) or can
  // continue an expression (like the body of a string).
  //
  // `isLoop` marks a keyword as starting a loop, which is important
  // to know when parsing a label, in order to allow or disallow
  // continue jumps to that label.

  var TokenType = function TokenType(label, conf) {
    if ( conf === void 0 ) conf = {};

    this.label = label;
    this.keyword = conf.keyword;
    this.beforeExpr = !!conf.beforeExpr;
    this.startsExpr = !!conf.startsExpr;
    this.isLoop = !!conf.isLoop;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.binop = conf.binop || null;
    this.updateContext = null;
  };

  function binop(name, prec) {
    return new TokenType(name, {beforeExpr: true, binop: prec})
  }
  var beforeExpr = {beforeExpr: true}, startsExpr = {startsExpr: true};

  // Map keyword names to token types.

  var keywords = {};

  // Succinct definitions of keyword token types
  function kw(name, options) {
    if ( options === void 0 ) options = {};

    options.keyword = name;
    return keywords[name] = new TokenType(name, options)
  }

  var types$1 = {
    num: new TokenType("num", startsExpr),
    regexp: new TokenType("regexp", startsExpr),
    string: new TokenType("string", startsExpr),
    name: new TokenType("name", startsExpr),
    privateId: new TokenType("privateId", startsExpr),
    eof: new TokenType("eof"),

    // Punctuation token types.
    bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}),
    bracketR: new TokenType("]"),
    braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}),
    braceR: new TokenType("}"),
    parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}),
    parenR: new TokenType(")"),
    comma: new TokenType(",", beforeExpr),
    semi: new TokenType(";", beforeExpr),
    colon: new TokenType(":", beforeExpr),
    dot: new TokenType("."),
    question: new TokenType("?", beforeExpr),
    questionDot: new TokenType("?."),
    arrow: new TokenType("=>", beforeExpr),
    template: new TokenType("template"),
    invalidTemplate: new TokenType("invalidTemplate"),
    ellipsis: new TokenType("...", beforeExpr),
    backQuote: new TokenType("`", startsExpr),
    dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}),

    // Operators. These carry several kinds of properties to help the
    // parser use them properly (the presence of these properties is
    // what categorizes them as operators).
    //
    // `binop`, when present, specifies that this operator is a binary
    // operator, and will refer to its precedence.
    //
    // `prefix` and `postfix` mark the operator as a prefix or postfix
    // unary operator.
    //
    // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
    // binary operators with a very low precedence, that should result
    // in AssignmentExpression nodes.

    eq: new TokenType("=", {beforeExpr: true, isAssign: true}),
    assign: new TokenType("_=", {beforeExpr: true, isAssign: true}),
    incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}),
    prefix: new TokenType("!/~", {beforeExpr: true, prefix: true, startsExpr: true}),
    logicalOR: binop("||", 1),
    logicalAND: binop("&&", 2),
    bitwiseOR: binop("|", 3),
    bitwiseXOR: binop("^", 4),
    bitwiseAND: binop("&", 5),
    equality: binop("==/!=/===/!==", 6),
    relational: binop("</>/<=/>=", 7),
    bitShift: binop("<</>>/>>>", 8),
    plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
    modulo: binop("%", 10),
    star: binop("*", 10),
    slash: binop("/", 10),
    starstar: new TokenType("**", {beforeExpr: true}),
    coalesce: binop("??", 1),

    // Keyword token types.
    _break: kw("break"),
    _case: kw("case", beforeExpr),
    _catch: kw("catch"),
    _continue: kw("continue"),
    _debugger: kw("debugger"),
    _default: kw("default", beforeExpr),
    _do: kw("do", {isLoop: true, beforeExpr: true}),
    _else: kw("else", beforeExpr),
    _finally: kw("finally"),
    _for: kw("for", {isLoop: true}),
    _function: kw("function", startsExpr),
    _if: kw("if"),
    _return: kw("return", beforeExpr),
    _switch: kw("switch"),
    _throw: kw("throw", beforeExpr),
    _try: kw("try"),
    _var: kw("var"),
    _const: kw("const"),
    _while: kw("while", {isLoop: true}),
    _with: kw("with"),
    _new: kw("new", {beforeExpr: true, startsExpr: true}),
    _this: kw("this", startsExpr),
    _super: kw("super", startsExpr),
    _class: kw("class", startsExpr),
    _extends: kw("extends", beforeExpr),
    _export: kw("export"),
    _import: kw("import", startsExpr),
    _null: kw("null", startsExpr),
    _true: kw("true", startsExpr),
    _false: kw("false", startsExpr),
    _in: kw("in", {beforeExpr: true, binop: 7}),
    _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}),
    _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}),
    _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}),
    _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})
  };

  // Matches a whole line break (where CRLF is considered a single
  // line break). Used to count lines.

  var lineBreak = /\r\n?|\n|\u2028|\u2029/;
  var lineBreakG = new RegExp(lineBreak.source, "g");

  function isNewLine(code) {
    return code === 10 || code === 13 || code === 0x2028 || code === 0x2029
  }

  function nextLineBreak(code, from, end) {
    if ( end === void 0 ) end = code.length;

    for (var i = from; i < end; i++) {
      var next = code.charCodeAt(i);
      if (isNewLine(next))
        { return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1 }
    }
    return -1
  }

  var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

  var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

  var ref = Object.prototype;
  var hasOwnProperty = ref.hasOwnProperty;
  var toString = ref.toString;

  var hasOwn = Object.hasOwn || (function (obj, propName) { return (
    hasOwnProperty.call(obj, propName)
  ); });

  var isArray = Array.isArray || (function (obj) { return (
    toString.call(obj) === "[object Array]"
  ); });

  var regexpCache = Object.create(null);

  function wordsRegexp(words) {
    return regexpCache[words] || (regexpCache[words] = new RegExp("^(?:" + words.replace(/ /g, "|") + ")$"))
  }

  function codePointToString(code) {
    // UTF-16 Decoding
    if (code <= 0xFFFF) { return String.fromCharCode(code) }
    code -= 0x10000;
    return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
  }

  var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;

  // These are used when `options.locations` is on, for the
  // `startLoc` and `endLoc` properties.

  var Position = function Position(line, col) {
    this.line = line;
    this.column = col;
  };

  Position.prototype.offset = function offset (n) {
    return new Position(this.line, this.column + n)
  };

  var SourceLocation = function SourceLocation(p, start, end) {
    this.start = start;
    this.end = end;
    if (p.sourceFile !== null) { this.source = p.sourceFile; }
  };

  // The `getLineInfo` function is mostly useful when the
  // `locations` option is off (for performance reasons) and you
  // want to find the line/column position for a given character
  // offset. `input` should be the code string that the offset refers
  // into.

  function getLineInfo(input, offset) {
    for (var line = 1, cur = 0;;) {
      var nextBreak = nextLineBreak(input, cur, offset);
      if (nextBreak < 0) { return new Position(line, offset - cur) }
      ++line;
      cur = nextBreak;
    }
  }

  // A second argument must be given to configure the parser process.
  // These options are recognized (only `ecmaVersion` is required):

  var defaultOptions = {
    // `ecmaVersion` indicates the ECMAScript version to parse. Must be
    // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
    // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
    // (the latest version the library supports). This influences
    // support for strict mode, the set of reserved words, and support
    // for new syntax features.
    ecmaVersion: null,
    // `sourceType` indicates the mode the code should be parsed in.
    // Can be either `"script"` or `"module"`. This influences global
    // strict mode and parsing of `import` and `export` declarations.
    sourceType: "script",
    // `onInsertedSemicolon` can be a callback that will be called when
    // a semicolon is automatically inserted. It will be passed the
    // position of the inserted semicolon as an offset, and if
    // `locations` is enabled, it is given the location as a `{line,
    // column}` object as second argument.
    onInsertedSemicolon: null,
    // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
    // trailing commas.
    onTrailingComma: null,
    // By default, reserved words are only enforced if ecmaVersion >= 5.
    // Set `allowReserved` to a boolean value to explicitly turn this on
    // an off. When this option has the value "never", reserved words
    // and keywords can also not be used as property names.
    allowReserved: null,
    // When enabled, a return at the top level is not considered an
    // error.
    allowReturnOutsideFunction: false,
    // When enabled, import/export statements are not constrained to
    // appearing at the top of the program, and an import.meta expression
    // in a script isn't considered an error.
    allowImportExportEverywhere: false,
    // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
    // When enabled, await identifiers are allowed to appear at the top-level scope,
    // but they are still not allowed in non-async functions.
    allowAwaitOutsideFunction: null,
    // When enabled, super identifiers are not constrained to
    // appearing in methods and do not raise an error when they appear elsewhere.
    allowSuperOutsideMethod: null,
    // When enabled, hashbang directive in the beginning of file is
    // allowed and treated as a line comment. Enabled by default when
    // `ecmaVersion` >= 2023.
    allowHashBang: false,
    // By default, the parser will verify that private properties are
    // only used in places where they are valid and have been declared.
    // Set this to false to turn such checks off.
    checkPrivateFields: true,
    // When `locations` is on, `loc` properties holding objects with
    // `start` and `end` properties in `{line, column}` form (with
    // line being 1-based and column 0-based) will be attached to the
    // nodes.
    locations: false,
    // A function can be passed as `onToken` option, which will
    // cause Acorn to call that function with object in the same
    // format as tokens returned from `tokenizer().getToken()`. Note
    // that you are not allowed to call the parser from the
    // callback—that will corrupt its internal state.
    onToken: null,
    // A function can be passed as `onComment` option, which will
    // cause Acorn to call that function with `(block, text, start,
    // end)` parameters whenever a comment is skipped. `block` is a
    // boolean indicating whether this is a block (`/* */`) comment,
    // `text` is the content of the comment, and `start` and `end` are
    // character offsets that denote the start and end of the comment.
    // When the `locations` option is on, two more parameters are
    // passed, the full `{line, column}` locations of the start and
    // end of the comments. Note that you are not allowed to call the
    // parser from the callback—that will corrupt its internal state.
    // When this option has an array as value, objects representing the
    // comments are pushed to it.
    onComment: null,
    // Nodes have their start and end characters offsets recorded in
    // `start` and `end` properties (directly on the node, rather than
    // the `loc` object, which holds line/column data. To also add a
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // It is possible to parse multiple files into a single AST by
    // passing the tree produced by parsing the first file as
    // `program` option in subsequent parses. This will add the
    // toplevel forms of the parsed file to the `Program` (top) node
    // of an existing parse tree.
    program: null,
    // When `locations` is on, you can pass this to record the source
    // file in every node's `loc` object.
    sourceFile: null,
    // This value, if given, is stored in every node, whether
    // `locations` is on or off.
    directSourceFile: null,
    // When enabled, parenthesized expressions are represented by
    // (non-standard) ParenthesizedExpression nodes
    preserveParens: false
  };

  // Interpret and default an options object

  var warnedAboutEcmaVersion = false;

  function getOptions(opts) {
    var options = {};

    for (var opt in defaultOptions)
      { options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt]; }

    if (options.ecmaVersion === "latest") {
      options.ecmaVersion = 1e8;
    } else if (options.ecmaVersion == null) {
      if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
        warnedAboutEcmaVersion = true;
        console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
      }
      options.ecmaVersion = 11;
    } else if (options.ecmaVersion >= 2015) {
      options.ecmaVersion -= 2009;
    }

    if (options.allowReserved == null)
      { options.allowReserved = options.ecmaVersion < 5; }

    if (!opts || opts.allowHashBang == null)
      { options.allowHashBang = options.ecmaVersion >= 14; }

    if (isArray(options.onToken)) {
      var tokens = options.onToken;
      options.onToken = function (token) { return tokens.push(token); };
    }
    if (isArray(options.onComment))
      { options.onComment = pushComment(options, options.onComment); }

    return options
  }

  function pushComment(options, array) {
    return function(block, text, start, end, startLoc, endLoc) {
      var comment = {
        type: block ? "Block" : "Line",
        value: text,
        start: start,
        end: end
      };
      if (options.locations)
        { comment.loc = new SourceLocation(this, startLoc, endLoc); }
      if (options.ranges)
        { comment.range = [start, end]; }
      array.push(comment);
    }
  }

  // Each scope gets a bitset that may contain these flags
  var
      SCOPE_TOP = 1,
      SCOPE_FUNCTION = 2,
      SCOPE_ASYNC = 4,
      SCOPE_GENERATOR = 8,
      SCOPE_ARROW = 16,
      SCOPE_SIMPLE_CATCH = 32,
      SCOPE_SUPER = 64,
      SCOPE_DIRECT_SUPER = 128,
      SCOPE_CLASS_STATIC_BLOCK = 256,
      SCOPE_CLASS_FIELD_INIT = 512,
      SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;

  function functionFlags(async, generator) {
    return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0)
  }

  // Used in checkLVal* and declareName to determine the type of a binding
  var
      BIND_NONE = 0, // Not a binding
      BIND_VAR = 1, // Var-style binding
      BIND_LEXICAL = 2, // Let- or const-style binding
      BIND_FUNCTION = 3, // Function declaration
      BIND_SIMPLE_CATCH = 4, // Simple (identifier pattern) catch binding
      BIND_OUTSIDE = 5; // Special case for function names as bound inside the function

  var Parser = function Parser(options, input, startPos) {
    this.options = options = getOptions(options);
    this.sourceFile = options.sourceFile;
    this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
    var reserved = "";
    if (options.allowReserved !== true) {
      reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
      if (options.sourceType === "module") { reserved += " await"; }
    }
    this.reservedWords = wordsRegexp(reserved);
    var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
    this.reservedWordsStrict = wordsRegexp(reservedStrict);
    this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
    this.input = String(input);

    // Used to signal to callers of `readWord1` whether the word
    // contained any escape sequences. This is needed because words with
    // escape sequences must not be interpreted as keywords.
    this.containsEsc = false;

    // Set up token state

    // The current position of the tokenizer in the input.
    if (startPos) {
      this.pos = startPos;
      this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
      this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
    } else {
      this.pos = this.lineStart = 0;
      this.curLine = 1;
    }

    // Properties of the current token:
    // Its type
    this.type = types$1.eof;
    // For tokens that include more information than their type, the value
    this.value = null;
    // Its start and end offset
    this.start = this.end = this.pos;
    // And, if locations are used, the {line, column} object
    // corresponding to those offsets
    this.startLoc = this.endLoc = this.curPosition();

    // Position information for the previous token
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.
    this.context = this.initialContext();
    this.exprAllowed = true;

    // Figure out if it's a module code.
    this.inModule = options.sourceType === "module";
    this.strict = this.inModule || this.strictDirective(this.pos);

    // Used to signify the start of a potential arrow function
    this.potentialArrowAt = -1;
    this.potentialArrowInForAwait = false;

    // Positions to delayed-check that yield/await does not exist in default parameters.
    this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
    // Labels in scope.
    this.labels = [];
    // Thus-far undefined exports.
    this.undefinedExports = Object.create(null);

    // If enabled, skip leading hashbang line.
    if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!")
      { this.skipLineComment(2); }

    // Scope tracking for duplicate variable names (see scope.js)
    this.scopeStack = [];
    this.enterScope(SCOPE_TOP);

    // For RegExp validation
    this.regexpState = null;

    // The stack of private names.
    // Each element has two properties: 'declared' and 'used'.
    // When it exited from the outermost class definition, all used private names must be declared.
    this.privateNameStack = [];
  };

  var prototypeAccessors = { inFunction: { configurable: true },inGenerator: { configurable: true },inAsync: { configurable: true },canAwait: { configurable: true },allowSuper: { configurable: true },allowDirectSuper: { configurable: true },treatFunctionsAsVar: { configurable: true },allowNewDotTarget: { configurable: true },inClassStaticBlock: { configurable: true } };

  Parser.prototype.parse = function parse () {
    var node = this.options.program || this.startNode();
    this.nextToken();
    return this.parseTopLevel(node)
  };

  prototypeAccessors.inFunction.get = function () { return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0 };

  prototypeAccessors.inGenerator.get = function () { return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 };

  prototypeAccessors.inAsync.get = function () { return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 };

  prototypeAccessors.canAwait.get = function () {
    for (var i = this.scopeStack.length - 1; i >= 0; i--) {
      var ref = this.scopeStack[i];
        var flags = ref.flags;
      if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT)) { return false }
      if (flags & SCOPE_FUNCTION) { return (flags & SCOPE_ASYNC) > 0 }
    }
    return (this.inModule && this.options.ecmaVersion >= 13) || this.options.allowAwaitOutsideFunction
  };

  prototypeAccessors.allowSuper.get = function () {
    var ref = this.currentThisScope();
      var flags = ref.flags;
    return (flags & SCOPE_SUPER) > 0 || this.options.allowSuperOutsideMethod
  };

  prototypeAccessors.allowDirectSuper.get = function () { return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0 };

  prototypeAccessors.treatFunctionsAsVar.get = function () { return this.treatFunctionsAsVarInScope(this.currentScope()) };

  prototypeAccessors.allowNewDotTarget.get = function () {
    for (var i = this.scopeStack.length - 1; i >= 0; i--) {
      var ref = this.scopeStack[i];
        var flags = ref.flags;
      if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT) ||
          ((flags & SCOPE_FUNCTION) && !(flags & SCOPE_ARROW))) { return true }
    }
    return false
  };

  prototypeAccessors.inClassStaticBlock.get = function () {
    return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0
  };

  Parser.extend = function extend () {
      var plugins = [], len = arguments.length;
      while ( len-- ) plugins[ len ] = arguments[ len ];

    var cls = this;
    for (var i = 0; i < plugins.length; i++) { cls = plugins[i](cls); }
    return cls
  };

  Parser.parse = function parse (input, options) {
    return new this(options, input).parse()
  };

  Parser.parseExpressionAt = function parseExpressionAt (input, pos, options) {
    var parser = new this(options, input, pos);
    parser.nextToken();
    return parser.parseExpression()
  };

  Parser.tokenizer = function tokenizer (input, options) {
    return new this(options, input)
  };

  Object.defineProperties( Parser.prototype, prototypeAccessors );

  var pp$9 = Parser.prototype;

  // ## Parser utilities

  var literal = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
  pp$9.strictDirective = function(start) {
    if (this.options.ecmaVersion < 5) { return false }
    for (;;) {
      // Try to find string literal.
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      var match = literal.exec(this.input.slice(start));
      if (!match) { return false }
      if ((match[1] || match[2]) === "use strict") {
        skipWhiteSpace.lastIndex = start + match[0].length;
        var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
        var next = this.input.charAt(end);
        return next === ";" || next === "}" ||
          (lineBreak.test(spaceAfter[0]) &&
           !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "="))
      }
      start += match[0].length;

      // Skip semicolon, if any.
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      if (this.input[start] === ";")
        { start++; }
    }
  };

  // Predicate that tests whether the next token is of the given
  // type, and if yes, consumes it as a side effect.

  pp$9.eat = function(type) {
    if (this.type === type) {
      this.next();
      return true
    } else {
      return false
    }
  };

  // Tests whether parsed token is a contextual keyword.

  pp$9.isContextual = function(name) {
    return this.type === types$1.name && this.value === name && !this.containsEsc
  };

  // Consumes contextual keyword if possible.

  pp$9.eatContextual = function(name) {
    if (!this.isContextual(name)) { return false }
    this.next();
    return true
  };

  // Asserts that following token is given contextual keyword.

  pp$9.expectContextual = function(name) {
    if (!this.eatContextual(name)) { this.unexpected(); }
  };

  // Test whether a semicolon can be inserted at the current position.

  pp$9.canInsertSemicolon = function() {
    return this.type === types$1.eof ||
      this.type === types$1.braceR ||
      lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
  };

  pp$9.insertSemicolon = function() {
    if (this.canInsertSemicolon()) {
      if (this.options.onInsertedSemicolon)
        { this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc); }
      return true
    }
  };

  // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.

  pp$9.semicolon = function() {
    if (!this.eat(types$1.semi) && !this.insertSemicolon()) { this.unexpected(); }
  };

  pp$9.afterTrailingComma = function(tokType, notNext) {
    if (this.type === tokType) {
      if (this.options.onTrailingComma)
        { this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc); }
      if (!notNext)
        { this.next(); }
      return true
    }
  };

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error.

  pp$9.expect = function(type) {
    this.eat(type) || this.unexpected();
  };

  // Raise an unexpected token error.

  pp$9.unexpected = function(pos) {
    this.raise(pos != null ? pos : this.start, "Unexpected token");
  };

  var DestructuringErrors = function DestructuringErrors() {
    this.shorthandAssign =
    this.trailingComma =
    this.parenthesizedAssign =
    this.parenthesizedBind =
    this.doubleProto =
      -1;
  };

  pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
    if (!refDestructuringErrors) { return }
    if (refDestructuringErrors.trailingComma > -1)
      { this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element"); }
    var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
    if (parens > -1) { this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern"); }
  };

  pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
    if (!refDestructuringErrors) { return false }
    var shorthandAssign = refDestructuringErrors.shorthandAssign;
    var doubleProto = refDestructuringErrors.doubleProto;
    if (!andThrow) { return shorthandAssign >= 0 || doubleProto >= 0 }
    if (shorthandAssign >= 0)
      { this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"); }
    if (doubleProto >= 0)
      { this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property"); }
  };

  pp$9.checkYieldAwaitInDefaultParams = function() {
    if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos))
      { this.raise(this.yieldPos, "Yield expression cannot be a default value"); }
    if (this.awaitPos)
      { this.raise(this.awaitPos, "Await expression cannot be a default value"); }
  };

  pp$9.isSimpleAssignTarget = function(expr) {
    if (expr.type === "ParenthesizedExpression")
      { return this.isSimpleAssignTarget(expr.expression) }
    return expr.type === "Identifier" || expr.type === "MemberExpression"
  };

  var pp$8 = Parser.prototype;

  // ### Statement parsing

  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  pp$8.parseTopLevel = function(node) {
    var exports = Object.create(null);
    if (!node.body) { node.body = []; }
    while (this.type !== types$1.eof) {
      var stmt = this.parseStatement(null, true, exports);
      node.body.push(stmt);
    }
    if (this.inModule)
      { for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1)
        {
          var name = list[i];

          this.raiseRecoverable(this.undefinedExports[name].start, ("Export '" + name + "' is not defined"));
        } }
    this.adaptDirectivePrologue(node.body);
    this.next();
    node.sourceType = this.options.sourceType;
    return this.finishNode(node, "Program")
  };

  var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};

  pp$8.isLet = function(context) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) { return false }
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
    // For ambiguous cases, determine if a LexicalDeclaration (or only a
    // Statement) is allowed here. If context is not empty then only a Statement
    // is allowed. However, `let [` is an explicit negative lookahead for
    // ExpressionStatement, so special-case it first.
    if (nextCh === 91 || nextCh === 92) { return true } // '[', '\'
    if (context) { return false }

    if (nextCh === 123 || nextCh > 0xd7ff && nextCh < 0xdc00) { return true } // '{', astral
    if (isIdentifierStart(nextCh, true)) {
      var pos = next + 1;
      while (isIdentifierChar(nextCh = this.input.charCodeAt(pos), true)) { ++pos; }
      if (nextCh === 92 || nextCh > 0xd7ff && nextCh < 0xdc00) { return true }
      var ident = this.input.slice(next, pos);
      if (!keywordRelationalOperator.test(ident)) { return true }
    }
    return false
  };

  // check 'async [no LineTerminator here] function'
  // - 'async /*foo*/ function' is OK.
  // - 'async /*\n*/ function' is invalid.
  pp$8.isAsyncFunction = function() {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
      { return false }

    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length, after;
    return !lineBreak.test(this.input.slice(this.pos, next)) &&
      this.input.slice(next, next + 8) === "function" &&
      (next + 8 === this.input.length ||
       !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 0xd7ff && after < 0xdc00))
  };

  pp$8.isUsingKeyword = function(isAwaitUsing, isFor) {
    if (this.options.ecmaVersion < 17 || !this.isContextual(isAwaitUsing ? "await" : "using"))
      { return false }

    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length;

    if (lineBreak.test(this.input.slice(this.pos, next))) { return false }

    if (isAwaitUsing) {
      var awaitEndPos = next + 5 /* await */, after;
      if (this.input.slice(next, awaitEndPos) !== "using" ||
        awaitEndPos === this.input.length ||
        isIdentifierChar(after = this.input.charCodeAt(awaitEndPos)) ||
        (after > 0xd7ff && after < 0xdc00)
      ) { return false }

      skipWhiteSpace.lastIndex = awaitEndPos;
      var skipAfterUsing = skipWhiteSpace.exec(this.input);
      if (skipAfterUsing && lineBreak.test(this.input.slice(awaitEndPos, awaitEndPos + skipAfterUsing[0].length))) { return false }
    }

    if (isFor) {
      var ofEndPos = next + 2 /* of */, after$1;
      if (this.input.slice(next, ofEndPos) === "of") {
        if (ofEndPos === this.input.length ||
          (!isIdentifierChar(after$1 = this.input.charCodeAt(ofEndPos)) && !(after$1 > 0xd7ff && after$1 < 0xdc00))) { return false }
      }
    }

    var ch = this.input.charCodeAt(next);
    return isIdentifierStart(ch, true) || ch === 92 // '\'
  };

  pp$8.isAwaitUsing = function(isFor) {
    return this.isUsingKeyword(true, isFor)
  };

  pp$8.isUsing = function(isFor) {
    return this.isUsingKeyword(false, isFor)
  };

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo)`, where looking at the previous token
  // does not help.

  pp$8.parseStatement = function(context, topLevel, exports) {
    var starttype = this.type, node = this.startNode(), kind;

    if (this.isLet(context)) {
      starttype = types$1._var;
      kind = "let";
    }

    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.

    switch (starttype) {
    case types$1._break: case types$1._continue: return this.parseBreakContinueStatement(node, starttype.keyword)
    case types$1._debugger: return this.parseDebuggerStatement(node)
    case types$1._do: return this.parseDoStatement(node)
    case types$1._for: return this.parseForStatement(node)
    case types$1._function:
      // Function as sole body of either an if statement or a labeled statement
      // works, but not when it is part of a labeled statement that is the sole
      // body of an if statement.
      if ((context && (this.strict || context !== "if" && context !== "label")) && this.options.ecmaVersion >= 6) { this.unexpected(); }
      return this.parseFunctionStatement(node, false, !context)
    case types$1._class:
      if (context) { this.unexpected(); }
      return this.parseClass(node, true)
    case types$1._if: return this.parseIfStatement(node)
    case types$1._return: return this.parseReturnStatement(node)
    case types$1._switch: return this.parseSwitchStatement(node)
    case types$1._throw: return this.parseThrowStatement(node)
    case types$1._try: return this.parseTryStatement(node)
    case types$1._const: case types$1._var:
      kind = kind || this.value;
      if (context && kind !== "var") { this.unexpected(); }
      return this.parseVarStatement(node, kind)
    case types$1._while: return this.parseWhileStatement(node)
    case types$1._with: return this.parseWithStatement(node)
    case types$1.braceL: return this.parseBlock(true, node)
    case types$1.semi: return this.parseEmptyStatement(node)
    case types$1._export:
    case types$1._import:
      if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
        skipWhiteSpace.lastIndex = this.pos;
        var skip = skipWhiteSpace.exec(this.input);
        var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
        if (nextCh === 40 || nextCh === 46) // '(' or '.'
          { return this.parseExpressionStatement(node, this.parseExpression()) }
      }

      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel)
          { this.raise(this.start, "'import' and 'export' may only appear at the top level"); }
        if (!this.inModule)
          { this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'"); }
      }
      return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports)

      // If the statement does not start with a statement keyword or a
      // brace, it's an ExpressionStatement or LabeledStatement. We
      // simply start parsing an expression, and afterwards, if the
      // next token is a colon and the expression was a simple
      // Identifier node, we switch to interpreting it as a label.
    default:
      if (this.isAsyncFunction()) {
        if (context) { this.unexpected(); }
        this.next();
        return this.parseFunctionStatement(node, true, !context)
      }

      var usingKind = this.isAwaitUsing(false) ? "await using" : this.isUsing(false) ? "using" : null;
      if (usingKind) {
        if (topLevel && this.options.sourceType === "script") {
          this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script`");
        }
        if (usingKind === "await using") {
          if (!this.canAwait) {
            this.raise(this.start, "Await using cannot appear outside of async function");
          }
          this.next();
        }
        this.next();
        this.parseVar(node, false, usingKind);
        this.semicolon();
        return this.finishNode(node, "VariableDeclaration")
      }

      var maybeName = this.value, expr = this.parseExpression();
      if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon))
        { return this.parseLabeledStatement(node, maybeName, expr, context) }
      else { return this.parseExpressionStatement(node, expr) }
    }
  };

  pp$8.parseBreakContinueStatement = function(node, keyword) {
    var isBreak = keyword === "break";
    this.next();
    if (this.eat(types$1.semi) || this.insertSemicolon()) { node.label = null; }
    else if (this.type !== types$1.name) { this.unexpected(); }
    else {
      node.label = this.parseIdent();
      this.semicolon();
    }

    // Verify that there is an actual destination to break or
    // continue to.
    var i = 0;
    for (; i < this.labels.length; ++i) {
      var lab = this.labels[i];
      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) { break }
        if (node.label && isBreak) { break }
      }
    }
    if (i === this.labels.length) { this.raise(node.start, "Unsyntactic " + keyword); }
    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")
  };

  pp$8.parseDebuggerStatement = function(node) {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement")
  };

  pp$8.parseDoStatement = function(node) {
    this.next();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("do");
    this.labels.pop();
    this.expect(types$1._while);
    node.test = this.parseParenExpression();
    if (this.options.ecmaVersion >= 6)
      { this.eat(types$1.semi); }
    else
      { this.semicolon(); }
    return this.finishNode(node, "DoWhileStatement")
  };

  // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
  // loop is non-trivial. Basically, we have to parse the init `var`
  // statement or expression, disallowing the `in` operator (see
  // the second parameter to `parseExpression`), and then check
  // whether the next token is `in` or `of`. When there is no init
  // part (semicolon immediately after the opening parenthesis), it
  // is a regular `for` loop.

  pp$8.parseForStatement = function(node) {
    this.next();
    var awaitAt = (this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await")) ? this.lastTokStart : -1;
    this.labels.push(loopLabel);
    this.enterScope(0);
    this.expect(types$1.parenL);
    if (this.type === types$1.semi) {
      if (awaitAt > -1) { this.unexpected(awaitAt); }
      return this.parseFor(node, null)
    }
    var isLet = this.isLet();
    if (this.type === types$1._var || this.type === types$1._const || isLet) {
      var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
      this.next();
      this.parseVar(init$1, true, kind);
      this.finishNode(init$1, "VariableDeclaration");
      return this.parseForAfterInit(node, init$1, awaitAt)
    }
    var startsWithLet = this.isContextual("let"), isForOf = false;

    var usingKind = this.isUsing(true) ? "using" : this.isAwaitUsing(true) ? "await using" : null;
    if (usingKind) {
      var init$2 = this.startNode();
      this.next();
      if (usingKind === "await using") { this.next(); }
      this.parseVar(init$2, true, usingKind);
      this.finishNode(init$2, "VariableDeclaration");
      return this.parseForAfterInit(node, init$2, awaitAt)
    }
    var containsEsc = this.containsEsc;
    var refDestructuringErrors = new DestructuringErrors;
    var initPos = this.start;
    var init = awaitAt > -1
      ? this.parseExprSubscripts(refDestructuringErrors, "await")
      : this.parseExpression(true, refDestructuringErrors);
    if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      if (awaitAt > -1) { // implies `ecmaVersion >= 9` (see declaration of awaitAt)
        if (this.type === types$1._in) { this.unexpected(awaitAt); }
        node.await = true;
      } else if (isForOf && this.options.ecmaVersion >= 8) {
        if (init.start === initPos && !containsEsc && init.type === "Identifier" && init.name === "async") { this.unexpected(); }
        else if (this.options.ecmaVersion >= 9) { node.await = false; }
      }
      if (startsWithLet && isForOf) { this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'."); }
      this.toAssignable(init, false, refDestructuringErrors);
      this.checkLValPattern(init);
      return this.parseForIn(node, init)
    } else {
      this.checkExpressionErrors(refDestructuringErrors, true);
    }
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, init)
  };

  // Helper method to parse for loop after variable initialization
  pp$8.parseForAfterInit = function(node, init, awaitAt) {
    if ((this.type === types$1._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init.declarations.length === 1) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types$1._in) {
          if (awaitAt > -1) { this.unexpected(awaitAt); }
        } else { node.await = awaitAt > -1; }
      }
      return this.parseForIn(node, init)
    }
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, init)
  };

  pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
    this.next();
    return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync)
  };

  pp$8.parseIfStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    // allow function declarations in branches, but only in non-strict mode
    node.consequent = this.parseStatement("if");
    node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
    return this.finishNode(node, "IfStatement")
  };

  pp$8.parseReturnStatement = function(node) {
    if (!this.inFunction && !this.options.allowReturnOutsideFunction)
      { this.raise(this.start, "'return' outside of function"); }
    this.next();

    // In `return` (and `break`/`continue`), the keywords with
    // optional arguments, we eagerly look for a semicolon or the
    // possibility to insert one.

    if (this.eat(types$1.semi) || this.insertSemicolon()) { node.argument = null; }
    else { node.argument = this.parseExpression(); this.semicolon(); }
    return this.finishNode(node, "ReturnStatement")
  };

  pp$8.parseSwitchStatement = function(node) {
    this.next();
    node.discriminant = this.parseParenExpression();
    node.cases = [];
    this.expect(types$1.braceL);
    this.labels.push(switchLabel);
    this.enterScope(0);

    // Statements under must be grouped (by label) in SwitchCase
    // nodes. `cur` is used to keep the node that we are currently
    // adding statements to.

    var cur;
    for (var sawDefault = false; this.type !== types$1.braceR;) {
      if (this.type === types$1._case || this.type === types$1._default) {
        var isCase = this.type === types$1._case;
        if (cur) { this.finishNode(cur, "SwitchCase"); }
        node.cases.push(cur = this.startNode());
        cur.consequent = [];
        this.next();
        if (isCase) {
          cur.test = this.parseExpression();
        } else {
          if (sawDefault) { this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"); }
          sawDefault = true;
          cur.test = null;
        }
        this.expect(types$1.colon);
      } else {
        if (!cur) { this.unexpected(); }
        cur.consequent.push(this.parseStatement(null));
      }
    }
    this.exitScope();
    if (cur) { this.finishNode(cur, "SwitchCase"); }
    this.next(); // Closing brace
    this.labels.pop();
    return this.finishNode(node, "SwitchStatement")
  };

  pp$8.parseThrowStatement = function(node) {
    this.next();
    if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
      { this.raise(this.lastTokEnd, "Illegal newline after throw"); }
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement")
  };

  // Reused empty array added for node fields that are always empty.

  var empty$1 = [];

  pp$8.parseCatchClauseParam = function() {
    var param = this.parseBindingAtom();
    var simple = param.type === "Identifier";
    this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
    this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
    this.expect(types$1.parenR);

    return param
  };

  pp$8.parseTryStatement = function(node) {
    this.next();
    node.block = this.parseBlock();
    node.handler = null;
    if (this.type === types$1._catch) {
      var clause = this.startNode();
      this.next();
      if (this.eat(types$1.parenL)) {
        clause.param = this.parseCatchClauseParam();
      } else {
        if (this.options.ecmaVersion < 10) { this.unexpected(); }
        clause.param = null;
        this.enterScope(0);
      }
      clause.body = this.parseBlock(false);
      this.exitScope();
      node.handler = this.finishNode(clause, "CatchClause");
    }
    node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
    if (!node.handler && !node.finalizer)
      { this.raise(node.start, "Missing catch or finally clause"); }
    return this.finishNode(node, "TryStatement")
  };

  pp$8.parseVarStatement = function(node, kind, allowMissingInitializer) {
    this.next();
    this.parseVar(node, false, kind, allowMissingInitializer);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration")
  };

  pp$8.parseWhileStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("while");
    this.labels.pop();
    return this.finishNode(node, "WhileStatement")
  };

  pp$8.parseWithStatement = function(node) {
    if (this.strict) { this.raise(this.start, "'with' in strict mode"); }
    this.next();
    node.object = this.parseParenExpression();
    node.body = this.parseStatement("with");
    return this.finishNode(node, "WithStatement")
  };

  pp$8.parseEmptyStatement = function(node) {
    this.next();
    return this.finishNode(node, "EmptyStatement")
  };

  pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
    for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1)
      {
      var label = list[i$1];

      if (label.name === maybeName)
        { this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    } }
    var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
    for (var i = this.labels.length - 1; i >= 0; i--) {
      var label$1 = this.labels[i];
      if (label$1.statementStart === node.start) {
        // Update information about previous labels on this node
        label$1.statementStart = this.start;
        label$1.kind = kind;
      } else { break }
    }
    this.labels.push({name: maybeName, kind: kind, statementStart: this.start});
    node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
    this.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement")
  };

  pp$8.parseExpressionStatement = function(node, expr) {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement")
  };

  // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowStrict` is true (used for
  // function bodies).

  pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
    if ( createNewLexicalScope === void 0 ) createNewLexicalScope = true;
    if ( node === void 0 ) node = this.startNode();

    node.body = [];
    this.expect(types$1.braceL);
    if (createNewLexicalScope) { this.enterScope(0); }
    while (this.type !== types$1.braceR) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    if (exitStrict) { this.strict = false; }
    this.next();
    if (createNewLexicalScope) { this.exitScope(); }
    return this.finishNode(node, "BlockStatement")
  };

  // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.

  pp$8.parseFor = function(node, init) {
    node.init = init;
    this.expect(types$1.semi);
    node.test = this.type === types$1.semi ? null : this.parseExpression();
    this.expect(types$1.semi);
    node.update = this.type === types$1.parenR ? null : this.parseExpression();
    this.expect(types$1.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, "ForStatement")
  };

  // Parse a `for`/`in` and `for`/`of` loop, which are almost
  // same from parser's perspective.

  pp$8.parseForIn = function(node, init) {
    var isForIn = this.type === types$1._in;
    this.next();

    if (
      init.type === "VariableDeclaration" &&
      init.declarations[0].init != null &&
      (
        !isForIn ||
        this.options.ecmaVersion < 8 ||
        this.strict ||
        init.kind !== "var" ||
        init.declarations[0].id.type !== "Identifier"
      )
    ) {
      this.raise(
        init.start,
        ((isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer")
      );
    }
    node.left = init;
    node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
    this.expect(types$1.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement")
  };

  // Parse a list of variable declarations.

  pp$8.parseVar = function(node, isFor, kind, allowMissingInitializer) {
    node.declarations = [];
    node.kind = kind;
    for (;;) {
      var decl = this.startNode();
      this.parseVarId(decl, kind);
      if (this.eat(types$1.eq)) {
        decl.init = this.parseMaybeAssign(isFor);
      } else if (!allowMissingInitializer && kind === "const" && !(this.type === types$1._in || (this.options.ecmaVersion >= 6 && this.isContextual("of")))) {
        this.unexpected();
      } else if (!allowMissingInitializer && (kind === "using" || kind === "await using") && this.options.ecmaVersion >= 17 && this.type !== types$1._in && !this.isContextual("of")) {
        this.raise(this.lastTokEnd, ("Missing initializer in " + kind + " declaration"));
      } else if (!allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
        this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
      } else {
        decl.init = null;
      }
      node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
      if (!this.eat(types$1.comma)) { break }
    }
    return node
  };

  pp$8.parseVarId = function(decl, kind) {
    decl.id = kind === "using" || kind === "await using"
      ? this.parseIdent()
      : this.parseBindingAtom();

    this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
  };

  var FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;

  // Parse a function declaration or literal (depending on the
  // `statement & FUNC_STATEMENT`).

  // Remove `allowExpressionBody` for 7.0.0, as it is only called with false
  pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
    this.initFunction(node);
    if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
      if (this.type === types$1.star && (statement & FUNC_HANGING_STATEMENT))
        { this.unexpected(); }
      node.generator = this.eat(types$1.star);
    }
    if (this.options.ecmaVersion >= 8)
      { node.async = !!isAsync; }

    if (statement & FUNC_STATEMENT) {
      node.id = (statement & FUNC_NULLABLE_ID) && this.type !== types$1.name ? null : this.parseIdent();
      if (node.id && !(statement & FUNC_HANGING_STATEMENT))
        // If it is a regular function declaration in sloppy mode, then it is
        // subject to Annex B semantics (BIND_FUNCTION). Otherwise, the binding
        // mode depends on properties of the current scope (see
        // treatFunctionsAsVar).
        { this.checkLValSimple(node.id, (this.strict || node.generator || node.async) ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION); }
    }

    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(node.async, node.generator));

    if (!(statement & FUNC_STATEMENT))
      { node.id = this.type === types$1.name ? this.parseIdent() : null; }

    this.parseFunctionParams(node);
    this.parseFunctionBody(node, allowExpressionBody, false, forInit);

    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, (statement & FUNC_STATEMENT) ? "FunctionDeclaration" : "FunctionExpression")
  };

  pp$8.parseFunctionParams = function(node) {
    this.expect(types$1.parenL);
    node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
  };

  // Parse a class declaration or literal (depending on the
  // `isStatement` parameter).

  pp$8.parseClass = function(node, isStatement) {
    this.next();

    // ecma-262 14.6 Class Definitions
    // A class definition is always strict mode code.
    var oldStrict = this.strict;
    this.strict = true;

    this.parseClassId(node, isStatement);
    this.parseClassSuper(node);
    var privateNameMap = this.enterClassBody();
    var classBody = this.startNode();
    var hadConstructor = false;
    classBody.body = [];
    this.expect(types$1.braceL);
    while (this.type !== types$1.braceR) {
      var element = this.parseClassElement(node.superClass !== null);
      if (element) {
        classBody.body.push(element);
        if (element.type === "MethodDefinition" && element.kind === "constructor") {
          if (hadConstructor) { this.raiseRecoverable(element.start, "Duplicate constructor in the same class"); }
          hadConstructor = true;
        } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
          this.raiseRecoverable(element.key.start, ("Identifier '#" + (element.key.name) + "' has already been declared"));
        }
      }
    }
    this.strict = oldStrict;
    this.next();
    node.body = this.finishNode(classBody, "ClassBody");
    this.exitClassBody();
    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
  };

  pp$8.parseClassElement = function(constructorAllowsSuper) {
    if (this.eat(types$1.semi)) { return null }

    var ecmaVersion = this.options.ecmaVersion;
    var node = this.startNode();
    var keyName = "";
    var isGenerator = false;
    var isAsync = false;
    var kind = "method";
    var isStatic = false;

    if (this.eatContextual("static")) {
      // Parse static init block
      if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
        this.parseClassStaticBlock(node);
        return node
      }
      if (this.isClassElementNameStart() || this.type === types$1.star) {
        isStatic = true;
      } else {
        keyName = "static";
      }
    }
    node.static = isStatic;
    if (!keyName && ecmaVersion >= 8 && this.eatContextual("async")) {
      if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
        isAsync = true;
      } else {
        keyName = "async";
      }
    }
    if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star)) {
      isGenerator = true;
    }
    if (!keyName && !isAsync && !isGenerator) {
      var lastValue = this.value;
      if (this.eatContextual("get") || this.eatContextual("set")) {
        if (this.isClassElementNameStart()) {
          kind = lastValue;
        } else {
          keyName = lastValue;
        }
      }
    }

    // Parse element name
    if (keyName) {
      // 'async', 'get', 'set', or 'static' were not a keyword contextually.
      // The last token is any of those. Make it the element name.
      node.computed = false;
      node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
      node.key.name = keyName;
      this.finishNode(node.key, "Identifier");
    } else {
      this.parseClassElementName(node);
    }

    // Parse element value
    if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
      var isConstructor = !node.static && checkKeyName(node, "constructor");
      var allowsDirectSuper = isConstructor && constructorAllowsSuper;
      // Couldn't move this check into the 'parseClassMethod' method for backward compatibility.
      if (isConstructor && kind !== "method") { this.raise(node.key.start, "Constructor can't have get/set modifier"); }
      node.kind = isConstructor ? "constructor" : kind;
      this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
    } else {
      this.parseClassField(node);
    }

    return node
  };

  pp$8.isClassElementNameStart = function() {
    return (
      this.type === types$1.name ||
      this.type === types$1.privateId ||
      this.type === types$1.num ||
      this.type === types$1.string ||
      this.type === types$1.bracketL ||
      this.type.keyword
    )
  };

  pp$8.parseClassElementName = function(element) {
    if (this.type === types$1.privateId) {
      if (this.value === "constructor") {
        this.raise(this.start, "Classes can't have an element named '#constructor'");
      }
      element.computed = false;
      element.key = this.parsePrivateIdent();
    } else {
      this.parsePropertyName(element);
    }
  };

  pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
    // Check key and flags
    var key = method.key;
    if (method.kind === "constructor") {
      if (isGenerator) { this.raise(key.start, "Constructor can't be a generator"); }
      if (isAsync) { this.raise(key.start, "Constructor can't be an async method"); }
    } else if (method.static && checkKeyName(method, "prototype")) {
      this.raise(key.start, "Classes may not have a static property named prototype");
    }

    // Parse value
    var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);

    // Check value
    if (method.kind === "get" && value.params.length !== 0)
      { this.raiseRecoverable(value.start, "getter should have no params"); }
    if (method.kind === "set" && value.params.length !== 1)
      { this.raiseRecoverable(value.start, "setter should have exactly one param"); }
    if (method.kind === "set" && value.params[0].type === "RestElement")
      { this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params"); }

    return this.finishNode(method, "MethodDefinition")
  };

  pp$8.parseClassField = function(field) {
    if (checkKeyName(field, "constructor")) {
      this.raise(field.key.start, "Classes can't have a field named 'constructor'");
    } else if (field.static && checkKeyName(field, "prototype")) {
      this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
    }

    if (this.eat(types$1.eq)) {
      // To raise SyntaxError if 'arguments' exists in the initializer.
      this.enterScope(SCOPE_CLASS_FIELD_INIT | SCOPE_SUPER);
      field.value = this.parseMaybeAssign();
      this.exitScope();
    } else {
      field.value = null;
    }
    this.semicolon();

    return this.finishNode(field, "PropertyDefinition")
  };

  pp$8.parseClassStaticBlock = function(node) {
    node.body = [];

    var oldLabels = this.labels;
    this.labels = [];
    this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
    while (this.type !== types$1.braceR) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    this.next();
    this.exitScope();
    this.labels = oldLabels;

    return this.finishNode(node, "StaticBlock")
  };

  pp$8.parseClassId = function(node, isStatement) {
    if (this.type === types$1.name) {
      node.id = this.parseIdent();
      if (isStatement)
        { this.checkLValSimple(node.id, BIND_LEXICAL, false); }
    } else {
      if (isStatement === true)
        { this.unexpected(); }
      node.id = null;
    }
  };

  pp$8.parseClassSuper = function(node) {
    node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
  };

  pp$8.enterClassBody = function() {
    var element = {declared: Object.create(null), used: []};
    this.privateNameStack.push(element);
    return element.declared
  };

  pp$8.exitClassBody = function() {
    var ref = this.privateNameStack.pop();
    var declared = ref.declared;
    var used = ref.used;
    if (!this.options.checkPrivateFields) { return }
    var len = this.privateNameStack.length;
    var parent = len === 0 ? null : this.privateNameStack[len - 1];
    for (var i = 0; i < used.length; ++i) {
      var id = used[i];
      if (!hasOwn(declared, id.name)) {
        if (parent) {
          parent.used.push(id);
        } else {
          this.raiseRecoverable(id.start, ("Private field '#" + (id.name) + "' must be declared in an enclosing class"));
        }
      }
    }
  };

  function isPrivateNameConflicted(privateNameMap, element) {
    var name = element.key.name;
    var curr = privateNameMap[name];

    var next = "true";
    if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
      next = (element.static ? "s" : "i") + element.kind;
    }

    // `class { get #a(){}; static set #a(_){} }` is also conflict.
    if (
      curr === "iget" && next === "iset" ||
      curr === "iset" && next === "iget" ||
      curr === "sget" && next === "sset" ||
      curr === "sset" && next === "sget"
    ) {
      privateNameMap[name] = "true";
      return false
    } else if (!curr) {
      privateNameMap[name] = next;
      return false
    } else {
      return true
    }
  }

  function checkKeyName(node, name) {
    var computed = node.computed;
    var key = node.key;
    return !computed && (
      key.type === "Identifier" && key.name === name ||
      key.type === "Literal" && key.value === name
    )
  }

  // Parses module export declaration.

  pp$8.parseExportAllDeclaration = function(node, exports) {
    if (this.options.ecmaVersion >= 11) {
      if (this.eatContextual("as")) {
        node.exported = this.parseModuleExportName();
        this.checkExport(exports, node.exported, this.lastTokStart);
      } else {
        node.exported = null;
      }
    }
    this.expectContextual("from");
    if (this.type !== types$1.string) { this.unexpected(); }
    node.source = this.parseExprAtom();
    if (this.options.ecmaVersion >= 16)
      { node.attributes = this.parseWithClause(); }
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration")
  };

  pp$8.parseExport = function(node, exports) {
    this.next();
    // export * from '...'
    if (this.eat(types$1.star)) {
      return this.parseExportAllDeclaration(node, exports)
    }
    if (this.eat(types$1._default)) { // export default ...
      this.checkExport(exports, "default", this.lastTokStart);
      node.declaration = this.parseExportDefaultDeclaration();
      return this.finishNode(node, "ExportDefaultDeclaration")
    }
    // export var|const|let|function|class ...
    if (this.shouldParseExportStatement()) {
      node.declaration = this.parseExportDeclaration(node);
      if (node.declaration.type === "VariableDeclaration")
        { this.checkVariableExport(exports, node.declaration.declarations); }
      else
        { this.checkExport(exports, node.declaration.id, node.declaration.id.start); }
      node.specifiers = [];
      node.source = null;
      if (this.options.ecmaVersion >= 16)
        { node.attributes = []; }
    } else { // export { x, y as z } [from '...']
      node.declaration = null;
      node.specifiers = this.parseExportSpecifiers(exports);
      if (this.eatContextual("from")) {
        if (this.type !== types$1.string) { this.unexpected(); }
        node.source = this.parseExprAtom();
        if (this.options.ecmaVersion >= 16)
          { node.attributes = this.parseWithClause(); }
      } else {
        for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
          // check for keywords used as local names
          var spec = list[i];

          this.checkUnreserved(spec.local);
          // check if export is defined
          this.checkLocalExport(spec.local);

          if (spec.local.type === "Literal") {
            this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
          }
        }

        node.source = null;
        if (this.options.ecmaVersion >= 16)
          { node.attributes = []; }
      }
      this.semicolon();
    }
    return this.finishNode(node, "ExportNamedDeclaration")
  };

  pp$8.parseExportDeclaration = function(node) {
    return this.parseStatement(null)
  };

  pp$8.parseExportDefaultDeclaration = function() {
    var isAsync;
    if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) { this.next(); }
      return this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync)
    } else if (this.type === types$1._class) {
      var cNode = this.startNode();
      return this.parseClass(cNode, "nullableID")
    } else {
      var declaration = this.parseMaybeAssign();
      this.semicolon();
      return declaration
    }
  };

  pp$8.checkExport = function(exports, name, pos) {
    if (!exports) { return }
    if (typeof name !== "string")
      { name = name.type === "Identifier" ? name.name : name.value; }
    if (hasOwn(exports, name))
      { this.raiseRecoverable(pos, "Duplicate export '" + name + "'"); }
    exports[name] = true;
  };

  pp$8.checkPatternExport = function(exports, pat) {
    var type = pat.type;
    if (type === "Identifier")
      { this.checkExport(exports, pat, pat.start); }
    else if (type === "ObjectPattern")
      { for (var i = 0, list = pat.properties; i < list.length; i += 1)
        {
          var prop = list[i];

          this.checkPatternExport(exports, prop);
        } }
    else if (type === "ArrayPattern")
      { for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
        var elt = list$1[i$1];

          if (elt) { this.checkPatternExport(exports, elt); }
      } }
    else if (type === "Property")
      { this.checkPatternExport(exports, pat.value); }
    else if (type === "AssignmentPattern")
      { this.checkPatternExport(exports, pat.left); }
    else if (type === "RestElement")
      { this.checkPatternExport(exports, pat.argument); }
  };

  pp$8.checkVariableExport = function(exports, decls) {
    if (!exports) { return }
    for (var i = 0, list = decls; i < list.length; i += 1)
      {
      var decl = list[i];

      this.checkPatternExport(exports, decl.id);
    }
  };

  pp$8.shouldParseExportStatement = function() {
    return this.type.keyword === "var" ||
      this.type.keyword === "const" ||
      this.type.keyword === "class" ||
      this.type.keyword === "function" ||
      this.isLet() ||
      this.isAsyncFunction()
  };

  // Parses a comma-separated list of module exports.

  pp$8.parseExportSpecifier = function(exports) {
    var node = this.startNode();
    node.local = this.parseModuleExportName();

    node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
    this.checkExport(
      exports,
      node.exported,
      node.exported.start
    );

    return this.finishNode(node, "ExportSpecifier")
  };

  pp$8.parseExportSpecifiers = function(exports) {
    var nodes = [], first = true;
    // export { x, y as z } [from '...']
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) { break }
      } else { first = false; }

      nodes.push(this.parseExportSpecifier(exports));
    }
    return nodes
  };

  // Parses import declaration.

  pp$8.parseImport = function(node) {
    this.next();

    // import '...'
    if (this.type === types$1.string) {
      node.specifiers = empty$1;
      node.source = this.parseExprAtom();
    } else {
      node.specifiers = this.parseImportSpecifiers();
      this.expectContextual("from");
      node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
    }
    if (this.options.ecmaVersion >= 16)
      { node.attributes = this.parseWithClause(); }
    this.semicolon();
    return this.finishNode(node, "ImportDeclaration")
  };

  // Parses a comma-separated list of module imports.

  pp$8.parseImportSpecifier = function() {
    var node = this.startNode();
    node.imported = this.parseModuleExportName();

    if (this.eatContextual("as")) {
      node.local = this.parseIdent();
    } else {
      this.checkUnreserved(node.imported);
      node.local = node.imported;
    }
    this.checkLValSimple(node.local, BIND_LEXICAL);

    return this.finishNode(node, "ImportSpecifier")
  };

  pp$8.parseImportDefaultSpecifier = function() {
    // import defaultObj, { x, y as z } from '...'
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportDefaultSpecifier")
  };

  pp$8.parseImportNamespaceSpecifier = function() {
    var node = this.startNode();
    this.next();
    this.expectContextual("as");
    node.local = this.parseIdent();
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportNamespaceSpecifier")
  };

  pp$8.parseImportSpecifiers = function() {
    var nodes = [], first = true;
    if (this.type === types$1.name) {
      nodes.push(this.parseImportDefaultSpecifier());
      if (!this.eat(types$1.comma)) { return nodes }
    }
    if (this.type === types$1.star) {
      nodes.push(this.parseImportNamespaceSpecifier());
      return nodes
    }
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) { break }
      } else { first = false; }

      nodes.push(this.parseImportSpecifier());
    }
    return nodes
  };

  pp$8.parseWithClause = function() {
    var nodes = [];
    if (!this.eat(types$1._with)) {
      return nodes
    }
    this.expect(types$1.braceL);
    var attributeKeys = {};
    var first = true;
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) { break }
      } else { first = false; }

      var attr = this.parseImportAttribute();
      var keyName = attr.key.type === "Identifier" ? attr.key.name : attr.key.value;
      if (hasOwn(attributeKeys, keyName))
        { this.raiseRecoverable(attr.key.start, "Duplicate attribute key '" + keyName + "'"); }
      attributeKeys[keyName] = true;
      nodes.push(attr);
    }
    return nodes
  };

  pp$8.parseImportAttribute = function() {
    var node = this.startNode();
    node.key = this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
    this.expect(types$1.colon);
    if (this.type !== types$1.string) {
      this.unexpected();
    }
    node.value = this.parseExprAtom();
    return this.finishNode(node, "ImportAttribute")
  };

  pp$8.parseModuleExportName = function() {
    if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
      var stringLiteral = this.parseLiteral(this.value);
      if (loneSurrogate.test(stringLiteral.value)) {
        this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
      }
      return stringLiteral
    }
    return this.parseIdent(true)
  };

  // Set `ExpressionStatement#directive` property for directive prologues.
  pp$8.adaptDirectivePrologue = function(statements) {
    for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
      statements[i].directive = statements[i].expression.raw.slice(1, -1);
    }
  };
  pp$8.isDirectiveCandidate = function(statement) {
    return (
      this.options.ecmaVersion >= 5 &&
      statement.type === "ExpressionStatement" &&
      statement.expression.type === "Literal" &&
      typeof statement.expression.value === "string" &&
      // Reject parenthesized strings.
      (this.input[statement.start] === "\"" || this.input[statement.start] === "'")
    )
  };

  var pp$7 = Parser.prototype;

  // Convert existing expression atom to assignable pattern
  // if possible.

  pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 6 && node) {
      switch (node.type) {
      case "Identifier":
        if (this.inAsync && node.name === "await")
          { this.raise(node.start, "Cannot use 'await' as identifier inside an async function"); }
        break

      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break

      case "ObjectExpression":
        node.type = "ObjectPattern";
        if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
        for (var i = 0, list = node.properties; i < list.length; i += 1) {
          var prop = list[i];

        this.toAssignable(prop, isBinding);
          // Early error:
          //   AssignmentRestProperty[Yield, Await] :
          //     `...` DestructuringAssignmentTarget[Yield, Await]
          //
          //   It is a Syntax Error if |DestructuringAssignmentTarget| is an |ArrayLiteral| or an |ObjectLiteral|.
          if (
            prop.type === "RestElement" &&
            (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")
          ) {
            this.raise(prop.argument.start, "Unexpected token");
          }
        }
        break

      case "Property":
        // AssignmentProperty has type === "Property"
        if (node.kind !== "init") { this.raise(node.key.start, "Object pattern can't contain getter or setter"); }
        this.toAssignable(node.value, isBinding);
        break

      case "ArrayExpression":
        node.type = "ArrayPattern";
        if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
        this.toAssignableList(node.elements, isBinding);
        break

      case "SpreadElement":
        node.type = "RestElement";
        this.toAssignable(node.argument, isBinding);
        if (node.argument.type === "AssignmentPattern")
          { this.raise(node.argument.start, "Rest elements cannot have a default value"); }
        break

      case "AssignmentExpression":
        if (node.operator !== "=") { this.raise(node.left.end, "Only '=' operator can be used for specifying default value."); }
        node.type = "AssignmentPattern";
        delete node.operator;
        this.toAssignable(node.left, isBinding);
        break

      case "ParenthesizedExpression":
        this.toAssignable(node.expression, isBinding, refDestructuringErrors);
        break

      case "ChainExpression":
        this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
        break

      case "MemberExpression":
        if (!isBinding) { break }

      default:
        this.raise(node.start, "Assigning to rvalue");
      }
    } else if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
    return node
  };

  // Convert list of expression atoms to binding list.

  pp$7.toAssignableList = function(exprList, isBinding) {
    var end = exprList.length;
    for (var i = 0; i < end; i++) {
      var elt = exprList[i];
      if (elt) { this.toAssignable(elt, isBinding); }
    }
    if (end) {
      var last = exprList[end - 1];
      if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier")
        { this.unexpected(last.argument.start); }
    }
    return exprList
  };

  // Parses spread element.

  pp$7.parseSpread = function(refDestructuringErrors) {
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    return this.finishNode(node, "SpreadElement")
  };

  pp$7.parseRestBinding = function() {
    var node = this.startNode();
    this.next();

    // RestElement inside of a function parameter must be an identifier
    if (this.options.ecmaVersion === 6 && this.type !== types$1.name)
      { this.unexpected(); }

    node.argument = this.parseBindingAtom();

    return this.finishNode(node, "RestElement")
  };

  // Parses lvalue (assignable) atom.

  pp$7.parseBindingAtom = function() {
    if (this.options.ecmaVersion >= 6) {
      switch (this.type) {
      case types$1.bracketL:
        var node = this.startNode();
        this.next();
        node.elements = this.parseBindingList(types$1.bracketR, true, true);
        return this.finishNode(node, "ArrayPattern")

      case types$1.braceL:
        return this.parseObj(true)
      }
    }
    return this.parseIdent()
  };

  pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma, allowModifiers) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (first) { first = false; }
      else { this.expect(types$1.comma); }
      if (allowEmpty && this.type === types$1.comma) {
        elts.push(null);
      } else if (allowTrailingComma && this.afterTrailingComma(close)) {
        break
      } else if (this.type === types$1.ellipsis) {
        var rest = this.parseRestBinding();
        this.parseBindingListItem(rest);
        elts.push(rest);
        if (this.type === types$1.comma) { this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"); }
        this.expect(close);
        break
      } else {
        elts.push(this.parseAssignableListItem(allowModifiers));
      }
    }
    return elts
  };

  pp$7.parseAssignableListItem = function(allowModifiers) {
    var elem = this.parseMaybeDefault(this.start, this.startLoc);
    this.parseBindingListItem(elem);
    return elem
  };

  pp$7.parseBindingListItem = function(param) {
    return param
  };

  // Parses assignment pattern around given atom if possible.

  pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
    left = left || this.parseBindingAtom();
    if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) { return left }
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, "AssignmentPattern")
  };

  // The following three functions all verify that a node is an lvalue —
  // something that can be bound, or assigned to. In order to do so, they perform
  // a variety of checks:
  //
  // - Check that none of the bound/assigned-to identifiers are reserved words.
  // - Record name declarations for bindings in the appropriate scope.
  // - Check duplicate argument names, if checkClashes is set.
  //
  // If a complex binding pattern is encountered (e.g., object and array
  // destructuring), the entire pattern is recursively checked.
  //
  // There are three versions of checkLVal*() appropriate for different
  // circumstances:
  //
  // - checkLValSimple() shall be used if the syntactic construct supports
  //   nothing other than identifiers and member expressions. Parenthesized
  //   expressions are also correctly handled. This is generally appropriate for
  //   constructs for which the spec says
  //
  //   > It is a Syntax Error if AssignmentTargetType of [the production] is not
  //   > simple.
  //
  //   It is also appropriate for checking if an identifier is valid and not
  //   defined elsewhere, like import declarations or function/class identifiers.
  //
  //   Examples where this is used include:
  //     a += …;
  //     import a from '…';
  //   where a is the node to be checked.
  //
  // - checkLValPattern() shall be used if the syntactic construct supports
  //   anything checkLValSimple() supports, as well as object and array
  //   destructuring patterns. This is generally appropriate for constructs for
  //   which the spec says
  //
  //   > It is a Syntax Error if [the production] is neither an ObjectLiteral nor
  //   > an ArrayLiteral and AssignmentTargetType of [the production] is not
  //   > simple.
  //
  //   Examples where this is used include:
  //     (a = …);
  //     const a = …;
  //     try { … } catch (a) { … }
  //   where a is the node to be checked.
  //
  // - checkLValInnerPattern() shall be used if the syntactic construct supports
  //   anything checkLValPattern() supports, as well as default assignment
  //   patterns, rest elements, and other constructs that may appear within an
  //   object or array destructuring pattern.
  //
  //   As a special case, function parameters also use checkLValInnerPattern(),
  //   as they also support defaults and rest constructs.
  //
  // These functions deliberately support both assignment and binding constructs,
  // as the logic for both is exceedingly similar. If the node is the target of
  // an assignment, then bindingType should be set to BIND_NONE. Otherwise, it
  // should be set to the appropriate BIND_* constant, like BIND_VAR or
  // BIND_LEXICAL.
  //
  // If the function is called with a non-BIND_NONE bindingType, then
  // additionally a checkClashes object may be specified to allow checking for
  // duplicate argument names. checkClashes is ignored if the provided construct
  // is an assignment (i.e., bindingType is BIND_NONE).

  pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
    if ( bindingType === void 0 ) bindingType = BIND_NONE;

    var isBind = bindingType !== BIND_NONE;

    switch (expr.type) {
    case "Identifier":
      if (this.strict && this.reservedWordsStrictBind.test(expr.name))
        { this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode"); }
      if (isBind) {
        if (bindingType === BIND_LEXICAL && expr.name === "let")
          { this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name"); }
        if (checkClashes) {
          if (hasOwn(checkClashes, expr.name))
            { this.raiseRecoverable(expr.start, "Argument name clash"); }
          checkClashes[expr.name] = true;
        }
        if (bindingType !== BIND_OUTSIDE) { this.declareName(expr.name, bindingType, expr.start); }
      }
      break

    case "ChainExpression":
      this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
      break

    case "MemberExpression":
      if (isBind) { this.raiseRecoverable(expr.start, "Binding member expression"); }
      break

    case "ParenthesizedExpression":
      if (isBind) { this.raiseRecoverable(expr.start, "Binding parenthesized expression"); }
      return this.checkLValSimple(expr.expression, bindingType, checkClashes)

    default:
      this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
    }
  };

  pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
    if ( bindingType === void 0 ) bindingType = BIND_NONE;

    switch (expr.type) {
    case "ObjectPattern":
      for (var i = 0, list = expr.properties; i < list.length; i += 1) {
        var prop = list[i];

      this.checkLValInnerPattern(prop, bindingType, checkClashes);
      }
      break

    case "ArrayPattern":
      for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
        var elem = list$1[i$1];

      if (elem) { this.checkLValInnerPattern(elem, bindingType, checkClashes); }
      }
      break

    default:
      this.checkLValSimple(expr, bindingType, checkClashes);
    }
  };

  pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
    if ( bindingType === void 0 ) bindingType = BIND_NONE;

    switch (expr.type) {
    case "Property":
      // AssignmentProperty has type === "Property"
      this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
      break

    case "AssignmentPattern":
      this.checkLValPattern(expr.left, bindingType, checkClashes);
      break

    case "RestElement":
      this.checkLValPattern(expr.argument, bindingType, checkClashes);
      break

    default:
      this.checkLValPattern(expr, bindingType, checkClashes);
    }
  };

  // The algorithm used to determine whether a regexp can appear at a
  // given point in the program is loosely based on sweet.js' approach.
  // See https://github.com/mozilla/sweet.js/wiki/design


  var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
    this.token = token;
    this.isExpr = !!isExpr;
    this.preserveSpace = !!preserveSpace;
    this.override = override;
    this.generator = !!generator;
  };

  var types = {
    b_stat: new TokContext("{", false),
    b_expr: new TokContext("{", true),
    b_tmpl: new TokContext("${", false),
    p_stat: new TokContext("(", false),
    p_expr: new TokContext("(", true),
    q_tmpl: new TokContext("`", true, true, function (p) { return p.tryReadTemplateToken(); }),
    f_stat: new TokContext("function", false),
    f_expr: new TokContext("function", true),
    f_expr_gen: new TokContext("function", true, false, null, true),
    f_gen: new TokContext("function", false, false, null, true)
  };

  var pp$6 = Parser.prototype;

  pp$6.initialContext = function() {
    return [types.b_stat]
  };

  pp$6.curContext = function() {
    return this.context[this.context.length - 1]
  };

  pp$6.braceIsBlock = function(prevType) {
    var parent = this.curContext();
    if (parent === types.f_expr || parent === types.f_stat)
      { return true }
    if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr))
      { return !parent.isExpr }

    // The check for `tt.name && exprAllowed` detects whether we are
    // after a `yield` or `of` construct. See the `updateContext` for
    // `tt.name`.
    if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed)
      { return lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) }
    if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow)
      { return true }
    if (prevType === types$1.braceL)
      { return parent === types.b_stat }
    if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name)
      { return false }
    return !this.exprAllowed
  };

  pp$6.inGeneratorContext = function() {
    for (var i = this.context.length - 1; i >= 1; i--) {
      var context = this.context[i];
      if (context.token === "function")
        { return context.generator }
    }
    return false
  };

  pp$6.updateContext = function(prevType) {
    var update, type = this.type;
    if (type.keyword && prevType === types$1.dot)
      { this.exprAllowed = false; }
    else if (update = type.updateContext)
      { update.call(this, prevType); }
    else
      { this.exprAllowed = type.beforeExpr; }
  };

  // Used to handle edge cases when token context could not be inferred correctly during tokenization phase

  pp$6.overrideContext = function(tokenCtx) {
    if (this.curContext() !== tokenCtx) {
      this.context[this.context.length - 1] = tokenCtx;
    }
  };

  // Token-specific context update code

  types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
    if (this.context.length === 1) {
      this.exprAllowed = true;
      return
    }
    var out = this.context.pop();
    if (out === types.b_stat && this.curContext().token === "function") {
      out = this.context.pop();
    }
    this.exprAllowed = !out.isExpr;
  };

  types$1.braceL.updateContext = function(prevType) {
    this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
    this.exprAllowed = true;
  };

  types$1.dollarBraceL.updateContext = function() {
    this.context.push(types.b_tmpl);
    this.exprAllowed = true;
  };

  types$1.parenL.updateContext = function(prevType) {
    var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
    this.context.push(statementParens ? types.p_stat : types.p_expr);
    this.exprAllowed = true;
  };

  types$1.incDec.updateContext = function() {
    // tokExprAllowed stays unchanged
  };

  types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
    if (prevType.beforeExpr && prevType !== types$1._else &&
        !(prevType === types$1.semi && this.curContext() !== types.p_stat) &&
        !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) &&
        !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat))
      { this.context.push(types.f_expr); }
    else
      { this.context.push(types.f_stat); }
    this.exprAllowed = false;
  };

  types$1.colon.updateContext = function() {
    if (this.curContext().token === "function") { this.context.pop(); }
    this.exprAllowed = true;
  };

  types$1.backQuote.updateContext = function() {
    if (this.curContext() === types.q_tmpl)
      { this.context.pop(); }
    else
      { this.context.push(types.q_tmpl); }
    this.exprAllowed = false;
  };

  types$1.star.updateContext = function(prevType) {
    if (prevType === types$1._function) {
      var index = this.context.length - 1;
      if (this.context[index] === types.f_expr)
        { this.context[index] = types.f_expr_gen; }
      else
        { this.context[index] = types.f_gen; }
    }
    this.exprAllowed = true;
  };

  types$1.name.updateContext = function(prevType) {
    var allowed = false;
    if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
      if (this.value === "of" && !this.exprAllowed ||
          this.value === "yield" && this.inGeneratorContext())
        { allowed = true; }
    }
    this.exprAllowed = allowed;
  };

  // A recursive descent parser operates by defining functions for all
  // syntactic elements, and recursively calling those, each function
  // advancing the input stream and returning an AST node. Precedence
  // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
  // instead of `(!x)[1]` is handled by the fact that the parser
  // function that parses unary prefix operators is called first, and
  // in turn calls the function that parses `[]` subscripts — that
  // way, it'll receive the node for `x[1]` already parsed, and wraps
  // *that* in the unary operator node.
  //
  // Acorn uses an [operator precedence parser][opp] to handle binary
  // operator precedence, because it is much more compact than using
  // the technique outlined above, which uses different, nesting
  // functions to specify precedence, for all of the ten binary
  // precedence levels that JavaScript defines.
  //
  // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser


  var pp$5 = Parser.prototype;

  // Check if property name clashes with already added.
  // Object/class getters and setters are not allowed to clash —
  // either with each other or with an init property — and in
  // strict mode, init properties are also not allowed to be repeated.

  pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement")
      { return }
    if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))
      { return }
    var key = prop.key;
    var name;
    switch (key.type) {
    case "Identifier": name = key.name; break
    case "Literal": name = String(key.value); break
    default: return
    }
    var kind = prop.kind;
    if (this.options.ecmaVersion >= 6) {
      if (name === "__proto__" && kind === "init") {
        if (propHash.proto) {
          if (refDestructuringErrors) {
            if (refDestructuringErrors.doubleProto < 0) {
              refDestructuringErrors.doubleProto = key.start;
            }
          } else {
            this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
          }
        }
        propHash.proto = true;
      }
      return
    }
    name = "$" + name;
    var other = propHash[name];
    if (other) {
      var redefinition;
      if (kind === "init") {
        redefinition = this.strict && other.init || other.get || other.set;
      } else {
        redefinition = other.init || other[kind];
      }
      if (redefinition)
        { this.raiseRecoverable(key.start, "Redefinition of property"); }
    } else {
      other = propHash[name] = {
        init: false,
        get: false,
        set: false
      };
    }
    other[kind] = true;
  };

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function(s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression. The optional arguments are used to
  // forbid the `in` operator (in for loops initalization expressions)
  // and provide reference for storing '=' operator inside shorthand
  // property assignment in contexts where both object expression
  // and object pattern might appear (so it's possible to raise
  // delayed syntax error at correct position).

  pp$5.parseExpression = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
    if (this.type === types$1.comma) {
      var node = this.startNodeAt(startPos, startLoc);
      node.expressions = [expr];
      while (this.eat(types$1.comma)) { node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors)); }
      return this.finishNode(node, "SequenceExpression")
    }
    return expr
  };

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.

  pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
    if (this.isContextual("yield")) {
      if (this.inGenerator) { return this.parseYield(forInit) }
      // The tokenizer will assume an expression is allowed after
      // `yield`, but this isn't that kind of yield
      else { this.exprAllowed = false; }
    }

    var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
    if (refDestructuringErrors) {
      oldParenAssign = refDestructuringErrors.parenthesizedAssign;
      oldTrailingComma = refDestructuringErrors.trailingComma;
      oldDoubleProto = refDestructuringErrors.doubleProto;
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
    } else {
      refDestructuringErrors = new DestructuringErrors;
      ownDestructuringErrors = true;
    }

    var startPos = this.start, startLoc = this.startLoc;
    if (this.type === types$1.parenL || this.type === types$1.name) {
      this.potentialArrowAt = this.start;
      this.potentialArrowInForAwait = forInit === "await";
    }
    var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
    if (afterLeftParse) { left = afterLeftParse.call(this, left, startPos, startLoc); }
    if (this.type.isAssign) {
      var node = this.startNodeAt(startPos, startLoc);
      node.operator = this.value;
      if (this.type === types$1.eq)
        { left = this.toAssignable(left, false, refDestructuringErrors); }
      if (!ownDestructuringErrors) {
        refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
      }
      if (refDestructuringErrors.shorthandAssign >= left.start)
        { refDestructuringErrors.shorthandAssign = -1; } // reset because shorthand default was used correctly
      if (this.type === types$1.eq)
        { this.checkLValPattern(left); }
      else
        { this.checkLValSimple(left); }
      node.left = left;
      this.next();
      node.right = this.parseMaybeAssign(forInit);
      if (oldDoubleProto > -1) { refDestructuringErrors.doubleProto = oldDoubleProto; }
      return this.finishNode(node, "AssignmentExpression")
    } else {
      if (ownDestructuringErrors) { this.checkExpressionErrors(refDestructuringErrors, true); }
    }
    if (oldParenAssign > -1) { refDestructuringErrors.parenthesizedAssign = oldParenAssign; }
    if (oldTrailingComma > -1) { refDestructuringErrors.trailingComma = oldTrailingComma; }
    return left
  };

  // Parse a ternary conditional (`?:`) operator.

  pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseExprOps(forInit, refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
    if (this.eat(types$1.question)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(types$1.colon);
      node.alternate = this.parseMaybeAssign(forInit);
      return this.finishNode(node, "ConditionalExpression")
    }
    return expr
  };

  // Start the precedence parser.

  pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
    if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
    return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit)
  };

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.

  pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
    var prec = this.type.binop;
    if (prec != null && (!forInit || this.type !== types$1._in)) {
      if (prec > minPrec) {
        var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
        var coalesce = this.type === types$1.coalesce;
        if (coalesce) {
          // Handle the precedence of `tt.coalesce` as equal to the range of logical expressions.
          // In other words, `node.right` shouldn't contain logical expressions in order to check the mixed error.
          prec = types$1.logicalAND.binop;
        }
        var op = this.value;
        this.next();
        var startPos = this.start, startLoc = this.startLoc;
        var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
        var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
        if ((logical && this.type === types$1.coalesce) || (coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND))) {
          this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
        }
        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit)
      }
    }
    return left
  };

  pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
    if (right.type === "PrivateIdentifier") { this.raise(right.start, "Private identifier can only be left side of binary expression"); }
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.operator = op;
    node.right = right;
    return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression")
  };

  // Parse unary operators, both prefix and postfix.

  pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
    var startPos = this.start, startLoc = this.startLoc, expr;
    if (this.isContextual("await") && this.canAwait) {
      expr = this.parseAwait(forInit);
      sawUnary = true;
    } else if (this.type.prefix) {
      var node = this.startNode(), update = this.type === types$1.incDec;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary(null, true, update, forInit);
      this.checkExpressionErrors(refDestructuringErrors, true);
      if (update) { this.checkLValSimple(node.argument); }
      else if (this.strict && node.operator === "delete" && isLocalVariableAccess(node.argument))
        { this.raiseRecoverable(node.start, "Deleting local variable in strict mode"); }
      else if (node.operator === "delete" && isPrivateFieldAccess(node.argument))
        { this.raiseRecoverable(node.start, "Private fields can not be deleted"); }
      else { sawUnary = true; }
      expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    } else if (!sawUnary && this.type === types$1.privateId) {
      if ((forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields) { this.unexpected(); }
      expr = this.parsePrivateIdent();
      // only could be private fields in 'in', such as #x in obj
      if (this.type !== types$1._in) { this.unexpected(); }
    } else {
      expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
      if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
      while (this.type.postfix && !this.canInsertSemicolon()) {
        var node$1 = this.startNodeAt(startPos, startLoc);
        node$1.operator = this.value;
        node$1.prefix = false;
        node$1.argument = expr;
        this.checkLValSimple(expr);
        this.next();
        expr = this.finishNode(node$1, "UpdateExpression");
      }
    }

    if (!incDec && this.eat(types$1.starstar)) {
      if (sawUnary)
        { this.unexpected(this.lastTokStart); }
      else
        { return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false) }
    } else {
      return expr
    }
  };

  function isLocalVariableAccess(node) {
    return (
      node.type === "Identifier" ||
      node.type === "ParenthesizedExpression" && isLocalVariableAccess(node.expression)
    )
  }

  function isPrivateFieldAccess(node) {
    return (
      node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" ||
      node.type === "ChainExpression" && isPrivateFieldAccess(node.expression) ||
      node.type === "ParenthesizedExpression" && isPrivateFieldAccess(node.expression)
    )
  }

  // Parse call, dot, and `[]`-subscript expressions.

  pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseExprAtom(refDestructuringErrors, forInit);
    if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
      { return expr }
    var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
    if (refDestructuringErrors && result.type === "MemberExpression") {
      if (refDestructuringErrors.parenthesizedAssign >= result.start) { refDestructuringErrors.parenthesizedAssign = -1; }
      if (refDestructuringErrors.parenthesizedBind >= result.start) { refDestructuringErrors.parenthesizedBind = -1; }
      if (refDestructuringErrors.trailingComma >= result.start) { refDestructuringErrors.trailingComma = -1; }
    }
    return result
  };

  pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
    var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" &&
        this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 &&
        this.potentialArrowAt === base.start;
    var optionalChained = false;

    while (true) {
      var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);

      if (element.optional) { optionalChained = true; }
      if (element === base || element.type === "ArrowFunctionExpression") {
        if (optionalChained) {
          var chainNode = this.startNodeAt(startPos, startLoc);
          chainNode.expression = element;
          element = this.finishNode(chainNode, "ChainExpression");
        }
        return element
      }

      base = element;
    }
  };

  pp$5.shouldParseAsyncArrow = function() {
    return !this.canInsertSemicolon() && this.eat(types$1.arrow)
  };

  pp$5.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit)
  };

  pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
    var optionalSupported = this.options.ecmaVersion >= 11;
    var optional = optionalSupported && this.eat(types$1.questionDot);
    if (noCalls && optional) { this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions"); }

    var computed = this.eat(types$1.bracketL);
    if (computed || (optional && this.type !== types$1.parenL && this.type !== types$1.backQuote) || this.eat(types$1.dot)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      if (computed) {
        node.property = this.parseExpression();
        this.expect(types$1.bracketR);
      } else if (this.type === types$1.privateId && base.type !== "Super") {
        node.property = this.parsePrivateIdent();
      } else {
        node.property = this.parseIdent(this.options.allowReserved !== "never");
      }
      node.computed = !!computed;
      if (optionalSupported) {
        node.optional = optional;
      }
      base = this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.eat(types$1.parenL)) {
      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
      if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        if (this.awaitIdentPos > 0)
          { this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"); }
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit)
      }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;
      this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.callee = base;
      node$1.arguments = exprList;
      if (optionalSupported) {
        node$1.optional = optional;
      }
      base = this.finishNode(node$1, "CallExpression");
    } else if (this.type === types$1.backQuote) {
      if (optional || optionalChained) {
        this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
      }
      var node$2 = this.startNodeAt(startPos, startLoc);
      node$2.tag = base;
      node$2.quasi = this.parseTemplate({isTagged: true});
      base = this.finishNode(node$2, "TaggedTemplateExpression");
    }
    return base
  };

  // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  pp$5.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
    // If a division operator appears in an expression position, the
    // tokenizer got confused, and we force it to read a regexp instead.
    if (this.type === types$1.slash) { this.readRegexp(); }

    var node, canBeArrow = this.potentialArrowAt === this.start;
    switch (this.type) {
    case types$1._super:
      if (!this.allowSuper)
        { this.raise(this.start, "'super' keyword outside a method"); }
      node = this.startNode();
      this.next();
      if (this.type === types$1.parenL && !this.allowDirectSuper)
        { this.raise(node.start, "super() call outside constructor of a subclass"); }
      // The `super` keyword can appear at below:
      // SuperProperty:
      //     super [ Expression ]
      //     super . IdentifierName
      // SuperCall:
      //     super ( Arguments )
      if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL)
        { this.unexpected(); }
      return this.finishNode(node, "Super")

    case types$1._this:
      node = this.startNode();
      this.next();
      return this.finishNode(node, "ThisExpression")

    case types$1.name:
      var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
      var id = this.parseIdent(false);
      if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
        this.overrideContext(types.f_expr);
        return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit)
      }
      if (canBeArrow && !this.canInsertSemicolon()) {
        if (this.eat(types$1.arrow))
          { return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit) }
        if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc &&
            (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
          id = this.parseIdent(false);
          if (this.canInsertSemicolon() || !this.eat(types$1.arrow))
            { this.unexpected(); }
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit)
        }
      }
      return id

    case types$1.regexp:
      var value = this.value;
      node = this.parseLiteral(value.value);
      node.regex = {pattern: value.pattern, flags: value.flags};
      return node

    case types$1.num: case types$1.string:
      return this.parseLiteral(this.value)

    case types$1._null: case types$1._true: case types$1._false:
      node = this.startNode();
      node.value = this.type === types$1._null ? null : this.type === types$1._true;
      node.raw = this.type.keyword;
      this.next();
      return this.finishNode(node, "Literal")

    case types$1.parenL:
      var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
      if (refDestructuringErrors) {
        if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr))
          { refDestructuringErrors.parenthesizedAssign = start; }
        if (refDestructuringErrors.parenthesizedBind < 0)
          { refDestructuringErrors.parenthesizedBind = start; }
      }
      return expr

    case types$1.bracketL:
      node = this.startNode();
      this.next();
      node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
      return this.finishNode(node, "ArrayExpression")

    case types$1.braceL:
      this.overrideContext(types.b_expr);
      return this.parseObj(false, refDestructuringErrors)

    case types$1._function:
      node = this.startNode();
      this.next();
      return this.parseFunction(node, 0)

    case types$1._class:
      return this.parseClass(this.startNode(), false)

    case types$1._new:
      return this.parseNew()

    case types$1.backQuote:
      return this.parseTemplate()

    case types$1._import:
      if (this.options.ecmaVersion >= 11) {
        return this.parseExprImport(forNew)
      } else {
        return this.unexpected()
      }

    default:
      return this.parseExprAtomDefault()
    }
  };

  pp$5.parseExprAtomDefault = function() {
    this.unexpected();
  };

  pp$5.parseExprImport = function(forNew) {
    var node = this.startNode();

    // Consume `import` as an identifier for `import.meta`.
    // Because `this.parseIdent(true)` doesn't check escape sequences, it needs the check of `this.containsEsc`.
    if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword import"); }
    this.next();

    if (this.type === types$1.parenL && !forNew) {
      return this.parseDynamicImport(node)
    } else if (this.type === types$1.dot) {
      var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
      meta.name = "import";
      node.meta = this.finishNode(meta, "Identifier");
      return this.parseImportMeta(node)
    } else {
      this.unexpected();
    }
  };

  pp$5.parseDynamicImport = function(node) {
    this.next(); // skip `(`

    // Parse node.source.
    node.source = this.parseMaybeAssign();

    if (this.options.ecmaVersion >= 16) {
      if (!this.eat(types$1.parenR)) {
        this.expect(types$1.comma);
        if (!this.afterTrailingComma(types$1.parenR)) {
          node.options = this.parseMaybeAssign();
          if (!this.eat(types$1.parenR)) {
            this.expect(types$1.comma);
            if (!this.afterTrailingComma(types$1.parenR)) {
              this.unexpected();
            }
          }
        } else {
          node.options = null;
        }
      } else {
        node.options = null;
      }
    } else {
      // Verify ending.
      if (!this.eat(types$1.parenR)) {
        var errorPos = this.start;
        if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
          this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
        } else {
          this.unexpected(errorPos);
        }
      }
    }

    return this.finishNode(node, "ImportExpression")
  };

  pp$5.parseImportMeta = function(node) {
    this.next(); // skip `.`

    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);

    if (node.property.name !== "meta")
      { this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'"); }
    if (containsEsc)
      { this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters"); }
    if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere)
      { this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module"); }

    return this.finishNode(node, "MetaProperty")
  };

  pp$5.parseLiteral = function(value) {
    var node = this.startNode();
    node.value = value;
    node.raw = this.input.slice(this.start, this.end);
    if (node.raw.charCodeAt(node.raw.length - 1) === 110)
      { node.bigint = node.value != null ? node.value.toString() : node.raw.slice(0, -1).replace(/_/g, ""); }
    this.next();
    return this.finishNode(node, "Literal")
  };

  pp$5.parseParenExpression = function() {
    this.expect(types$1.parenL);
    var val = this.parseExpression();
    this.expect(types$1.parenR);
    return val
  };

  pp$5.shouldParseArrow = function(exprList) {
    return !this.canInsertSemicolon()
  };

  pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
    var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
    if (this.options.ecmaVersion >= 6) {
      this.next();

      var innerStartPos = this.start, innerStartLoc = this.startLoc;
      var exprList = [], first = true, lastIsComma = false;
      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
      this.yieldPos = 0;
      this.awaitPos = 0;
      // Do not save awaitIdentPos to allow checking awaits nested in parameters
      while (this.type !== types$1.parenR) {
        first ? first = false : this.expect(types$1.comma);
        if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
          lastIsComma = true;
          break
        } else if (this.type === types$1.ellipsis) {
          spreadStart = this.start;
          exprList.push(this.parseParenItem(this.parseRestBinding()));
          if (this.type === types$1.comma) {
            this.raiseRecoverable(
              this.start,
              "Comma is not permitted after the rest element"
            );
          }
          break
        } else {
          exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
        }
      }
      var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
      this.expect(types$1.parenR);

      if (canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$1.arrow)) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        return this.parseParenArrowList(startPos, startLoc, exprList, forInit)
      }

      if (!exprList.length || lastIsComma) { this.unexpected(this.lastTokStart); }
      if (spreadStart) { this.unexpected(spreadStart); }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;

      if (exprList.length > 1) {
        val = this.startNodeAt(innerStartPos, innerStartLoc);
        val.expressions = exprList;
        this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
      } else {
        val = exprList[0];
      }
    } else {
      val = this.parseParenExpression();
    }

    if (this.options.preserveParens) {
      var par = this.startNodeAt(startPos, startLoc);
      par.expression = val;
      return this.finishNode(par, "ParenthesizedExpression")
    } else {
      return val
    }
  };

  pp$5.parseParenItem = function(item) {
    return item
  };

  pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit)
  };

  // New's precedence is slightly tricky. It must allow its argument to
  // be a `[]` or dot subscript expression, but not a call — at least,
  // not without wrapping it in parentheses. Thus, it uses the noCalls
  // argument to parseSubscripts to prevent it from consuming the
  // argument list.

  var empty = [];

  pp$5.parseNew = function() {
    if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword new"); }
    var node = this.startNode();
    this.next();
    if (this.options.ecmaVersion >= 6 && this.type === types$1.dot) {
      var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
      meta.name = "new";
      node.meta = this.finishNode(meta, "Identifier");
      this.next();
      var containsEsc = this.containsEsc;
      node.property = this.parseIdent(true);
      if (node.property.name !== "target")
        { this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'"); }
      if (containsEsc)
        { this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters"); }
      if (!this.allowNewDotTarget)
        { this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block"); }
      return this.finishNode(node, "MetaProperty")
    }
    var startPos = this.start, startLoc = this.startLoc;
    node.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), startPos, startLoc, true, false);
    if (this.eat(types$1.parenL)) { node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false); }
    else { node.arguments = empty; }
    return this.finishNode(node, "NewExpression")
  };

  // Parse template expression.

  pp$5.parseTemplateElement = function(ref) {
    var isTagged = ref.isTagged;

    var elem = this.startNode();
    if (this.type === types$1.invalidTemplate) {
      if (!isTagged) {
        this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
      }
      elem.value = {
        raw: this.value.replace(/\r\n?/g, "\n"),
        cooked: null
      };
    } else {
      elem.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
        cooked: this.value
      };
    }
    this.next();
    elem.tail = this.type === types$1.backQuote;
    return this.finishNode(elem, "TemplateElement")
  };

  pp$5.parseTemplate = function(ref) {
    if ( ref === void 0 ) ref = {};
    var isTagged = ref.isTagged; if ( isTagged === void 0 ) isTagged = false;

    var node = this.startNode();
    this.next();
    node.expressions = [];
    var curElt = this.parseTemplateElement({isTagged: isTagged});
    node.quasis = [curElt];
    while (!curElt.tail) {
      if (this.type === types$1.eof) { this.raise(this.pos, "Unterminated template literal"); }
      this.expect(types$1.dollarBraceL);
      node.expressions.push(this.parseExpression());
      this.expect(types$1.braceR);
      node.quasis.push(curElt = this.parseTemplateElement({isTagged: isTagged}));
    }
    this.next();
    return this.finishNode(node, "TemplateLiteral")
  };

  pp$5.isAsyncProp = function(prop) {
    return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" &&
      (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || (this.options.ecmaVersion >= 9 && this.type === types$1.star)) &&
      !lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
  };

  // Parse an object literal or binding pattern.

  pp$5.parseObj = function(isPattern, refDestructuringErrors) {
    var node = this.startNode(), first = true, propHash = {};
    node.properties = [];
    this.next();
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) { break }
      } else { first = false; }

      var prop = this.parseProperty(isPattern, refDestructuringErrors);
      if (!isPattern) { this.checkPropClash(prop, propHash, refDestructuringErrors); }
      node.properties.push(prop);
    }
    return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
  };

  pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
    var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
    if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
      if (isPattern) {
        prop.argument = this.parseIdent(false);
        if (this.type === types$1.comma) {
          this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
        }
        return this.finishNode(prop, "RestElement")
      }
      // Parse argument.
      prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
      // To disallow trailing comma via `this.toAssignable()`.
      if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
        refDestructuringErrors.trailingComma = this.start;
      }
      // Finish
      return this.finishNode(prop, "SpreadElement")
    }
    if (this.options.ecmaVersion >= 6) {
      prop.method = false;
      prop.shorthand = false;
      if (isPattern || refDestructuringErrors) {
        startPos = this.start;
        startLoc = this.startLoc;
      }
      if (!isPattern)
        { isGenerator = this.eat(types$1.star); }
    }
    var containsEsc = this.containsEsc;
    this.parsePropertyName(prop);
    if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
      this.parsePropertyName(prop);
    } else {
      isAsync = false;
    }
    this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
    return this.finishNode(prop, "Property")
  };

  pp$5.parseGetterSetter = function(prop) {
    var kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    prop.kind = kind;
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get")
        { this.raiseRecoverable(start, "getter should have no params"); }
      else
        { this.raiseRecoverable(start, "setter should have exactly one param"); }
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
        { this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params"); }
    }
  };

  pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
    if ((isGenerator || isAsync) && this.type === types$1.colon)
      { this.unexpected(); }

    if (this.eat(types$1.colon)) {
      prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
      prop.kind = "init";
    } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
      if (isPattern) { this.unexpected(); }
      prop.method = true;
      prop.value = this.parseMethod(isGenerator, isAsync);
      prop.kind = "init";
    } else if (!isPattern && !containsEsc &&
               this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
               (prop.key.name === "get" || prop.key.name === "set") &&
               (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq)) {
      if (isGenerator || isAsync) { this.unexpected(); }
      this.parseGetterSetter(prop);
    } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
      if (isGenerator || isAsync) { this.unexpected(); }
      this.checkUnreserved(prop.key);
      if (prop.key.name === "await" && !this.awaitIdentPos)
        { this.awaitIdentPos = startPos; }
      if (isPattern) {
        prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
      } else if (this.type === types$1.eq && refDestructuringErrors) {
        if (refDestructuringErrors.shorthandAssign < 0)
          { refDestructuringErrors.shorthandAssign = this.start; }
        prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
      } else {
        prop.value = this.copyNode(prop.key);
      }
      prop.kind = "init";
      prop.shorthand = true;
    } else { this.unexpected(); }
  };

  pp$5.parsePropertyName = function(prop) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(types$1.bracketL)) {
        prop.computed = true;
        prop.key = this.parseMaybeAssign();
        this.expect(types$1.bracketR);
        return prop.key
      } else {
        prop.computed = false;
      }
    }
    return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never")
  };

  // Initialize empty function node.

  pp$5.initFunction = function(node) {
    node.id = null;
    if (this.options.ecmaVersion >= 6) { node.generator = node.expression = false; }
    if (this.options.ecmaVersion >= 8) { node.async = false; }
  };

  // Parse object or class method.

  pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
    var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;

    this.initFunction(node);
    if (this.options.ecmaVersion >= 6)
      { node.generator = isGenerator; }
    if (this.options.ecmaVersion >= 8)
      { node.async = !!isAsync; }

    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));

    this.expect(types$1.parenL);
    node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
    this.parseFunctionBody(node, false, true, false);

    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "FunctionExpression")
  };

  // Parse arrow function expression with given parameters.

  pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;

    this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
    this.initFunction(node);
    if (this.options.ecmaVersion >= 8) { node.async = !!isAsync; }

    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;

    node.params = this.toAssignableList(params, true);
    this.parseFunctionBody(node, true, false, forInit);

    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "ArrowFunctionExpression")
  };

  // Parse function body and check parameters.

  pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
    var isExpression = isArrowFunction && this.type !== types$1.braceL;
    var oldStrict = this.strict, useStrict = false;

    if (isExpression) {
      node.body = this.parseMaybeAssign(forInit);
      node.expression = true;
      this.checkParams(node, false);
    } else {
      var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
      if (!oldStrict || nonSimple) {
        useStrict = this.strictDirective(this.end);
        // If this is a strict mode function, verify that argument names
        // are not repeated, and it does not try to bind the words `eval`
        // or `arguments`.
        if (useStrict && nonSimple)
          { this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list"); }
      }
      // Start a new scope with regard to labels and the `inFunction`
      // flag (restore them to their old value afterwards).
      var oldLabels = this.labels;
      this.labels = [];
      if (useStrict) { this.strict = true; }

      // Add the params to varDeclaredNames to ensure that an error is thrown
      // if a let/const declaration in the function clashes with one of the params.
      this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
      // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
      if (this.strict && node.id) { this.checkLValSimple(node.id, BIND_OUTSIDE); }
      node.body = this.parseBlock(false, undefined, useStrict && !oldStrict);
      node.expression = false;
      this.adaptDirectivePrologue(node.body.body);
      this.labels = oldLabels;
    }
    this.exitScope();
  };

  pp$5.isSimpleParamList = function(params) {
    for (var i = 0, list = params; i < list.length; i += 1)
      {
      var param = list[i];

      if (param.type !== "Identifier") { return false
    } }
    return true
  };

  // Checks function params for various disallowed patterns such as using "eval"
  // or "arguments" and duplicate parameters.

  pp$5.checkParams = function(node, allowDuplicates) {
    var nameHash = Object.create(null);
    for (var i = 0, list = node.params; i < list.length; i += 1)
      {
      var param = list[i];

      this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
    }
  };

  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).

  pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (!first) {
        this.expect(types$1.comma);
        if (allowTrailingComma && this.afterTrailingComma(close)) { break }
      } else { first = false; }

      var elt = (void 0);
      if (allowEmpty && this.type === types$1.comma)
        { elt = null; }
      else if (this.type === types$1.ellipsis) {
        elt = this.parseSpread(refDestructuringErrors);
        if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0)
          { refDestructuringErrors.trailingComma = this.start; }
      } else {
        elt = this.parseMaybeAssign(false, refDestructuringErrors);
      }
      elts.push(elt);
    }
    return elts
  };

  pp$5.checkUnreserved = function(ref) {
    var start = ref.start;
    var end = ref.end;
    var name = ref.name;

    if (this.inGenerator && name === "yield")
      { this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator"); }
    if (this.inAsync && name === "await")
      { this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function"); }
    if (!(this.currentThisScope().flags & SCOPE_VAR) && name === "arguments")
      { this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer"); }
    if (this.inClassStaticBlock && (name === "arguments" || name === "await"))
      { this.raise(start, ("Cannot use " + name + " in class static initialization block")); }
    if (this.keywords.test(name))
      { this.raise(start, ("Unexpected keyword '" + name + "'")); }
    if (this.options.ecmaVersion < 6 &&
      this.input.slice(start, end).indexOf("\\") !== -1) { return }
    var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
    if (re.test(name)) {
      if (!this.inAsync && name === "await")
        { this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function"); }
      this.raiseRecoverable(start, ("The keyword '" + name + "' is reserved"));
    }
  };

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.

  pp$5.parseIdent = function(liberal) {
    var node = this.parseIdentNode();
    this.next(!!liberal);
    this.finishNode(node, "Identifier");
    if (!liberal) {
      this.checkUnreserved(node);
      if (node.name === "await" && !this.awaitIdentPos)
        { this.awaitIdentPos = node.start; }
    }
    return node
  };

  pp$5.parseIdentNode = function() {
    var node = this.startNode();
    if (this.type === types$1.name) {
      node.name = this.value;
    } else if (this.type.keyword) {
      node.name = this.type.keyword;

      // To fix https://github.com/acornjs/acorn/issues/575
      // `class` and `function` keywords push new context into this.context.
      // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
      // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
      if ((node.name === "class" || node.name === "function") &&
        (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
        this.context.pop();
      }
      this.type = types$1.name;
    } else {
      this.unexpected();
    }
    return node
  };

  pp$5.parsePrivateIdent = function() {
    var node = this.startNode();
    if (this.type === types$1.privateId) {
      node.name = this.value;
    } else {
      this.unexpected();
    }
    this.next();
    this.finishNode(node, "PrivateIdentifier");

    // For validating existence
    if (this.options.checkPrivateFields) {
      if (this.privateNameStack.length === 0) {
        this.raise(node.start, ("Private field '#" + (node.name) + "' must be declared in an enclosing class"));
      } else {
        this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
      }
    }

    return node
  };

  // Parses yield expression inside generator.

  pp$5.parseYield = function(forInit) {
    if (!this.yieldPos) { this.yieldPos = this.start; }

    var node = this.startNode();
    this.next();
    if (this.type === types$1.semi || this.canInsertSemicolon() || (this.type !== types$1.star && !this.type.startsExpr)) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(types$1.star);
      node.argument = this.parseMaybeAssign(forInit);
    }
    return this.finishNode(node, "YieldExpression")
  };

  pp$5.parseAwait = function(forInit) {
    if (!this.awaitPos) { this.awaitPos = this.start; }

    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeUnary(null, true, false, forInit);
    return this.finishNode(node, "AwaitExpression")
  };

  var pp$4 = Parser.prototype;

  // This function is used to raise exceptions on parse errors. It
  // takes an offset integer (into the current `input`) to indicate
  // the location of the error, attaches the position to the end
  // of the error message, and then raises a `SyntaxError` with that
  // message.

  pp$4.raise = function(pos, message) {
    var loc = getLineInfo(this.input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    if (this.sourceFile) {
      message += " in " + this.sourceFile;
    }
    var err = new SyntaxError(message);
    err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
    throw err
  };

  pp$4.raiseRecoverable = pp$4.raise;

  pp$4.curPosition = function() {
    if (this.options.locations) {
      return new Position(this.curLine, this.pos - this.lineStart)
    }
  };

  var pp$3 = Parser.prototype;

  var Scope = function Scope(flags) {
    this.flags = flags;
    // A list of var-declared names in the current lexical scope
    this.var = [];
    // A list of lexically-declared names in the current lexical scope
    this.lexical = [];
    // A list of lexically-declared FunctionDeclaration names in the current lexical scope
    this.functions = [];
  };

  // The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

  pp$3.enterScope = function(flags) {
    this.scopeStack.push(new Scope(flags));
  };

  pp$3.exitScope = function() {
    this.scopeStack.pop();
  };

  // The spec says:
  // > At the top level of a function, or script, function declarations are
  // > treated like var declarations rather than like lexical declarations.
  pp$3.treatFunctionsAsVarInScope = function(scope) {
    return (scope.flags & SCOPE_FUNCTION) || !this.inModule && (scope.flags & SCOPE_TOP)
  };

  pp$3.declareName = function(name, bindingType, pos) {
    var redeclared = false;
    if (bindingType === BIND_LEXICAL) {
      var scope = this.currentScope();
      redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
      scope.lexical.push(name);
      if (this.inModule && (scope.flags & SCOPE_TOP))
        { delete this.undefinedExports[name]; }
    } else if (bindingType === BIND_SIMPLE_CATCH) {
      var scope$1 = this.currentScope();
      scope$1.lexical.push(name);
    } else if (bindingType === BIND_FUNCTION) {
      var scope$2 = this.currentScope();
      if (this.treatFunctionsAsVar)
        { redeclared = scope$2.lexical.indexOf(name) > -1; }
      else
        { redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1; }
      scope$2.functions.push(name);
    } else {
      for (var i = this.scopeStack.length - 1; i >= 0; --i) {
        var scope$3 = this.scopeStack[i];
        if (scope$3.lexical.indexOf(name) > -1 && !((scope$3.flags & SCOPE_SIMPLE_CATCH) && scope$3.lexical[0] === name) ||
            !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
          redeclared = true;
          break
        }
        scope$3.var.push(name);
        if (this.inModule && (scope$3.flags & SCOPE_TOP))
          { delete this.undefinedExports[name]; }
        if (scope$3.flags & SCOPE_VAR) { break }
      }
    }
    if (redeclared) { this.raiseRecoverable(pos, ("Identifier '" + name + "' has already been declared")); }
  };

  pp$3.checkLocalExport = function(id) {
    // scope.functions must be empty as Module code is always strict.
    if (this.scopeStack[0].lexical.indexOf(id.name) === -1 &&
        this.scopeStack[0].var.indexOf(id.name) === -1) {
      this.undefinedExports[id.name] = id;
    }
  };

  pp$3.currentScope = function() {
    return this.scopeStack[this.scopeStack.length - 1]
  };

  pp$3.currentVarScope = function() {
    for (var i = this.scopeStack.length - 1;; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK)) { return scope }
    }
  };

  // Could be useful for `this`, `new.target`, `super()`, `super.property`, and `super[property]`.
  pp$3.currentThisScope = function() {
    for (var i = this.scopeStack.length - 1;; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK) &&
          !(scope.flags & SCOPE_ARROW)) { return scope }
    }
  };

  var Node = function Node(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    if (parser.options.locations)
      { this.loc = new SourceLocation(parser, loc); }
    if (parser.options.directSourceFile)
      { this.sourceFile = parser.options.directSourceFile; }
    if (parser.options.ranges)
      { this.range = [pos, 0]; }
  };

  // Start an AST node, attaching a start offset.

  var pp$2 = Parser.prototype;

  pp$2.startNode = function() {
    return new Node(this, this.start, this.startLoc)
  };

  pp$2.startNodeAt = function(pos, loc) {
    return new Node(this, pos, loc)
  };

  // Finish an AST node, adding `type` and `end` properties.

  function finishNodeAt(node, type, pos, loc) {
    node.type = type;
    node.end = pos;
    if (this.options.locations)
      { node.loc.end = loc; }
    if (this.options.ranges)
      { node.range[1] = pos; }
    return node
  }

  pp$2.finishNode = function(node, type) {
    return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
  };

  // Finish node at given position

  pp$2.finishNodeAt = function(node, type, pos, loc) {
    return finishNodeAt.call(this, node, type, pos, loc)
  };

  pp$2.copyNode = function(node) {
    var newNode = new Node(this, node.start, this.startLoc);
    for (var prop in node) { newNode[prop] = node[prop]; }
    return newNode
  };

  // This file was generated by "bin/generate-unicode-script-values.js". Do not modify manually!
  var scriptValuesAddedInUnicode = "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz";

  // This file contains Unicode properties extracted from the ECMAScript specification.
  // The lists are extracted like so:
  // $$('#table-binary-unicode-properties > figure > table > tbody > tr > td:nth-child(1) code').map(el => el.innerText)

  // #table-binary-unicode-properties
  var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
  var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
  var ecma11BinaryProperties = ecma10BinaryProperties;
  var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
  var ecma13BinaryProperties = ecma12BinaryProperties;
  var ecma14BinaryProperties = ecma13BinaryProperties;

  var unicodeBinaryProperties = {
    9: ecma9BinaryProperties,
    10: ecma10BinaryProperties,
    11: ecma11BinaryProperties,
    12: ecma12BinaryProperties,
    13: ecma13BinaryProperties,
    14: ecma14BinaryProperties
  };

  // #table-binary-unicode-properties-of-strings
  var ecma14BinaryPropertiesOfStrings = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji";

  var unicodeBinaryPropertiesOfStrings = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: ecma14BinaryPropertiesOfStrings
  };

  // #table-unicode-general-category-values
  var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";

  // #table-unicode-script-values
  var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
  var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
  var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
  var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
  var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
  var ecma14ScriptValues = ecma13ScriptValues + " " + scriptValuesAddedInUnicode;

  var unicodeScriptValues = {
    9: ecma9ScriptValues,
    10: ecma10ScriptValues,
    11: ecma11ScriptValues,
    12: ecma12ScriptValues,
    13: ecma13ScriptValues,
    14: ecma14ScriptValues
  };

  var data = {};
  function buildUnicodeData(ecmaVersion) {
    var d = data[ecmaVersion] = {
      binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
      binaryOfStrings: wordsRegexp(unicodeBinaryPropertiesOfStrings[ecmaVersion]),
      nonBinary: {
        General_Category: wordsRegexp(unicodeGeneralCategoryValues),
        Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
      }
    };
    d.nonBinary.Script_Extensions = d.nonBinary.Script;

    d.nonBinary.gc = d.nonBinary.General_Category;
    d.nonBinary.sc = d.nonBinary.Script;
    d.nonBinary.scx = d.nonBinary.Script_Extensions;
  }

  for (var i = 0, list = [9, 10, 11, 12, 13, 14]; i < list.length; i += 1) {
    var ecmaVersion = list[i];

    buildUnicodeData(ecmaVersion);
  }

  var pp$1 = Parser.prototype;

  // Track disjunction structure to determine whether a duplicate
  // capture group name is allowed because it is in a separate branch.
  var BranchID = function BranchID(parent, base) {
    // Parent disjunction branch
    this.parent = parent;
    // Identifies this set of sibling branches
    this.base = base || this;
  };

  BranchID.prototype.separatedFrom = function separatedFrom (alt) {
    // A branch is separate from another branch if they or any of
    // their parents are siblings in a given disjunction
    for (var self = this; self; self = self.parent) {
      for (var other = alt; other; other = other.parent) {
        if (self.base === other.base && self !== other) { return true }
      }
    }
    return false
  };

  BranchID.prototype.sibling = function sibling () {
    return new BranchID(this.parent, this.base)
  };

  var RegExpValidationState = function RegExpValidationState(parser) {
    this.parser = parser;
    this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : "");
    this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
    this.source = "";
    this.flags = "";
    this.start = 0;
    this.switchU = false;
    this.switchV = false;
    this.switchN = false;
    this.pos = 0;
    this.lastIntValue = 0;
    this.lastStringValue = "";
    this.lastAssertionIsQuantifiable = false;
    this.numCapturingParens = 0;
    this.maxBackReference = 0;
    this.groupNames = Object.create(null);
    this.backReferenceNames = [];
    this.branchID = null;
  };

  RegExpValidationState.prototype.reset = function reset (start, pattern, flags) {
    var unicodeSets = flags.indexOf("v") !== -1;
    var unicode = flags.indexOf("u") !== -1;
    this.start = start | 0;
    this.source = pattern + "";
    this.flags = flags;
    if (unicodeSets && this.parser.options.ecmaVersion >= 15) {
      this.switchU = true;
      this.switchV = true;
      this.switchN = true;
    } else {
      this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
      this.switchV = false;
      this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
    }
  };

  RegExpValidationState.prototype.raise = function raise (message) {
    this.parser.raiseRecoverable(this.start, ("Invalid regular expression: /" + (this.source) + "/: " + message));
  };

  // If u flag is given, this returns the code point at the index (it combines a surrogate pair).
  // Otherwise, this returns the code unit of the index (can be a part of a surrogate pair).
  RegExpValidationState.prototype.at = function at (i, forceU) {
      if ( forceU === void 0 ) forceU = false;

    var s = this.source;
    var l = s.length;
    if (i >= l) {
      return -1
    }
    var c = s.charCodeAt(i);
    if (!(forceU || this.switchU) || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
      return c
    }
    var next = s.charCodeAt(i + 1);
    return next >= 0xDC00 && next <= 0xDFFF ? (c << 10) + next - 0x35FDC00 : c
  };

  RegExpValidationState.prototype.nextIndex = function nextIndex (i, forceU) {
      if ( forceU === void 0 ) forceU = false;

    var s = this.source;
    var l = s.length;
    if (i >= l) {
      return l
    }
    var c = s.charCodeAt(i), next;
    if (!(forceU || this.switchU) || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l ||
        (next = s.charCodeAt(i + 1)) < 0xDC00 || next > 0xDFFF) {
      return i + 1
    }
    return i + 2
  };

  RegExpValidationState.prototype.current = function current (forceU) {
      if ( forceU === void 0 ) forceU = false;

    return this.at(this.pos, forceU)
  };

  RegExpValidationState.prototype.lookahead = function lookahead (forceU) {
      if ( forceU === void 0 ) forceU = false;

    return this.at(this.nextIndex(this.pos, forceU), forceU)
  };

  RegExpValidationState.prototype.advance = function advance (forceU) {
      if ( forceU === void 0 ) forceU = false;

    this.pos = this.nextIndex(this.pos, forceU);
  };

  RegExpValidationState.prototype.eat = function eat (ch, forceU) {
      if ( forceU === void 0 ) forceU = false;

    if (this.current(forceU) === ch) {
      this.advance(forceU);
      return true
    }
    return false
  };

  RegExpValidationState.prototype.eatChars = function eatChars (chs, forceU) {
      if ( forceU === void 0 ) forceU = false;

    var pos = this.pos;
    for (var i = 0, list = chs; i < list.length; i += 1) {
      var ch = list[i];

        var current = this.at(pos, forceU);
      if (current === -1 || current !== ch) {
        return false
      }
      pos = this.nextIndex(pos, forceU);
    }
    this.pos = pos;
    return true
  };

  /**
   * Validate the flags part of a given RegExpLiteral.
   *
   * @param {RegExpValidationState} state The state to validate RegExp.
   * @returns {void}
   */
  pp$1.validateRegExpFlags = function(state) {
    var validFlags = state.validFlags;
    var flags = state.flags;

    var u = false;
    var v = false;

    for (var i = 0; i < flags.length; i++) {
      var flag = flags.charAt(i);
      if (validFlags.indexOf(flag) === -1) {
        this.raise(state.start, "Invalid regular expression flag");
      }
      if (flags.indexOf(flag, i + 1) > -1) {
        this.raise(state.start, "Duplicate regular expression flag");
      }
      if (flag === "u") { u = true; }
      if (flag === "v") { v = true; }
    }
    if (this.options.ecmaVersion >= 15 && u && v) {
      this.raise(state.start, "Invalid regular expression flag");
    }
  };

  function hasProp(obj) {
    for (var _ in obj) { return true }
    return false
  }

  /**
   * Validate the pattern part of a given RegExpLiteral.
   *
   * @param {RegExpValidationState} state The state to validate RegExp.
   * @returns {void}
   */
  pp$1.validateRegExpPattern = function(state) {
    this.regexp_pattern(state);

    // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
    // parsing contains a |GroupName|, reparse with the goal symbol
    // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
    // exception if _P_ did not conform to the grammar, if any elements of _P_
    // were not matched by the parse, or if any Early Error conditions exist.
    if (!state.switchN && this.options.ecmaVersion >= 9 && hasProp(state.groupNames)) {
      state.switchN = true;
      this.regexp_pattern(state);
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
  pp$1.regexp_pattern = function(state) {
    state.pos = 0;
    state.lastIntValue = 0;
    state.lastStringValue = "";
    state.lastAssertionIsQuantifiable = false;
    state.numCapturingParens = 0;
    state.maxBackReference = 0;
    state.groupNames = Object.create(null);
    state.backReferenceNames.length = 0;
    state.branchID = null;

    this.regexp_disjunction(state);

    if (state.pos !== state.source.length) {
      // Make the same messages as V8.
      if (state.eat(0x29 /* ) */)) {
        state.raise("Unmatched ')'");
      }
      if (state.eat(0x5D /* ] */) || state.eat(0x7D /* } */)) {
        state.raise("Lone quantifier brackets");
      }
    }
    if (state.maxBackReference > state.numCapturingParens) {
      state.raise("Invalid escape");
    }
    for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
      var name = list[i];

      if (!state.groupNames[name]) {
        state.raise("Invalid named capture referenced");
      }
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
  pp$1.regexp_disjunction = function(state) {
    var trackDisjunction = this.options.ecmaVersion >= 16;
    if (trackDisjunction) { state.branchID = new BranchID(state.branchID, null); }
    this.regexp_alternative(state);
    while (state.eat(0x7C /* | */)) {
      if (trackDisjunction) { state.branchID = state.branchID.sibling(); }
      this.regexp_alternative(state);
    }
    if (trackDisjunction) { state.branchID = state.branchID.parent; }

    // Make the same message as V8.
    if (this.regexp_eatQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    if (state.eat(0x7B /* { */)) {
      state.raise("Lone quantifier brackets");
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
  pp$1.regexp_alternative = function(state) {
    while (state.pos < state.source.length && this.regexp_eatTerm(state)) {}
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
  pp$1.regexp_eatTerm = function(state) {
    if (this.regexp_eatAssertion(state)) {
      // Handle `QuantifiableAssertion Quantifier` alternative.
      // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
      // is a QuantifiableAssertion.
      if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
        // Make the same message as V8.
        if (state.switchU) {
          state.raise("Invalid quantifier");
        }
      }
      return true
    }

    if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
      this.regexp_eatQuantifier(state);
      return true
    }

    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
  pp$1.regexp_eatAssertion = function(state) {
    var start = state.pos;
    state.lastAssertionIsQuantifiable = false;

    // ^, $
    if (state.eat(0x5E /* ^ */) || state.eat(0x24 /* $ */)) {
      return true
    }

    // \b \B
    if (state.eat(0x5C /* \ */)) {
      if (state.eat(0x42 /* B */) || state.eat(0x62 /* b */)) {
        return true
      }
      state.pos = start;
    }

    // Lookahead / Lookbehind
    if (state.eat(0x28 /* ( */) && state.eat(0x3F /* ? */)) {
      var lookbehind = false;
      if (this.options.ecmaVersion >= 9) {
        lookbehind = state.eat(0x3C /* < */);
      }
      if (state.eat(0x3D /* = */) || state.eat(0x21 /* ! */)) {
        this.regexp_disjunction(state);
        if (!state.eat(0x29 /* ) */)) {
          state.raise("Unterminated group");
        }
        state.lastAssertionIsQuantifiable = !lookbehind;
        return true
      }
    }

    state.pos = start;
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
  pp$1.regexp_eatQuantifier = function(state, noError) {
    if ( noError === void 0 ) noError = false;

    if (this.regexp_eatQuantifierPrefix(state, noError)) {
      state.eat(0x3F /* ? */);
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
  pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
    return (
      state.eat(0x2A /* * */) ||
      state.eat(0x2B /* + */) ||
      state.eat(0x3F /* ? */) ||
      this.regexp_eatBracedQuantifier(state, noError)
    )
  };
  pp$1.regexp_eatBracedQuantifier = function(state, noError) {
    var start = state.pos;
    if (state.eat(0x7B /* { */)) {
      var min = 0, max = -1;
      if (this.regexp_eatDecimalDigits(state)) {
        min = state.lastIntValue;
        if (state.eat(0x2C /* , */) && this.regexp_eatDecimalDigits(state)) {
          max = state.lastIntValue;
        }
        if (state.eat(0x7D /* } */)) {
          // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
          if (max !== -1 && max < min && !noError) {
            state.raise("numbers out of order in {} quantifier");
          }
          return true
        }
      }
      if (state.switchU && !noError) {
        state.raise("Incomplete quantifier");
      }
      state.pos = start;
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
  pp$1.regexp_eatAtom = function(state) {
    return (
      this.regexp_eatPatternCharacters(state) ||
      state.eat(0x2E /* . */) ||
      this.regexp_eatReverseSolidusAtomEscape(state) ||
      this.regexp_eatCharacterClass(state) ||
      this.regexp_eatUncapturingGroup(state) ||
      this.regexp_eatCapturingGroup(state)
    )
  };
  pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
    var start = state.pos;
    if (state.eat(0x5C /* \ */)) {
      if (this.regexp_eatAtomEscape(state)) {
        return true
      }
      state.pos = start;
    }
    return false
  };
  pp$1.regexp_eatUncapturingGroup = function(state) {
    var start = state.pos;
    if (state.eat(0x28 /* ( */)) {
      if (state.eat(0x3F /* ? */)) {
        if (this.options.ecmaVersion >= 16) {
          var addModifiers = this.regexp_eatModifiers(state);
          var hasHyphen = state.eat(0x2D /* - */);
          if (addModifiers || hasHyphen) {
            for (var i = 0; i < addModifiers.length; i++) {
              var modifier = addModifiers.charAt(i);
              if (addModifiers.indexOf(modifier, i + 1) > -1) {
                state.raise("Duplicate regular expression modifiers");
              }
            }
            if (hasHyphen) {
              var removeModifiers = this.regexp_eatModifiers(state);
              if (!addModifiers && !removeModifiers && state.current() === 0x3A /* : */) {
                state.raise("Invalid regular expression modifiers");
              }
              for (var i$1 = 0; i$1 < removeModifiers.length; i$1++) {
                var modifier$1 = removeModifiers.charAt(i$1);
                if (
                  removeModifiers.indexOf(modifier$1, i$1 + 1) > -1 ||
                  addModifiers.indexOf(modifier$1) > -1
                ) {
                  state.raise("Duplicate regular expression modifiers");
                }
              }
            }
          }
        }
        if (state.eat(0x3A /* : */)) {
          this.regexp_disjunction(state);
          if (state.eat(0x29 /* ) */)) {
            return true
          }
          state.raise("Unterminated group");
        }
      }
      state.pos = start;
    }
    return false
  };
  pp$1.regexp_eatCapturingGroup = function(state) {
    if (state.eat(0x28 /* ( */)) {
      if (this.options.ecmaVersion >= 9) {
        this.regexp_groupSpecifier(state);
      } else if (state.current() === 0x3F /* ? */) {
        state.raise("Invalid group");
      }
      this.regexp_disjunction(state);
      if (state.eat(0x29 /* ) */)) {
        state.numCapturingParens += 1;
        return true
      }
      state.raise("Unterminated group");
    }
    return false
  };
  // RegularExpressionModifiers ::
  //   [empty]
  //   RegularExpressionModifiers RegularExpressionModifier
  pp$1.regexp_eatModifiers = function(state) {
    var modifiers = "";
    var ch = 0;
    while ((ch = state.current()) !== -1 && isRegularExpressionModifier(ch)) {
      modifiers += codePointToString(ch);
      state.advance();
    }
    return modifiers
  };
  // RegularExpressionModifier :: one of
  //   `i` `m` `s`
  function isRegularExpressionModifier(ch) {
    return ch === 0x69 /* i */ || ch === 0x6d /* m */ || ch === 0x73 /* s */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
  pp$1.regexp_eatExtendedAtom = function(state) {
    return (
      state.eat(0x2E /* . */) ||
      this.regexp_eatReverseSolidusAtomEscape(state) ||
      this.regexp_eatCharacterClass(state) ||
      this.regexp_eatUncapturingGroup(state) ||
      this.regexp_eatCapturingGroup(state) ||
      this.regexp_eatInvalidBracedQuantifier(state) ||
      this.regexp_eatExtendedPatternCharacter(state)
    )
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
  pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
    if (this.regexp_eatBracedQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
  pp$1.regexp_eatSyntaxCharacter = function(state) {
    var ch = state.current();
    if (isSyntaxCharacter(ch)) {
      state.lastIntValue = ch;
      state.advance();
      return true
    }
    return false
  };
  function isSyntaxCharacter(ch) {
    return (
      ch === 0x24 /* $ */ ||
      ch >= 0x28 /* ( */ && ch <= 0x2B /* + */ ||
      ch === 0x2E /* . */ ||
      ch === 0x3F /* ? */ ||
      ch >= 0x5B /* [ */ && ch <= 0x5E /* ^ */ ||
      ch >= 0x7B /* { */ && ch <= 0x7D /* } */
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
  // But eat eager.
  pp$1.regexp_eatPatternCharacters = function(state) {
    var start = state.pos;
    var ch = 0;
    while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
      state.advance();
    }
    return state.pos !== start
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
  pp$1.regexp_eatExtendedPatternCharacter = function(state) {
    var ch = state.current();
    if (
      ch !== -1 &&
      ch !== 0x24 /* $ */ &&
      !(ch >= 0x28 /* ( */ && ch <= 0x2B /* + */) &&
      ch !== 0x2E /* . */ &&
      ch !== 0x3F /* ? */ &&
      ch !== 0x5B /* [ */ &&
      ch !== 0x5E /* ^ */ &&
      ch !== 0x7C /* | */
    ) {
      state.advance();
      return true
    }
    return false
  };

  // GroupSpecifier ::
  //   [empty]
  //   `?` GroupName
  pp$1.regexp_groupSpecifier = function(state) {
    if (state.eat(0x3F /* ? */)) {
      if (!this.regexp_eatGroupName(state)) { state.raise("Invalid group"); }
      var trackDisjunction = this.options.ecmaVersion >= 16;
      var known = state.groupNames[state.lastStringValue];
      if (known) {
        if (trackDisjunction) {
          for (var i = 0, list = known; i < list.length; i += 1) {
            var altID = list[i];

            if (!altID.separatedFrom(state.branchID))
              { state.raise("Duplicate capture group name"); }
          }
        } else {
          state.raise("Duplicate capture group name");
        }
      }
      if (trackDisjunction) {
        (known || (state.groupNames[state.lastStringValue] = [])).push(state.branchID);
      } else {
        state.groupNames[state.lastStringValue] = true;
      }
    }
  };

  // GroupName ::
  //   `<` RegExpIdentifierName `>`
  // Note: this updates `state.lastStringValue` property with the eaten name.
  pp$1.regexp_eatGroupName = function(state) {
    state.lastStringValue = "";
    if (state.eat(0x3C /* < */)) {
      if (this.regexp_eatRegExpIdentifierName(state) && state.eat(0x3E /* > */)) {
        return true
      }
      state.raise("Invalid capture group name");
    }
    return false
  };

  // RegExpIdentifierName ::
  //   RegExpIdentifierStart
  //   RegExpIdentifierName RegExpIdentifierPart
  // Note: this updates `state.lastStringValue` property with the eaten name.
  pp$1.regexp_eatRegExpIdentifierName = function(state) {
    state.lastStringValue = "";
    if (this.regexp_eatRegExpIdentifierStart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
      while (this.regexp_eatRegExpIdentifierPart(state)) {
        state.lastStringValue += codePointToString(state.lastIntValue);
      }
      return true
    }
    return false
  };

  // RegExpIdentifierStart ::
  //   UnicodeIDStart
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[+U]
  pp$1.regexp_eatRegExpIdentifierStart = function(state) {
    var start = state.pos;
    var forceU = this.options.ecmaVersion >= 11;
    var ch = state.current(forceU);
    state.advance(forceU);

    if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
      ch = state.lastIntValue;
    }
    if (isRegExpIdentifierStart(ch)) {
      state.lastIntValue = ch;
      return true
    }

    state.pos = start;
    return false
  };
  function isRegExpIdentifierStart(ch) {
    return isIdentifierStart(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */
  }

  // RegExpIdentifierPart ::
  //   UnicodeIDContinue
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[+U]
  //   <ZWNJ>
  //   <ZWJ>
  pp$1.regexp_eatRegExpIdentifierPart = function(state) {
    var start = state.pos;
    var forceU = this.options.ecmaVersion >= 11;
    var ch = state.current(forceU);
    state.advance(forceU);

    if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
      ch = state.lastIntValue;
    }
    if (isRegExpIdentifierPart(ch)) {
      state.lastIntValue = ch;
      return true
    }

    state.pos = start;
    return false
  };
  function isRegExpIdentifierPart(ch) {
    return isIdentifierChar(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */ || ch === 0x200C /* <ZWNJ> */ || ch === 0x200D /* <ZWJ> */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
  pp$1.regexp_eatAtomEscape = function(state) {
    if (
      this.regexp_eatBackReference(state) ||
      this.regexp_eatCharacterClassEscape(state) ||
      this.regexp_eatCharacterEscape(state) ||
      (state.switchN && this.regexp_eatKGroupName(state))
    ) {
      return true
    }
    if (state.switchU) {
      // Make the same message as V8.
      if (state.current() === 0x63 /* c */) {
        state.raise("Invalid unicode escape");
      }
      state.raise("Invalid escape");
    }
    return false
  };
  pp$1.regexp_eatBackReference = function(state) {
    var start = state.pos;
    if (this.regexp_eatDecimalEscape(state)) {
      var n = state.lastIntValue;
      if (state.switchU) {
        // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
        if (n > state.maxBackReference) {
          state.maxBackReference = n;
        }
        return true
      }
      if (n <= state.numCapturingParens) {
        return true
      }
      state.pos = start;
    }
    return false
  };
  pp$1.regexp_eatKGroupName = function(state) {
    if (state.eat(0x6B /* k */)) {
      if (this.regexp_eatGroupName(state)) {
        state.backReferenceNames.push(state.lastStringValue);
        return true
      }
      state.raise("Invalid named reference");
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
  pp$1.regexp_eatCharacterEscape = function(state) {
    return (
      this.regexp_eatControlEscape(state) ||
      this.regexp_eatCControlLetter(state) ||
      this.regexp_eatZero(state) ||
      this.regexp_eatHexEscapeSequence(state) ||
      this.regexp_eatRegExpUnicodeEscapeSequence(state, false) ||
      (!state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state)) ||
      this.regexp_eatIdentityEscape(state)
    )
  };
  pp$1.regexp_eatCControlLetter = function(state) {
    var start = state.pos;
    if (state.eat(0x63 /* c */)) {
      if (this.regexp_eatControlLetter(state)) {
        return true
      }
      state.pos = start;
    }
    return false
  };
  pp$1.regexp_eatZero = function(state) {
    if (state.current() === 0x30 /* 0 */ && !isDecimalDigit(state.lookahead())) {
      state.lastIntValue = 0;
      state.advance();
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
  pp$1.regexp_eatControlEscape = function(state) {
    var ch = state.current();
    if (ch === 0x74 /* t */) {
      state.lastIntValue = 0x09; /* \t */
      state.advance();
      return true
    }
    if (ch === 0x6E /* n */) {
      state.lastIntValue = 0x0A; /* \n */
      state.advance();
      return true
    }
    if (ch === 0x76 /* v */) {
      state.lastIntValue = 0x0B; /* \v */
      state.advance();
      return true
    }
    if (ch === 0x66 /* f */) {
      state.lastIntValue = 0x0C; /* \f */
      state.advance();
      return true
    }
    if (ch === 0x72 /* r */) {
      state.lastIntValue = 0x0D; /* \r */
      state.advance();
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
  pp$1.regexp_eatControlLetter = function(state) {
    var ch = state.current();
    if (isControlLetter(ch)) {
      state.lastIntValue = ch % 0x20;
      state.advance();
      return true
    }
    return false
  };
  function isControlLetter(ch) {
    return (
      (ch >= 0x41 /* A */ && ch <= 0x5A /* Z */) ||
      (ch >= 0x61 /* a */ && ch <= 0x7A /* z */)
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
  pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
    if ( forceU === void 0 ) forceU = false;

    var start = state.pos;
    var switchU = forceU || state.switchU;

    if (state.eat(0x75 /* u */)) {
      if (this.regexp_eatFixedHexDigits(state, 4)) {
        var lead = state.lastIntValue;
        if (switchU && lead >= 0xD800 && lead <= 0xDBFF) {
          var leadSurrogateEnd = state.pos;
          if (state.eat(0x5C /* \ */) && state.eat(0x75 /* u */) && this.regexp_eatFixedHexDigits(state, 4)) {
            var trail = state.lastIntValue;
            if (trail >= 0xDC00 && trail <= 0xDFFF) {
              state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
              return true
            }
          }
          state.pos = leadSurrogateEnd;
          state.lastIntValue = lead;
        }
        return true
      }
      if (
        switchU &&
        state.eat(0x7B /* { */) &&
        this.regexp_eatHexDigits(state) &&
        state.eat(0x7D /* } */) &&
        isValidUnicode(state.lastIntValue)
      ) {
        return true
      }
      if (switchU) {
        state.raise("Invalid unicode escape");
      }
      state.pos = start;
    }

    return false
  };
  function isValidUnicode(ch) {
    return ch >= 0 && ch <= 0x10FFFF
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
  pp$1.regexp_eatIdentityEscape = function(state) {
    if (state.switchU) {
      if (this.regexp_eatSyntaxCharacter(state)) {
        return true
      }
      if (state.eat(0x2F /* / */)) {
        state.lastIntValue = 0x2F; /* / */
        return true
      }
      return false
    }

    var ch = state.current();
    if (ch !== 0x63 /* c */ && (!state.switchN || ch !== 0x6B /* k */)) {
      state.lastIntValue = ch;
      state.advance();
      return true
    }

    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
  pp$1.regexp_eatDecimalEscape = function(state) {
    state.lastIntValue = 0;
    var ch = state.current();
    if (ch >= 0x31 /* 1 */ && ch <= 0x39 /* 9 */) {
      do {
        state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
        state.advance();
      } while ((ch = state.current()) >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */)
      return true
    }
    return false
  };

  // Return values used by character set parsing methods, needed to
  // forbid negation of sets that can match strings.
  var CharSetNone = 0; // Nothing parsed
  var CharSetOk = 1; // Construct parsed, cannot contain strings
  var CharSetString = 2; // Construct parsed, can contain strings

  // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
  pp$1.regexp_eatCharacterClassEscape = function(state) {
    var ch = state.current();

    if (isCharacterClassEscape(ch)) {
      state.lastIntValue = -1;
      state.advance();
      return CharSetOk
    }

    var negate = false;
    if (
      state.switchU &&
      this.options.ecmaVersion >= 9 &&
      ((negate = ch === 0x50 /* P */) || ch === 0x70 /* p */)
    ) {
      state.lastIntValue = -1;
      state.advance();
      var result;
      if (
        state.eat(0x7B /* { */) &&
        (result = this.regexp_eatUnicodePropertyValueExpression(state)) &&
        state.eat(0x7D /* } */)
      ) {
        if (negate && result === CharSetString) { state.raise("Invalid property name"); }
        return result
      }
      state.raise("Invalid property name");
    }

    return CharSetNone
  };

  function isCharacterClassEscape(ch) {
    return (
      ch === 0x64 /* d */ ||
      ch === 0x44 /* D */ ||
      ch === 0x73 /* s */ ||
      ch === 0x53 /* S */ ||
      ch === 0x77 /* w */ ||
      ch === 0x57 /* W */
    )
  }

  // UnicodePropertyValueExpression ::
  //   UnicodePropertyName `=` UnicodePropertyValue
  //   LoneUnicodePropertyNameOrValue
  pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
    var start = state.pos;

    // UnicodePropertyName `=` UnicodePropertyValue
    if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3D /* = */)) {
      var name = state.lastStringValue;
      if (this.regexp_eatUnicodePropertyValue(state)) {
        var value = state.lastStringValue;
        this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
        return CharSetOk
      }
    }
    state.pos = start;

    // LoneUnicodePropertyNameOrValue
    if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
      var nameOrValue = state.lastStringValue;
      return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue)
    }
    return CharSetNone
  };

  pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
    if (!hasOwn(state.unicodeProperties.nonBinary, name))
      { state.raise("Invalid property name"); }
    if (!state.unicodeProperties.nonBinary[name].test(value))
      { state.raise("Invalid property value"); }
  };

  pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
    if (state.unicodeProperties.binary.test(nameOrValue)) { return CharSetOk }
    if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue)) { return CharSetString }
    state.raise("Invalid property name");
  };

  // UnicodePropertyName ::
  //   UnicodePropertyNameCharacters
  pp$1.regexp_eatUnicodePropertyName = function(state) {
    var ch = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyNameCharacter(ch = state.current())) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }
    return state.lastStringValue !== ""
  };

  function isUnicodePropertyNameCharacter(ch) {
    return isControlLetter(ch) || ch === 0x5F /* _ */
  }

  // UnicodePropertyValue ::
  //   UnicodePropertyValueCharacters
  pp$1.regexp_eatUnicodePropertyValue = function(state) {
    var ch = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyValueCharacter(ch = state.current())) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }
    return state.lastStringValue !== ""
  };
  function isUnicodePropertyValueCharacter(ch) {
    return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch)
  }

  // LoneUnicodePropertyNameOrValue ::
  //   UnicodePropertyValueCharacters
  pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
    return this.regexp_eatUnicodePropertyValue(state)
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
  pp$1.regexp_eatCharacterClass = function(state) {
    if (state.eat(0x5B /* [ */)) {
      var negate = state.eat(0x5E /* ^ */);
      var result = this.regexp_classContents(state);
      if (!state.eat(0x5D /* ] */))
        { state.raise("Unterminated character class"); }
      if (negate && result === CharSetString)
        { state.raise("Negated character class may contain strings"); }
      return true
    }
    return false
  };

  // https://tc39.es/ecma262/#prod-ClassContents
  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
  pp$1.regexp_classContents = function(state) {
    if (state.current() === 0x5D /* ] */) { return CharSetOk }
    if (state.switchV) { return this.regexp_classSetExpression(state) }
    this.regexp_nonEmptyClassRanges(state);
    return CharSetOk
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
  pp$1.regexp_nonEmptyClassRanges = function(state) {
    while (this.regexp_eatClassAtom(state)) {
      var left = state.lastIntValue;
      if (state.eat(0x2D /* - */) && this.regexp_eatClassAtom(state)) {
        var right = state.lastIntValue;
        if (state.switchU && (left === -1 || right === -1)) {
          state.raise("Invalid character class");
        }
        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
      }
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
  pp$1.regexp_eatClassAtom = function(state) {
    var start = state.pos;

    if (state.eat(0x5C /* \ */)) {
      if (this.regexp_eatClassEscape(state)) {
        return true
      }
      if (state.switchU) {
        // Make the same message as V8.
        var ch$1 = state.current();
        if (ch$1 === 0x63 /* c */ || isOctalDigit(ch$1)) {
          state.raise("Invalid class escape");
        }
        state.raise("Invalid escape");
      }
      state.pos = start;
    }

    var ch = state.current();
    if (ch !== 0x5D /* ] */) {
      state.lastIntValue = ch;
      state.advance();
      return true
    }

    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
  pp$1.regexp_eatClassEscape = function(state) {
    var start = state.pos;

    if (state.eat(0x62 /* b */)) {
      state.lastIntValue = 0x08; /* <BS> */
      return true
    }

    if (state.switchU && state.eat(0x2D /* - */)) {
      state.lastIntValue = 0x2D; /* - */
      return true
    }

    if (!state.switchU && state.eat(0x63 /* c */)) {
      if (this.regexp_eatClassControlLetter(state)) {
        return true
      }
      state.pos = start;
    }

    return (
      this.regexp_eatCharacterClassEscape(state) ||
      this.regexp_eatCharacterEscape(state)
    )
  };

  // https://tc39.es/ecma262/#prod-ClassSetExpression
  // https://tc39.es/ecma262/#prod-ClassUnion
  // https://tc39.es/ecma262/#prod-ClassIntersection
  // https://tc39.es/ecma262/#prod-ClassSubtraction
  pp$1.regexp_classSetExpression = function(state) {
    var result = CharSetOk, subResult;
    if (this.regexp_eatClassSetRange(state)) ; else if (subResult = this.regexp_eatClassSetOperand(state)) {
      if (subResult === CharSetString) { result = CharSetString; }
      // https://tc39.es/ecma262/#prod-ClassIntersection
      var start = state.pos;
      while (state.eatChars([0x26, 0x26] /* && */)) {
        if (
          state.current() !== 0x26 /* & */ &&
          (subResult = this.regexp_eatClassSetOperand(state))
        ) {
          if (subResult !== CharSetString) { result = CharSetOk; }
          continue
        }
        state.raise("Invalid character in character class");
      }
      if (start !== state.pos) { return result }
      // https://tc39.es/ecma262/#prod-ClassSubtraction
      while (state.eatChars([0x2D, 0x2D] /* -- */)) {
        if (this.regexp_eatClassSetOperand(state)) { continue }
        state.raise("Invalid character in character class");
      }
      if (start !== state.pos) { return result }
    } else {
      state.raise("Invalid character in character class");
    }
    // https://tc39.es/ecma262/#prod-ClassUnion
    for (;;) {
      if (this.regexp_eatClassSetRange(state)) { continue }
      subResult = this.regexp_eatClassSetOperand(state);
      if (!subResult) { return result }
      if (subResult === CharSetString) { result = CharSetString; }
    }
  };

  // https://tc39.es/ecma262/#prod-ClassSetRange
  pp$1.regexp_eatClassSetRange = function(state) {
    var start = state.pos;
    if (this.regexp_eatClassSetCharacter(state)) {
      var left = state.lastIntValue;
      if (state.eat(0x2D /* - */) && this.regexp_eatClassSetCharacter(state)) {
        var right = state.lastIntValue;
        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
        return true
      }
      state.pos = start;
    }
    return false
  };

  // https://tc39.es/ecma262/#prod-ClassSetOperand
  pp$1.regexp_eatClassSetOperand = function(state) {
    if (this.regexp_eatClassSetCharacter(state)) { return CharSetOk }
    return this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state)
  };

  // https://tc39.es/ecma262/#prod-NestedClass
  pp$1.regexp_eatNestedClass = function(state) {
    var start = state.pos;
    if (state.eat(0x5B /* [ */)) {
      var negate = state.eat(0x5E /* ^ */);
      var result = this.regexp_classContents(state);
      if (state.eat(0x5D /* ] */)) {
        if (negate && result === CharSetString) {
          state.raise("Negated character class may contain strings");
        }
        return result
      }
      state.pos = start;
    }
    if (state.eat(0x5C /* \ */)) {
      var result$1 = this.regexp_eatCharacterClassEscape(state);
      if (result$1) {
        return result$1
      }
      state.pos = start;
    }
    return null
  };

  // https://tc39.es/ecma262/#prod-ClassStringDisjunction
  pp$1.regexp_eatClassStringDisjunction = function(state) {
    var start = state.pos;
    if (state.eatChars([0x5C, 0x71] /* \q */)) {
      if (state.eat(0x7B /* { */)) {
        var result = this.regexp_classStringDisjunctionContents(state);
        if (state.eat(0x7D /* } */)) {
          return result
        }
      } else {
        // Make the same message as V8.
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    return null
  };

  // https://tc39.es/ecma262/#prod-ClassStringDisjunctionContents
  pp$1.regexp_classStringDisjunctionContents = function(state) {
    var result = this.regexp_classString(state);
    while (state.eat(0x7C /* | */)) {
      if (this.regexp_classString(state) === CharSetString) { result = CharSetString; }
    }
    return result
  };

  // https://tc39.es/ecma262/#prod-ClassString
  // https://tc39.es/ecma262/#prod-NonEmptyClassString
  pp$1.regexp_classString = function(state) {
    var count = 0;
    while (this.regexp_eatClassSetCharacter(state)) { count++; }
    return count === 1 ? CharSetOk : CharSetString
  };

  // https://tc39.es/ecma262/#prod-ClassSetCharacter
  pp$1.regexp_eatClassSetCharacter = function(state) {
    var start = state.pos;
    if (state.eat(0x5C /* \ */)) {
      if (
        this.regexp_eatCharacterEscape(state) ||
        this.regexp_eatClassSetReservedPunctuator(state)
      ) {
        return true
      }
      if (state.eat(0x62 /* b */)) {
        state.lastIntValue = 0x08; /* <BS> */
        return true
      }
      state.pos = start;
      return false
    }
    var ch = state.current();
    if (ch < 0 || ch === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter(ch)) { return false }
    if (isClassSetSyntaxCharacter(ch)) { return false }
    state.advance();
    state.lastIntValue = ch;
    return true
  };

  // https://tc39.es/ecma262/#prod-ClassSetReservedDoublePunctuator
  function isClassSetReservedDoublePunctuatorCharacter(ch) {
    return (
      ch === 0x21 /* ! */ ||
      ch >= 0x23 /* # */ && ch <= 0x26 /* & */ ||
      ch >= 0x2A /* * */ && ch <= 0x2C /* , */ ||
      ch === 0x2E /* . */ ||
      ch >= 0x3A /* : */ && ch <= 0x40 /* @ */ ||
      ch === 0x5E /* ^ */ ||
      ch === 0x60 /* ` */ ||
      ch === 0x7E /* ~ */
    )
  }

  // https://tc39.es/ecma262/#prod-ClassSetSyntaxCharacter
  function isClassSetSyntaxCharacter(ch) {
    return (
      ch === 0x28 /* ( */ ||
      ch === 0x29 /* ) */ ||
      ch === 0x2D /* - */ ||
      ch === 0x2F /* / */ ||
      ch >= 0x5B /* [ */ && ch <= 0x5D /* ] */ ||
      ch >= 0x7B /* { */ && ch <= 0x7D /* } */
    )
  }

  // https://tc39.es/ecma262/#prod-ClassSetReservedPunctuator
  pp$1.regexp_eatClassSetReservedPunctuator = function(state) {
    var ch = state.current();
    if (isClassSetReservedPunctuator(ch)) {
      state.lastIntValue = ch;
      state.advance();
      return true
    }
    return false
  };

  // https://tc39.es/ecma262/#prod-ClassSetReservedPunctuator
  function isClassSetReservedPunctuator(ch) {
    return (
      ch === 0x21 /* ! */ ||
      ch === 0x23 /* # */ ||
      ch === 0x25 /* % */ ||
      ch === 0x26 /* & */ ||
      ch === 0x2C /* , */ ||
      ch === 0x2D /* - */ ||
      ch >= 0x3A /* : */ && ch <= 0x3E /* > */ ||
      ch === 0x40 /* @ */ ||
      ch === 0x60 /* ` */ ||
      ch === 0x7E /* ~ */
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
  pp$1.regexp_eatClassControlLetter = function(state) {
    var ch = state.current();
    if (isDecimalDigit(ch) || ch === 0x5F /* _ */) {
      state.lastIntValue = ch % 0x20;
      state.advance();
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
  pp$1.regexp_eatHexEscapeSequence = function(state) {
    var start = state.pos;
    if (state.eat(0x78 /* x */)) {
      if (this.regexp_eatFixedHexDigits(state, 2)) {
        return true
      }
      if (state.switchU) {
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
  pp$1.regexp_eatDecimalDigits = function(state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;
    while (isDecimalDigit(ch = state.current())) {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
      state.advance();
    }
    return state.pos !== start
  };
  function isDecimalDigit(ch) {
    return ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
  pp$1.regexp_eatHexDigits = function(state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;
    while (isHexDigit(ch = state.current())) {
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }
    return state.pos !== start
  };
  function isHexDigit(ch) {
    return (
      (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) ||
      (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) ||
      (ch >= 0x61 /* a */ && ch <= 0x66 /* f */)
    )
  }
  function hexToInt(ch) {
    if (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) {
      return 10 + (ch - 0x41 /* A */)
    }
    if (ch >= 0x61 /* a */ && ch <= 0x66 /* f */) {
      return 10 + (ch - 0x61 /* a */)
    }
    return ch - 0x30 /* 0 */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
  // Allows only 0-377(octal) i.e. 0-255(decimal).
  pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
    if (this.regexp_eatOctalDigit(state)) {
      var n1 = state.lastIntValue;
      if (this.regexp_eatOctalDigit(state)) {
        var n2 = state.lastIntValue;
        if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
          state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
        } else {
          state.lastIntValue = n1 * 8 + n2;
        }
      } else {
        state.lastIntValue = n1;
      }
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
  pp$1.regexp_eatOctalDigit = function(state) {
    var ch = state.current();
    if (isOctalDigit(ch)) {
      state.lastIntValue = ch - 0x30; /* 0 */
      state.advance();
      return true
    }
    state.lastIntValue = 0;
    return false
  };
  function isOctalDigit(ch) {
    return ch >= 0x30 /* 0 */ && ch <= 0x37 /* 7 */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
  // And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
  pp$1.regexp_eatFixedHexDigits = function(state, length) {
    var start = state.pos;
    state.lastIntValue = 0;
    for (var i = 0; i < length; ++i) {
      var ch = state.current();
      if (!isHexDigit(ch)) {
        state.pos = start;
        return false
      }
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }
    return true
  };

  // Object type used to represent tokens. Note that normally, tokens
  // simply exist as properties on the parser object. This is only
  // used for the onToken callback and the external tokenizer.

  var Token = function Token(p) {
    this.type = p.type;
    this.value = p.value;
    this.start = p.start;
    this.end = p.end;
    if (p.options.locations)
      { this.loc = new SourceLocation(p, p.startLoc, p.endLoc); }
    if (p.options.ranges)
      { this.range = [p.start, p.end]; }
  };

  // ## Tokenizer

  var pp = Parser.prototype;

  // Move to the next token

  pp.next = function(ignoreEscapeSequenceInKeyword) {
    if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc)
      { this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword); }
    if (this.options.onToken)
      { this.options.onToken(new Token(this)); }

    this.lastTokEnd = this.end;
    this.lastTokStart = this.start;
    this.lastTokEndLoc = this.endLoc;
    this.lastTokStartLoc = this.startLoc;
    this.nextToken();
  };

  pp.getToken = function() {
    this.next();
    return new Token(this)
  };

  // If we're in an ES6 environment, make parsers iterable
  if (typeof Symbol !== "undefined")
    { pp[Symbol.iterator] = function() {
      var this$1$1 = this;

      return {
        next: function () {
          var token = this$1$1.getToken();
          return {
            done: token.type === types$1.eof,
            value: token
          }
        }
      }
    }; }

  // Toggle strict mode. Re-reads the next number or string to please
  // pedantic tests (`"use strict"; 010;` should fail).

  // Read a single token, updating the parser object's token-related
  // properties.

  pp.nextToken = function() {
    var curContext = this.curContext();
    if (!curContext || !curContext.preserveSpace) { this.skipSpace(); }

    this.start = this.pos;
    if (this.options.locations) { this.startLoc = this.curPosition(); }
    if (this.pos >= this.input.length) { return this.finishToken(types$1.eof) }

    if (curContext.override) { return curContext.override(this) }
    else { this.readToken(this.fullCharCodeAtPos()); }
  };

  pp.readToken = function(code) {
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */)
      { return this.readWord() }

    return this.getTokenFromCode(code)
  };

  pp.fullCharCodeAtPos = function() {
    var code = this.input.charCodeAt(this.pos);
    if (code <= 0xd7ff || code >= 0xdc00) { return code }
    var next = this.input.charCodeAt(this.pos + 1);
    return next <= 0xdbff || next >= 0xe000 ? code : (code << 10) + next - 0x35fdc00
  };

  pp.skipBlockComment = function() {
    var startLoc = this.options.onComment && this.curPosition();
    var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
    if (end === -1) { this.raise(this.pos - 2, "Unterminated comment"); }
    this.pos = end + 2;
    if (this.options.locations) {
      for (var nextBreak = (void 0), pos = start; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1;) {
        ++this.curLine;
        pos = this.lineStart = nextBreak;
      }
    }
    if (this.options.onComment)
      { this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
                             startLoc, this.curPosition()); }
  };

  pp.skipLineComment = function(startSkip) {
    var start = this.pos;
    var startLoc = this.options.onComment && this.curPosition();
    var ch = this.input.charCodeAt(this.pos += startSkip);
    while (this.pos < this.input.length && !isNewLine(ch)) {
      ch = this.input.charCodeAt(++this.pos);
    }
    if (this.options.onComment)
      { this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
                             startLoc, this.curPosition()); }
  };

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.

  pp.skipSpace = function() {
    loop: while (this.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.pos);
      switch (ch) {
      case 32: case 160: // ' '
        ++this.pos;
        break
      case 13:
        if (this.input.charCodeAt(this.pos + 1) === 10) {
          ++this.pos;
        }
      case 10: case 8232: case 8233:
        ++this.pos;
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        break
      case 47: // '/'
        switch (this.input.charCodeAt(this.pos + 1)) {
        case 42: // '*'
          this.skipBlockComment();
          break
        case 47:
          this.skipLineComment(2);
          break
        default:
          break loop
        }
        break
      default:
        if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
          ++this.pos;
        } else {
          break loop
        }
      }
    }
  };

  // Called at the end of every token. Sets `end`, `val`, and
  // maintains `context` and `exprAllowed`, and skips the space after
  // the token, so that the next one's `start` will point at the
  // right position.

  pp.finishToken = function(type, val) {
    this.end = this.pos;
    if (this.options.locations) { this.endLoc = this.curPosition(); }
    var prevType = this.type;
    this.type = type;
    this.value = val;

    this.updateContext(prevType);
  };

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //
  pp.readToken_dot = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next >= 48 && next <= 57) { return this.readNumber(true) }
    var next2 = this.input.charCodeAt(this.pos + 2);
    if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
      this.pos += 3;
      return this.finishToken(types$1.ellipsis)
    } else {
      ++this.pos;
      return this.finishToken(types$1.dot)
    }
  };

  pp.readToken_slash = function() { // '/'
    var next = this.input.charCodeAt(this.pos + 1);
    if (this.exprAllowed) { ++this.pos; return this.readRegexp() }
    if (next === 61) { return this.finishOp(types$1.assign, 2) }
    return this.finishOp(types$1.slash, 1)
  };

  pp.readToken_mult_modulo_exp = function(code) { // '%*'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    var tokentype = code === 42 ? types$1.star : types$1.modulo;

    // exponentiation operator ** and **=
    if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
      ++size;
      tokentype = types$1.starstar;
      next = this.input.charCodeAt(this.pos + 2);
    }

    if (next === 61) { return this.finishOp(types$1.assign, size + 1) }
    return this.finishOp(tokentype, size)
  };

  pp.readToken_pipe_amp = function(code) { // '|&'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (this.options.ecmaVersion >= 12) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 === 61) { return this.finishOp(types$1.assign, 3) }
      }
      return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2)
    }
    if (next === 61) { return this.finishOp(types$1.assign, 2) }
    return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1)
  };

  pp.readToken_caret = function() { // '^'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) { return this.finishOp(types$1.assign, 2) }
    return this.finishOp(types$1.bitwiseXOR, 1)
  };

  pp.readToken_plus_min = function(code) { // '+-'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 &&
          (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
        // A `-->` line comment
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken()
      }
      return this.finishOp(types$1.incDec, 2)
    }
    if (next === 61) { return this.finishOp(types$1.assign, 2) }
    return this.finishOp(types$1.plusMin, 1)
  };

  pp.readToken_lt_gt = function(code) { // '<>'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.pos + size) === 61) { return this.finishOp(types$1.assign, size + 1) }
      return this.finishOp(types$1.bitShift, size)
    }
    if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 &&
        this.input.charCodeAt(this.pos + 3) === 45) {
      // `<!--`, an XML-style comment that should be interpreted as a line comment
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken()
    }
    if (next === 61) { size = 2; }
    return this.finishOp(types$1.relational, size)
  };

  pp.readToken_eq_excl = function(code) { // '=!'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) { return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) }
    if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
      this.pos += 2;
      return this.finishToken(types$1.arrow)
    }
    return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1)
  };

  pp.readToken_question = function() { // '?'
    var ecmaVersion = this.options.ecmaVersion;
    if (ecmaVersion >= 11) {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 46) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 < 48 || next2 > 57) { return this.finishOp(types$1.questionDot, 2) }
      }
      if (next === 63) {
        if (ecmaVersion >= 12) {
          var next2$1 = this.input.charCodeAt(this.pos + 2);
          if (next2$1 === 61) { return this.finishOp(types$1.assign, 3) }
        }
        return this.finishOp(types$1.coalesce, 2)
      }
    }
    return this.finishOp(types$1.question, 1)
  };

  pp.readToken_numberSign = function() { // '#'
    var ecmaVersion = this.options.ecmaVersion;
    var code = 35; // '#'
    if (ecmaVersion >= 13) {
      ++this.pos;
      code = this.fullCharCodeAtPos();
      if (isIdentifierStart(code, true) || code === 92 /* '\' */) {
        return this.finishToken(types$1.privateId, this.readWord1())
      }
    }

    this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
  };

  pp.getTokenFromCode = function(code) {
    switch (code) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46: // '.'
      return this.readToken_dot()

    // Punctuation tokens.
    case 40: ++this.pos; return this.finishToken(types$1.parenL)
    case 41: ++this.pos; return this.finishToken(types$1.parenR)
    case 59: ++this.pos; return this.finishToken(types$1.semi)
    case 44: ++this.pos; return this.finishToken(types$1.comma)
    case 91: ++this.pos; return this.finishToken(types$1.bracketL)
    case 93: ++this.pos; return this.finishToken(types$1.bracketR)
    case 123: ++this.pos; return this.finishToken(types$1.braceL)
    case 125: ++this.pos; return this.finishToken(types$1.braceR)
    case 58: ++this.pos; return this.finishToken(types$1.colon)

    case 96: // '`'
      if (this.options.ecmaVersion < 6) { break }
      ++this.pos;
      return this.finishToken(types$1.backQuote)

    case 48: // '0'
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 120 || next === 88) { return this.readRadixNumber(16) } // '0x', '0X' - hex number
      if (this.options.ecmaVersion >= 6) {
        if (next === 111 || next === 79) { return this.readRadixNumber(8) } // '0o', '0O' - octal number
        if (next === 98 || next === 66) { return this.readRadixNumber(2) } // '0b', '0B' - binary number
      }

    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
      return this.readNumber(false)

    // Quotes produce strings.
    case 34: case 39: // '"', "'"
      return this.readString(code)

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.
    case 47: // '/'
      return this.readToken_slash()

    case 37: case 42: // '%*'
      return this.readToken_mult_modulo_exp(code)

    case 124: case 38: // '|&'
      return this.readToken_pipe_amp(code)

    case 94: // '^'
      return this.readToken_caret()

    case 43: case 45: // '+-'
      return this.readToken_plus_min(code)

    case 60: case 62: // '<>'
      return this.readToken_lt_gt(code)

    case 61: case 33: // '=!'
      return this.readToken_eq_excl(code)

    case 63: // '?'
      return this.readToken_question()

    case 126: // '~'
      return this.finishOp(types$1.prefix, 1)

    case 35: // '#'
      return this.readToken_numberSign()
    }

    this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
  };

  pp.finishOp = function(type, size) {
    var str = this.input.slice(this.pos, this.pos + size);
    this.pos += size;
    return this.finishToken(type, str)
  };

  pp.readRegexp = function() {
    var escaped, inClass, start = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) { this.raise(start, "Unterminated regular expression"); }
      var ch = this.input.charAt(this.pos);
      if (lineBreak.test(ch)) { this.raise(start, "Unterminated regular expression"); }
      if (!escaped) {
        if (ch === "[") { inClass = true; }
        else if (ch === "]" && inClass) { inClass = false; }
        else if (ch === "/" && !inClass) { break }
        escaped = ch === "\\";
      } else { escaped = false; }
      ++this.pos;
    }
    var pattern = this.input.slice(start, this.pos);
    ++this.pos;
    var flagsStart = this.pos;
    var flags = this.readWord1();
    if (this.containsEsc) { this.unexpected(flagsStart); }

    // Validate pattern
    var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
    state.reset(start, pattern, flags);
    this.validateRegExpFlags(state);
    this.validateRegExpPattern(state);

    // Create Literal#value property value.
    var value = null;
    try {
      value = new RegExp(pattern, flags);
    } catch (e) {
      // ESTree requires null if it failed to instantiate RegExp object.
      // https://github.com/estree/estree/blob/a27003adf4fd7bfad44de9cef372a2eacd527b1c/es5.md#regexpliteral
    }

    return this.finishToken(types$1.regexp, {pattern: pattern, flags: flags, value: value})
  };

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
    // `len` is used for character escape sequences. In that case, disallow separators.
    var allowSeparators = this.options.ecmaVersion >= 12 && len === undefined;

    // `maybeLegacyOctalNumericLiteral` is true if it doesn't have prefix (0x,0o,0b)
    // and isn't fraction part nor exponent part. In that case, if the first digit
    // is zero then disallow separators.
    var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;

    var start = this.pos, total = 0, lastCode = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i, ++this.pos) {
      var code = this.input.charCodeAt(this.pos), val = (void 0);

      if (allowSeparators && code === 95) {
        if (isLegacyOctalNumericLiteral) { this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"); }
        if (lastCode === 95) { this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"); }
        if (i === 0) { this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"); }
        lastCode = code;
        continue
      }

      if (code >= 97) { val = code - 97 + 10; } // a
      else if (code >= 65) { val = code - 65 + 10; } // A
      else if (code >= 48 && code <= 57) { val = code - 48; } // 0-9
      else { val = Infinity; }
      if (val >= radix) { break }
      lastCode = code;
      total = total * radix + val;
    }

    if (allowSeparators && lastCode === 95) { this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"); }
    if (this.pos === start || len != null && this.pos - start !== len) { return null }

    return total
  };

  function stringToNumber(str, isLegacyOctalNumericLiteral) {
    if (isLegacyOctalNumericLiteral) {
      return parseInt(str, 8)
    }

    // `parseFloat(value)` stops parsing at the first numeric separator then returns a wrong value.
    return parseFloat(str.replace(/_/g, ""))
  }

  function stringToBigInt(str) {
    if (typeof BigInt !== "function") {
      return null
    }

    // `BigInt(value)` throws syntax error if the string contains numeric separators.
    return BigInt(str.replace(/_/g, ""))
  }

  pp.readRadixNumber = function(radix) {
    var start = this.pos;
    this.pos += 2; // 0x
    var val = this.readInt(radix);
    if (val == null) { this.raise(this.start + 2, "Expected number in radix " + radix); }
    if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
      val = stringToBigInt(this.input.slice(start, this.pos));
      ++this.pos;
    } else if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
    return this.finishToken(types$1.num, val)
  };

  // Read an integer, octal integer, or floating-point number.

  pp.readNumber = function(startsWithDot) {
    var start = this.pos;
    if (!startsWithDot && this.readInt(10, undefined, true) === null) { this.raise(start, "Invalid number"); }
    var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
    if (octal && this.strict) { this.raise(start, "Invalid number"); }
    var next = this.input.charCodeAt(this.pos);
    if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
      var val$1 = stringToBigInt(this.input.slice(start, this.pos));
      ++this.pos;
      if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
      return this.finishToken(types$1.num, val$1)
    }
    if (octal && /[89]/.test(this.input.slice(start, this.pos))) { octal = false; }
    if (next === 46 && !octal) { // '.'
      ++this.pos;
      this.readInt(10);
      next = this.input.charCodeAt(this.pos);
    }
    if ((next === 69 || next === 101) && !octal) { // 'eE'
      next = this.input.charCodeAt(++this.pos);
      if (next === 43 || next === 45) { ++this.pos; } // '+-'
      if (this.readInt(10) === null) { this.raise(start, "Invalid number"); }
    }
    if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }

    var val = stringToNumber(this.input.slice(start, this.pos), octal);
    return this.finishToken(types$1.num, val)
  };

  // Read a string value, interpreting backslash-escapes.

  pp.readCodePoint = function() {
    var ch = this.input.charCodeAt(this.pos), code;

    if (ch === 123) { // '{'
      if (this.options.ecmaVersion < 6) { this.unexpected(); }
      var codePos = ++this.pos;
      code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
      ++this.pos;
      if (code > 0x10FFFF) { this.invalidStringToken(codePos, "Code point out of bounds"); }
    } else {
      code = this.readHexChar(4);
    }
    return code
  };

  pp.readString = function(quote) {
    var out = "", chunkStart = ++this.pos;
    for (;;) {
      if (this.pos >= this.input.length) { this.raise(this.start, "Unterminated string constant"); }
      var ch = this.input.charCodeAt(this.pos);
      if (ch === quote) { break }
      if (ch === 92) { // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(false);
        chunkStart = this.pos;
      } else if (ch === 0x2028 || ch === 0x2029) {
        if (this.options.ecmaVersion < 10) { this.raise(this.start, "Unterminated string constant"); }
        ++this.pos;
        if (this.options.locations) {
          this.curLine++;
          this.lineStart = this.pos;
        }
      } else {
        if (isNewLine(ch)) { this.raise(this.start, "Unterminated string constant"); }
        ++this.pos;
      }
    }
    out += this.input.slice(chunkStart, this.pos++);
    return this.finishToken(types$1.string, out)
  };

  // Reads template string tokens.

  var INVALID_TEMPLATE_ESCAPE_ERROR = {};

  pp.tryReadTemplateToken = function() {
    this.inTemplateElement = true;
    try {
      this.readTmplToken();
    } catch (err) {
      if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
        this.readInvalidTemplateToken();
      } else {
        throw err
      }
    }

    this.inTemplateElement = false;
  };

  pp.invalidStringToken = function(position, message) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
      throw INVALID_TEMPLATE_ESCAPE_ERROR
    } else {
      this.raise(position, message);
    }
  };

  pp.readTmplToken = function() {
    var out = "", chunkStart = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) { this.raise(this.start, "Unterminated template"); }
      var ch = this.input.charCodeAt(this.pos);
      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) { // '`', '${'
        if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
          if (ch === 36) {
            this.pos += 2;
            return this.finishToken(types$1.dollarBraceL)
          } else {
            ++this.pos;
            return this.finishToken(types$1.backQuote)
          }
        }
        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(types$1.template, out)
      }
      if (ch === 92) { // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(true);
        chunkStart = this.pos;
      } else if (isNewLine(ch)) {
        out += this.input.slice(chunkStart, this.pos);
        ++this.pos;
        switch (ch) {
        case 13:
          if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; }
        case 10:
          out += "\n";
          break
        default:
          out += String.fromCharCode(ch);
          break
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        chunkStart = this.pos;
      } else {
        ++this.pos;
      }
    }
  };

  // Reads a template token to search for the end, without validating any escape sequences
  pp.readInvalidTemplateToken = function() {
    for (; this.pos < this.input.length; this.pos++) {
      switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break

      case "$":
        if (this.input[this.pos + 1] !== "{") { break }
        // fall through
      case "`":
        return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos))

      case "\r":
        if (this.input[this.pos + 1] === "\n") { ++this.pos; }
        // fall through
      case "\n": case "\u2028": case "\u2029":
        ++this.curLine;
        this.lineStart = this.pos + 1;
        break
      }
    }
    this.raise(this.start, "Unterminated template");
  };

  // Used to read escaped characters

  pp.readEscapedChar = function(inTemplate) {
    var ch = this.input.charCodeAt(++this.pos);
    ++this.pos;
    switch (ch) {
    case 110: return "\n" // 'n' -> '\n'
    case 114: return "\r" // 'r' -> '\r'
    case 120: return String.fromCharCode(this.readHexChar(2)) // 'x'
    case 117: return codePointToString(this.readCodePoint()) // 'u'
    case 116: return "\t" // 't' -> '\t'
    case 98: return "\b" // 'b' -> '\b'
    case 118: return "\u000b" // 'v' -> '\u000b'
    case 102: return "\f" // 'f' -> '\f'
    case 13: if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; } // '\r\n'
    case 10: // ' \n'
      if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
      return ""
    case 56:
    case 57:
      if (this.strict) {
        this.invalidStringToken(
          this.pos - 1,
          "Invalid escape sequence"
        );
      }
      if (inTemplate) {
        var codePos = this.pos - 1;

        this.invalidStringToken(
          codePos,
          "Invalid escape sequence in template string"
        );
      }
    default:
      if (ch >= 48 && ch <= 55) {
        var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
        var octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        this.pos += octalStr.length - 1;
        ch = this.input.charCodeAt(this.pos);
        if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
          this.invalidStringToken(
            this.pos - 1 - octalStr.length,
            inTemplate
              ? "Octal literal in template string"
              : "Octal literal in strict mode"
          );
        }
        return String.fromCharCode(octal)
      }
      if (isNewLine(ch)) {
        // Unicode new line characters after \ get removed from output in both
        // template literals and strings
        if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
        return ""
      }
      return String.fromCharCode(ch)
    }
  };

  // Used to read character escape sequences ('\x', '\u', '\U').

  pp.readHexChar = function(len) {
    var codePos = this.pos;
    var n = this.readInt(16, len);
    if (n === null) { this.invalidStringToken(codePos, "Bad character escape sequence"); }
    return n
  };

  // Read an identifier, and return it as a string. Sets `this.containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Incrementally adds only escaped chars, adding other chunks as-is
  // as a micro-optimization.

  pp.readWord1 = function() {
    this.containsEsc = false;
    var word = "", first = true, chunkStart = this.pos;
    var astral = this.options.ecmaVersion >= 6;
    while (this.pos < this.input.length) {
      var ch = this.fullCharCodeAtPos();
      if (isIdentifierChar(ch, astral)) {
        this.pos += ch <= 0xffff ? 1 : 2;
      } else if (ch === 92) { // "\"
        this.containsEsc = true;
        word += this.input.slice(chunkStart, this.pos);
        var escStart = this.pos;
        if (this.input.charCodeAt(++this.pos) !== 117) // "u"
          { this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"); }
        ++this.pos;
        var esc = this.readCodePoint();
        if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
          { this.invalidStringToken(escStart, "Invalid Unicode escape"); }
        word += codePointToString(esc);
        chunkStart = this.pos;
      } else {
        break
      }
      first = false;
    }
    return word + this.input.slice(chunkStart, this.pos)
  };

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary.

  pp.readWord = function() {
    var word = this.readWord1();
    var type = types$1.name;
    if (this.keywords.test(word)) {
      type = keywords[word];
    }
    return this.finishToken(type, word)
  };

  // Acorn is a tiny, fast JavaScript parser written in JavaScript.
  //
  // Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
  // various contributors and released under an MIT license.
  //
  // Git repositories for Acorn are available at
  //
  //     http://marijnhaverbeke.nl/git/acorn
  //     https://github.com/acornjs/acorn.git
  //
  // Please use the [github bug tracker][ghbt] to report issues.
  //
  // [ghbt]: https://github.com/acornjs/acorn/issues


  var version = "8.15.0";

  Parser.acorn = {
    Parser: Parser,
    version: version,
    defaultOptions: defaultOptions,
    Position: Position,
    SourceLocation: SourceLocation,
    getLineInfo: getLineInfo,
    Node: Node,
    TokenType: TokenType,
    tokTypes: types$1,
    keywordTypes: keywords,
    TokContext: TokContext,
    tokContexts: types,
    isIdentifierChar: isIdentifierChar,
    isIdentifierStart: isIdentifierStart,
    Token: Token,
    isNewLine: isNewLine,
    lineBreak: lineBreak,
    lineBreakG: lineBreakG,
    nonASCIIwhitespace: nonASCIIwhitespace
  };

  // The main exported interface (under `self.acorn` when in the
  // browser) is a `parse` function that takes a code string and returns
  // an abstract syntax tree as specified by the [ESTree spec][estree].
  //
  // [estree]: https://github.com/estree/estree

  function parse(input, options) {
    return Parser.parse(input, options)
  }

  // This function tries to parse a single expression at a given
  // offset in a string. Useful for parsing mixed-language formats
  // that embed JavaScript expressions.

  function parseExpressionAt(input, pos, options) {
    return Parser.parseExpressionAt(input, pos, options)
  }

  // Acorn is organized as a tokenizer and a recursive-descent parser.
  // The `tokenizer` export provides an interface to the tokenizer.

  function tokenizer(input, options) {
    return Parser.tokenizer(input, options)
  }

  exports.Node = Node;
  exports.Parser = Parser;
  exports.Position = Position;
  exports.SourceLocation = SourceLocation;
  exports.TokContext = TokContext;
  exports.Token = Token;
  exports.TokenType = TokenType;
  exports.defaultOptions = defaultOptions;
  exports.getLineInfo = getLineInfo;
  exports.isIdentifierChar = isIdentifierChar;
  exports.isIdentifierStart = isIdentifierStart;
  exports.isNewLine = isNewLine;
  exports.keywordTypes = keywords;
  exports.lineBreak = lineBreak;
  exports.lineBreakG = lineBreakG;
  exports.nonASCIIwhitespace = nonASCIIwhitespace;
  exports.parse = parse;
  exports.parseExpressionAt = parseExpressionAt;
  exports.tokContexts = types;
  exports.tokTypes = types$1;
  exports.tokenizer = tokenizer;
  exports.version = version;

}));

// Upstream v1 misses global references in default-parameter expressions.
// Parse syntax instead of replacing strings/comments or website-specific URLs.
(() => {
 const parse=globalThis.acorn.parse,wrap='$scramjet$wrap';
 const names=new Set(['location','parent','top','eval']);
 const reads=new Set(['right','init','argument','arguments','elements','expressions','test','consequent','alternate','left','body','callee']);
 function normalize(input,module=false){
  const bytes=typeof input!=='string',source=bytes?new TextDecoder().decode(input):input;
  if(!/(location|parent|top|eval)/.test(source))return input;
  let ast;try{ast=parse(source,{ecmaVersion:'latest',sourceType:module?'module':'script',allowAwaitOutsideFunction:true,allowReturnOutsideFunction:true,allowHashBang:true});}catch{return input;}
  let changed=false;
  // The upstream module transformer can also leave global Location reads raw.
  // Track lexical bindings so a site's own `location` variable is never changed.
  const scopes=new WeakMap(),bindings=new WeakSet();
  function bind(pattern,scope){if(!pattern)return;if(pattern.type==='Identifier'){scope.names.add(pattern.name);bindings.add(pattern);}else if(pattern.type==='RestElement')bind(pattern.argument,scope);else if(pattern.type==='AssignmentPattern')bind(pattern.left,scope);else if(pattern.type==='ArrayPattern')pattern.elements.forEach(p=>bind(p,scope));else if(pattern.type==='ObjectPattern')pattern.properties.forEach(p=>bind(p.type==='RestElement'?p.argument:p.value,scope));}
  function collect(node,scope){
   if(node.type==='FunctionDeclaration'||node.type==='ClassDeclaration')bind(node.id,scope);
   const functionScope=/Function/.test(node.type)||node.type==='ArrowFunctionExpression';
   if(node.type==='Program'||node.type==='BlockStatement'||node.type==='CatchClause'||functionScope){scope={parent:scope,names:new Set(),functionScope:functionScope||node.type==='Program'};scopes.set(node,scope);}
   if(functionScope){bind(node.id,scope);node.params.forEach(p=>bind(p,scope));}
   if(node.type==='CatchClause')bind(node.param,scope);
   if(node.type==='VariableDeclaration'){let target=scope;if(node.kind==='var')while(target.parent&&!target.functionScope)target=target.parent;node.declarations.forEach(d=>bind(d.id,target));}
   if(node.type==='ImportDeclaration')node.specifiers.forEach(s=>bind(s.local,scope));
   for(const value of Object.values(node))for(const child of Array.isArray(value)?value:[value])if(child&&typeof child.type==='string')collect(child,scope);
  }
  collect(ast,null);
  const bound=(name,scope)=>scope&&(scope.names.has(name)||bound(name,scope.parent));
  function render(node,parent=null,key='',inside=false,scope=null){
   scope=scopes.get(node)||scope;
   const children=[];
   for(const [k,value]of Object.entries(node)){
    const list=Array.isArray(value)?value:[value];
    for(const child of list)if(child&&typeof child.type==='string'&&Number.isInteger(child.start)&&Number.isInteger(child.end)){
     const content=render(child,node,k,inside||(node.type==='AssignmentPattern'&&k==='right'),scope);
     children.push({start:child.start,end:child.end,content});
    }
   }
   let text=source.slice(node.start,node.end);const unique=new Map();
   for(const child of children)if(child.content!==source.slice(child.start,child.end))unique.set(child.start+':'+child.end,child);
   for(const child of [...unique.values()].sort((a,b)=>b.start-a.start))text=text.slice(0,child.start-node.start)+child.content+text.slice(child.end-node.start);
   if(module&&node.type==='Identifier'&&node.name==='location'&&!bindings.has(node)&&!bound('location',scope)){
    const property=(parent?.type==='MemberExpression'&&key==='property'&&!parent.computed)||(parent?.type==='Property'&&key==='key'&&!parent.computed)||/Specifier$/.test(parent?.type||'');
    const assignment=(parent?.type==='AssignmentExpression'&&key==='left')||(parent?.type==='UpdateExpression');
    const wrapped=parent?.type==='CallExpression'&&parent.callee?.name===wrap;
    if(!property&&!assignment&&!wrapped){changed=true;return wrap+'('+text+')';}
   }
   if(!inside)return text;
   const alreadyWrapped=parent?.type==='CallExpression'&&parent.callee?.type==='Identifier'&&parent.callee.name===wrap;
   const writing=((parent?.type==='AssignmentExpression'||parent?.type==='AssignmentPattern')&&key==='left')||(parent?.type==='UpdateExpression'&&key==='argument')||(parent?.type==='UnaryExpression'&&parent.operator==='delete');
   if(node.type==='MemberExpression'&&!alreadyWrapped&&!writing){
    const property=node.computed?node.property.value:node.property.name;
    if(node.computed||names.has(property)){changed=true;return wrap+'('+text+')';}
   }
   if(node.type==='Identifier'&&names.has(node.name)&&!alreadyWrapped){
    const reference=(parent?.type==='MemberExpression'&&key==='object')||reads.has(key)||(parent?.type==='Property'&&key==='value'&&!parent.shorthand);
    if(reference&&!writing){changed=true;return wrap+'('+text+')';}
   }
   if(node.type==='Property'&&node.shorthand&&parent?.type==='ObjectExpression'&&node.value.type==='Identifier'&&names.has(node.value.name)){changed=true;return node.value.name+': '+wrap+'('+node.value.name+')';}
   return text;
  }
  const output=render(ast);if(!changed)return input;return bytes?new TextEncoder().encode(output):output;
 }
 Object.defineProperty(globalThis,'__browzenNormalizeSource',{value:normalize,writable:false,configurable:false});
})();

/* Best-effort static-page protections. Not an engine or OS network boundary. */
(() => {
 if(globalThis.__browzenPrivacy)return;
 const installed=new WeakSet(),protectedFunctions=new WeakSet(),define=Object.defineProperty;
 function install(g){
  if(installed.has(g))return;
  function fail(){throw new g.DOMException('Blocked by Browzen privacy controls.','SecurityError');}
  function lock(o,k,value){if(!o)return;const old=Object.getOwnPropertyDescriptor(o,k);if(old&&!old.configurable&&(old.value===value||(typeof old.value==='function'&&protectedFunctions.has(old.value))))return;if(typeof value==='function')protectedFunctions.add(value);define(o,k,{value,writable:false,configurable:false});}
  function read(o,k,value){if(!o)return;const old=Object.getOwnPropertyDescriptor(o,k);if(old&&!old.configurable&&old.get&&protectedFunctions.has(old.get))return;const get=()=>value;protectedFunctions.add(get);define(o,k,{get,configurable:false});}
  // Do not allow peer/data/ICE transports to start, even without media permissions.
  for(const key of ['RTCPeerConnection','webkitRTCPeerConnection','mozRTCPeerConnection','RTCIceTransport','RTCDtlsTransport','RTCSctpTransport','WebTransport'])if(key in g)lock(g,key,fail);
  const nav=g.navigator;
  if(nav){
   read(nav,'hardwareConcurrency',4);if('deviceMemory'in nav)read(nav,'deviceMemory',4);
   read(nav,'language','en-US');read(nav,'languages',Object.freeze(['en-US','en']));
   if('userAgentData'in nav)read(nav,'userAgentData',undefined);
   if('gpu'in nav)read(nav,'gpu',undefined);
   if('connection'in nav)read(nav,'connection',undefined);
   for(const proto of [g.Navigator?.prototype,g.WorkerNavigator?.prototype])if(proto){
    for(const [k,v]of Object.entries({hardwareConcurrency:4,language:'en-US',languages:Object.freeze(['en-US','en']),deviceMemory:4,userAgentData:undefined,gpu:undefined,connection:undefined}))if(k in proto)read(proto,k,v);
   }
   if(nav.mediaDevices?.enumerateDevices){const empty=async()=>[];lock(nav.mediaDevices,'enumerateDevices',empty);lock(Object.getPrototypeOf(nav.mediaDevices),'enumerateDevices',empty);}
  }
  if('queryLocalFonts'in g)lock(g,'queryLocalFonts',()=>Promise.reject(new g.DOMException('Local fonts are blocked.','NotAllowedError')));
  if(g.FontFaceSet?.prototype.check)lock(g.FontFaceSet.prototype,'check',fail);
  if(g.FontFace){const F=g.FontFace;define(g,'FontFace',{configurable:true,writable:true,value:new Proxy(F,{construct(t,a,n){if(typeof a[1]==='string'&&/local\s*\(/i.test(a[1]))return fail();return Reflect.construct(t,a,n);}})});}
  if(nav?.getBattery)lock(nav,'getBattery',()=>Promise.reject(new g.DOMException('Battery details blocked.','NotAllowedError')));
  if(nav?.getGamepads)lock(nav,'getGamepads',()=>[]);
  for(const key of ['AudioContext','webkitAudioContext','OfflineAudioContext','webkitOfflineAudioContext'])if(key in g)lock(g,key,fail);
  for(const proto of [g.HTMLCanvasElement?.prototype,g.OffscreenCanvas?.prototype]){
   if(!proto)continue;const original=proto.getContext;
   if(original)lock(proto,'getContext',function(type,...args){if(/^(webgl2?|experimental-webgl|webgpu)$/i.test(type))return null;return Reflect.apply(original,this,[type,...args]);});
  }
  const canvas=g.HTMLCanvasElement?.prototype;
  if(canvas){lock(canvas,'toDataURL',fail);lock(canvas,'toBlob',fail);}
  if(g.OffscreenCanvas)lock(g.OffscreenCanvas.prototype,'convertToBlob',()=>Promise.reject(new g.DOMException('Canvas readback blocked.','SecurityError')));
  for(const proto of [g.CanvasRenderingContext2D?.prototype,g.OffscreenCanvasRenderingContext2D?.prototype])if(proto?.getImageData)lock(proto,'getImageData',fail);
  // A session-wide fixed JS UTC/English view, applied to each instrumented realm.
  // Native CSS/font/layout/engine behavior still depends on the outer browser.
  const D=g.Date,p=D.prototype,utcString=p.toUTCString,nativeParse=D.parse;
  const parseValue=v=>typeof v==='string'&&/^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?::\d\d(?:\.\d+)?)?$/.test(v)?v.replace(' ','T')+'Z':v;
  for(const name of ['FullYear','Month','Date','Day','Hours','Minutes','Seconds','Milliseconds'])if(p['getUTC'+name])lock(p,'get'+name,p['getUTC'+name]);
  for(const name of ['FullYear','Month','Date','Hours','Minutes','Seconds','Milliseconds'])if(p['setUTC'+name])lock(p,'set'+name,p['setUTC'+name]);
  lock(p,'getTimezoneOffset',function(){return Number.isNaN(this.getTime())?NaN:0;});
  lock(p,'getYear',function(){return this.getUTCFullYear()-1900;});
  lock(p,'setYear',function(y){y=Number(y);return this.setUTCFullYear(y>=0&&y<=99?y+1900:y);});
  const dateText=d=>{const s=Reflect.apply(utcString,d,[]);if(s==='Invalid Date')return s;const a=s.split(' ');return a[0].replace(',','')+' '+a[2]+' '+a[1]+' '+a[3];};
  const timeText=d=>{const s=Reflect.apply(utcString,d,[]);return s==='Invalid Date'?s:s.split(' ')[4]+' GMT+0000 (Coordinated Universal Time)';};
  const fullText=d=>Number.isNaN(d.getTime())?'Invalid Date':dateText(d)+' '+timeText(d);
  lock(p,'toString',function(){return fullText(this);});
  lock(p,'toDateString',function(){return dateText(this);});
  lock(p,'toTimeString',function(){return timeText(this);});
  for(const name of ['toLocaleString','toLocaleDateString','toLocaleTimeString']){const original=p[name];lock(p,name,function(locale,options){return Reflect.apply(original,this,[locale||'en-US',{...options,timeZone:options?.timeZone||'UTC'}]);});}
  const dateProxy=new Proxy(D,{apply(){return fullText(new D());},construct(target,args,newTarget){
   if(args.length>=2)return Reflect.construct(target,[D.UTC(...args)],newTarget);
   return Reflect.construct(target,args.length?[parseValue(args[0])]:[],newTarget);
  }});
  lock(D,'parse',v=>Reflect.apply(nativeParse,D,[parseValue(v)]));
  lock(p,'constructor',dateProxy);
  lock(g,'Date',dateProxy);
  if('Temporal'in g)lock(g,'Temporal',undefined);
  for(const name of ['DateTimeFormat','NumberFormat','Collator','PluralRules','RelativeTimeFormat','ListFormat','DisplayNames','Segmenter']){
   const C=g.Intl?.[name];if(!C)continue;
   const options=a=>{const r=[...a];r[0]??='en-US';if(name==='DateTimeFormat')r[1]={...r[1],timeZone:r[1]?.timeZone||'UTC'};return r;};
   const wrapped=new Proxy(C,{apply:(t,that,a)=>Reflect.apply(t,that,options(a)),construct:(t,a,n)=>Reflect.construct(t,options(a),n)});
   if(C.prototype)lock(C.prototype,'constructor',wrapped);lock(g.Intl,name,wrapped);
  }
  // Neutralize ordinary dynamic DNS/preconnect hints before the proxy's DOM hooks wrap them.
  const hints=/\b(dns-prefetch|preconnect|prerender|prefetch)\b/i;
  const E=g.Element?.prototype,L=g.HTMLLinkElement?.prototype;
  if(g.Document?.prototype.execCommand){const command=g.Document.prototype.execCommand;lock(g.Document.prototype,'execCommand',function(name,...args){if(/^(copy|cut|paste)$/i.test(String(name)))return false;return Reflect.apply(command,this,[name,...args]);});}
  if(E){const set=E.setAttribute;define(E,'setAttribute',{configurable:true,writable:true,value:function(k,v){
   if(this.tagName==='LINK'&&((String(k).toLowerCase()==='rel'&&hints.test(String(v)))||(String(k).toLowerCase()==='href'&&hints.test(this.getAttribute('rel')||''))))return Reflect.apply(set,this,[k,'']);
   if(String(k).toLowerCase()==='ping')return Reflect.apply(set,this,[k,'']);return Reflect.apply(set,this,[k,v]);
  }});}
  if(L)for(const key of ['rel','href']){const d=Object.getOwnPropertyDescriptor(L,key);if(d?.set)define(L,key,{...d,set:function(value){if((key==='rel'&&hints.test(String(value)))||(key==='href'&&hints.test(this.rel)))value='';return Reflect.apply(d.set,this,[value]);}});}
  installed.add(g);
 }
 define(globalThis,'__browzenPrivacy',{value:Object.freeze({install}),writable:false,configurable:false});
})();

(()=>{var e={4322:function(e){var t={decodeValues:!0,map:!1,silent:!1};function r(e){return"string"==typeof e&&!!e.trim()}function n(e,n){var i,a,s,o,l=e.split(";").filter(r),c=(i=l.shift(),a="",s="",(o=i.split("=")).length>1?(a=o.shift(),s=o.join("=")):s=i,{name:a,value:s}),u=c.name,d=c.value;n=n?Object.assign({},t,n):t;try{d=n.decodeValues?decodeURIComponent(d):d}catch(e){console.error("set-cookie-parser encountered an error while decoding a cookie with value '"+d+"'. Set options.decodeValues to false to disable this feature.",e)}var h={name:u,value:d};return l.forEach(function(e){var t=e.split("="),r=t.shift().trimLeft().toLowerCase(),n=t.join("=");"expires"===r?h.expires=new Date(n):"max-age"===r?h.maxAge=parseInt(n,10):"secure"===r?h.secure=!0:"httponly"===r?h.httpOnly=!0:"samesite"===r?h.sameSite=n:"partitioned"===r?h.partitioned=!0:h[r]=n}),h}function i(e,i){if(i=i?Object.assign({},t,i):t,!e)if(!i.map)return[];else return{};if(e.headers)if("function"==typeof e.headers.getSetCookie)e=e.headers.getSetCookie();else if(e.headers["set-cookie"])e=e.headers["set-cookie"];else{var a=e.headers[Object.keys(e.headers).find(function(e){return"set-cookie"===e.toLowerCase()})];a||!e.headers.cookie||i.silent||console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."),e=a}return(Array.isArray(e)||(e=[e]),i.map)?e.filter(r).reduce(function(e,t){var r=n(t,i);return e[r.name]=r,e},{}):e.filter(r).map(function(e){return n(e,i)})}e.exports=i,e.exports.parse=i,e.exports.parseString=n,e.exports.splitCookiesString=function(e){if(Array.isArray(e))return e;if("string"!=typeof e)return[];var t,r,n,i,a,s=[],o=0;function l(){for(;o<e.length&&/\s/.test(e.charAt(o));)o+=1;return o<e.length}for(;o<e.length;){for(t=o,a=!1;l();)if(","===(r=e.charAt(o))){for(n=o,o+=1,l(),i=o;o<e.length&&"="!==(r=e.charAt(o))&&";"!==r&&","!==r;)o+=1;o<e.length&&"="===e.charAt(o)?(a=!0,o=i,s.push(e.substring(t,n)),t=o):o=n+1}else o+=1;(!a||o>=e.length)&&s.push(e.substring(t,e.length))}return s}},7302:function(e,t,r){var n={"./":"3255","./client":"336","./client.ts":"336","./dom/attr":"1077","./dom/attr.ts":"1077","./dom/beacon":"7430","./dom/beacon.ts":"7430","./dom/cookie":"9116","./dom/cookie.ts":"9116","./dom/css":"6447","./dom/css.ts":"6447","./dom/document":"5351","./dom/document.ts":"5351","./dom/element":"7828","./dom/element.ts":"7828","./dom/fontface":"5426","./dom/fontface.ts":"5426","./dom/fragments":"5465","./dom/fragments.ts":"5465","./dom/history":"9804","./dom/history.ts":"9804","./dom/open":"7758","./dom/open.ts":"7758","./dom/origin":"6012","./dom/origin.ts":"6012","./dom/performance":"6286","./dom/performance.ts":"6286","./dom/protocol":"1974","./dom/protocol.ts":"1974","./dom/serviceworker":"9201","./dom/serviceworker.ts":"9201","./dom/storage":"5289","./dom/storage.ts":"5289","./entry":"1323","./entry.ts":"1323","./events":"1862","./events.ts":"1862","./helpers":"94","./helpers.ts":"94","./index":"3255","./index.ts":"3255","./location":"3696","./location.ts":"3696","./shared/antiantidebugger":"8382","./shared/antiantidebugger.ts":"8382","./shared/blob":"4634","./shared/blob.ts":"4634","./shared/caches":"5026","./shared/caches.ts":"5026","./shared/chrome":"6627","./shared/chrome.ts":"6627","./shared/err":"582","./shared/err.ts":"582","./shared/error":"6143","./shared/error.ts":"6143","./shared/eval":"591","./shared/eval.ts":"591","./shared/event":"3481","./shared/event.ts":"3481","./shared/function":"249","./shared/function.ts":"249","./shared/import":"2468","./shared/import.ts":"2468","./shared/indexeddb":"4338","./shared/indexeddb.ts":"4338","./shared/opfs":"6593","./shared/opfs.ts":"6593","./shared/postmessage":"1320","./shared/postmessage.ts":"1320","./shared/realm":"1914","./shared/realm.ts":"1914","./shared/requests/eventsource":"9701","./shared/requests/eventsource.ts":"9701","./shared/requests/fetch":"6972","./shared/requests/fetch.ts":"6972","./shared/requests/websocket":"9931","./shared/requests/websocket.ts":"9931","./shared/requests/xmlhttprequest":"248","./shared/requests/xmlhttprequest.ts":"248","./shared/settimeout":"7418","./shared/settimeout.ts":"7418","./shared/sourcemaps":"7791","./shared/sourcemaps.ts":"7791","./shared/worker":"9399","./shared/worker.ts":"9399","./shared/wrap":"581","./shared/wrap.ts":"581","./singletonbox":"1229","./singletonbox.ts":"1229","./swruntime":"8409","./swruntime.ts":"8409","./worker/importScripts":"9353","./worker/importScripts.ts":"9353"};function i(e){return r(a(e))}function a(e){if(!r.o(n,e)){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}i.keys=function(){return Object.keys(n)},i.resolve=a,e.exports=i,i.id=7302},409:function(e){function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=409,e.exports=t},336:function(e,t,r){r.r(t),r.d(t,{ScramjetClient:()=>g});var n=r(2794),i=r(94),a=r(3696),s=r(581),o=r(1862),l=r(1472),c=r(37),u=r(3831),d=r(1323),h=r(1229),p=r(4110),f=r(8665).A;class g{global;locationProxy;serviceWorker;bare;natives;descriptors;wrapfn;cookieStore=new u.k;eventcallbacks=new Map;meta;box;constructor(e){globalThis.__browzenPrivacy.install(e);if(this.global=e,n.pX in e)throw console.error("attempted to initialize a scramjet client, but one is already loaded - this is very bad"),Error();if(d.iswindow){try{n.pX in e.parent&&(this.box=e.parent[n.pX].box)}catch{}try{n.pX in e.top&&(this.box=e.top[n.pX].box)}catch{}try{e.opener&&n.pX in e.opener&&(this.box=e.opener[n.pX].box)}catch{}this.box||(f.warn("Creating SingletonBox"),this.box=new h.SingletonBox(this))}else this.box=new h.SingletonBox(this);this.box.registerClient(this,e),d.iswindow?this.bare=new p.Ay:this.bare=new p.Ay(new Promise(e=>{addEventListener("message",({data:t})=>{"object"==typeof t&&"$scramjet$type"in t&&"baremuxinit"===t.$scramjet$type&&e(t.port)})})),this.serviceWorker=this.global.navigator.serviceWorker,d.iswindow&&(e.document[n.pX]=this),this.wrapfn=(0,s.createWrapFn)(this,e),this.natives={store:new Proxy({},{get:(e,t)=>{if(t in e)return e[t];let r=t.split("."),n=r.pop(),i=r.reduce((e,t)=>e?.[t],this.global);if(!i)return;let a=Reflect.get(i,n);return e[t]=a,e[t]}}),construct(e,...t){let r=this.store[e];return r?new r(...t):null},call(e,t,...r){let n=this.store[e];return n?n.call(t,...r):null}},this.descriptors={store:new Proxy({},{get:(e,r)=>{if(r in e)return e[r];let n=r.split("."),i=n.pop(),a=n.reduce((e,t)=>e?.[t],this.global);if(!a)return;let s=t.natives.call("Object.getOwnPropertyDescriptor",null,a,i);return e[r]=s,e[r]}}),get(e,t){let r=this.store[e];return r?r.get.call(t):null},set(e,t,r){let n=this.store[e];if(!n)return null;n.set.call(t,r)}};const t=this;this.meta={get origin(){return t.url},get base(){if(d.iswindow){const e=t.natives.call("Document.prototype.querySelector",t.global.document,"base");if(e){let r=e.getAttribute("href");if(!r)return t.url;const n=r.indexOf("#");if(!(r=r.substring(0,-1===n?void 0:n)))return t.url;return new URL(r,t.url.origin)}}return t.url},get topFrameName(){if(!d.iswindow)throw Error("topFrameName was called from a worker?");let e=t.global;if(e.parent.window==e.window)return null;for(;e.parent.window!==e.window&&e.parent.window[n.pX];)e=e.parent.window;const r=e[n.pX].descriptors.get("window.frameElement",e);if(!r)return null;if(!r.name)return console.error("YOU NEED TO USE `new ScramjetFrame()`! DIRECT IFRAMES WILL NOT WORK"),null;return r.name},get parentFrameName(){if(!d.iswindow)throw Error("parentFrameName was called from a worker?");if(t.global.parent.window==t.global.window)return null;let e=t.global.parent.window;if(e[n.pX]){const t=e[n.pX].descriptors.get("window.frameElement",e);if(!t)return null;if(!t.name)return console.error("YOU NEED TO USE `new ScramjetFrame()`! DIRECT IFRAMES WILL NOT WORK"),null;return t.name}{const e=t.descriptors.get("window.frameElement",t.global);if(!e.name)return console.error("YOU NEED TO USE `new ScramjetFrame()`! DIRECT IFRAMES WILL NOT WORK"),null;return e.name}}},this.locationProxy=(0,a.createLocationProxy)(this,e),e[n.pX]=this}get frame(){if(!d.iswindow)return null;let e=this.descriptors.get("window.frameElement",this.global);if(!e)return null;let t=e[n.zr];if(!t){let e=this.global.window;for(;e.parent!==e;){let t=e[n.pX].descriptors.get("window.frameElement",e);if(!t)return null;if(t&&t[n.zr])return t[n.zr];e=e.parent.window}}return t}get isSubframe(){if(!d.iswindow)return!1;let e=this.descriptors.get("window.frameElement",this.global);return!!e&&!e[n.zr]}loadcookies(e){this.cookieStore.load(e)}hook(){let e=r(7302),t=[];for(let r of e.keys()){let n=e(r);r.endsWith(".ts")&&(r.startsWith("./dom/")&&"window"in this.global||r.startsWith("./worker/")&&"WorkerGlobalScope"in this.global||r.startsWith("./shared/"))&&t.push(n)}for(let e of(t.sort((e,t)=>(e.order||0)-(t.order||0)),t))!e.enabled||e.enabled(this)?e.default(this,this.global):e.disabled&&e.disabled(this,this.global)}get url(){return new URL((0,l.v2)(this.global.location.href))}set url(e){e instanceof URL&&(e=e.toString());let t=new o.NavigateEvent(e);this.frame&&this.frame.dispatchEvent(t),t.defaultPrevented||(this.global.location.href=(0,l.Oy)(t.url,this.meta))}Proxy(e,t){if(Array.isArray(e)){for(let r of e)this.Proxy(r,t);return}let r=e.split("."),n=r.pop(),i=r.reduce((e,t)=>e?.[t],this.global);if(i){if(!(e in this.natives.store)){let t=Reflect.get(i,n);this.natives.store[e]=t}this.RawProxy(i,n,t)}}RawProxy(e,t,r){if(!e||!t||!Reflect.has(e,t))return;let n=Reflect.get(e,t);delete e[t];let a={};r.construct&&(a.construct=function(e,t,n){let i,a=!1,s={fn:e,this:null,args:t,newTarget:n,return:e=>{a=!0,i=e},call:()=>(a=!0,i=Reflect.construct(s.fn,s.args,s.newTarget))};return(r.construct(s),a)?i:Reflect.construct(s.fn,s.args,s.newTarget)}),r.apply&&(a.apply=(e,t,n)=>{let i,a=!1,s={fn:e,this:t,args:n,newTarget:null,return:e=>{a=!0,i=e},call:()=>(a=!0,i=Reflect.apply(s.fn,s.this,s.args))},o=Error.prepareStackTrace;Error.prepareStackTrace=function(e,t){if(t[0].getFileName()&&!t[0].getFileName().startsWith(location.origin+c.$W.prefix))return{stack:e.stack}};try{r.apply(s)}catch(e){if(e instanceof Error)if(e.stack instanceof Object){if(e.stack=e.stack.stack,console.error("ERROR FROM SCRAMJET INTERNALS",e),!(0,c.U5)("allowFailedIntercepts",this.url))throw e}else throw e;else throw e}return(Error.prepareStackTrace=o,a)?i:Reflect.apply(s.fn,s.this,s.args)}),a.getOwnPropertyDescriptor=i.getOwnPropertyDescriptorHandler,e[t]=new Proxy(n,a)}Trap(e,t){if(Array.isArray(e)){for(let r of e)this.Trap(r,t);return}let r=e.split("."),n=r.pop(),i=r.reduce((e,t)=>e?.[t],this.global);if(!i)return;let a=this.natives.call("Object.getOwnPropertyDescriptor",null,i,n);return this.descriptors.store[e]=a,this.RawTrap(i,n,t)}RawTrap(e,t,r){if(!e||!t||!Reflect.has(e,t))return;let n=this.natives.call("Object.getOwnPropertyDescriptor",null,e,t),i={this:null,get:function(){return n&&n.get.call(this.this)},set:function(e){n&&n.set.call(this.this,e)}};delete e[t];let a={};return r.get?a.get=function(){return i.this=this,r.get(i)}:n?.get&&(a.get=n.get),r.set?a.set=function(e){i.this=this,r.set(i,e)}:n?.set&&(a.set=n.set),r.enumerable?a.enumerable=r.enumerable:n?.enumerable&&(a.enumerable=n.enumerable),r.configurable?a.configurable=r.configurable:n?.configurable&&(a.configurable=n.configurable),Object.defineProperty(e,t,a),n}}},1077:function(e,t,r){function n(e,t){e.Trap("Element.prototype.attributes",{get(e){let t=e.get(),r=new Proxy(t,{get(e,n,i){let a=Reflect.get(e,n);return"length"===n?Object.keys(r).length:"getNamedItem"===n?e=>r[e]:"getNamedItemNS"===n?(e,t)=>r[`${e}:${t}`]:n in NamedNodeMap.prototype&&"function"==typeof a?new Proxy(a,{apply:(e,n,i)=>n===r?Reflect.apply(e,t,i):Reflect.apply(e,n,i)}):"string"!=typeof n&&"number"!=typeof n||isNaN(Number(n))?this.has(e,n)?a:void 0:t[Object.keys(r)[n]]},ownKeys(e){return Reflect.ownKeys(e).filter(t=>this.has(e,t))},has:(e,r)=>"symbol"==typeof r?Reflect.has(e,r):!(r.startsWith("scramjet-attr-")||t[r]?.name?.startsWith("scramjet-attr-"))&&Reflect.has(e,r)});return r}}),e.Trap(["Attr.prototype.value","Attr.prototype.nodeValue"],{get:e=>e.this?.ownerElement?e.this.ownerElement.getAttribute(e.this.name):e.get(),set:(e,t)=>e.this?.ownerElement?e.this.ownerElement.setAttribute(e.this.name,t):e.set(t)})}r.r(t),r.d(t,{default:()=>n})},7430:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(1472);function i(e,t){e.Proxy("Navigator.prototype.sendBeacon",{apply(t){t.args[0]=(0,n.Oy)(t.args[0],e.meta)}})}},9116:function(e,t,r){function n(e,t){e.serviceWorker.addEventListener("message",({data:t})=>{if("scramjet$type"in t&&"cookie"===t.scramjet$type){e.cookieStore.setCookies([t.cookie],new URL(t.url));let r={scramjet$token:t.scramjet$token,scramjet$type:"cookie"};e.serviceWorker.controller.postMessage(r)}}),e.Trap("Document.prototype.cookie",{get:()=>e.cookieStore.getCookies(e.url,!0),set(t,r){e.cookieStore.setCookies([r],e.url);let n=e.descriptors.get("ServiceWorkerContainer.prototype.controller",e.serviceWorker);n&&e.natives.call("ServiceWorker.prototype.postMessage",n,{scramjet$type:"cookie",cookie:r,url:e.url.href})}}),delete t.cookieStore}r.r(t),r.d(t,{default:()=>n})},6447:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(2614);function i(e){e.Proxy("CSSStyleDeclaration.prototype.setProperty",{apply(t){t.args[1]&&(t.args[1]=(0,n.s)(t.args[1],e.meta))}}),e.Proxy("CSSStyleDeclaration.prototype.getPropertyValue",{apply(e){let t=e.call();if(!t)return t;e.return((0,n.f)(t))}}),e.Trap("CSSStyleDeclaration.prototype.cssText",{set(t,r){t.set((0,n.s)(r,e.meta))},get:e=>(0,n.f)(e.get())}),e.Proxy("CSSStyleSheet.prototype.insertRule",{apply(t){t.args[0]=(0,n.s)(t.args[0],e.meta)}}),e.Proxy("CSSStyleSheet.prototype.replace",{apply(t){t.args[0]=(0,n.s)(t.args[0],e.meta)}}),e.Proxy("CSSStyleSheet.prototype.replaceSync",{apply(t){t.args[0]=(0,n.s)(t.args[0],e.meta)}}),e.Trap("CSSRule.prototype.cssText",{set(t,r){t.set((0,n.s)(r,e.meta))},get:e=>(0,n.f)(e.get())}),e.Proxy("CSSStyleValue.parse",{apply(t){t.args[1]&&(t.args[1]=(0,n.s)(t.args[1],e.meta))}}),e.Trap("HTMLElement.prototype.style",{get(t){let r=t.get();return new Proxy(r,{get(e,t){let i=Reflect.get(e,t);return"function"==typeof i?new Proxy(i,{apply:(e,t,n)=>Reflect.apply(e,r,n)}):t in CSSStyleDeclaration.prototype||!i?i:(0,n.f)(i)},set:(t,r,i)=>"cssText"==r||""==i||"string"!=typeof i?Reflect.set(t,r,i):Reflect.set(t,r,(0,n.s)(i,e.meta))})},set(e,t){e.set(t)}})}},5351:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(884);function i(e,t){let r=String;e.Proxy(["Document.prototype.querySelector","Document.prototype.querySelectorAll"],{apply(e){e.args[0]=r(e.args[0]).replace(/((?:^|\s)\b\w+\[(?:src|href|data-href))[\^]?(=['"]?(?:https?[:])?\/\/)/,"$1*$2")}}),e.Proxy("Document.prototype.write",{apply(t){if(t.args[0])try{t.args[0]=(0,n.Qs)(t.args[0],e.cookieStore,e.meta,!1)}catch{}}}),e.Trap("Document.prototype.referrer",{get:()=>e.url.toString()}),e.Proxy("Document.prototype.writeln",{apply(t){if(t.args[0])try{t.args[0]=(0,n.Qs)(t.args[0],e.cookieStore,e.meta,!1)}catch{}}}),e.Proxy("Document.prototype.parseHTMLUnsafe",{apply(t){if(t.args[0])try{t.args[0]=(0,n.Qs)(t.args[0],e.cookieStore,e.meta,!1)}catch{}}})}},7828:function(e,t,r){r.r(t),r.d(t,{default:()=>h});var n=r(2393),i=r(2614),a=r(884),s=r(1478),o=r(1472),l=r(2794),c=r(3255);let u=new TextEncoder;function d(e){return btoa(Array.from(e,e=>String.fromCodePoint(e)).join(""))}function h(e,t){let r={nonce:[t.HTMLElement],integrity:[t.HTMLScriptElement,t.HTMLLinkElement],csp:[t.HTMLIFrameElement],credentialless:[t.HTMLIFrameElement],src:[t.HTMLImageElement,t.HTMLMediaElement,t.HTMLIFrameElement,t.HTMLFrameElement,t.HTMLEmbedElement,t.HTMLScriptElement,t.HTMLSourceElement],href:[t.HTMLAnchorElement,t.HTMLLinkElement],data:[t.HTMLObjectElement],action:[t.HTMLFormElement],formaction:[t.HTMLButtonElement,t.HTMLInputElement],srcdoc:[t.HTMLIFrameElement],poster:[t.HTMLVideoElement],imagesrcset:[t.HTMLLinkElement]},h=[t.HTMLAnchorElement.prototype,t.HTMLAreaElement.prototype],p=[e.natives.call("Object.getOwnPropertyDescriptor",null,t.HTMLAnchorElement.prototype,"href"),e.natives.call("Object.getOwnPropertyDescriptor",null,t.HTMLAreaElement.prototype,"href")];for(let t of Object.keys(r))for(let n of r[t]){let r=e.natives.call("Object.getOwnPropertyDescriptor",null,n.prototype,t);Object.defineProperty(n.prototype,t,{get(){return["src","data","href","action","formaction"].includes(t)?(0,o.v2)(r.get.call(this)):r.get.call(this)},set(e){return this.setAttribute(t,e)}})}for(let t of["protocol","hash","host","hostname","origin","pathname","port","search"])for(let r in h){let n=h[r],i=p[r];e.RawTrap(n,t,{get(e){let r=i.get.call(e.this);return r?new URL((0,o.v2)(r))[t]:r}})}e.Trap("Node.prototype.baseURI",{get(t){let r=t.this,n=r.ownerDocument?.querySelector("base");return(r instanceof Document&&(n=r.querySelector("base")),n)?new URL(n.href,e.url.origin).href:e.url.origin},set:(e,t)=>!1}),e.Proxy("Element.prototype.getAttribute",{apply(t){let[r]=t.args;if(r.startsWith("scramjet-attr"))return t.return(null);if(e.natives.call("Element.prototype.hasAttribute",t.this,`scramjet-attr-${r}`)){let e=t.fn.call(t.this,`scramjet-attr-${r}`);return null===e?t.return(""):t.return(e)}}}),e.Proxy("Element.prototype.getAttributeNames",{apply(e){let t=e.call().filter(e=>!e.startsWith("scramjet-attr"));e.return(t)}}),e.Proxy("Element.prototype.getAttributeNode",{apply(e){if(e.args[0].startsWith("scramjet-attr"))return e.return(null)}}),e.Proxy("Element.prototype.hasAttribute",{apply(e){if(e.args[0].startsWith("scramjet-attr"))return e.return(!1)}}),e.Proxy("Element.prototype.setAttribute",{apply(t){let[r,i]=t.args,a=n.V.find(e=>{let n=e[r.toLowerCase()];return!!n&&("*"===n||"function"!=typeof n&&n.includes(t.this.tagName.toLowerCase()))});if(a){let n=a.fn(i,e.meta,e.cookieStore);if(null==n){e.natives.call("Element.prototype.removeAttribute",t.this,r),t.return(void 0);return}t.args[1]=n,t.fn.call(t.this,`scramjet-attr-${t.args[0]}`,i)}}}),e.Proxy("Element.prototype.setAttributeNode",{apply(e){}}),e.Proxy("Element.prototype.setAttributeNS",{apply(t){let[r,i,a]=t.args,s=n.V.find(e=>{let r=e[i.toLowerCase()];return!!r&&("*"===r||"function"!=typeof r&&r.includes(t.this.tagName.toLowerCase()))});s&&(t.args[2]=s.fn(a,e.meta,e.cookieStore),e.natives.call("Element.prototype.setAttribute",t.this,`scramjet-attr-${t.args[1]}`,a))}}),e.Trap("SVGAnimatedString.prototype.baseVal",{get(e){let t=e.get();return t?(0,o.v2)(t):t},set(t,r){t.set((0,o.Oy)(r,e.meta))}}),e.Trap("SVGAnimatedString.prototype.animVal",{get(e){let t=e.get();return t?(0,o.v2)(t):t}}),e.Proxy("Element.prototype.removeAttribute",{apply(t){if(t.args[0].startsWith("scramjet-attr"))return t.return(void 0);e.natives.call("Element.prototype.hasAttribute",t.this,t.args[0])&&t.fn.call(t.this,`scramjet-attr-${t.args[0]}`)}}),e.Proxy("Element.prototype.toggleAttribute",{apply(t){if(t.args[0].startsWith("scramjet-attr"))return t.return(!1);e.natives.call("Element.prototype.hasAttribute",t.this,t.args[0])&&t.fn.call(t.this,`scramjet-attr-${t.args[0]}`)}}),e.Trap("Element.prototype.innerHTML",{set(r,n){let o;if(r.this instanceof t.HTMLScriptElement)o=(0,s.o)(n,"(anonymous script element)",e.meta),e.natives.call("Element.prototype.setAttribute",r.this,"scramjet-attr-script-source-src",d(u.encode(o)));else if(r.this instanceof t.HTMLStyleElement)o=(0,i.s)(n,e.meta);else try{o=(0,a.Qs)(n,e.cookieStore,e.meta)}catch{o=n}r.set(o)},get(r){if(r.this instanceof t.HTMLScriptElement){let t=e.natives.call("Element.prototype.getAttribute",r.this,"scramjet-attr-script-source-src");return t?atob(t):r.get()}return r.this instanceof t.HTMLStyleElement?r.get():(0,a.nK)(r.get())}}),e.Trap("Node.prototype.textContent",{set(r,n){if(r.this instanceof t.HTMLScriptElement){let t=(0,s.o)(n,"(anonymous script element)",e.meta);return e.natives.call("Element.prototype.setAttribute",r.this,"scramjet-attr-script-source-src",d(u.encode(t))),r.set(t)}return r.this instanceof t.HTMLStyleElement?r.set((0,i.s)(n,e.meta)):r.set(n)},get(r){if(r.this instanceof t.HTMLScriptElement){let t=e.natives.call("Element.prototype.getAttribute",r.this,"scramjet-attr-script-source-src");return t?atob(t):r.get()}return r.this instanceof t.HTMLStyleElement?(0,i.f)(r.get()):r.get()}}),e.Trap("Element.prototype.outerHTML",{set(t,r){t.set((0,a.Qs)(r,e.cookieStore,e.meta))},get:e=>(0,a.nK)(e.get())}),e.Proxy("Element.prototype.setHTMLUnsafe",{apply(t){try{t.args[0]=(0,a.Qs)(t.args[0],e.cookieStore,e.meta,!1)}catch{}}}),e.Proxy("Element.prototype.getHTML",{apply(e){e.return((0,a.nK)(e.call()))}}),e.Proxy("Element.prototype.insertAdjacentHTML",{apply(t){if(t.args[1])try{t.args[1]=(0,a.Qs)(t.args[1],e.cookieStore,e.meta,!1)}catch{}}}),e.Proxy("Audio",{construct(t){t.args[0]&&(t.args[0]=(0,o.Oy)(t.args[0],e.meta))}}),e.Proxy("Text.prototype.appendData",{apply(t){t.this.parentElement?.tagName==="STYLE"&&(t.args[0]=(0,i.s)(t.args[0],e.meta))}}),e.Proxy("Text.prototype.insertData",{apply(t){t.this.parentElement?.tagName==="STYLE"&&(t.args[1]=(0,i.s)(t.args[1],e.meta))}}),e.Proxy("Text.prototype.replaceData",{apply(t){t.this.parentElement?.tagName==="STYLE"&&(t.args[2]=(0,i.s)(t.args[2],e.meta))}}),e.Trap("Text.prototype.wholeText",{get:e=>e.this.parentElement?.tagName==="STYLE"?(0,i.f)(e.get()):e.get(),set:(t,r)=>t.this.parentElement?.tagName==="STYLE"?t.set((0,i.s)(r,e.meta)):t.set(r)}),e.Trap(["HTMLIFrameElement.prototype.contentWindow","HTMLFrameElement.prototype.contentWindow","HTMLObjectElement.prototype.contentWindow","HTMLEmbedElement.prototype.contentWindow"],{get(e){let t=e.get();return t&&(l.pX in t||new c.ScramjetClient(t).hook()),t}}),e.Trap(["HTMLIFrameElement.prototype.contentDocument","HTMLFrameElement.prototype.contentDocument","HTMLObjectElement.prototype.contentDocument","HTMLEmbedElement.prototype.contentDocument"],{get(t){let r=e.descriptors.get(`${t.this.constructor.name}.prototype.contentWindow`,t.this);return r?(l.pX in r||new c.ScramjetClient(r).hook(),r.document):r}}),e.Proxy(["HTMLIFrameElement.prototype.getSVGDocument","HTMLObjectElement.prototype.getSVGDocument","HTMLEmbedElement.prototype.getSVGDocument"],{apply(e){if(e.call())return e.return(e.this.contentDocument)}}),e.Proxy("DOMParser.prototype.parseFromString",{apply(t){if("text/html"===t.args[1])try{t.args[0]=(0,a.Qs)(t.args[0],e.cookieStore,e.meta,!1)}catch{}}})}},5426:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(2614);function i(e,t){e.Proxy("FontFace",{construct(t){t.args[1]=(0,n.s)(t.args[1],e.meta)}})}},5465:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(884);function i(e,t){e.Proxy("Range.prototype.createContextualFragment",{apply(t){t.args[0]=(0,n.Qs)(t.args[0],e.cookieStore,e.meta)}})}},9804:function(e,t,r){r.r(t),r.d(t,{default:()=>s});var n=r(1472),i=r(1862),a=r(2794);function s(e,t){e.Proxy(["History.prototype.pushState","History.prototype.replaceState"],{apply(t){(t.args[2]||""===t.args[2])&&(t.args[2]=(0,n.Oy)(t.args[2],e.meta)),t.call();let{constructor:{constructor:r}}=t.this,s=r("return globalThis")(),o=s[a.pX];if(s.name===e.meta.topFrameName){let t=new i.UrlChangeEvent(o.url.href);e.frame?.dispatchEvent(t)}}})}},7758:function(e,t,r){r.r(t),r.d(t,{default:()=>s});var n=r(3255),i=r(2794),a=r(1472);function s(e){e.Proxy("window.open",{apply(t){t.args[0]&&(t.args[0]=(0,a.Oy)(t.args[0],e.meta)),("_top"===t.args[1]||"_unfencedTop"===t.args[1])&&(t.args[1]=e.meta.topFrameName),"_parent"===t.args[1]&&(t.args[1]=e.meta.parentFrameName);let r=t.call();if(!r)return t.return(r);if(i.pX in r)return t.return(r[i.pX].global);{let e=new n.ScramjetClient(r);return e.hook(),t.return(e.global)}}}),e.Trap("window.frameElement",{get(e){let t=e.get();return t?t.ownerDocument.defaultView[i.pX]?t:null:t}})}},6012:function(e,t,r){function n(e,t){e.Trap("origin",{get:()=>e.url.origin,set:()=>!1}),e.Trap("Document.prototype.URL",{get:()=>e.url.href,set:()=>!1}),e.Trap("Document.prototype.documentURI",{get:()=>e.url.href,set:()=>!1}),e.Trap("Document.prototype.domain",{get:()=>e.url.hostname,set:()=>!1})}r.r(t),r.d(t,{default:()=>n})},6286:function(e,t,r){r.r(t),r.d(t,{default:()=>a});var n=r(1472),i=r(37);function a(e,t){e.Trap("PerformanceEntry.prototype.name",{get(e){let t=e.get();return t&&t.startsWith(location.origin+i.$W.prefix)?(0,n.v2)(t):t}}),e.Proxy(["Performance.prototype.getEntries","Performance.prototype.getEntriesByType","Performance.prototype.getEntriesByName","PerformanceObserverEntryList.prototype.getEntries","PerformanceObserverEntryList.prototype.getEntriesByType","PerformanceObserverEntryList.prototype.getEntriesByName"],{apply(e){let t=e.call();return e.return(t.filter(e=>{for(let t of Object.values(i.$W.files))if(e.name.startsWith(location.origin+t))return!1;return!0}))}})}},1974:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(1472);function i(e,t){e.Proxy("Navigator.prototype.registerProtocolHandler",{apply(t){t.args[1]=(0,n.Oy)(t.args[1],e.meta)}}),e.Proxy("Navigator.prototype.unregisterProtocolHandler",{apply(t){t.args[1]=(0,n.Oy)(t.args[1],e.meta)}})}},9201:function(e,t,r){r.r(t),r.d(t,{default:()=>l,disabled:()=>o,enabled:()=>s,order:()=>a});var n=r(37),i=r(1472);let a=2,s=e=>(0,n.U5)("serviceworkers",e.url);function o(e,t){Reflect.deleteProperty(Navigator.prototype,"serviceWorker")}function l(e,t){let r=new WeakMap;e.Proxy("EventTarget.prototype.addEventListener",{apply(e){r.get(e.this)&&e.return(void 0)}}),e.Proxy("EventTarget.prototype.removeEventListener",{apply(e){r.get(e.this)&&e.return(void 0)}}),e.Proxy("ServiceWorkerContainer.prototype.getRegistration",{apply(e){e.return(new Promise(e=>e(registration)))}}),e.Proxy("ServiceWorkerContainer.prototype.getRegistrations",{apply(e){e.return(new Promise(e=>e([registration])))}}),e.Trap("ServiceWorkerContainer.prototype.ready",{get:e=>new Promise(e=>e(registration))}),e.Trap("ServiceWorkerContainer.prototype.controller",{get:e=>registration?.active}),e.Proxy("ServiceWorkerContainer.prototype.register",{apply(t){let n=new EventTarget;Object.setPrototypeOf(n,self.ServiceWorkerRegistration.prototype),n.constructor=t.fn;let a=(0,i.Oy)(t.args[0],e.meta)+"?dest=serviceworker";t.args[1]&&"module"===t.args[1].type&&(a+="&type=module");let s=e.natives.construct("SharedWorker",a).port,o={scope:t.args[0],active:s},l=e.descriptors.get("ServiceWorkerContainer.prototype.controller",e.serviceWorker);e.natives.call("ServiceWorker.prototype.postMessage",l,{scramjet$type:"registerServiceWorker",port:s,origin:e.url.origin},[s]),r.set(n,o),t.return(new Promise(e=>e(n)))}})}},5289:function(e,t,r){function n(e,t){let r={get(t,r){switch(r){case"getItem":return r=>t.getItem(e.url.host+"@"+r);case"setItem":return(r,n)=>t.setItem(e.url.host+"@"+r,n);case"removeItem":return r=>t.removeItem(e.url.host+"@"+r);case"clear":return()=>{for(let r in Object.keys(t))r.startsWith(e.url.host)&&t.removeItem(r)};case"key":return r=>{let n=Object.keys(t).filter(t=>t.startsWith(e.url.host));return t.getItem(n[r])};case"length":return Object.keys(t).filter(t=>t.startsWith(e.url.host)).length;default:if(r in Object.prototype||"symbol"==typeof r)return Reflect.get(t,r);return t.getItem(e.url.host+"@"+r)}},set:(t,r,n)=>(t.setItem(e.url.host+"@"+r,n),!0),ownKeys:t=>Reflect.ownKeys(t).filter(t=>"string"==typeof t&&t.startsWith(e.url.host)).map(t=>"string"==typeof t?t.substring(e.url.host.length+1):t),getOwnPropertyDescriptor:(t,r)=>({value:t.getItem(e.url.host+"@"+r),enumerable:!0,configurable:!0,writable:!0}),defineProperty:(t,r,n)=>(t.setItem(e.url.host+"@"+r,n.value),!0)};t.localStorage;let n=new Proxy(t.localStorage,r),i=new Proxy(t.sessionStorage,r);delete t.localStorage,delete t.sessionStorage,t.localStorage=n,t.sessionStorage=i}r.r(t),r.d(t,{default:()=>n})},1323:function(e,t,r){r.r(t),r.d(t,{isdedicated:()=>h,isemulatedsw:()=>f,isshared:()=>p,issw:()=>d,iswindow:()=>c,isworker:()=>u,loadAndHook:()=>g});var n=r(37),i=r(2794),a=r(3255),s=r(1862),o=r(8409),l=r(8665).A;let c="window"in globalThis&&window instanceof Window,u="WorkerGlobalScope"in globalThis,d="ServiceWorkerGlobalScope"in globalThis,h="DedicatedWorkerGlobalScope"in globalThis,p="SharedWorkerGlobalScope"in globalThis,f="location"in globalThis&&"serviceworker"===new URL(globalThis.location.href).searchParams.get("dest");function g(e){if((0,n.Nk)(e),l.log("initializing scramjet client"),!(i.pX in globalThis)){(0,n.Ec)();let e=new a.ScramjetClient(globalThis),t=globalThis.frameElement;t&&!t.name&&(t.name=`${Array(8).fill(0).map(()=>Math.floor(36*Math.random()).toString(36)).join("")}`),globalThis.COOKIE&&e.loadcookies(globalThis.COOKIE),e.hook(),f&&new o.ScramjetServiceWorkerRuntime(e).hook();let r=new s.ScramjetContextEvent(e.global.window,e);e.frame?.dispatchEvent(r);let i=new s.UrlChangeEvent(e.url.href);e.isSubframe||e.frame?.dispatchEvent(i)}Reflect.deleteProperty(globalThis,"WASM"),Reflect.deleteProperty(globalThis,"COOKIE")}},1862:function(e,t,r){r.r(t),r.d(t,{NavigateEvent:()=>i,ScramjetContextEvent:()=>s,ScramjetGlobalDownloadEvent:()=>n,UrlChangeEvent:()=>a});class n extends Event{download;type="download";constructor(e){super("download"),this.download=e}}class i extends Event{url;type="navigate";constructor(e){super("navigate"),this.url=e}}class a extends Event{url;type="urlchange";constructor(e){super("urlchange"),this.url=e}}class s extends Event{window;client;type="contextInit";constructor(e,t){super("contextInit"),this.window=e,this.client=t}}},94:function(e,t,r){function n(e,t){return Reflect.getOwnPropertyDescriptor(e,t)}r.r(t),r.d(t,{getOwnPropertyDescriptorHandler:()=>n})},3255:function(e,t,r){r.r(t),r.d(t,{NavigateEvent:()=>a.NavigateEvent,ScramjetClient:()=>n.ScramjetClient,ScramjetContextEvent:()=>a.ScramjetContextEvent,ScramjetGlobalDownloadEvent:()=>a.ScramjetGlobalDownloadEvent,ScramjetServiceWorkerRuntime:()=>l.ScramjetServiceWorkerRuntime,UrlChangeEvent:()=>a.UrlChangeEvent,createLocationProxy:()=>o.createLocationProxy,getOwnPropertyDescriptorHandler:()=>s.getOwnPropertyDescriptorHandler,isdedicated:()=>i.isdedicated,isemulatedsw:()=>i.isemulatedsw,isshared:()=>i.isshared,issw:()=>i.issw,iswindow:()=>i.iswindow,isworker:()=>i.isworker,loadAndHook:()=>i.loadAndHook});var n=r(336),i=r(1323),a=r(1862),s=r(94),o=r(3696),l=r(8409);r(3255)},3696:function(e,t,r){r.r(t),r.d(t,{createLocationProxy:()=>s});var n=r(1862),i=r(1472),a=r(1323);function s(e,t){let r=a.iswindow?t.Location:t.WorkerLocation,s={};Object.setPrototypeOf(s,r.prototype),s.constructor=r;let o=a.iswindow?t.location:r.prototype;for(let r of["protocol","hash","host","hostname","href","origin","pathname","port","search"]){let i=e.natives.call("Object.getOwnPropertyDescriptor",null,o,r);if(!i)continue;let a={configurable:!1,enumerable:!0};i.get&&(a.get=new Proxy(i.get,{apply:()=>e.url[r]})),i.set&&(a.set=new Proxy(i.set,{apply(i,a,s){if("href"===r){e.url=s[0];return}if("hash"===r){t.location.hash=s[0];let r=new n.UrlChangeEvent(e.url.href);e.isSubframe||e.frame?.dispatchEvent(r);return}let o=new URL(e.url.href);o[r]=s[0],e.url=o}})),Object.defineProperty(s,r,a)}return s.toString=new Proxy(t.location.toString,{apply:()=>e.url.href}),t.location.valueOf&&(s.valueOf=new Proxy(t.location.valueOf,{apply:()=>e.url.href})),t.location.assign&&(s.assign=new Proxy(t.location.assign,{apply(r,a,s){s[0]=(0,i.Oy)(s[0],e.meta),Reflect.apply(r,t.location,s);let o=new n.UrlChangeEvent(e.url.href);e.isSubframe||e.frame?.dispatchEvent(o)}})),t.location.reload&&(s.reload=new Proxy(t.location.reload,{apply(e,r,n){Reflect.apply(e,t.location,n)}})),t.location.replace&&(s.replace=new Proxy(t.location.replace,{apply(r,a,s){s[0]=(0,i.Oy)(s[0],e.meta),Reflect.apply(r,t.location,s);let o=new n.UrlChangeEvent(e.url.href);e.isSubframe||e.frame?.dispatchEvent(o)}})),s}},8382:function(e,t,r){function n(e){e.Proxy("console.clear",{apply(e){e.return(void 0)}});let t=console.log;e.Trap("console.log",{set(e,t){},get:e=>t})}r.r(t),r.d(t,{default:()=>n})},4634:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(1472);function i(e){e.Proxy("URL.createObjectURL",{apply(t){let r=t.call();r.startsWith("blob:")?t.return((0,n.IP)(r,e.meta)):t.return(r)}}),e.Proxy("URL.revokeObjectURL",{apply(e){e.args[0]=(0,n.$n)(e.args[0])}})}},5026:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(1472);function i(e,t){e.Proxy("CacheStorage.prototype.open",{apply(t){t.args[0]=`${e.url.origin}@${t.args[0]}`}}),e.Proxy("CacheStorage.prototype.has",{apply(t){t.args[0]=`${e.url.origin}@${t.args[0]}`}}),e.Proxy("CacheStorage.prototype.match",{apply(t){("string"==typeof t.args[0]||t.args[0]instanceof URL)&&(t.args[0]=(0,n.Oy)(t.args[0],e.meta))}}),e.Proxy("CacheStorage.prototype.delete",{apply(t){t.args[0]=`${e.url.origin}@${t.args[0]}`}}),e.Proxy("Cache.prototype.add",{apply(t){("string"==typeof t.args[0]||t.args[0]instanceof URL)&&(t.args[0]=(0,n.Oy)(t.args[0],e.meta))}}),e.Proxy("Cache.prototype.addAll",{apply(t){for(let r=0;r<t.args[0].length;r++)("string"==typeof t.args[0][r]||t.args[0][r]instanceof URL)&&(t.args[0][r]=(0,n.Oy)(t.args[0][r],e.meta))}}),e.Proxy("Cache.prototype.put",{apply(t){("string"==typeof t.args[0]||t.args[0]instanceof URL)&&(t.args[0]=(0,n.Oy)(t.args[0],e.meta))}}),e.Proxy("Cache.prototype.match",{apply(t){("string"==typeof t.args[0]||t.args[0]instanceof URL)&&(t.args[0]=(0,n.Oy)(t.args[0],e.meta))}}),e.Proxy("Cache.prototype.matchAll",{apply(t){(t.args[0]&&"string"==typeof t.args[0]||t.args[0]&&t.args[0]instanceof URL)&&(t.args[0]=(0,n.Oy)(t.args[0],e.meta))}}),e.Proxy("Cache.prototype.keys",{apply(t){(t.args[0]&&"string"==typeof t.args[0]||t.args[0]&&t.args[0]instanceof URL)&&(t.args[0]=(0,n.Oy)(t.args[0],e.meta))}}),e.Proxy("Cache.prototype.delete",{apply(t){("string"==typeof t.args[0]||t.args[0]instanceof URL)&&(t.args[0]=(0,n.Oy)(t.args[0],e.meta))}})}},6627:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(1323);function i(e,t){let r=e=>{let r=e.split("."),n=r.pop(),i=r.reduce((e,t)=>e?.[t],t);i&&n&&n in i&&delete i[n]};r("BarcodeDetector"),r("FaceDetector"),r("TextDetector"),n.iswindow&&r("ServiceWorkerRegistration.prototype.sync"),n.isemulatedsw&&(r("SyncManager"),r("SyncEvent")),r("TrustedHTML"),r("TrustedScript"),r("TrustedScriptURL"),r("TrustedTypePolicy"),r("TrustedTypePolicyFactory"),t.__defineGetter__("trustedTypes",()=>void 0),r("Navigator.prototype.joinAdInterestGroup"),n.iswindow&&(r("MediaDevices.prototype.setCaptureHandleConfig"),r("Navigator.prototype.bluetooth"),r("Bluetooth"),r("BluetoothDevice"),r("BluetoothRemoteGATTServer"),r("BluetoothRemoteGATTCharacteristic"),r("BluetoothRemoteGATTDescriptor"),r("BluetoothUUID"),r("Navigator.prototype.contacts"),r("ContactAddress"),r("ContactManager"),r("IdleDetector"),r("Navigator.prototype.presentation"),r("Presentation"),r("PresentationConnection"),r("PresentationReceiver"),r("PresentationRequest"),r("PresentationAvailability"),r("PresentationConnectionAvailableEvent"),r("PresentationConnectionCloseEvent"),r("PresentationConnectionList"),r("WindowControlsOverlay"),r("WindowControlsOverlayGeometryChangeEvent"),r("Navigator.prototype.windowControlsOverlay"),r("Navigator.prototype.hid"),r("HID"),r("HIDDevice"),r("HIDConnectionEvent"),r("HIDInputReportEvent"),r("navigation"),r("NavigateEvent"),r("NavigationActivation"),r("NavigationCurrentEntryChangeEvent"),r("NavigationDestination"),r("NavigationHistoryEntry"),r("NavigationTransition"))}},582:function(e,t,r){r.r(t),r.d(t,{argdbg:()=>a,default:()=>s,enabled:()=>i});var n=r(37);let i=e=>(0,n.U5)("captureErrors",e.url);function a(e,t=[]){switch(typeof e){case"string":break;case"object":if(e&&e[Symbol.iterator]&&"function"==typeof e[Symbol.iterator])for(let r in e){let n=Object.getOwnPropertyDescriptor(e,r);if(n&&n.get)continue;let i=e[r];t.includes(i)||(t.push(i),a(i,t))}}}function s(e,t){let r=console.warn;t.$scramerr=function(e){r("CAUGHT ERROR",e)},t.$scramdbg=function(e,t){return e&&"object"==typeof e&&e.length>0&&a(e),a(t),t},e.Proxy("Promise.prototype.catch",{apply(e){e.args[0]&&(e.args[0]=new Proxy(e.args[0],{apply(e,t,r){Reflect.apply(e,t,r)}}))}})}},6143:function(e,t,r){r.r(t),r.d(t,{default:()=>s,enabled:()=>a});var n=r(37),i=r(1472);let a=e=>(0,n.U5)("cleanErrors",e.url);function s(e,t){let r=(e,t)=>{let r=e.stack;for(let e=0;e<t.length;e++){let a=t[e].getFileName();try{if(a.endsWith(n.$W.files.all)){let e=r.split("\n"),t=e.find(e=>e.includes(a));e.splice(t,1),r=e.join("\n");continue}}catch{}try{r=r.replaceAll(a,(0,i.v2)(a))}catch{}}return r};e.Trap("Error.prepareStackTrace",{get:e=>r,set(e){}})}},591:function(e,t,r){r.r(t),r.d(t,{default:()=>a,indirectEval:()=>s});var n=r(37),i=r(1478);function a(e,t){Object.defineProperty(t,n.$W.globals.rewritefn,{value:function(t){return"string"!=typeof t?t:(0,i.o)(t,"(direct eval proxy)",e.meta)},writable:!1,configurable:!1})}function s(e,t){let r;return"string"!=typeof t?t:("accounts.google.com"===this.url.hostname?(console.log("USING STRICT EVAL - BOTGUARD"),r=Function(`
			"use strict";
			return eval;
		`)):r=this.global.eval,r((0,i.o)(t,"(indirect eval proxy)",this.meta)))}},3481:function(e,t,r){r.r(t),r.d(t,{default:()=>o});var n=r(1323),i=r(1472),a=r(94);let s=Symbol.for("scramjet original onevent function");function o(e,t){let r={message:{_init(){return"object"!=typeof this.data||!("$scramjet$type"in this.data)},ports(){return this.ports},source(){return null===this.source?null:this.source},origin(){return"object"==typeof this.data&&"$scramjet$origin"in this.data?this.data.$scramjet$origin:e.url.origin},data(){return"object"==typeof this.data&&"$scramjet$data"in this.data?this.data.$scramjet$data:this.data}},hashchange:{oldURL(){return(0,i.v2)(this.oldURL)},newURL(){return(0,i.v2)(this.newURL)}},storage:{_init(){return this.key.startsWith(e.url.host+"@")},key(){return this.key.substring(this.key.indexOf("@")+1)},url(){return(0,i.v2)(this.url)}}};function o(e){return new Proxy(e,{apply(e,n,i){let s=i[0];if(s.isTrusted){let e=s.type;if(e in r){let t=r[e];if(t._init&&!1===t._init.call(s))return;i[0]=new Proxy(s,{get(e,r,n){let i=Reflect.get(e,r);return r in t?t[r].call(e):"function"==typeof i?new Proxy(i,{apply:(e,t,r)=>t===n?Reflect.apply(e,s,r):Reflect.apply(e,t,r)}):i},getOwnPropertyDescriptor:a.getOwnPropertyDescriptorHandler})}}return t.event||Object.defineProperty(t,"event",{get:()=>i[0],configurable:!0}),Reflect.apply(e,n,i)},getOwnPropertyDescriptor:a.getOwnPropertyDescriptorHandler})}e.Proxy("EventTarget.prototype.addEventListener",{apply(t){if("function"!=typeof t.args[1])return;let r=t.args[1],n=o(r);t.args[1]=n;let i=e.eventcallbacks.get(t.this);(i||=[]).push({event:t.args[0],originalCallback:r,proxiedCallback:n}),e.eventcallbacks.set(t.this,i)}}),e.Proxy("EventTarget.prototype.removeEventListener",{apply(t){if("function"!=typeof t.args[1])return;let r=e.eventcallbacks.get(t.this);if(!r)return;let n=r.findIndex(e=>e.event===t.args[0]&&e.originalCallback===t.args[1]);if(-1===n)return;let i=r.splice(n,1);e.eventcallbacks.set(t.this,r),t.args[1]=i[0].proxiedCallback}});let l=[t.self,t.MessagePort.prototype];for(let i of(n.iswindow&&l.push(t.HTMLElement.prototype),t.Worker&&l.push(t.Worker.prototype),l))for(let t of Reflect.ownKeys(i))if("string"==typeof t&&t.startsWith("on")&&r[t.slice(2)]){let r=e.natives.call("Object.getOwnPropertyDescriptor",null,i,t);if(!r.get||!r.set||!r.configurable)continue;e.RawTrap(i,t,{get(e){return this[s]?this[s]:e.get()},set(e,t){if(this[s]=t,"function"!=typeof t)return e.set(t);e.set(o(t))}})}}},249:function(e,t,r){r.r(t),r.d(t,{default:()=>a});var n=r(1478);function i(e,t){let r=e.call().toString(),i=(0,n.o)(`return ${r}`,"(function proxy)",t.meta);e.return(e.fn(i)())}function a(e,t){let r={apply(t){i(t,e)},construct(t){i(t,e)}};e.Proxy("Function",r);let n=e.natives.call("eval",null,"(function () {})").constructor,a=e.natives.call("eval",null,"(async function () {})").constructor,s=e.natives.call("eval",null,"(function* () {})").constructor,o=e.natives.call("eval",null,"(async function* () {})").constructor;e.RawProxy(n.prototype,"constructor",r),e.RawProxy(a.prototype,"constructor",r),e.RawProxy(s.prototype,"constructor",r),e.RawProxy(o.prototype,"constructor",r)}},2468:function(e,t,r){r.r(t),r.d(t,{default:()=>a});var n=r(37),i=r(1472);function a(e,t){let r=e.natives.call("Function",null,"url","return import(url)");Object.defineProperty(t,n.$W.globals.importfn,{value:function(t,n){let a=new URL(n,t).href;return n.includes(":")||n.startsWith("/")||n.startsWith(".")||n.startsWith("..")?r(`${(0,i.Oy)(a,e.meta)}?type=module`):r(n)},writable:!1,configurable:!1,enumerable:!1}),Object.defineProperty(t,n.$W.globals.metafn,{value:function(e,t){return e.url=t,e.resolve=function(e){return new URL(e,t).href},e},writable:!1,configurable:!1,enumerable:!1})}},4338:function(e,t,r){function n(e){e.Proxy("IDBFactory.prototype.open",{apply(t){t.args[0]=`${e.url.origin}@${t.args[0]}`}}),e.Trap("IDBDatabase.prototype.name",{get(e){let t=e.get();return t.substring(t.indexOf("@")+1)}})}r.r(t),r.d(t,{default:()=>n})},6593:function(e,t,r){function n(e){e.Proxy("StorageManager.prototype.getDirectory",{apply(t){let r=t.call();t.return((async()=>{let t=await r,n=await t.getDirectoryHandle(`${e.url.origin.replace(/\/|\s|\./g,"-")}`,{create:!0});return Object.defineProperty(n,"name",{value:"",writable:!1}),n})())}})}r.r(t),r.d(t,{default:()=>n})},1320:function(e,t,r){r.r(t),r.d(t,{default:()=>s});var n=r(1323),i=r(2794),a=r(1914);function s(e){n.iswindow&&e.Proxy("window.postMessage",{apply(e){let{constructor:{constructor:t}}="object"==typeof e.args[0]&&null!==e.args[0]?e.args[0]:"object"==typeof e.args[2]&&null!==e.args[2]?e.args[2]:e.this&&a.POLLUTANT in e.this&&"object"==typeof e.this[a.POLLUTANT]&&null!==e.this[a.POLLUTANT]?e.this[a.POLLUTANT]:{},r=t("return globalThis")()[i.pX],n=t("...args","this(...args)");e.args[0]={$scramjet$messagetype:"window",$scramjet$origin:r.url.origin,$scramjet$data:e.args[0]},"string"==typeof e.args[1]&&(e.args[1]="*"),"object"==typeof e.args[1]&&(e.args[1].targetOrigin="*"),e.return(n.call(e.fn,...e.args))}});let t=["MessagePort.prototype.postMessage"];self.Worker&&t.push("Worker.prototype.postMessage"),n.iswindow||t.push("self.postMessage"),e.Proxy(t,{apply(e){e.args[0]={$scramjet$messagetype:"worker",$scramjet$data:e.args[0]}}})}},1914:function(e,t,r){r.r(t),r.d(t,{POLLUTANT:()=>i,default:()=>a});var n=r(37);let i=Symbol.for("scramjet realm pollutant");function a(e,t){Object.defineProperty(t.Object.prototype,n.$W.globals.setrealmfn,{value(e){return Object.defineProperty(this,i,{value:e,writable:!1,configurable:!0,enumerable:!1}),this},writable:!0,configurable:!0,enumerable:!1})}},9701:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(1472);function i(e){e.Proxy("EventSource",{construct(t){t.args[0]=(0,n.Oy)(t.args[0],e.meta)}}),e.Trap("EventSource.prototype.url",{get(e){(0,n.v2)(e.get())}})}},6972:function(e,t,r){r.r(t),r.d(t,{default:()=>a});var n=r(1323),i=r(1472);function a(e){e.Proxy("fetch",{apply(t){("string"==typeof t.args[0]||t.args[0]instanceof URL)&&(t.args[0]=(0,i.Oy)(t.args[0],e.meta),n.isemulatedsw&&(t.args[0]+="?from=swruntime"))}}),e.Proxy("Request",{construct(t){("string"==typeof t.args[0]||t.args[0]instanceof URL)&&(t.args[0]=(0,i.Oy)(t.args[0],e.meta),n.isemulatedsw&&(t.args[0]+="?from=swruntime"))}}),e.Trap("Response.prototype.url",{get:e=>(0,i.v2)(e.get())}),e.Trap("Request.prototype.url",{get:e=>(0,i.v2)(e.get())})}},9931:function(e,t,r){function n(e,t){let r=new WeakMap,n=new WeakMap;e.Proxy("WebSocket",{construct(n){let i=new EventTarget;Object.setPrototypeOf(i,n.fn.prototype),i.constructor=n.fn;let a=e.bare.createWebSocket(n.args[0],n.args[1],null,{"User-Agent":t.navigator.userAgent,Origin:e.url.origin}),s={extensions:"",protocol:"",url:n.args[0],binaryType:"blob",barews:a,onclose:null,onerror:null,onmessage:null,onopen:null};function o(e){s["on"+e.type]?.(new Proxy(e,{get:(e,t)=>"isTrusted"===t||Reflect.get(e,t)})),i.dispatchEvent(e)}a.addEventListener("open",()=>{o(new Event("open"))}),a.addEventListener("close",e=>{o(new CloseEvent("close",e))}),a.addEventListener("message",async e=>{let t=e.data;"string"==typeof t||("byteLength"in t?"blob"===s.binaryType?t=new Blob([t]):Object.setPrototypeOf(t,ArrayBuffer.prototype):"arrayBuffer"in t&&"arraybuffer"===s.binaryType&&Object.setPrototypeOf(t=await t.arrayBuffer(),ArrayBuffer.prototype)),o(new MessageEvent("message",{data:t,origin:e.origin,lastEventId:e.lastEventId,source:e.source,ports:e.ports}))}),a.addEventListener("error",()=>{o(new Event("error"))}),r.set(i,s),n.return(i)}}),e.Trap("WebSocket.prototype.binaryType",{get:e=>r.get(e.this).binaryType,set(e,t){let n=r.get(e.this);("blob"===t||"arraybuffer"===t)&&(n.binaryType=t)}}),e.Trap("WebSocket.prototype.bufferedAmount",{get:()=>0}),e.Trap("WebSocket.prototype.extensions",{get:e=>r.get(e.this).extensions}),e.Trap("WebSocket.prototype.onclose",{get:e=>r.get(e.this).onclose,set(e,t){r.get(e.this).onclose=t}}),e.Trap("WebSocket.prototype.onerror",{get:e=>r.get(e.this).onerror,set(e,t){r.get(e.this).onerror=t}}),e.Trap("WebSocket.prototype.onmessage",{get:e=>r.get(e.this).onmessage,set(e,t){r.get(e.this).onmessage=t}}),e.Trap("WebSocket.prototype.onopen",{get:e=>r.get(e.this).onopen,set(e,t){r.get(e.this).onopen=t}}),e.Trap("WebSocket.prototype.url",{get:e=>r.get(e.this).url}),e.Trap("WebSocket.prototype.protocol",{get:e=>r.get(e.this).protocol}),e.Trap("WebSocket.prototype.readyState",{get:e=>r.get(e.this).barews.readyState}),e.Proxy("WebSocket.prototype.send",{apply(e){let t=r.get(e.this);e.return(t.barews.send(e.args[0]))}}),e.Proxy("WebSocket.prototype.close",{apply(e){let t=r.get(e.this);void 0===e.args[0]&&(e.args[0]=1e3),void 0===e.args[1]&&(e.args[1]=""),e.return(t.barews.close(e.args[0],e.args[1]))}}),e.Proxy("WebSocketStream",{construct(r){let i,a,s,o={};Object.setPrototypeOf(o,r.fn.prototype),o.constructor=r.fn;let l=e.bare.createWebSocket(r.args[0],r.args[1],null,{"User-Agent":t.navigator.userAgent,Origin:e.url.origin});r.args[1]?.signal.addEventListener("abort",()=>{l.close(1e3,"")});let c={extensions:"",protocol:"",url:r.args[0],barews:l,opened:new Promise((e,t)=>{i=e,s=t}),closed:new Promise(e=>{a=e}),readable:new ReadableStream({start(e){l.addEventListener("message",async t=>{let r=t.data;"string"==typeof r||("byteLength"in r?Object.setPrototypeOf(r,ArrayBuffer.prototype):"arrayBuffer"in r&&Object.setPrototypeOf(r=await r.arrayBuffer(),ArrayBuffer.prototype)),e.enqueue(r)})}}),writable:new WritableStream({write(e){l.send(e)}})};l.addEventListener("open",()=>{i({readable:c.readable,writable:c.writable,extensions:c.extensions,protocol:c.protocol})}),l.addEventListener("close",e=>{a({code:e.code,reason:e.reason})}),l.addEventListener("error",e=>{s(e)}),n.set(o,c),r.return(o)}}),e.Trap("WebSocketStream.prototype.closed",{get:e=>n.get(e.this).closed}),e.Trap("WebSocketStream.prototype.opened",{get:e=>n.get(e.this).opened}),e.Trap("WebSocketStream.prototype.url",{get:e=>n.get(e.this).url}),e.Proxy("WebSocketStream.prototype.close",{apply(e){let t=n.get(e.this);return e.args[0]?(void 0===e.args[0].closeCode&&(e.args[0].closeCode=1e3),void 0===e.args[0].reason&&(e.args[0].reason=""),e.return(t.barews.close(e.args[0].closeCode,e.args[0].reason))):e.return(t.barews.close(1e3,""))}})}r.r(t),r.d(t,{default:()=>n})},248:function(e,t,r){r.r(t),r.d(t,{default:()=>a});var n=r(37),i=r(1472);function a(e,t){let r;t.Worker&&(0,n.U5)("syncxhr",e.url)&&(r=e.natives.construct("Worker",n.$W.files.sync));let a=Symbol("xhr original args"),s=Symbol("xhr headers");e.Proxy("XMLHttpRequest.prototype.open",{apply(t){t.args[1]&&(t.args[1]=(0,i.Oy)(t.args[1],e.meta)),void 0===t.args[2]&&(t.args[2]=!0),t.this[a]=t.args}}),e.Proxy("XMLHttpRequest.prototype.setRequestHeader",{apply(e){(e.this[s]||(e.this[s]={}))[e.args[0]]=e.args[1]}}),e.Proxy("XMLHttpRequest.prototype.send",{apply(t){let i=t.this[a];if(!i||i[2])return;if(!(0,n.U5)("syncxhr",e.url))return console.warn("ignoring request - sync xhr disabled in flags"),t.return(void 0);let o=new SharedArrayBuffer(1024,{maxByteLength:0x7fffffff}),l=new DataView(o);e.natives.call("Worker.prototype.postMessage",r,{sab:o,args:i,headers:t.this[s],body:t.args[0]});let c=performance.now();for(;0===l.getUint8(0);)if(performance.now()-c>1e3)throw Error("xhr timeout");let u=l.getUint16(1),d=l.getUint32(3),h=new Uint8Array(d);h.set(new Uint8Array(o.slice(7,7+d)));let p=new TextDecoder().decode(h),f=l.getUint32(7+d),g=new Uint8Array(f);g.set(new Uint8Array(o.slice(11+d,11+d+f)));let m=new TextDecoder().decode(g);e.RawTrap(t.this,"status",{get:()=>u}),e.RawTrap(t.this,"responseText",{get:()=>m}),e.RawTrap(t.this,"response",{get:()=>"arraybuffer"===t.this.responseType?g.buffer:m}),e.RawTrap(t.this,"responseXML",{get:()=>new DOMParser().parseFromString(m,"text/xml")}),e.RawTrap(t.this,"getAllResponseHeaders",{get:()=>()=>p}),e.RawTrap(t.this,"getResponseHeader",{get:()=>e=>{let t=RegExp(`^${e}: (.*)$`,"m").exec(p);return t?t[1]:null}}),t.return(void 0)}}),e.Trap("XMLHttpRequest.prototype.responseURL",{get:e=>(0,i.v2)(e.get())})}},7418:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(1478);function i(e,t){e.Proxy(["setTimeout","setInterval"],{apply(t){t.args.length>0&&"string"==typeof t.args[0]&&(t.args[0]=(0,n.o)(t.args[0],"(setTimeout string eval)",e.meta))}})}},7791:function(e,t,r){r.r(t),r.d(t,{default:()=>o,enabled:()=>s});var n=r(37),i=r(8665).A;let a="/*scramtag ",s=e=>(0,n.U5)("sourcemaps",e.url);function o(e,t){Object.defineProperty(t,n.$W.globals.pushsourcemapfn,{value:(t,r)=>{let n=performance.now();!function(e,t,r){let n=Uint8Array.from(t),i=new DataView(n.buffer),a=new TextDecoder("utf-8"),s=[],o=i.getUint32(0,!0),l=4;for(let e=0;e<o;e++){let e=i.getUint32(l,!0);l+=4;let t=i.getUint32(l,!0);l+=4;let r=i.getUint8(l);if(l+=1,0==r)s.push({type:r,start:e,size:t});else if(1==r){let o=e+t,c=i.getUint32(l,!0);l+=4;let u=a.decode(n.subarray(l,l+c));s.push({type:r,start:e,end:o,str:u})}}e.box.sourcemaps[r]=s}(e,t,r),i.time(e.meta,n,`scramtag parse for ${r}`)},enumerable:!1,writable:!1,configurable:!1}),e.Proxy("Function.prototype.toString",{apply(t){performance.now(),function(e,t){let r=t.fn.call(t.this),n=function(e){let t=e.indexOf(a);if(-1===t)return null;let r=e.indexOf("*/",t);if(-1===r)throw console.log(e,t,r),Error("unreachable");let n=e.substring(t+2,r).split(" ");if(3!==n.length||"scramtag"!==n[0]||!Number.isSafeInteger(+n[1]))throw console.log(e,t,r,n),Error("invalid tag");return[n[2],t,+n[1]]}(r);if(!n)return t.return(r);let[i,s,o]=n,l=o-s,c=l+r.length,u=e.box.sourcemaps[i];if(!u)return console.warn("failed to get rewrites for tag",i),t.return(r);let d=0;for(;d<u.length;)if(u[d].start<l)d++;else break;let h=d;for(;h<u.length;)if(function(e){if(0===e.type)return e.start+e.size;if(1===e.type)return e.end;throw"unreachable"}(u[h])<c)h++;else break;let p=u.slice(d,h),f="",g=0;for(let e of p)if(f+=r.slice(g,e.start-l),0===e.type)g=e.start+e.size-l;else if(1===e.type)f+=e.str,g=e.end-l;else throw"unreachable";f+=r.slice(g),f=f.replace(`${a}${o} ${i}*/`,""),t.return(f)}(e,t)}})}},9399:function(e,t,r){r.r(t),r.d(t,{default:()=>a});var n=r(4110),i=r(1472);function a(e,t){e.Proxy("Worker",{construct(t){t.args[0]=(0,i.Oy)(t.args[0],e.meta)+"?dest=worker",t.args[1]&&"module"===t.args[1].type&&(t.args[0]+="&type=module");let r=t.call(),a=new n.DD;(async()=>{let t=await a.getInnerPort();e.natives.call("Worker.prototype.postMessage",r,{$scramjet$type:"baremuxinit",port:t},[t])})()}}),e.Proxy("SharedWorker",{construct(t){t.args[0]=(0,i.Oy)(t.args[0],e.meta)+"?dest=sharedworker",t.args[1]&&"string"==typeof t.args[1]&&(t.args[1]=`${e.url.origin}@${t.args[1]}`),t.args[1]&&"object"==typeof t.args[1]&&("module"===t.args[1].type&&(t.args[0]+="&type=module"),t.args[1].name&&(t.args[1].name=`${e.url.origin}@${t.args[1].name}`));let r=t.call(),a=new n.DD;(async()=>{let t=await a.getInnerPort();e.natives.call("MessagePort.prototype.postMessage",r.port,{$scramjet$type:"baremuxinit",port:t},[t])})()}}),e.Proxy("Worklet.prototype.addModule",{apply(t){t.args[0]&&(t.args[0]=(0,i.Oy)(t.args[0],e.meta)+"?dest=worklet")}})}},581:function(e,t,r){r.r(t),r.d(t,{createWrapFn:()=>o,default:()=>c,order:()=>l});var n=r(1323),i=r(2794),a=r(37),s=r(591);function o(e,t){return function(r,a){if(r===t.location)return e.locationProxy;if(r===t.eval)return s.indirectEval.bind(e,a);if(n.iswindow){if(r===t.parent)if(i.pX in t.parent)return t.parent;else return t;else if(r===t.top){let e=t;for(;;){let t=e.parent.self;if(t===e||!(i.pX in t))break;e=t}return e}}return r}}let l=4;function c(e,t){Object.defineProperty(t,a.$W.globals.wrapfn,{value:e.wrapfn,writable:!1,configurable:!1,enumerable:!1}),Object.defineProperty(t,a.$W.globals.wrappropertyfn,{value:function(e){return"location"===e||"parent"===e||"top"===e||"eval"===e?a.$W.globals.wrappropertybase+e:e},writable:!1,configurable:!1,enumerable:!1}),Object.defineProperty(t,a.$W.globals.cleanrestfn,{value:function(e){},writable:!1,configurable:!1,enumerable:!1}),Object.defineProperty(t.Object.prototype,a.$W.globals.wrappropertybase+"location",{get:function(){return this===t||this===t.document?e.locationProxy:this.location},set(r){if(this===t||this===t.document){e.url=r;return}this.location=r},configurable:!1,enumerable:!1}),Object.defineProperty(t.Object.prototype,a.$W.globals.wrappropertybase+"parent",{get:function(){return e.wrapfn(this.parent,!1)},set(e){this.parent=e},configurable:!1,enumerable:!1}),Object.defineProperty(t.Object.prototype,a.$W.globals.wrappropertybase+"top",{get:function(){return e.wrapfn(this.top,!1)},set(e){this.top=e},configurable:!1,enumerable:!1}),Object.defineProperty(t.Object.prototype,a.$W.globals.wrappropertybase+"eval",{get:function(){return e.wrapfn(this.eval,!0)},set(e){this.eval=e},configurable:!1,enumerable:!1}),t.$scramitize=function(e){return location,n.iswindow&&t.top,"string"==typeof e&&e.includes("scramjet"),"string"==typeof e&&e.includes(location.origin),e},Object.defineProperty(t,a.$W.globals.trysetfn,{value:function(r,n,i){return r instanceof t.Location&&(e.locationProxy.href=i,!0)},writable:!1,configurable:!1})}},1229:function(e,t,r){r.r(t),r.d(t,{SingletonBox:()=>n});class n{ownerclient;clients=[];globals=new Map;documents=new Map;locations=new Map;sourcemaps={};constructor(e){this.ownerclient=e}registerClient(e,t){this.clients.push(e),this.globals.set(t,e),this.documents.set(t.document,e),this.locations.set(t.location,e)}}},8409:function(e,t,r){r.r(t),r.d(t,{ScramjetServiceWorkerRuntime:()=>a});var n=r(1472),i=r(8665).A;class a{client;recvport;constructor(e){this.client=e,self.onconnect=t=>{let r=t.ports[0];i.log("sw","connected"),r.addEventListener("message",t=>{console.log("sw",t.data),"scramjet$type"in t.data&&("init"===t.data.scramjet$type?(this.recvport=t.data.scramjet$port,this.recvport.postMessage({scramjet$type:"init"})):s.call(this,e,t.data))}),r.start()}}hook(){this.client.global.registration={scope:this.client.url.href,active:{scriptURL:this.client.url.href,state:"activated",onstatechange:null,onerror:null,postMessage:()=>{},addEventListener:()=>{},removeEventListener:()=>{},dispatchEvent:e=>!1},showNotification:async()=>{},unregister:async()=>!0,update:async()=>{},installing:null,waiting:null},this.client.global.ServiceWorkerGlobalScope=this.client.global}}function s(e,t){let r=this.recvport,a=t.scramjet$type,s=t.scramjet$token,o=e.eventcallbacks.get(self);if("fetch"===a){i.log("ee",t);let a=o.filter(e=>"fetch"===e.event);if(!a)return;for(let o of a){let a=t.scramjet$request,l=new e.natives.Request((0,n.v2)(a.url),{body:a.body,headers:new Headers(a.headers),method:a.method,mode:"same-origin"});Object.defineProperty(l,"destination",{value:a.destinitation});let c=new Event("fetch");c.request=l;let u=!1;c.respondWith=e=>{u=!0,(async()=>{let t={scramjet$type:"fetch",scramjet$token:s,scramjet$response:{body:(e=await e).body,headers:Array.from(e.headers.entries()),status:e.status,statusText:e.statusText}};i.log("sw","responding",t),r.postMessage(t,[e.body])})()},i.log("to fn",c),o.proxiedCallback(new Proxy(c,{get:(e,t,r)=>"isTrusted"===t||Reflect.get(e,t)})),u||(console.log("sw","no response"),r.postMessage({scramjet$type:"fetch",scramjet$token:s,scramjet$response:!1}))}}}},9353:function(e,t,r){r.r(t),r.d(t,{default:()=>i});var n=r(1472);function i(e){e.Proxy("importScripts",{apply(t){for(let r in t.args)t.args[r]=(0,n.Oy)(t.args[r],e.meta)}})}},3402:function(e,t,r){r.d(t,{q:()=>l});var n=r(37),i=r(4869),a=r(6570),s=r(1862),o=r(8665).A;class l extends EventTarget{db;constructor(e){super();const t=(e,r)=>{for(let n in r)r[n]instanceof Object&&n in e&&Object.assign(r[n],t(e[n],r[n]));return Object.assign(e||{},r)},r=t({prefix:"/scramjet/",globals:{wrapfn:"$scramjet$wrap",wrappropertybase:"$scramjet__",wrappropertyfn:"$scramjet$prop",cleanrestfn:"$scramjet$clean",importfn:"$scramjet$import",rewritefn:"$scramjet$rewrite",metafn:"$scramjet$meta",setrealmfn:"$scramjet$setrealm",pushsourcemapfn:"$scramjet$pushsourcemap",trysetfn:"$scramjet$tryset",templocid:"$scramjet$temploc",tempunusedid:"$scramjet$tempunused"},files:{wasm:"/scramjet.wasm.wasm",all:"/scramjet.all.js",sync:"/scramjet.sync.js"},flags:{serviceworkers:!1,syncxhr:!1,strictRewrites:!0,rewriterLogs:!1,captureErrors:!0,cleanErrors:!1,scramitize:!1,sourcemaps:!0,destructureRewrites:!1,interceptDownloads:!1,allowInvalidJs:!0,allowFailedIntercepts:!0},siteFlags:{},codec:{encode:e=>e?encodeURIComponent(e):e,decode:e=>e?decodeURIComponent(e):e}},e);r.codec.encode=r.codec.encode.toString(),r.codec.decode=r.codec.decode.toString(),(0,n.Nk)(r)}async init(){(0,n.Ec)(),await this.openIDB(),navigator.serviceWorker.controller?.postMessage({scramjet$type:"loadConfig",config:n.$W}),o.log("config loaded"),navigator.serviceWorker.addEventListener("message",e=>{if(!("scramjet$type"in e.data))return;let t=e.data;"download"===t.scramjet$type&&this.dispatchEvent(new s.ScramjetGlobalDownloadEvent(t.download))})}createFrame(e){return e||(e=document.createElement("iframe")),new i.X(this,e)}encodeUrl(e){if("string"==typeof e&&(e=new URL(e)),"http:"!=e.protocol&&"https:"!=e.protocol)return e.href;let t=(0,n.hD)(e.hash.slice(1));return e.hash="",n.$W.prefix+(0,n.hD)(e.href)+(t?"#"+t:"")}decodeUrl(e){e instanceof URL&&(e=e.toString());let t=location.origin+n.$W.prefix;return(0,n.P_)(e.slice(t.length))}async openIDB(){let e=await (0,a.P2)("$scramjet",1,{upgrade(e){e.objectStoreNames.contains("config")||e.createObjectStore("config"),e.objectStoreNames.contains("cookies")||e.createObjectStore("cookies"),e.objectStoreNames.contains("redirectTrackers")||e.createObjectStore("redirectTrackers"),e.objectStoreNames.contains("referrerPolicies")||e.createObjectStore("referrerPolicies"),e.objectStoreNames.contains("publicSuffixList")||e.createObjectStore("publicSuffixList")}});return this.db=e,await this.#e(),e}async #e(){this.db?await this.db.put("config",n.$W,"config"):console.error("Store not ready!")}async modifyConfig(e){(0,n.Nk)(Object.assign({},n.$W,e)),(0,n.Ec)(),await this.#e(),navigator.serviceWorker.controller?.postMessage({scramjet$type:"loadConfig",config:n.$W})}addEventListener(e,t,r){super.addEventListener(e,t,r)}}},4869:function(e,t,r){r.d(t,{X:()=>a});var n=r(2794),i=r(8665).A;class a extends EventTarget{controller;frame;constructor(e,t){super(),this.controller=e,this.frame=t,t.name=`${Array(8).fill(0).map(()=>Math.floor(36*Math.random()).toString(36)).join("")}`,t[n.zr]=this}get client(){return this.frame.contentWindow.window[n.pX]}get url(){return this.client.url}go(e){e instanceof URL&&(e=e.toString()),i.log("navigated to",e),this.frame.src=this.controller.encodeUrl(e)}back(){this.frame.contentWindow?.history.back()}forward(){this.frame.contentWindow?.history.forward()}reload(){this.frame.contentWindow?.location.reload()}addEventListener(e,t,r){super.addEventListener(e,t,r)}}},9052:function(e,t,r){r.r(t),r.d(t,{ScramjetController:()=>i.q,ScramjetFrame:()=>n.X});var n=r(4869),i=r(3402);console.warn("you are using the last version of scramjet v1, if possible, please upgrade to v2 for better performance and more features")},8665:function(e,t,r){r.d(t,{A:()=>i});let n={log:console.log,warn:console.warn,error:console.error,debug:console.debug,info:console.info},i={fmt:function(e,t,...r){let n=Error.prepareStackTrace;Error.prepareStackTrace=(e,t)=>{t.shift(),t.shift(),t.shift();let r="";for(let e=1;e<Math.min(2,t.length);e++)t[e].getFunctionName()&&(r+=`${t[e].getFunctionName()} -> `+r);return r+(t[0].getFunctionName()||"Anonymous")};let i=function(){try{throw Error()}catch(e){return e.stack}}();Error.prepareStackTrace=n,this.print(e,i,t,...r)},print(e,t,r,...i){(n[e]||n.log)(`%c${t}%c ${r}`,`
  	background-color: ${{log:"#000",warn:"#f80",error:"#f00",debug:"transparent"}[e]};
  	color: ${{log:"#fff",warn:"#fff",error:"#fff",debug:"gray"}[e]};
  	padding: ${{log:2,warn:4,error:4,debug:0}[e]}px;
  	font-weight: bold;
  	font-family: monospace;
  	font-size: 0.9em;
  `,`${"debug"===e?"color: gray":""}`,...i)},log:function(e,...t){this.fmt("log",e,...t)},warn:function(e,...t){this.fmt("warn",e,...t)},error:function(e,...t){this.fmt("error",e,...t)},debug:function(e,...t){this.fmt("debug",e,...t)},time(e,t,r){}}},3831:function(e,t,r){r.d(t,{k:()=>a});var n=r(4322),i=r.n(n);class a{cookies={};setCookies(e,t){for(let r of e){let e=i()(r),n={domain:e.domain,sameSite:e.sameSite,...e[0]};n.domain||(n.domain="."+t.hostname),n.domain.startsWith(".")||(n.domain="."+n.domain),n.path||(n.path="/"),n.sameSite||(n.sameSite="lax"),n.expires&&(n.expires=n.expires.toString());let a=`${n.domain}@${n.path}@${n.name}`;this.cookies[a]=n}}getCookies(e,t){let r=new Date,n=Object.values(this.cookies),i=[];for(let a of n){if(a.expires&&new Date(a.expires)<r){delete this.cookies[`${a.domain}@${a.path}@${a.name}`];continue}(!a.secure||"https:"===e.protocol)&&(!a.httpOnly||!t)&&e.pathname.startsWith(a.path)&&(!a.domain.startsWith(".")||e.hostname.endsWith(a.domain.slice(1)))&&i.push(a)}return i.map(e=>`${e.name}=${e.value}`).join("; ")}load(e){if("object"==typeof e)return e;this.cookies=JSON.parse(e)}dump(){return JSON.stringify(this.cookies)}}},1427:function(e,t,r){r.d(t,{u:()=>n});class n{headers={};set(e,t){this.headers[e.toLowerCase()]=t}}},2393:function(e,t,r){r.d(t,{V:()=>s});var n=r(2614),i=r(884),a=r(1472);let s=[{fn:(e,t)=>(0,a.Oy)(e,t),src:["embed","script","img","frame","source","input","track"],href:["a","link","area","use","image"],data:["object"],action:["form"],formaction:["button","input","textarea","submit"],poster:["video"],"xlink:href":["image"]},{fn:(e,t)=>(0,a.Oy)(e,t),src:["iframe"]},{fn:(e,t)=>null,sandbox:["iframe"]},{fn:(e,t)=>e.startsWith("blob:")?(0,a.$n)(e):(0,a.Oy)(e,t),src:["video","audio"]},{fn:()=>"",integrity:["script","link"]},{fn:()=>null,nonce:"*",csp:["iframe"],credentialless:["iframe"]},{fn:(e,t)=>(0,i.PV)(e,t),srcset:["img","source"],imagesrcset:["link"]},{fn:(e,t,r)=>(0,i.Qs)(e,r,{origin:new URL(t.origin.origin),base:new URL(t.origin.origin)},!0),srcdoc:["iframe"]},{fn:(e,t)=>(0,n.s)(e,t),style:"*"},{fn:(e,t)=>"_top"===e||"_unfencedTop"===e?t.topFrameName:"_parent"===e?t.parentFrameName:e,target:["a","base"]}]},37:function(e,t,r){let n,i,a;r.d(t,{$W:()=>a,Ec:()=>o,Nk:()=>c,P_:()=>i,U5:()=>l,hD:()=>n}),r(2393),r(9381),r(2416);let s=Function;function o(){n=s(`return ${a.codec.encode}`)(),i=s(`return ${a.codec.decode}`)()}function l(e,t){let r=a.flags[e];for(let r in a.siteFlags){let n=a.siteFlags[r];if(new RegExp(r).test(t.href)&&e in n)return n[e]}return r}function c(e){a=e,o()}},2614:function(e,t,r){r.d(t,{f:()=>a,s:()=>i});var n=r(1472);function i(e,t){return s("rewrite",e,t)}function a(e){return s("unrewrite",e)}function s(e,t,r){return(t=(t=new String(t).toString()).replace(/url\(['"]?(.+?)['"]?\)/gm,(t,i)=>{let a="rewrite"===e?(0,n.Oy)(i.trim(),r):(0,n.v2)(i.trim());return t.replace(i,a)})).replace(/@import\s+(url\s*?\(.{0,9999}?\)|['"].{0,9999}?['"]|.{0,9999}?)($|\s|;)/gm,(t,i)=>t.replace(i,i.replace(/^(url\(['"]?|['"]|)(.+?)(['"]|['"]?\)|)$/gm,(t,i,a,s)=>{if(i.startsWith("url"))return t;let o="rewrite"===e?(0,n.Oy)(a.trim(),r):(0,n.v2)(a.trim());return`${i}${o}${s}`})))}},4435:function(e,t,r){r.d(t,{l:()=>l});var n=r(1472),i=r(8228);let a=new Set(["cross-origin-embedder-policy","cross-origin-opener-policy","cross-origin-resource-policy","content-security-policy","content-security-policy-report-only","expect-ct","feature-policy","origin-isolation","strict-transport-security","upgrade-insecure-requests","x-content-type-options","x-download-options","x-frame-options","x-permitted-cross-domain-policies","x-powered-by","x-xss-protection","clear-site-data"]),s=new Set(["location","content-location","referer"]);function o(e,t){return e.replace(/<(.*)>/gi,e=>(0,n.Oy)(e,t))}async function l(e,t,r,l){let c={};for(let t in e)c[t.toLowerCase()]=e[t];for(let e of a)delete c[e];for(let e of s)c[e]&&(c[e]=(0,n.Oy)(c[e]?.toString(),t));if("string"==typeof c.link?c.link=o(c.link,t):Array.isArray(c.link)&&(c.link=c.link.map(e=>o(e,t))),"string"==typeof c.referer){let e=new URL(c.referer),r=await l.get(e.href);if(r){let n=r.policy.toLowerCase().split(",").map(e=>e.trim());n.includes("no-referrer")||n.includes("no-referrer-when-downgrade")&&"http:"===t.origin.protocol&&"https:"===e.protocol?delete c.referer:n.includes("origin")?c.referer=e.origin:n.includes("origin-when-cross-origin")?e.origin!==t.origin.origin?c.referer=e.origin:c.referer=e.href:n.includes("same-origin")?e.origin===t.origin.origin?c.referer=e.href:delete c.referer:n.includes("strict-origin")?"http:"===t.origin.protocol&&"https:"===e.protocol?delete c.referer:c.referer=e.origin:e.origin===t.origin.origin?c.referer=e.href:"http:"===t.origin.protocol&&"https:"===e.protocol?delete c.referer:c.referer=e.origin}}return"string"==typeof c["sec-fetch-dest"]&&""===c["sec-fetch-dest"]&&(c["sec-fetch-dest"]="empty"),"string"==typeof c["sec-fetch-site"]&&"none"!==c["sec-fetch-site"]&&("string"==typeof c.referer?c["sec-fetch-site"]=await (0,i.ps)(t,new URL(c.referer),r):(console.warn("Missing referrer header; can't rewrite sec-fetch-site properly. Falling back to unsafe deletion."),delete c["sec-fetch-site"])),c}},884:function(e,t,r){r.d(t,{PV:()=>m,Qs:()=>f,Uk:()=>h,nK:()=>g});var n=r(3808),i=r(8866),a=r(6498),s=r(1472),o=r(2614),l=r(1478),c=r(37),u=r(2393),d=r(8665).A;function h(e,t){let r=JSON.stringify(e.dump()),n=`
		self.COOKIE = ${r};
		$scramjetLoadClient().loadAndHook(${JSON.stringify(c.$W)});
		if ("document" in self && document?.currentScript) {
			document.currentScript.remove();
		}
	`,i=y(p.encode(n));return[t(c.$W.files.wasm),t(c.$W.files.all),t("data:application/javascript;base64,"+i)]}let p=new TextEncoder;function f(e,t,r,c=!1){let g=performance.now(),m=function(e,t,r,c=!1){let d=new i.DV((e,t)=>t),f=new n.iX(d);if(f.write(e),f.end(),function e(t,r,n){if("base"===t.name&&void 0!==t.attribs.href&&(n.base=new URL(t.attribs.href,n.origin)),t.attribs){for(let e of u.V)for(let i in e){let a=e[i.toLowerCase()];if("function"!=typeof a&&("*"===a||a.includes(t.name))&&void 0!==t.attribs[i]){let a=t.attribs[i],s=e.fn(a,n,r);null===s?delete t.attribs[i]:t.attribs[i]=s,t.attribs[`scramjet-attr-${i}`]=a}}for(let[e,r]of Object.entries(t.attribs))b.includes(e)&&(t.attribs[`scramjet-attr-${e}`]=r,t.attribs[e]=(0,l.o)(r,`(inline ${e} on element)`,n))}if("style"===t.name&&void 0!==t.children[0]&&(t.children[0].data=(0,o.s)(t.children[0].data,n)),"script"===t.name&&"module"===t.attribs.type&&t.attribs.src&&(t.attribs.src=t.attribs.src+"?type=module"),"script"===t.name&&"importmap"===t.attribs.type&&void 0!==t.children[0]){let e=t.children[0].data;try{let r=JSON.parse(e);if(r.imports)for(let e in r.imports){let t=r.imports[e];"string"==typeof t&&(t=(0,s.Oy)(t,n),r.imports[e]=t)}t.children[0].data=JSON.stringify(r)}catch(e){console.error("Failed to parse importmap JSON:",e)}}if("script"===t.name&&/(application|text)\/javascript|module|undefined/.test(t.attribs.type)&&void 0!==t.children[0]){let e=t.children[0].data,r="module"===t.attribs.type;t.attribs["scramjet-attr-script-source-src"]=y(p.encode(e)),e=e.replace(/<!--[\s\S]*?-->/g,""),t.children[0].data=(0,l.o)(e,"(inline script element)",n,r)}if("meta"===t.name&&void 0!==t.attribs["http-equiv"]){if("content-security-policy"===t.attribs["http-equiv"].toLowerCase())t=new i.Mw(t.attribs.content);else if("refresh"===t.attribs["http-equiv"]&&t.attribs.content.includes("url")){let e=t.attribs.content.split("url=");e[1]&&(e[1]=(0,s.Oy)(e[1].trim(),n)),t.attribs.content=e.join("url=")}}if(t.childNodes)for(let i in t.childNodes)t.childNodes[i]=e(t.childNodes[i],r,n);return t}(d.root,t,r),c){let e=function e(t){if(t.type===n.RJ.vw&&"head"===t.name)return t;if(t.childNodes)for(let r of t.childNodes){let t=e(r);if(t)return t}return null}(d.root);e||(e=new i.Hg("head",{},[]),d.root.children.unshift(e)),e.children.unshift(...h(t,e=>new i.Hg("script",{src:e})))}return(0,a.A)(d.root,{encodeEntities:"utf8",decodeEntities:!1})}(e,t,r,c);return d.time(r,g,"html rewrite"),m}function g(e){let t=new i.DV((e,t)=>t),r=new n.iX(t);return r.write(e),r.end(),!function e(t){if("attribs"in t)for(let e in t.attribs){if("scramjet-attr-script-source-src"==e){t.children[0]&&"data"in t.children[0]&&(t.children[0].data=atob(t.attribs[e]));continue}e.startsWith("scramjet-attr-")&&(t.attribs[e.slice(14)]=t.attribs[e],delete t.attribs[e])}if("childNodes"in t)for(let r of t.childNodes)e(r)}(t.root),(0,a.A)(t.root,{decodeEntities:!1})}function m(e,t){return e.split(/ .*,/).map(e=>e.trim()).map(e=>{let[r,...n]=e.split(/\s+/),i=(0,s.Oy)(r.trim(),t);return n.length>0?`${i} ${n.join(" ")}`:i}).join(", ")}function y(e){return btoa(Array.from(e,e=>String.fromCodePoint(e)).join(""))}let b=["onbeforexrselect","onabort","onbeforeinput","onbeforematch","onbeforetoggle","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontentvisibilityautostatechange","oncontextlost","oncontextmenu","oncontextrestored","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onsecuritypolicyviolation","onseeked","onseeking","onselect","onslotchange","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel","onauxclick","ongotpointercapture","onlostpointercapture","onpointerdown","onpointermove","onpointerrawupdate","onpointerup","onpointercancel","onpointerover","onpointerout","onpointerenter","onpointerleave","onselectstart","onselectionchange","onanimationend","onanimationiteration","onanimationstart","ontransitionrun","ontransitionstart","ontransitionend","ontransitioncancel","oncopy","oncut","onpaste","onscrollend","onscrollsnapchange","onscrollsnapchanging"]},9381:function(e,t,r){r(2614),r(4435),r(884),r(1478),r(1472),r(2015),r(1561)},1478:function(e,t,r){r.d(t,{o:()=>s});var n=r(37),i=r(1561),a=r(8665).A;function s(e,t,r,o=!1){try{let s=function(e,t,r,n=!1){return function(e,t,r,n){e=globalThis.__browzenNormalizeSource(e,n);let[s,o]=(0,i.nb)(r);try{let o,l=performance.now();o="string"==typeof e?s.rewrite_js(e,r.base.href,t||"(unknown)",n):s.rewrite_js_bytes(e,r.base.href,t||"(unknown)",n),a.time(r,l,`oxc rewrite for "${t||"(unknown)"}"`);let{js:c,map:u,scramtag:d,errors:h}=o;return{js:"string"==typeof e?i.su.decode(c):c,tag:d,map:u,errors:h}}finally{o()}}(e,t,r,n)}(e,t,r,o),l=s.js;if((0,n.U5)("sourcemaps",r.base)){let e=globalThis[n.$W.globals.pushsourcemapfn];if(e)e(Array.from(s.map),s.tag);else{l instanceof Uint8Array&&(l=new TextDecoder().decode(l));let e=`${n.$W.globals.pushsourcemapfn}([${s.map.join(",")}], "${s.tag}");`,t=/^\s*(['"])use strict\1;?/;l=t.test(l)?l.replace(t,`$&
${e}`):`${e}
${l}`}}if((0,n.U5)("rewriterLogs",r.base))for(let e of s.errors)console.error("oxc parse error",e);return l}catch(a){if(console.warn("failed rewriting js for",t||"(unknown)",a.message,e instanceof Uint8Array?i.su.decode(e):e),(0,n.U5)("allowInvalidJs",r.base))return e;throw a}}Error.stackTraceLimit=50},1472:function(e,t,r){r.d(t,{$n:()=>o,IP:()=>s,Oy:()=>l,v2:()=>c});var n=r(37),i=r(1478);function a(e,t){try{return new URL(e,t)}catch{return null}}function s(e,t){let r=new URL(e.substring(5));return"blob:"+t.origin.origin+r.pathname}function o(e){let t=new URL(e.substring(5));return"blob:"+location.origin+t.pathname}function l(e,t){if(e instanceof URL&&(e=e.toString()),e.startsWith("javascript:"))return"javascript:"+(0,i.o)(e.slice(11),"(javascript: url)",t);{if(e.startsWith("blob:")||e.startsWith("data:"))return location.origin+n.$W.prefix+e;if(e.startsWith("mailto:")||e.startsWith("about:"))return e;let r=t.base.href;r.startsWith("about:")&&(r=c(self.location.href));let i=a(e,r);if(!i)return e;let s=(0,n.hD)(i.hash.slice(1));return i.hash="",location.origin+n.$W.prefix+(0,n.hD)(i.href)+(s?"#"+s:"")}}function c(e){e instanceof URL&&(e=e.toString());let t=location.origin+n.$W.prefix;if(e.startsWith("javascript:"))return e;{if(e.startsWith("blob:"))return e;if(e.startsWith(t+"blob:")||e.startsWith(t+"data:"))return e.substring(t.length);if(e.startsWith("mailto:")||e.startsWith("about:"))return e;let r=a(e);if(!r)return e;let i=(0,n.P_)(r.hash.slice(1));return r.hash="",(0,n.P_)(r.href.slice(t.length)+(i?"#"+i:""))}}},1561:function(e,t,r){let n;r.d(t,{n$:()=>d,nb:()=>g,su:()=>h});var i=r(3907),a=r(37),s=r(1472),o=r(2393),l=r(2614),c=r(1478),u=r(884);async function d(){n=new Uint8Array(await fetch(a.$W.files.wasm).then(e=>e.arrayBuffer()))}self.WASM&&(n=Uint8Array.from(atob(self.WASM),e=>e.charCodeAt(0)));let h=new TextDecoder,p="\0asm".split("").map(e=>e.charCodeAt(0)),f=[];function g(e){let t;if(!(n instanceof Uint8Array))throw Error("rewriter wasm not found (was it fetched correctly?)");if(![...n.slice(0,4)].every((e,t)=>e===p[t]))throw Error("rewriter wasm does not have wasm magic (was it fetched correctly?)\nrewriter wasm contents: "+h.decode(n));(0,i.QR)({module:new WebAssembly.Module(n)});let r=f.findIndex(e=>!e.inUse),d=f.length;return -1===r?((0,a.U5)("rewriterLogs",e.base)&&console.log(`creating new rewriter, ${d} rewriters made already`),t={rewriter:new i.LW({config:a.$W,shared:{rewrite:{htmlRules:o.V,rewriteUrl:s.Oy,rewriteCss:l.s,rewriteJs:c.o,getHtmlInjectCode(e,t){let r=(0,u.Uk)(e,e=>`<script src="${e}"></script>`).join("");return t?`<head>${r}</head>`:r}}},flagEnabled:a.U5,codec:{encode:a.hD,decode:a.P_}}),inUse:!1},f.push(t)):((0,a.U5)("rewriterLogs",e.base)&&console.log(`using cached rewriter ${r} from list of ${d} rewriters`),t=f[r]),t.inUse=!0,[t.rewriter,()=>t.inUse=!1]}},2015:function(e,t,r){r.d(t,{i:()=>a});var n=r(37),i=r(1478);function a(e,t,r,a){let s="",o="module"===t,l=e=>{o?s+=`import "${n.$W.files[e]}"
`:s+=`importScripts("${n.$W.files[e]}");
`};l("wasm"),l("all"),s+=`$scramjetLoadClient().loadAndHook(${JSON.stringify(n.$W)});`;let c=(0,i.o)(e,r,a,o);return c instanceof Uint8Array&&(c=new TextDecoder().decode(c)),s+=c}},6684:function(e,t,r){r.d(t,{Sn:()=>h,YH:()=>u,Yq:()=>f,hU:()=>d,pL:()=>p,rj:()=>c});var n=r(6570);let i={none:0,"same-origin":1,"same-site":2,"cross-site":3};async function a(){return(0,n.P2)("$scramjet",1)}async function s(e){let t=await a();return await t.get("redirectTrackers",e)||null}async function o(e,t){let r=await a();await r.put("redirectTrackers",t,e)}async function l(e){let t=await a();await t.delete("redirectTrackers",e)}async function c(e,t,r){await s(e)||await o(e,{originalReferrer:t||"",mostRestrictiveSite:r,referrerPolicy:"",chainStarted:Date.now()})}async function u(e,t,r){let n=await s(e);n&&(await l(e),r&&(n.referrerPolicy=r),await o(t,n))}async function d(e,t){let r=await s(e);if(!r)return t;let n=i[r.mostRestrictiveSite];return(i[t]??0)>n?(r.mostRestrictiveSite=t,await o(e,r),t):r.mostRestrictiveSite}async function h(e){await l(e)}async function p(e,t,r){let n=await a();await n.put("referrerPolicies",{policy:t,referrer:r},e)}async function f(e){let t=await a();return await t.get("referrerPolicies",e)||null}},2416:function(e,t,r){r(6684),r(8228)},8228:function(e,t,r){r.d(t,{ps:()=>l});var n=r(6570);let i="publicSuffixList";async function a(){return(0,n.P2)("$scramjet",1)}async function s(){let e=await a();return await e.get("publicSuffixList",i)||null}async function o(e){let t=await a();await t.put("publicSuffixList",{data:e,expiry:Date.now()+36e5},i)}async function l(e,t,r){return t?e.origin.origin===t.origin?"same-origin":await c(e.origin,t,r)?"same-site":"cross-site":"none"}async function c(e,t,r){return await u(e,r)===await u(t,r)}async function u(e,t){let r=await d(t),n=e.hostname.toLowerCase().split("."),i="",a=!1;for(let e of r){let t=e.startsWith("!")?e.substring(1):e;if(function(e,t){if(e.length<t.length)return!1;let r=e.length-t.length;for(let n=0;n<t.length;n++){let i=e[r+n],a=t[n];if("*"!==a&&i!==a)return!1}return!0}(n,t.split("."))){if(e.startsWith("!")){i=t,a=!0;break}!a&&t.length>i.length&&(i=t)}}if(!i)return n.slice(-2).join(".");let s=i.split(".").length,o=a?s:s+1;return n.slice(-o).join(".")}async function d(e){let t,r=await s();if(r&&Date.now()<r.expiry)return r.data;try{t=await e.fetch("https://publicsuffix.org/list/public_suffix_list.dat")}catch(e){throw Error(`Failed to fetch public suffix list: ${e}`)}let n=(await t.text()).split("\n").map(e=>{let t=e.trim(),r=t.indexOf(" ");return r>-1?t.substring(0,r):t}).filter(e=>e&&!e.startsWith("//"));return await o(n),n}},2794:function(e,t,r){r.d(t,{pX:()=>n,zr:()=>i});let n=Symbol.for("scramjet client global"),i=Symbol.for("scramjet frame handle")},5956:function(e,t,r){function n(e,t){let r=`
                errorTrace.value = ${JSON.stringify(e)};
                fetchedURL.textContent = ${JSON.stringify(t)};
                for (const node of document.querySelectorAll("#hostname")) node.textContent = ${JSON.stringify(location.hostname)};
                reload.addEventListener("click", () => location.reload());
                version.textContent = ${JSON.stringify(globalThis.$scramjetVersion?.version||"unknown")};
                build.textContent = ${JSON.stringify(globalThis.$scramjetVersion?.build||"unknown")};

                document.getElementById('copy-button').addEventListener('click', async () => {
                    const text = document.getElementById('errorTrace').value;
                    await navigator.clipboard.writeText(text);
                    const btn = document.getElementById('copy-button');
                    btn.textContent = 'Copied!';
                    setTimeout(() => btn.textContent = 'Copy', 2000);
                });
        `;return`<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <title>Scramjet</title>
                    <style>
                    :root {
                        --deep: #080602;
                        --shallow: #181412;
                        --beach: #f1e8e1;
                        --shore: #b1a8a1;
                        --accent: #ffa938;
                        --font-sans: -apple-system, system-ui, BlinkMacSystemFont, sans-serif;
                        --font-monospace: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    }

                    *:not(div,p,span,ul,li,i,span) {
                        background-color: var(--deep);
                        color: var(--beach);
                        font-family: var(--font-sans);
                    }

                    textarea,
                    button {
                        background-color: var(--shallow);
                        border-radius: 0.6em;
                        padding: 0.6em;
                        border: none;
                        appearance: none;
                        font-family: var(--font-sans);
                        color: var(--beach);
                    }

                    button.primary {
                        background-color: var(--accent);
                        color: var(--deep);
                        font-weight: bold;
                    }

                    textarea {
                        resize: none;
                        height: 20em;
                        text-align: left;
                        font-family: var(--font-monospace);
                    }

                    body {
                        width: 100vw;
                        height: 100vh;
                        justify-content: center;
                        align-items: center;
                    }

                    body,
                    html,
                    #inner {
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        gap: 0.5em;
                        overflow: hidden;
                    }

                    #inner {
                        z-index: 100;
                    }

                    #cover {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background-color: color-mix(in srgb, var(--deep) 70%, transparent);
                        z-index: 99;
                    }

                    #info {
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        gap: 1em;
                    }

                    #version-wrapper {
                        width: auto;
                        text-align: right;
                        position: absolute;
                        top: 0.5rem;
                        right: 0.5rem;
                        font-size: 0.8rem;
                        color: var(--shore)!important;
                        i {
                            background-color: color-mix(in srgb, var(--deep), transparent 50%);
                            border-radius: 9999px;
                            padding: 0.2em 0.5em;
                        }
                        z-index: 101;
                    }

                    #errorTrace-wrapper {
                        position: relative;
                        width: fit-content;
                    }

                    #copy-button {
                        position: absolute;
                        top: 0.5em;
                        right: 0.5em;
                        padding: 0.23em;
                        cursor: pointer;
                        opacity: 0;
                        transition: opacity 0.4s;
                        font-size: 0.9em;
                    }

                    #errorTrace-wrapper:hover #copy-button {
                        opacity: 1;
                    }
                    </style>
                </head>
                <body>
                    <div id="cover"></div>
                    <div id="inner">
                        <h1 id="errorTitle">Uh oh!</h1>
                        <p>There was an error loading <b id="fetchedURL"></b></p>
                        <!-- <p id="errorMessage">Internal Server Error</p> -->

                        <div id="info">
                            <div id="errorTrace-wrapper">
                                <textarea id="errorTrace" cols="40" rows="10" readonly></textarea>
                                <button id="copy-button" class="primary">Copy</button>
                            </div>
                            <div id="troubleshooting">
                                <p>Try:</p>
                                <ul>
                                    <li>Checking your internet connection</li>
                                    <li>Verifying you entered the correct address</li>
                                    <li>Clearing the site data</li>
                                    <li>Contacting <b id="hostname"></b>'s administrator</li>
                                    <li>Verify the server isn't censored</li>
                                </ul>
                                <p>If you're the administrator of <b id="hostname"></b>, try:</p>
                                    <ul>
                                    <li>Restarting your server</li>
                                    <li>Updating Scramjet</li>
                                    <li>Troubleshooting the error on the <a href="https://github.com/MercuryWorkshop/scramjet" target="_blank">GitHub repository</a></li>
                                </ul>
                            </div>
                        </div>
                        <br>
                        <button id="reload" class="primary">Reload</button>
                    </div>
                    <p id="version-wrapper"><i>Scramjet v<span id="version"></span> (build <span id="build"></span>)</i></p>
                    <script src="${"data:application/javascript,"+encodeURIComponent(r)}"></script>
                </body>
            </html>
        `}function i(e,t){let r={"content-type":"text/html"};return crossOriginIsolated&&(r["Cross-Origin-Embedder-Policy"]="require-corp"),new Response(n(String(e),t),{status:500,headers:r})}r.d(t,{B:()=>n,v:()=>i})},1403:function(e,t,r){r.d(t,{H:()=>n});class n{handle;origin;syncToken=0;promises={};messageChannel=new MessageChannel;connected=!1;constructor(e,t){this.handle=e,this.origin=t,this.messageChannel.port1.addEventListener("message",e=>{"scramjet$type"in e.data&&("init"===e.data.scramjet$type?this.connected=!0:this.handleMessage(e.data))}),this.messageChannel.port1.start(),this.handle.postMessage({scramjet$type:"init",scramjet$port:this.messageChannel.port2},[this.messageChannel.port2])}handleMessage(e){let t=this.promises[e.scramjet$token];t&&(t(e),delete this.promises[e.scramjet$token])}async fetch(e){let t=this.syncToken++,r={scramjet$type:"fetch",scramjet$token:t,scramjet$request:{url:e.url,body:e.body,headers:Array.from(e.headers.entries()),method:e.method,mode:e.mode,destinitation:e.destination}},n=e.body?[e.body]:[];this.handle.postMessage(r,n);let{scramjet$response:i}=await new Promise(e=>{this.promises[t]=e});return!!i&&new Response(i.body,{headers:i.headers,status:i.status,statusText:i.statusText})}}},5790:function(e,t,r){r.d(t,{Pf:()=>m,V3:()=>S,dT:()=>w});var n=r(5956),i=r(8228),a=r(6684),s=r(1472),o=r(1478),l=r(1427),c=r(37),u=r(4435),d=r(884),h=r(2614),p=r(2015),f=r(8665).A;function g(e){return e.status>=300&&e.status<400}async function m(e,t){try{let r,n,o=new URL(e.url);if(o.pathname===this.config.files.wasm)return fetch(this.config.files.wasm).then(async e=>{let t=await e.arrayBuffer(),r=btoa(new Uint8Array(t).reduce((e,t)=>(e.push(String.fromCharCode(t)),e),[]).join("")),n="";return n+=`if ('document' in self && document.currentScript) { document.currentScript.remove(); }
self.WASM = '${r}';`,new Response(n,{headers:{"content-type":"text/javascript"}})});let u="",d={};for(let[e,t]of[...o.searchParams.entries()]){switch(e){case"type":u=t;break;case"dest":break;case"topFrame":r=t;break;case"parentFrame":n=t;break;default:f.warn(`${o.href} extraneous query parameter ${e}. Assuming <form> element`),d[e]=t}o.searchParams.delete(e)}let h=new URL((0,s.v2)(o));for(let[e,t]of Object.entries(d))h.searchParams.set(e,t);let p={origin:h,base:h,topFrameName:r,parentFrameName:n};if(o.pathname.startsWith(`${this.config.prefix}blob:`)||o.pathname.startsWith(`${this.config.prefix}data:`)){let t,r=o.pathname.substring(this.config.prefix.length);r.startsWith("blob:")&&(r=(0,s.$n)(r));let n=await fetch(r,{});n.finalURL=r.startsWith("blob:")?r:"(data url)",n.body&&(t=await b(n,p,e.destination,u,this.cookieStore));let i=Object.fromEntries(n.headers.entries());return crossOriginIsolated&&(i["Cross-Origin-Opener-Policy"]="same-origin",i["Cross-Origin-Embedder-Policy"]="require-corp"),new Response(t,{status:n.status,statusText:n.statusText,headers:i})}let g=this.serviceWorkers.find(e=>e.origin===h.origin);if(g?.connected&&"swruntime"!==o.searchParams.get("from")){let t=await g.fetch(e);if(t)return t}if(h.origin===new URL(e.url).origin)throw Error("attempted to fetch from same origin - this means the site has obtained a reference to the real origin, aborting");let m=new l.u;for(let[t,r]of e.headers.entries())m.set(t,r);if(t&&new URL(t.url).pathname.startsWith(c.$W.prefix)){let e=new URL((0,s.v2)(t.url));e.toString().includes("youtube.com")||(m.set("Referer",e.href),m.set("Origin",e.origin))}let w=this.cookieStore.getCookies(h,!1);w.length&&m.set("Cookie",w);let v=!1;if("iframe"===e.destination&&"navigate"===e.mode&&e.referrer&&"no-referrer"!==e.referrer&&e.referrer!==location.origin+c.$W.prefix+"no-referrer"){let t=e.referrer,r=await self.clients.matchAll({type:"window"});for(;t;){if(!t.includes(c.$W.prefix)){v=!0;break}let e=r.find(e=>e.url===t),n=await (0,a.Yq)(t);if(!n||!n.referrer){e&&t.startsWith(location.origin)&&(v=!0);break}if(e&&"nested"===e.frameType)t=n.referrer;else break}}v?(m.set("Sec-Fetch-Dest","document"),m.set("Sec-Fetch-Mode","navigate")):(m.set("Sec-Fetch-Dest",e.destination||"empty"),m.set("Sec-Fetch-Mode",e.mode));let x="none";if(e.referrer&&""!==e.referrer&&"no-referrer"!==e.referrer&&e.referrer!==location.origin+c.$W.prefix+"no-referrer"&&e.referrer.includes(c.$W.prefix)){let t=(0,s.v2)(e.referrer);if(t){let e=new URL(t);x=await (0,i.ps)(p,e,this.client)}}await (0,a.rj)(h.toString(),e.referrer?(0,s.v2)(e.referrer):null,x),m.set("Sec-Fetch-Site",await (0,a.hU)(h.toString(),x));let E=new S(h,m.headers,e.body,e.method,e.destination,t);this.dispatchEvent(E);let T=await E.response||await this.client.fetch(E.url,{method:E.method,body:E.body,headers:E.requestHeaders,credentials:"omit",mode:"cors"===e.mode?e.mode:"same-origin",cache:e.cache,redirect:"manual",duplex:"half"});return T.finalURL=E.url.href,await y(h,p,u,e.destination,e.mode,T,this.cookieStore,t,this.client,this,e.referrer)}catch(i){let t={message:i.message,url:e.url,destination:e.destination};if(i.cause&&(t.cause=i.cause,i.cause instanceof AggregateError&&(t.causeErrors=i.cause.errors)),i.stack&&(t.stack=i.stack),console.error("ERROR FROM SERVICE WORKER FETCH: ",t),console.error(i),!["document","iframe"].includes(e.destination))return new Response(void 0,{status:500});let r=Object.entries(t).map(([e,t])=>`${e.charAt(0).toUpperCase()+e.slice(1)}: ${t}`).join("\n\n");return(0,n.v)(r,(0,s.v2)(e.url))}}async function y(e,t,r,n,o,l,d,h,p,f,m){let y,S="navigate"===o&&["document","iframe"].includes(n),v=await (0,u.l)(l.rawHeaders,t,p,{get:a.Yq,set:a.pL});if(S&&v["referrer-policy"]&&m&&await (0,a.pL)(e.href,v["referrer-policy"],m),g(l)){let t=new URL((0,s.v2)(v.location));await (0,a.YH)(e.toString(),t.toString(),v["referrer-policy"]);let n=await (0,i.ps)({origin:t,base:t},e,p);if(await (0,a.hU)(t.toString(),n),r){let e=new URL(v.location);e.searchParams.set("type",r),v.location=e.href}}let x=v["set-cookie"]||[];for(let t in x)if(h){let r=f.dispatch(h,{scramjet$type:"cookie",cookie:t,url:e.href});"document"!==n&&"iframe"!==n&&await r}for(let t in await d.setCookies(x instanceof Array?x:[x],e),v)Array.isArray(v[t])&&(v[t]=v[t][0]);if(function(e,t){if(["document","iframe"].includes(t)){let t=e["content-disposition"];if(t){if("inline"!==t)return!0}else{let t=e["content-type"]?.split(";")[0].trim().toLowerCase();if(t&&!["text/html","text/plain","text/css","text/javascript","text/xml","application/javascript","application/json","application/xml","application/pdf"].includes(t)&&!t.startsWith("text")&&!t.startsWith("image")&&!t.startsWith("font")&&!t.startsWith("video"))return!0}}return!1}(v,n)&&!g(l))if((0,c.U5)("interceptDownloads",e)){if(!h)throw Error("cant find client");let t=null,r=v["content-disposition"];if("string"==typeof r){let e=r.match(/filename=["']?([^"';\n]*)["']?/i);e&&e[1]&&(t=e[1])}let n=v["content-length"],i=await clients.matchAll({});if((i=i.filter(e=>!e.url.includes(c.$W.prefix))).length<1)throw Error("couldn't find a controller client to dispatch download to");let a={filename:t,url:e.href,type:v["content-type"],body:l.body,length:Number(n)};i[0].postMessage({scramjet$type:"download",download:a},[l.body]),await new Promise(()=>{})}else{let e=v["content-disposition"];if(!/\s*?((inline|attachment);\s*?)filename=/i.test(e)){let t=/^\s*?attachment/i.test(e)?"attachment":"inline",[r]=new URL(l.finalURL).pathname.split("/").slice(-1);v["content-disposition"]=`${t}; filename=${JSON.stringify(r)}`}}l.body&&!g(l)&&(y=await b(l,t,n,r,d)),"text/event-stream"===v.accept&&(v["content-type"]="text/event-stream"),delete v["permissions-policy"],crossOriginIsolated&&["document","iframe","worker","sharedworker","style","script"].includes(n)&&(v["Cross-Origin-Embedder-Policy"]="require-corp",v["Cross-Origin-Opener-Policy"]="same-origin");let E=new w(y,v,l.status,l.statusText,n,e,l,h);return f.dispatchEvent(E),g(l)||await (0,a.Sn)(e.toString()),new Response(E.responseBody,{headers:E.responseHeaders,status:E.status,statusText:E.statusText})}async function b(e,t,r,n,i){switch(r){case"iframe":case"document":if(e.headers.get("content-type")?.startsWith("text/html"))return(0,d.Qs)(await e.text(),i,t,!0);return e.body;case"script":return(0,o.o)(new Uint8Array(await e.arrayBuffer()),e.finalURL,t,"module"===n);case"style":return(0,h.s)(await e.text(),t);case"sharedworker":case"worker":return(0,p.i)(new Uint8Array(await e.arrayBuffer()),n,e.finalURL,t);default:return e.body}}class w extends Event{responseBody;responseHeaders;status;statusText;destination;url;rawResponse;client;constructor(e,t,r,n,i,a,s,o){super("handleResponse"),this.responseBody=e,this.responseHeaders=t,this.status=r,this.statusText=n,this.destination=i,this.url=a,this.rawResponse=s,this.client=o}}class S extends Event{url;requestHeaders;body;method;destination;client;constructor(e,t,r,n,i,a){super("request"),this.url=e,this.requestHeaders=t,this.body=r,this.method=n,this.destination=i,this.client=a}response}},7510:function(e,t,r){r.r(t),r.d(t,{FakeServiceWorker:()=>n.H,ScramjetHandleResponseEvent:()=>i.dT,ScramjetRequestEvent:()=>i.V3,ScramjetServiceWorker:()=>d,errorTemplate:()=>u.B,handleFetch:()=>i.Pf,renderError:()=>u.v});var n=r(1403),i=r(5790),a=r(4110),s=r(1561),o=r(3831),l=r(6570),c=r(37),u=r(5956);class d extends EventTarget{client;config;syncPool={};synctoken=0;cookieStore=new o.k;serviceWorkers=[];constructor(){super(),this.client=new a.Ay,(async()=>{let e=await (0,l.P2)("$scramjet",1),t=await e.get("cookies","cookies");t&&this.cookieStore.load(t)})(),addEventListener("message",async({data:e})=>{if("scramjet$type"in e){if("scramjet$token"in e){let t=this.syncPool[e.scramjet$token];delete this.syncPool[e.scramjet$token],t(e);return}if("registerServiceWorker"===e.scramjet$type)return void this.serviceWorkers.push(new n.H(e.port,e.origin));if("cookie"===e.scramjet$type){this.cookieStore.setCookies([e.cookie],new URL(e.url));let t=await (0,l.P2)("$scramjet",1);await t.put("cookies",JSON.parse(this.cookieStore.dump()),"cookies")}"loadConfig"===e.scramjet$type&&(this.config=e.config)}})}async dispatch(e,t){let r,n=this.synctoken++,i=new Promise(e=>r=e);return this.syncPool[n]=r,t.scramjet$token=n,e.postMessage(t),await i}async loadConfig(){if(this.config)return;let e=await (0,l.P2)("$scramjet",1);this.config=await e.get("config","config"),this.config&&((0,c.Nk)(this.config),await (0,s.n$)())}route({request:e}){return!!e.url.startsWith(location.origin+this.config.prefix)||!!e.url.startsWith(location.origin+this.config.files.wasm)}async fetch({request:e,clientId:t}){this.config||await this.loadConfig();let r=await self.clients.get(t);return i.Pf.call(this,e,r)}}},4110:function(e,t,r){r.d(t,{Ay:()=>S,DD:()=>w});let n=globalThis.fetch,i=globalThis.SharedWorker,a=globalThis.localStorage,s=globalThis.navigator.serviceWorker,o=MessagePort.prototype.postMessage,l={prototype:{send:WebSocket.prototype.send},CLOSED:WebSocket.CLOSED,CLOSING:WebSocket.CLOSING,CONNECTING:WebSocket.CONNECTING,OPEN:WebSocket.OPEN};async function c(){let e=Promise.race([Promise.any((await self.clients.matchAll({type:"window",includeUncontrolled:!0})).map(async e=>{let t,r=await (t=new MessageChannel,new Promise(r=>{e.postMessage({type:"getPort",port:t.port2},[t.port2]),t.port1.onmessage=e=>{r(e.data)}}));return await u(r),r})),new Promise((e,t)=>setTimeout(t,1e3,TypeError("timeout")))]);try{return await e}catch(e){if(e instanceof AggregateError)throw console.error("bare-mux: failed to get a bare-mux SharedWorker MessagePort as all clients returned an invalid MessagePort."),Error("All clients returned an invalid MessagePort.",{cause:e});return console.warn("bare-mux: failed to get a bare-mux SharedWorker MessagePort within 1s, retrying"),await c()}}function u(e){let t=new MessageChannel,r=new Promise((e,r)=>{t.port1.onmessage=t=>{"pong"===t.data.type&&e()},setTimeout(r,1500)});return o.call(e,{message:{type:"ping"},port:t.port2},[t.port2]),r}function d(e,t){let r=new i(e,"bare-mux-worker");return t&&s.addEventListener("message",t=>{if("getPort"===t.data.type&&t.data.port){console.debug("bare-mux: recieved request for port from sw");let r=new i(e,"bare-mux-worker");o.call(t.data.port,r.port,[r.port])}}),r.port}let h=null;class p{channel;port;workerPath;constructor(e){this.channel=new BroadcastChannel("bare-mux"),e instanceof MessagePort||e instanceof Promise?this.port=e:this.createChannel(e,!0)}createChannel(e,t){if(self.clients)this.port=c(),this.channel.onmessage=e=>{"refreshPort"===e.data.type&&(this.port=c())};else if(e&&SharedWorker){if(!e.startsWith("/")&&!e.includes(":"))throw Error("Invalid URL. Must be absolute or start at the root.");this.port=d(e,t),console.debug("bare-mux: setting localStorage bare-mux-path to",e),a["bare-mux-path"]=e}else{if(!SharedWorker)throw Error("Unable to get a channel to the SharedWorker.");{let e=a["bare-mux-path"];if(console.debug("bare-mux: got localStorage bare-mux-path:",e),!e)throw Error("Unable to get bare-mux workerPath from localStorage.");this.port=d(e,t)}}}async sendMessage(e,t){this.port instanceof Promise&&(this.port=await this.port);try{await u(this.port)}catch{return console.warn("bare-mux: Failed to get a ping response from the worker within 1.5s. Assuming port is dead."),this.createChannel(),await this.sendMessage(e,t)}let r=new MessageChannel,n=[r.port2,...t||[]],i=new Promise((e,t)=>{r.port1.onmessage=r=>{let n=r.data;"error"===n.type?t(n.error):e(n)}});return o.call(this.port,{message:e,port:r.port2},n),await i}}class f extends EventTarget{protocols;url;readyState=l.CONNECTING;channel;constructor(e,t=[],r,n){super(),this.protocols=t,this.url=e.toString(),this.protocols=t;const i=e=>{this.protocols=e,this.readyState=l.OPEN;let t=new Event("open");this.dispatchEvent(t)},a=async e=>{let t=new MessageEvent("message",{data:e});this.dispatchEvent(t)},s=(e,t)=>{this.readyState=l.CLOSED;let r=new CloseEvent("close",{code:e,reason:t});this.dispatchEvent(r)},o=()=>{this.readyState=l.CLOSED;let e=new Event("error");this.dispatchEvent(e)};this.channel=new MessageChannel,this.channel.port1.onmessage=e=>{"open"===e.data.type?i(e.data.args[0]):"message"===e.data.type?a(e.data.args[0]):"close"===e.data.type?s(e.data.args[0],e.data.args[1]):"error"===e.data.type&&o()},r.sendMessage({type:"websocket",websocket:{url:e.toString(),protocols:t,requestHeaders:n,channel:this.channel.port2}},[this.channel.port2])}send(...e){if(this.readyState===l.CONNECTING)throw new DOMException("Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.");let t=e[0];t.buffer&&(t=t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)),o.call(this.channel.port1,{type:"data",data:t},t instanceof ArrayBuffer?[t]:[])}close(e,t){o.call(this.channel.port1,{type:"close",closeCode:e,closeReason:t})}}function g(e,t,r){console.error(`error while processing '${r}': `,t),e.postMessage({type:"error",error:t})}let m=["ws:","wss:"],y=[101,204,205,304],b=[301,302,303,307,308];class w{worker;constructor(e){this.worker=new p(e)}async getTransport(){return(await this.worker.sendMessage({type:"get"})).name}async setTransport(e,t,r){await this.setManualTransport(`
			const { default: BareTransport } = await import("${e}");
			return [BareTransport, "${e}"];
		`,t,r)}async setManualTransport(e,t,r){if("bare-mux-remote"===e)throw Error("Use setRemoteTransport.");await this.worker.sendMessage({type:"set",client:{function:e,args:t}},r)}async setRemoteTransport(e,t){let r=new MessageChannel;r.port1.onmessage=async t=>{let r=t.data.port,n=t.data.message;if("fetch"===n.type)try{e.ready||await e.init(),await async function(e,t,r){let n=await r.request(new URL(e.fetch.remote),e.fetch.method,e.fetch.body,e.fetch.headers,null);if(!function(){if(null===h){let e,t=new MessageChannel,r=new ReadableStream;try{o.call(t.port1,r,[r]),e=!0}catch(t){e=!1}return h=e,e}return h}()&&n.body instanceof ReadableStream){let e=new Response(n.body);n.body=await e.arrayBuffer()}n.body instanceof ReadableStream||n.body instanceof ArrayBuffer?o.call(t,{type:"fetch",fetch:n},[n.body]):o.call(t,{type:"fetch",fetch:n})}(n,r,e)}catch(e){g(r,e,"fetch")}else if("websocket"===n.type)try{e.ready||await e.init(),await async function(e,t,r){let[n,i]=r.connect(new URL(e.websocket.url),e.websocket.protocols,e.websocket.requestHeaders,t=>{o.call(e.websocket.channel,{type:"open",args:[t]})},t=>{t instanceof ArrayBuffer?o.call(e.websocket.channel,{type:"message",args:[t]},[t]):o.call(e.websocket.channel,{type:"message",args:[t]})},(t,r)=>{o.call(e.websocket.channel,{type:"close",args:[t,r]})},t=>{o.call(e.websocket.channel,{type:"error",args:[t]})});e.websocket.channel.onmessage=e=>{"data"===e.data.type?n(e.data.data):"close"===e.data.type&&i(e.data.closeCode,e.data.closeReason)},o.call(t,{type:"websocket"})}(n,r,e)}catch(e){g(r,e,"websocket")}},await this.worker.sendMessage({type:"set",client:{function:"bare-mux-remote",args:[r.port2,t]}},[r.port2])}getInnerPort(){return this.worker.port}}class S{worker;constructor(e){this.worker=new p(e)}createWebSocket(e,t=[],r,n){try{e=new URL(e)}catch(t){throw new DOMException(`Faiiled to construct 'WebSocket': The URL '${e}' is invalid.`)}if(!m.includes(e.protocol))throw new DOMException(`Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${e.protocol}' is not allowed.`);for(let e of(Array.isArray(t)||(t=[t]),t=t.map(String)))if(!function(e){for(let t=0;t<e.length;t++){let r=e[t];if(!"!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~".includes(r))return!1}return!0}(e))throw new DOMException(`Failed to construct 'WebSocket': The subprotocol '${e}' is invalid.`);return n=n||{},new f(e,t,this.worker,n)}async fetch(e,t){let r=new Request(e,t),i=t?.headers||r.headers,a=i instanceof Headers?Object.fromEntries(i):i,s=r.body,o=new URL(r.url);if(o.protocol.startsWith("blob:")){let e=await n(o),t=new Response(e.body,e);return t.rawHeaders=Object.fromEntries(e.headers),t.rawResponse={body:e.body,headers:Object.fromEntries(e.headers),status:e.status,statusText:e.statusText},t.finalURL=o.toString(),t}for(let e=0;;e++){let n=(await this.worker.sendMessage({type:"fetch",fetch:{remote:o.toString(),method:r.method,headers:a,body:s||void 0}},s?[s]:[])).fetch,i=new Response(y.includes(n.status)?void 0:n.body,{headers:new Headers(n.headers),status:n.status,statusText:n.statusText});i.rawHeaders=n.headers,i.rawResponse=n,i.finalURL=o.toString();let l=t?.redirect||r.redirect;if(!b.includes(i.status))return i;switch(l){case"follow":{let t=i.headers.get("location");if(20>e&&null!==t){o=new URL(t,o);continue}throw TypeError("Failed to fetch")}case"error":throw TypeError("Failed to fetch");case"manual":return i}}}}console.debug("bare-mux: running v2.1.9 (build dc9dc6e)")},8832:function(e,t,r){r.d(t,{H:()=>n,L:()=>i});let n=new Map(["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","textPath"].map(e=>[e.toLowerCase(),e])),i=new Map(["definitionURL","attributeName","attributeType","baseFrequency","baseProfile","calcMode","clipPathUnits","diffuseConstant","edgeMode","filterUnits","glyphRef","gradientTransform","gradientUnits","kernelMatrix","kernelUnitLength","keyPoints","keySplines","keyTimes","lengthAdjust","limitingConeAngle","markerHeight","markerUnits","markerWidth","maskContentUnits","maskUnits","numOctaves","pathLength","patternContentUnits","patternTransform","patternUnits","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","refX","refY","repeatCount","repeatDur","requiredExtensions","requiredFeatures","specularConstant","specularExponent","spreadMethod","startOffset","stdDeviation","stitchTiles","surfaceScale","systemLanguage","tableValues","targetX","targetY","textLength","viewBox","viewTarget","xChannelSelector","yChannelSelector","zoomAndPan"].map(e=>[e.toLowerCase(),e]))},6498:function(e,t,r){r.d(t,{A:()=>c});var n=r(2743),i=r(8466),a=r(8832);let s=new Set(["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"]);function o(e){return e.replace(/"/g,"&quot;")}let l=new Set(["area","base","basefont","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr"]),c=function e(t,r={}){let c="length"in t?t:[t],h="";for(let t=0;t<c.length;t++)h+=function(t,r){var c,h,p;switch(t.type){case n.bL:return e(t.children,r);case n.fl:case n.WL:return c=t,`<${c.data}>`;case n.Mw:return h=t,`<!--${h.data}-->`;case n.KB:return p=t,`<![CDATA[${p.children[0].data}]]>`;case n.eF:case n.OF:case n.vw:return function(t,r){var n;"foreign"===r.xmlMode&&(t.name=null!=(n=a.H.get(t.name))?n:t.name,t.parent&&u.has(t.parent.name)&&(r={...r,xmlMode:!1})),!r.xmlMode&&d.has(t.name)&&(r={...r,xmlMode:"foreign"});let s=`<${t.name}`,c=function(e,t){var r;if(!e)return;let n=(null!=(r=t.encodeEntities)?r:t.decodeEntities)===!1?o:t.xmlMode||"utf8"!==t.encodeEntities?i.WY:i.Gj;return Object.keys(e).map(r=>{var i,s;let o=null!=(i=e[r])?i:"";return("foreign"===t.xmlMode&&(r=null!=(s=a.L.get(r))?s:r),t.emptyAttrs||t.xmlMode||""!==o)?`${r}="${n(o)}"`:r}).join(" ")}(t.attribs,r);return c&&(s+=` ${c}`),0===t.children.length&&(r.xmlMode?!1!==r.selfClosingTags:r.selfClosingTags&&l.has(t.name))?(r.xmlMode||(s+=" "),s+="/>"):(s+=">",t.children.length>0&&(s+=e(t.children,r)),(r.xmlMode||!l.has(t.name))&&(s+=`</${t.name}>`)),s}(t,r);case n.EY:return function(e,t){var r;let n=e.data||"";return(null!=(r=t.encodeEntities)?r:t.decodeEntities)===!1||!t.xmlMode&&e.parent&&s.has(e.parent.name)||(n=t.xmlMode||"utf8"!==t.encodeEntities?(0,i.WY)(n):(0,i.X1)(n)),n}(t,r)}}(c[t],r);return h},u=new Set(["mi","mo","mn","ms","mtext","annotation-xml","foreignObject","desc","title"]),d=new Set(["svg","math"])},2743:function(e,t,r){var n,i;function a(e){return e.type===n.Tag||e.type===n.Script||e.type===n.Style}r.d(t,{EY:()=>o,KB:()=>p,Mw:()=>c,OF:()=>d,RJ:()=>n,WL:()=>l,bL:()=>s,dz:()=>a,eF:()=>u,fl:()=>f,vw:()=>h}),(i=n||(n={})).Root="root",i.Text="text",i.Directive="directive",i.Comment="comment",i.Script="script",i.Style="style",i.Tag="tag",i.CDATA="cdata",i.Doctype="doctype";let s=n.Root,o=n.Text,l=n.Directive,c=n.Comment,u=n.Script,d=n.Style,h=n.Tag,p=n.CDATA,f=n.Doctype},8866:function(e,t,r){r.d(t,{DV:()=>s,Hg:()=>i.Hg,Mw:()=>i.Mw});var n=r(2743),i=r(6072);let a={withStartIndices:!1,withEndIndices:!1,xmlMode:!1};class s{constructor(e,t,r){this.dom=[],this.root=new i.yo(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null,"function"==typeof t&&(r=t,t=a),"object"==typeof e&&(t=e,e=void 0),this.callback=null!=e?e:null,this.options=null!=t?t:a,this.elementCB=null!=r?r:null}onparserinit(e){this.parser=e}onreset(){this.dom=[],this.root=new i.yo(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null}onend(){this.done||(this.done=!0,this.parser=null,this.handleCallback(null))}onerror(e){this.handleCallback(e)}onclosetag(){this.lastNode=null;let e=this.tagStack.pop();this.options.withEndIndices&&(e.endIndex=this.parser.endIndex),this.elementCB&&this.elementCB(e)}onopentag(e,t){let r=this.options.xmlMode?n.RJ.Tag:void 0,a=new i.Hg(e,t,void 0,r);this.addNode(a),this.tagStack.push(a)}ontext(e){let{lastNode:t}=this;if(t&&t.type===n.RJ.Text)t.data+=e,this.options.withEndIndices&&(t.endIndex=this.parser.endIndex);else{let t=new i.EY(e);this.addNode(t),this.lastNode=t}}oncomment(e){if(this.lastNode&&this.lastNode.type===n.RJ.Comment){this.lastNode.data+=e;return}let t=new i.Mw(e);this.addNode(t),this.lastNode=t}oncommentend(){this.lastNode=null}oncdatastart(){let e=new i.EY(""),t=new i.KB([e]);this.addNode(t),e.parent=t,this.lastNode=e}oncdataend(){this.lastNode=null}onprocessinginstruction(e,t){let r=new i.Cd(e,t);this.addNode(r)}handleCallback(e){if("function"==typeof this.callback)this.callback(e,this.dom);else if(e)throw e}addNode(e){let t=this.tagStack[this.tagStack.length-1],r=t.children[t.children.length-1];this.options.withStartIndices&&(e.startIndex=this.parser.startIndex),this.options.withEndIndices&&(e.endIndex=this.parser.endIndex),t.children.push(e),r&&(e.prev=r,r.next=e),e.parent=t,this.lastNode=null}}},6072:function(e,t,r){r.d(t,{Cd:()=>l,EY:()=>s,Hg:()=>h,KB:()=>u,Mw:()=>o,yo:()=>d});var n=r(2743);class i{constructor(){this.parent=null,this.prev=null,this.next=null,this.startIndex=null,this.endIndex=null}get parentNode(){return this.parent}set parentNode(e){this.parent=e}get previousSibling(){return this.prev}set previousSibling(e){this.prev=e}get nextSibling(){return this.next}set nextSibling(e){this.next=e}cloneNode(e=!1){return p(this,e)}}class a extends i{constructor(e){super(),this.data=e}get nodeValue(){return this.data}set nodeValue(e){this.data=e}}class s extends a{constructor(){super(...arguments),this.type=n.RJ.Text}get nodeType(){return 3}}class o extends a{constructor(){super(...arguments),this.type=n.RJ.Comment}get nodeType(){return 8}}class l extends a{constructor(e,t){super(t),this.name=e,this.type=n.RJ.Directive}get nodeType(){return 1}}class c extends i{constructor(e){super(),this.children=e}get firstChild(){var e;return null!=(e=this.children[0])?e:null}get lastChild(){return this.children.length>0?this.children[this.children.length-1]:null}get childNodes(){return this.children}set childNodes(e){this.children=e}}class u extends c{constructor(){super(...arguments),this.type=n.RJ.CDATA}get nodeType(){return 4}}class d extends c{constructor(){super(...arguments),this.type=n.RJ.Root}get nodeType(){return 9}}class h extends c{constructor(e,t,r=[],i="script"===e?n.RJ.Script:"style"===e?n.RJ.Style:n.RJ.Tag){super(r),this.name=e,this.attribs=t,this.type=i}get nodeType(){return 1}get tagName(){return this.name}set tagName(e){this.name=e}get attributes(){return Object.keys(this.attribs).map(e=>{var t,r;return{name:e,value:this.attribs[e],namespace:null==(t=this["x-attribsNamespace"])?void 0:t[e],prefix:null==(r=this["x-attribsPrefix"])?void 0:r[e]}})}}function p(e,t=!1){let r;if(e.type===n.RJ.Text)r=new s(e.data);else if(e.type===n.RJ.Comment)r=new o(e.data);else if((0,n.dz)(e)){let n=t?f(e.children):[],i=new h(e.name,{...e.attribs},n);n.forEach(e=>e.parent=i),null!=e.namespace&&(i.namespace=e.namespace),e["x-attribsNamespace"]&&(i["x-attribsNamespace"]={...e["x-attribsNamespace"]}),e["x-attribsPrefix"]&&(i["x-attribsPrefix"]={...e["x-attribsPrefix"]}),r=i}else if(e.type===n.RJ.CDATA){let n=t?f(e.children):[],i=new u(n);n.forEach(e=>e.parent=i),r=i}else if(e.type===n.RJ.Root){let n=t?f(e.children):[],i=new d(n);n.forEach(e=>e.parent=i),e["x-mode"]&&(i["x-mode"]=e["x-mode"]),r=i}else if(e.type===n.RJ.Directive){let t=new l(e.name,e.data);null!=e["x-name"]&&(t["x-name"]=e["x-name"],t["x-publicId"]=e["x-publicId"],t["x-systemId"]=e["x-systemId"]),r=t}else throw Error(`Not implemented yet: ${e.type}`);return r.startIndex=e.startIndex,r.endIndex=e.endIndex,null!=e.sourceCodeLocation&&(r.sourceCodeLocation=e.sourceCodeLocation),r}function f(e){let t=e.map(e=>p(e,!0));for(let e=1;e<t.length;e++)t[e].prev=t[e-1],t[e-1].next=t[e];return t}},3256:function(e,t,r){r(5016),r(1050)},6812:function(e,t,r){var n,i;r(8866),(i=n||(n={}))[i.DISCONNECTED=1]="DISCONNECTED",i[i.PRECEDING=2]="PRECEDING",i[i.FOLLOWING=4]="FOLLOWING",i[i.CONTAINS=8]="CONTAINS",i[i.CONTAINED_BY=16]="CONTAINED_BY"},4993:function(e,t,r){r(5016),r(4647),r(9861),r(1050),r(6812),r(3256),r(8866)},1050:function(e,t,r){r(8866),r(9861)},9861:function(e,t,r){r(8866)},5016:function(e,t,r){r(8866),r(6498),r(2743)},4647:function(e,t,r){r(8866)},2146:function(e,t,r){var n;r.d(t,{MK:()=>a,y6:()=>s});let i=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),a=null!=(n=String.fromCodePoint)?n:function(e){let t="";return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|1023&e),t+=String.fromCharCode(e)};function s(e){var t;return e>=55296&&e<=57343||e>1114111?65533:null!=(t=i.get(e))?t:e}},2990:function(e,t,r){r.d(t,{FJ:()=>u,MK:()=>p.MK,Wf:()=>g,qN:()=>d.q,sr:()=>h.s});var n,i,a,s,o,l,c,u,d=r(7259),h=r(5949),p=r(2146);function f(e){return e>=o.ZERO&&e<=o.NINE}(n=o||(o={}))[n.NUM=35]="NUM",n[n.SEMI=59]="SEMI",n[n.EQUALS=61]="EQUALS",n[n.ZERO=48]="ZERO",n[n.NINE=57]="NINE",n[n.LOWER_A=97]="LOWER_A",n[n.LOWER_F=102]="LOWER_F",n[n.LOWER_X=120]="LOWER_X",n[n.LOWER_Z=122]="LOWER_Z",n[n.UPPER_A=65]="UPPER_A",n[n.UPPER_F=70]="UPPER_F",n[n.UPPER_Z=90]="UPPER_Z",(i=l||(l={}))[i.VALUE_LENGTH=49152]="VALUE_LENGTH",i[i.BRANCH_LENGTH=16256]="BRANCH_LENGTH",i[i.JUMP_TABLE=127]="JUMP_TABLE",(a=c||(c={}))[a.EntityStart=0]="EntityStart",a[a.NumericStart=1]="NumericStart",a[a.NumericDecimal=2]="NumericDecimal",a[a.NumericHex=3]="NumericHex",a[a.NamedEntity=4]="NamedEntity",(s=u||(u={}))[s.Legacy=0]="Legacy",s[s.Strict=1]="Strict",s[s.Attribute=2]="Attribute";class g{constructor(e,t,r){this.decodeTree=e,this.emitCodePoint=t,this.errors=r,this.state=c.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=u.Strict}startEntity(e){this.decodeMode=e,this.state=c.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,t){switch(this.state){case c.EntityStart:if(e.charCodeAt(t)===o.NUM)return this.state=c.NumericStart,this.consumed+=1,this.stateNumericStart(e,t+1);return this.state=c.NamedEntity,this.stateNamedEntity(e,t);case c.NumericStart:return this.stateNumericStart(e,t);case c.NumericDecimal:return this.stateNumericDecimal(e,t);case c.NumericHex:return this.stateNumericHex(e,t);case c.NamedEntity:return this.stateNamedEntity(e,t)}}stateNumericStart(e,t){return t>=e.length?-1:(32|e.charCodeAt(t))===o.LOWER_X?(this.state=c.NumericHex,this.consumed+=1,this.stateNumericHex(e,t+1)):(this.state=c.NumericDecimal,this.stateNumericDecimal(e,t))}addToNumericResult(e,t,r,n){if(t!==r){let i=r-t;this.result=this.result*Math.pow(n,i)+Number.parseInt(e.substr(t,i),n),this.consumed+=i}}stateNumericHex(e,t){let r=t;for(;t<e.length;){var n;let i=e.charCodeAt(t);if(!f(i)&&(!((n=i)>=o.UPPER_A)||!(n<=o.UPPER_F))&&(!(n>=o.LOWER_A)||!(n<=o.LOWER_F)))return this.addToNumericResult(e,r,t,16),this.emitNumericEntity(i,3);t+=1}return this.addToNumericResult(e,r,t,16),-1}stateNumericDecimal(e,t){let r=t;for(;t<e.length;){let n=e.charCodeAt(t);if(!f(n))return this.addToNumericResult(e,r,t,10),this.emitNumericEntity(n,2);t+=1}return this.addToNumericResult(e,r,t,10),-1}emitNumericEntity(e,t){var r;if(this.consumed<=t)return null==(r=this.errors)||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===o.SEMI)this.consumed+=1;else if(this.decodeMode===u.Strict)return 0;return this.emitCodePoint((0,p.y6)(this.result),this.consumed),this.errors&&(e!==o.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,t){let{decodeTree:r}=this,n=r[this.treeIndex],i=(n&l.VALUE_LENGTH)>>14;for(;t<e.length;t++,this.excess++){let a=e.charCodeAt(t);if(this.treeIndex=function(e,t,r,n){let i=(t&l.BRANCH_LENGTH)>>7,a=t&l.JUMP_TABLE;if(0===i)return 0!==a&&n===a?r:-1;if(a){let t=n-a;return t<0||t>=i?-1:e[r+t]-1}let s=r,o=s+i-1;for(;s<=o;){let t=s+o>>>1,r=e[t];if(r<n)s=t+1;else{if(!(r>n))return e[t+i];o=t-1}}return -1}(r,n,this.treeIndex+Math.max(1,i),a),this.treeIndex<0)return 0===this.result||this.decodeMode===u.Attribute&&(0===i||function(e){var t;return e===o.EQUALS||(t=e)>=o.UPPER_A&&t<=o.UPPER_Z||t>=o.LOWER_A&&t<=o.LOWER_Z||f(t)}(a))?0:this.emitNotTerminatedNamedEntity();if(0!=(i=((n=r[this.treeIndex])&l.VALUE_LENGTH)>>14)){if(a===o.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==u.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return -1}emitNotTerminatedNamedEntity(){var e;let{result:t,decodeTree:r}=this,n=(r[t]&l.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,n,this.consumed),null==(e=this.errors)||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,t,r){let{decodeTree:n}=this;return this.emitCodePoint(1===t?n[e]&~l.VALUE_LENGTH:n[e+1],r),3===t&&this.emitCodePoint(n[e+2],r),r}end(){var e;switch(this.state){case c.NamedEntity:return 0!==this.result&&(this.decodeMode!==u.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case c.NumericDecimal:return this.emitNumericEntity(0,2);case c.NumericHex:return this.emitNumericEntity(0,3);case c.NumericStart:return null==(e=this.errors)||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case c.EntityStart:return 0}}}},466:function(e,t,r){r(9496),r(747)},747:function(e,t,r){r.d(t,{Gj:()=>l,WY:()=>s,X1:()=>c});let n=/["$&'<>\u0080-\uFFFF]/g,i=new Map([[34,"&quot;"],[38,"&amp;"],[39,"&apos;"],[60,"&lt;"],[62,"&gt;"]]),a=null==String.prototype.codePointAt?(e,t)=>(64512&e.charCodeAt(t))==55296?(e.charCodeAt(t)-55296)*1024+e.charCodeAt(t+1)-56320+65536:e.charCodeAt(t):(e,t)=>e.codePointAt(t);function s(e){let t,r="",s=0;for(;null!==(t=n.exec(e));){let{index:o}=t,l=e.charCodeAt(o),c=i.get(l);void 0===c?(r+=`${e.substring(s,o)}&#x${a(e,o).toString(16)};`,s=n.lastIndex+=Number((64512&l)==55296)):(r+=e.substring(s,o)+c,s=o+1)}return r+e.substr(s)}function o(e,t){return function(r){let n,i=0,a="";for(;n=e.exec(r);)i!==n.index&&(a+=r.substring(i,n.index)),a+=t.get(n[0].charCodeAt(0)),i=n.index+1;return a+r.substring(i)}}let l=o(/["&\u00A0]/g,new Map([[34,"&quot;"],[38,"&amp;"],[160,"&nbsp;"]])),c=o(/[&<>\u00A0]/g,new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[160,"&nbsp;"]]))},7259:function(e,t,r){r.d(t,{q:()=>n});let n=new Uint16Array('ᵁ<\xd5ıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig耻\xc6䃆P耻&䀦cute耻\xc1䃁reve;䄂Āiyx}rc耻\xc2䃂;䐐r;쀀\ud835\udd04rave耻\xc0䃀pha;䎑acr;䄀d;橓Āgp\x9d\xa1on;䄄f;쀀\ud835\udd38plyFunction;恡ing耻\xc5䃅Ācs\xbe\xc3r;쀀\ud835\udc9cign;扔ilde耻\xc3䃃ml耻\xc4䃄Ѐaceforsu\xe5\xfb\xfeėĜĢħĪĀcr\xea\xf2kslash;或Ŷ\xf6\xf8;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀\ud835\udd05pf;쀀\ud835\udd39eve;䋘c\xf2ēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻\xa9䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻\xc7䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷\xf2ſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀\ud835\udc9epĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀\ud835\udd07Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀\ud835\udd3bƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegra\xecȹoɴ͹\0\0ͻ\xbb͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔e\xe5ˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀\ud835\udc9frok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻\xd0䃐cute耻\xc9䃉ƀaiyӒӗӜron;䄚rc耻\xca䃊;䐭ot;䄖r;쀀\ud835\udd08rave耻\xc8䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀\ud835\udd3csilon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻\xcb䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀\ud835\udd09lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀\ud835\udd3dAll;戀riertrf;愱c\xf2׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀\ud835\udd0a;拙pf;쀀\ud835\udd3eeater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀\ud835\udca2;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅ\xf2کrok;䄦mpńېۘownHum\xf0įqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻\xcd䃍Āiyܓܘrc耻\xce䃎;䐘ot;䄰r;愑rave耻\xcc䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lie\xf3ϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀\ud835\udd40a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻\xcf䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀\ud835\udd0dpf;쀀\ud835\udd41ǣ߇\0ߌr;쀀\ud835\udca5rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀\ud835\udd0epf;쀀\ud835\udd42cr;쀀\ud835\udca6րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ight\xe1Μs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀\ud835\udd0fĀ;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊight\xe1οight\xe1ϊf;쀀\ud835\udd43erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂ\xf2ࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀\ud835\udd10nusPlus;戓pf;쀀\ud835\udd44c\xf2੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘\xeb૙eryThi\xee૙tedĀGL૸ଆreaterGreate\xf2ٳessLes\xf3ੈLine;䀊r;쀀\ud835\udd11ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀\ud835\udca9ilde耻\xd1䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻\xd3䃓Āiy෎ීrc耻\xd4䃔;䐞blac;䅐r;쀀\ud835\udd12rave耻\xd2䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀\ud835\udd46enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀\ud835\udcaaash耻\xd8䃘iŬื฼de耻\xd5䃕es;樷ml耻\xd6䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀\ud835\udd13i;䎦;䎠usMinus;䂱Āipຢອncareplan\xe5ڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀\ud835\udcab;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀\ud835\udd14pf;愚cr;쀀\ud835\udcac؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻\xae䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r\xbbཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀\ud835\udd16ortȀDLRUᄪᄴᄾᅉownArrow\xbbОeftArrow\xbb࢚ightArrow\xbb࿝pArrow;憑gma;䎣allCircle;战pf;쀀\ud835\udd4aɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀\ud835\udcaear;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Th\xe1ྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et\xbbሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻\xde䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀\ud835\udd17Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀\ud835\udd4bipleDot;惛Āctዖዛr;쀀\ud835\udcafrok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻\xda䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻\xdb䃛;䐣blac;䅰r;쀀\ud835\udd18rave耻\xd9䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀\ud835\udd4cЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥own\xe1ϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀\ud835\udcb0ilde;䅨ml耻\xdc䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀\ud835\udd19pf;쀀\ud835\udd4dcr;쀀\ud835\udcb1dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀\ud835\udd1apf;쀀\ud835\udd4ecr;쀀\ud835\udcb2Ȁfiosᓋᓐᓒᓘr;쀀\ud835\udd1b;䎞pf;쀀\ud835\udd4fcr;쀀\ud835\udcb3ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻\xdd䃝Āiyᔉᔍrc;䅶;䐫r;쀀\ud835\udd1cpf;쀀\ud835\udd50cr;쀀\ud835\udcb4ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidt\xe8૙a;䎖r;愨pf;愤cr;쀀\ud835\udcb5௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻\xe1䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻\xe2䃢te肻\xb4̆;䐰lig耻\xe6䃦Ā;r\xb2ᖺ;쀀\ud835\udd1erave耻\xe0䃠ĀepᗊᗖĀfpᗏᗔsym;愵\xe8ᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e\xbbᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢\xbb\xb9arr;捼Āgpᙣᙧon;䄅f;쀀\ud835\udd52΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒ\xf1ᚃing耻\xe5䃥ƀctyᚡᚦᚨr;쀀\ud835\udcb6;䀪mpĀ;e዁ᚯ\xf1ʈilde耻\xe3䃣ml耻\xe4䃤Āciᛂᛈonin\xf4ɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e\xbbᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰s\xe9ᜌno\xf5ēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀\ud835\udd1fg΀costuvwឍឝឳេ៕៛៞ƀaiuបពរ\xf0ݠrc;旯p\xbb፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄e\xe5ᑄ\xe5ᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀\ud835\udd53Ā;tᏋᡣom\xbbᏌtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻\xa6䂦Ȁceioᥑᥖᥚᥠr;쀀\ud835\udcb7mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t\xbb᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁\xeeړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻\xe7䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻\xb8ƭptyv;榲t脀\xa2;eᨭᨮ䂢r\xe4Ʋr;쀀\ud835\udd20ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark\xbbᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟\xbbཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it\xbb᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;q\xc7\xc6ɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁\xeeᅠeĀmx᫱᫶ent\xbb᫩e\xf3ɍǧ᫾\0ᬇĀ;dኻᬂot;橭n\xf4Ɇƀfryᬐᬔᬗ;쀀\ud835\udd54o\xe4ɔ脀\xa9;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀\ud835\udcb8Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒre\xe3᭳u\xe3᭵ee;拎edge;拏en耻\xa4䂤earrowĀlrᯮ᯳eft\xbbᮀight\xbbᮽe\xe4ᯝĀciᰁᰇonin\xf4Ƿnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍r\xf2΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸\xf2ᄳhĀ;vᱚᱛ怐\xbbऊūᱡᱧarow;椏a\xe3̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻\xb0䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀\ud835\udd21arĀlrᲳᲵ\xbbࣜ\xbbသʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀\xf7;o᳧ᳰntimes;拇n\xf8᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀\ud835\udd55ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedg\xe5\xfanƀadhᄮᵝᵧownarrow\xf3ᲃarpoonĀlrᵲᵶef\xf4Ჴigh\xf4ᲶŢᵿᶅkaro\xf7གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀\ud835\udcb9;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃r\xf2Щa\xf2ྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴo\xf4ᲉĀcsḎḔute耻\xe9䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻\xea䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀\ud835\udd22ƀ;rsṐṑṗ檚ave耻\xe8䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et\xbbẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀\ud835\udd56ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on\xbbớ;䏵ȀcsuvỪỳἋἣĀioữḱrc\xbbḮɩỹ\0\0ỻ\xedՈantĀglἂἆtr\xbbṝess\xbbṺƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯o\xf4͒ĀahὉὋ;䎷耻\xf0䃰Āmrὓὗl耻\xeb䃫o;悬ƀcipὡὤὧl;䀡s\xf4ծĀeoὬὴctatio\xeeՙnential\xe5չৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotse\xf1Ṅy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀\ud835\udd23lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀\ud835\udd57ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻\xbd䂽;慓耻\xbc䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻\xbe䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀\ud835\udcbbࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lan\xf4٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀\ud835\udd24Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox\xbbℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀\ud835\udd58Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎pro\xf8₞r;楸qĀlqؿ↖les\xf3₈i\xed٫Āen↣↭rtneqq;쀀≩︀\xc5↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽r\xf2ΠȀilmr⇐⇔⇗⇛rs\xf0ᒄf\xbb․il\xf4کĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it\xbb∊lip;怦con;抹r;쀀\ud835\udd25sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀\ud835\udd59bar;怕ƀclt≯≴≸r;쀀\ud835\udcbdas\xe8⇴rok;䄧Ābp⊂⊇ull;恃hen\xbbᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻\xed䃭ƀ;iyݱ⊰⊵rc耻\xee䃮;䐸Ācx⊼⊿y;䐵cl耻\xa1䂡ĀfrΟ⋉;쀀\ud835\udd26rave耻\xec䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓in\xe5ގar\xf4ܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝do\xf4⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙er\xf3ᕣ\xe3⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀\ud835\udd5aa;䎹uest耻\xbf䂿Āci⎊⎏r;쀀\ud835\udcbenʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻\xef䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀\ud835\udd27ath;䈷pf;쀀\ud835\udd5bǣ⏬\0⏱r;쀀\ud835\udcbfrcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀\ud835\udd28reen;䄸cy;䑅cy;䑜pf;쀀\ud835\udd5ccr;쀀\ud835\udcc0஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼r\xf2৆\xf2Εail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴ra\xeeࡌbda;䎻gƀ;dlࢎⓁⓃ;榑\xe5ࢎ;檅uo耻\xab䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝\xeb≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼\xecࢰ\xe2┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□a\xe9⓶arpoonĀdu▯▴own\xbbњp\xbb०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoon\xf3྘quigarro\xf7⇰hreetimes;拋ƀ;qs▋ও◺lan\xf4বʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋ppro\xf8Ⓠot;拖qĀgq♃♅\xf4উgt\xf2⒌\xf4ছi\xedলƀilr♕࣡♚sht;楼;쀀\ud835\udd29Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖r\xf2◁orne\xf2ᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che\xbb⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox\xbb⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽r\xebࣁgƀlmr⛿✍✔eftĀar০✇ight\xe1৲apsto;柼ight\xe1৽parrowĀlr✥✩ef\xf4⓭ight;憬ƀafl✶✹✽r;榅;쀀\ud835\udd5dus;樭imes;樴š❋❏st;戗\xe1ፎƀ;ef❗❘᠀旊nge\xbb❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇r\xf2ࢨorne\xf2ᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀\ud835\udcc1mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹re\xe5◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀\xc5⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻\xaf䂯Āet⡗⡙;時Ā;e⡞⡟朠se\xbb⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻ow\xeeҌef\xf4ए\xf0Ꮡker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle\xbbᘦr;쀀\ud835\udd2ao;愧ƀcdn⢯⢴⣉ro耻\xb5䂵Ȁ;acdᑤ⢽⣀⣄s\xf4ᚧir;櫰ot肻\xb7Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛\xf2−\xf0ઁĀdp⣩⣮els;抧f;쀀\ud835\udd5eĀct⣸⣽r;쀀\ud835\udcc2pos\xbbᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la\xbb˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉ro\xf8඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻\xa0ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸ui\xf6ୣĀei⩊⩎ar;椨\xed஘istĀ;s஠டr;쀀\ud835\udd2bȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lan\xf4௢i\xed௪Ā;rஶ⪁\xbbஷƀAap⪊⪍⪑r\xf2⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹r\xf2⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro\xf7⫁ightarro\xf7⪐ƀ;qs఻⪺⫪lan\xf4ౕĀ;sౕ⫴\xbbశi\xedౝĀ;rవ⫾iĀ;eచథi\xe4ඐĀpt⬌⬑f;쀀\ud835\udd5f膀\xac;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lle\xec୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳u\xe5ಥĀ;cಘ⭸Ā;eಒ⭽\xf1ಘȀAait⮈⮋⮝⮧r\xf2⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow\xbb⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉u\xe5൅;쀀\ud835\udcc3ortɭ⬅\0\0⯖ar\xe1⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭\xe5೸\xe5ഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗ\xf1സȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇ\xecௗlde耻\xf1䃱\xe7ృiangleĀlrⱒⱜeftĀ;eచⱚ\xf1దightĀ;eೋⱥ\xf1೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻\xf3䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻\xf4䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀\ud835\udd2cͯ⵹\0\0⵼\0ⶂn;䋛ave耻\xf2䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨr\xf2᪀Āir⶝ⶠr;榾oss;榻n\xe5๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀\ud835\udd60ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨r\xf2᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f\xbbⷿ耻\xaa䂪耻\xba䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧\xf2⸁ash耻\xf8䃸l;折iŬⸯ⸴de耻\xf5䃵esĀ;aǛ⸺s;樶ml耻\xf6䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀\xb6;l⹭⹮䂶le\xecЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀\ud835\udd2dƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕ma\xf4੶ne;明ƀ;tv⺿⻀⻈䏀chfork\xbb´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎\xf6⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻\xb1ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀\ud835\udd61nd耻\xa3䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷u\xe5໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾ppro\xf8⽃urlye\xf1໙\xf1໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨i\xedໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺\xf0⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴\xef໻rel;抰Āci⿀⿅r;쀀\ud835\udcc5;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀\ud835\udd2epf;쀀\ud835\udd62rime;恗cr;쀀\ud835\udcc6ƀaeo⿸〉〓tĀei⿾々rnion\xf3ڰnt;樖stĀ;e【】䀿\xf1Ἑ\xf4༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがr\xf2Ⴓ\xf2ϝail;検ar\xf2ᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕i\xe3ᅮmptyv;榳gȀ;del࿑らるろ;榒;榥\xe5࿑uo耻\xbb䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞\xeb≝\xf0✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶al\xf3༞ƀabrョリヮr\xf2៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗\xec࿲\xe2ヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜn\xe5Ⴛar\xf4ྩt;断ƀilrㅩဣㅮsht;楽;쀀\ud835\udd2fĀaoㅷㆆrĀduㅽㅿ\xbbѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭa\xe9トarpoonĀduㆻㆿow\xeeㅾp\xbb႒eftĀah㇊㇐rrow\xf3࿪arpoon\xf3Ցightarrows;應quigarro\xf7ニhreetimes;拌g;䋚ingdotse\xf1ἲƀahm㈍㈐㈓r\xf2࿪a\xf2Ց;怏oustĀ;a㈞㈟掱che\xbb㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾r\xebဃƀafl㉇㉊㉎r;榆;쀀\ud835\udd63us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒ar\xf2㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀\ud835\udcc7Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠re\xe5ㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛qu\xef➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡u\xe5ᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓i\xedሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒\xeb∨Ā;oਸ਼਴t耻\xa7䂧i;䀻war;椩mĀin㍩\xf0nu\xf3\xf1t;朶rĀ;o㍶⁕쀀\ud835\udd30Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜i\xe4ᑤara\xec⹯耻\xad䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲ar\xf2ᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetm\xe9㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀\ud835\udd64aĀdr㑍ЂesĀ;u㑔㑕晠it\xbb㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍\xf1ᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝\xf1ᆮƀ;afᅻ㒦ְrť㒫ֱ\xbbᅼar\xf2ᅈȀcemt㒹㒾㓂㓅r;쀀\ud835\udcc8tm\xee\xf1i\xec㐕ar\xe6ᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psilo\xeeỠh\xe9⺯s\xbb⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦ppro\xf8㋺urlye\xf1ᇾ\xf1ᇳƀaes㖂㖈㌛ppro\xf8㌚q\xf1㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻\xb9䂹耻\xb2䂲耻\xb3䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨\xeb∮Ā;oਫ਩war;椪lig耻\xdf䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄r\xeb๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀\ud835\udd31Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮ppro\xf8዁im\xbbኬs\xf0ኞĀas㚺㚮\xf0዁rn耻\xfe䃾Ǭ̟㛆⋧es膀\xd7;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀\xe1⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀\ud835\udd65rk;櫚\xe1㍢rime;怴ƀaip㜏㜒㝤d\xe5ቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own\xbbᶻeftĀ;e⠀㜾\xf1म;扜ightĀ;e㊪㝋\xf1ၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀\ud835\udcc9;䑆cy;䑛rok;䅧Āio㞋㞎x\xf4᝷headĀlr㞗㞠eftarro\xf7ࡏightarrow\xbbཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶r\xf2ϭar;楣Ācr㟜㟢ute耻\xfa䃺\xf2ᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻\xfb䃻;䑃ƀabh㠃㠆㠋r\xf2Ꭽlac;䅱a\xf2ᏃĀir㠓㠘sht;楾;쀀\ud835\udd32rave耻\xf9䃹š㠧㠱rĀlr㠬㠮\xbbॗ\xbbႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r\xbb㡆op;挏ri;旸Āal㡖㡚cr;䅫肻\xa8͉Āgp㡢㡦on;䅳f;쀀\ud835\udd66̀adhlsuᅋ㡸㡽፲㢑㢠own\xe1ᎳarpoonĀlr㢈㢌ef\xf4㠭igh\xf4㠯iƀ;hl㢙㢚㢜䏅\xbbᏺon\xbb㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r\xbb㢽op;挎ng;䅯ri;旹cr;쀀\ud835\udccaƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨\xbb᠓Āam㣯㣲r\xf2㢨l耻\xfc䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠r\xf2ϷarĀ;v㤦㤧櫨;櫩as\xe8ϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖app\xe1␕othin\xe7ẖƀhir㓫⻈㥙op\xf4⾵Ā;hᎷ㥢\xefㆍĀiu㥩㥭gm\xe1㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟et\xe1㚜iangleĀlr㦪㦯eft\xbbथight\xbbၑy;䐲ash\xbbံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨa\xf2ᑩr;쀀\ud835\udd33tr\xe9㦮suĀbp㧯㧱\xbbജ\xbb൙pf;쀀\ud835\udd67ro\xf0໻tr\xe9㦴Ācu㨆㨋r;쀀\ud835\udccbĀbp㨐㨘nĀEe㦀㨖\xbb㥾nĀEe㦒㨞\xbb㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀\ud835\udd34pf;쀀\ud835\udd68Ā;eᑹ㩦at\xe8ᑹcr;쀀\ud835\udcccૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tr\xe9៑r;쀀\ud835\udd35ĀAa㪔㪗r\xf2σr\xf2৶;䎾ĀAa㪡㪤r\xf2θr\xf2৫a\xf0✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀\ud835\udd69im\xe5ឲĀAa㫇㫊r\xf2ώr\xf2ਁĀcq㫒ីr;쀀\ud835\udccdĀpt៖㫜r\xe9។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻\xfd䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻\xa5䂥r;쀀\ud835\udd36cy;䑗pf;쀀\ud835\udd6acr;쀀\ud835\udcceĀcm㬦㬩y;䑎l耻\xff䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡tr\xe6ᕟa;䎶r;쀀\ud835\udd37cy;䐶grarr;懝pf;쀀\ud835\udd6bcr;쀀\ud835\udccfĀjn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0)))},5949:function(e,t,r){r.d(t,{s:()=>n});let n=new Uint16Array("Ȁaglq	\x15\x18\x1bɭ\x0f\0\0\x12p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)))},9496:function(){},8466:function(e,t,r){r.d(t,{Gj:()=>o.Gj,WY:()=>o.WY,X1:()=>o.X1}),r(2990),r(466);var n,i,a,s,o=r(747);(n=a||(a={}))[n.XML=0]="XML",n[n.HTML=1]="HTML",(i=s||(s={}))[i.UTF8=0]="UTF8",i[i.ASCII=1]="ASCII",i[i.Extensive=2]="Extensive",i[i.Attribute=3]="Attribute",i[i.Text=4]="Text"},4645:function(e,t,r){r.d(t,{i:()=>g});var n=r(5645),i=r(2990);let a=new Set(["input","option","optgroup","select","button","datalist","textarea"]),s=new Set(["p"]),o=new Set(["thead","tbody"]),l=new Set(["dd","dt"]),c=new Set(["rt","rp"]),u=new Map([["tr",new Set(["tr","th","td"])],["th",new Set(["th"])],["td",new Set(["thead","th","td"])],["body",new Set(["head","link","script"])],["li",new Set(["li"])],["p",s],["h1",s],["h2",s],["h3",s],["h4",s],["h5",s],["h6",s],["select",a],["input",a],["output",a],["button",a],["datalist",a],["textarea",a],["option",new Set(["option"])],["optgroup",new Set(["optgroup","option"])],["dd",l],["dt",l],["address",s],["article",s],["aside",s],["blockquote",s],["details",s],["div",s],["dl",s],["fieldset",s],["figcaption",s],["figure",s],["footer",s],["form",s],["header",s],["hr",s],["main",s],["nav",s],["ol",s],["pre",s],["section",s],["table",s],["ul",s],["rt",c],["rp",c],["tbody",o],["tfoot",o]]),d=new Set(["area","base","basefont","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr"]),h=new Set(["math","svg"]),p=new Set(["mi","mo","mn","ms","mtext","annotation-xml","foreignobject","desc","title"]),f=/\s|\//;class g{constructor(e,t={}){var r,i,a,s,o,l;this.options=t,this.startIndex=0,this.endIndex=0,this.openTagStart=0,this.tagname="",this.attribname="",this.attribvalue="",this.attribs=null,this.stack=[],this.buffers=[],this.bufferOffset=0,this.writeIndex=0,this.ended=!1,this.cbs=null!=e?e:{},this.htmlMode=!this.options.xmlMode,this.lowerCaseTagNames=null!=(r=t.lowerCaseTags)?r:this.htmlMode,this.lowerCaseAttributeNames=null!=(i=t.lowerCaseAttributeNames)?i:this.htmlMode,this.recognizeSelfClosing=null!=(a=t.recognizeSelfClosing)?a:!this.htmlMode,this.tokenizer=new(null!=(s=t.Tokenizer)?s:n.A)(this.options,this),this.foreignContext=[!this.htmlMode],null==(l=(o=this.cbs).onparserinit)||l.call(o,this)}ontext(e,t){var r,n;let i=this.getSlice(e,t);this.endIndex=t-1,null==(n=(r=this.cbs).ontext)||n.call(r,i),this.startIndex=t}ontextentity(e,t){var r,n;this.endIndex=t-1,null==(n=(r=this.cbs).ontext)||n.call(r,(0,i.MK)(e)),this.startIndex=t}isVoidElement(e){return this.htmlMode&&d.has(e)}onopentagname(e,t){this.endIndex=t;let r=this.getSlice(e,t);this.lowerCaseTagNames&&(r=r.toLowerCase()),this.emitOpenTag(r)}emitOpenTag(e){var t,r,n,i;this.openTagStart=this.startIndex,this.tagname=e;let a=this.htmlMode&&u.get(e);if(a)for(;this.stack.length>0&&a.has(this.stack[0]);){let e=this.stack.shift();null==(r=(t=this.cbs).onclosetag)||r.call(t,e,!0)}!this.isVoidElement(e)&&(this.stack.unshift(e),this.htmlMode&&(h.has(e)?this.foreignContext.unshift(!0):p.has(e)&&this.foreignContext.unshift(!1))),null==(i=(n=this.cbs).onopentagname)||i.call(n,e),this.cbs.onopentag&&(this.attribs={})}endOpenTag(e){var t,r;this.startIndex=this.openTagStart,this.attribs&&(null==(r=(t=this.cbs).onopentag)||r.call(t,this.tagname,this.attribs,e),this.attribs=null),this.cbs.onclosetag&&this.isVoidElement(this.tagname)&&this.cbs.onclosetag(this.tagname,!0),this.tagname=""}onopentagend(e){this.endIndex=e,this.endOpenTag(!1),this.startIndex=e+1}onclosetag(e,t){var r,n,i,a,s,o,l,c;this.endIndex=t;let u=this.getSlice(e,t);if(this.lowerCaseTagNames&&(u=u.toLowerCase()),this.htmlMode&&(h.has(u)||p.has(u))&&this.foreignContext.shift(),this.isVoidElement(u))this.htmlMode&&"br"===u&&(null==(a=(i=this.cbs).onopentagname)||a.call(i,"br"),null==(o=(s=this.cbs).onopentag)||o.call(s,"br",{},!0),null==(c=(l=this.cbs).onclosetag)||c.call(l,"br",!1));else{let e=this.stack.indexOf(u);if(-1!==e)for(let t=0;t<=e;t++){let i=this.stack.shift();null==(n=(r=this.cbs).onclosetag)||n.call(r,i,t!==e)}else this.htmlMode&&"p"===u&&(this.emitOpenTag("p"),this.closeCurrentTag(!0))}this.startIndex=t+1}onselfclosingtag(e){this.endIndex=e,this.recognizeSelfClosing||this.foreignContext[0]?(this.closeCurrentTag(!1),this.startIndex=e+1):this.onopentagend(e)}closeCurrentTag(e){var t,r;let n=this.tagname;this.endOpenTag(e),this.stack[0]===n&&(null==(r=(t=this.cbs).onclosetag)||r.call(t,n,!e),this.stack.shift())}onattribname(e,t){this.startIndex=e;let r=this.getSlice(e,t);this.attribname=this.lowerCaseAttributeNames?r.toLowerCase():r}onattribdata(e,t){this.attribvalue+=this.getSlice(e,t)}onattribentity(e){this.attribvalue+=(0,i.MK)(e)}onattribend(e,t){var r,i;this.endIndex=t,null==(i=(r=this.cbs).onattribute)||i.call(r,this.attribname,this.attribvalue,e===n.X.Double?'"':e===n.X.Single?"'":e===n.X.NoValue?void 0:null),this.attribs&&!Object.prototype.hasOwnProperty.call(this.attribs,this.attribname)&&(this.attribs[this.attribname]=this.attribvalue),this.attribvalue=""}getInstructionName(e){let t=e.search(f),r=t<0?e:e.substr(0,t);return this.lowerCaseTagNames&&(r=r.toLowerCase()),r}ondeclaration(e,t){this.endIndex=t;let r=this.getSlice(e,t);if(this.cbs.onprocessinginstruction){let e=this.getInstructionName(r);this.cbs.onprocessinginstruction(`!${e}`,`!${r}`)}this.startIndex=t+1}onprocessinginstruction(e,t){this.endIndex=t;let r=this.getSlice(e,t);if(this.cbs.onprocessinginstruction){let e=this.getInstructionName(r);this.cbs.onprocessinginstruction(`?${e}`,`?${r}`)}this.startIndex=t+1}oncomment(e,t,r){var n,i,a,s;this.endIndex=t,null==(i=(n=this.cbs).oncomment)||i.call(n,this.getSlice(e,t-r)),null==(s=(a=this.cbs).oncommentend)||s.call(a),this.startIndex=t+1}oncdata(e,t,r){var n,i,a,s,o,l,c,u,d,h;this.endIndex=t;let p=this.getSlice(e,t-r);!this.htmlMode||this.options.recognizeCDATA?(null==(i=(n=this.cbs).oncdatastart)||i.call(n),null==(s=(a=this.cbs).ontext)||s.call(a,p),null==(l=(o=this.cbs).oncdataend)||l.call(o)):(null==(u=(c=this.cbs).oncomment)||u.call(c,`[CDATA[${p}]]`),null==(h=(d=this.cbs).oncommentend)||h.call(d)),this.startIndex=t+1}onend(){var e,t;if(this.cbs.onclosetag){this.endIndex=this.startIndex;for(let e=0;e<this.stack.length;e++)this.cbs.onclosetag(this.stack[e],!0)}null==(t=(e=this.cbs).onend)||t.call(e)}reset(){var e,t,r,n;null==(t=(e=this.cbs).onreset)||t.call(e),this.tokenizer.reset(),this.tagname="",this.attribname="",this.attribs=null,this.stack.length=0,this.startIndex=0,this.endIndex=0,null==(n=(r=this.cbs).onparserinit)||n.call(r,this),this.buffers.length=0,this.foreignContext.length=0,this.foreignContext.unshift(!this.htmlMode),this.bufferOffset=0,this.writeIndex=0,this.ended=!1}parseComplete(e){this.reset(),this.end(e)}getSlice(e,t){for(;e-this.bufferOffset>=this.buffers[0].length;)this.shiftBuffer();let r=this.buffers[0].slice(e-this.bufferOffset,t-this.bufferOffset);for(;t-this.bufferOffset>this.buffers[0].length;)this.shiftBuffer(),r+=this.buffers[0].slice(0,t-this.bufferOffset);return r}shiftBuffer(){this.bufferOffset+=this.buffers[0].length,this.writeIndex--,this.buffers.shift()}write(e){var t,r;if(this.ended){null==(r=(t=this.cbs).onerror)||r.call(t,Error(".write() after done!"));return}this.buffers.push(e),this.tokenizer.running&&(this.tokenizer.write(e),this.writeIndex++)}end(e){var t,r;if(this.ended){null==(r=(t=this.cbs).onerror)||r.call(t,Error(".end() after done!"));return}e&&this.write(e),this.ended=!0,this.tokenizer.end()}pause(){this.tokenizer.pause()}resume(){for(this.tokenizer.resume();this.tokenizer.running&&this.writeIndex<this.buffers.length;)this.tokenizer.write(this.buffers[this.writeIndex++]);this.ended&&this.tokenizer.end()}parseChunk(e){this.write(e)}done(e){this.end(e)}}},5645:function(e,t,r){r.d(t,{A:()=>p,X:()=>l});var n,i,a,s,o,l,c=r(2990);function u(e){return e===s.Space||e===s.NewLine||e===s.Tab||e===s.FormFeed||e===s.CarriageReturn}function d(e){return e===s.Slash||e===s.Gt||u(e)}(n=s||(s={}))[n.Tab=9]="Tab",n[n.NewLine=10]="NewLine",n[n.FormFeed=12]="FormFeed",n[n.CarriageReturn=13]="CarriageReturn",n[n.Space=32]="Space",n[n.ExclamationMark=33]="ExclamationMark",n[n.Number=35]="Number",n[n.Amp=38]="Amp",n[n.SingleQuote=39]="SingleQuote",n[n.DoubleQuote=34]="DoubleQuote",n[n.Dash=45]="Dash",n[n.Slash=47]="Slash",n[n.Zero=48]="Zero",n[n.Nine=57]="Nine",n[n.Semi=59]="Semi",n[n.Lt=60]="Lt",n[n.Eq=61]="Eq",n[n.Gt=62]="Gt",n[n.Questionmark=63]="Questionmark",n[n.UpperA=65]="UpperA",n[n.LowerA=97]="LowerA",n[n.UpperF=70]="UpperF",n[n.LowerF=102]="LowerF",n[n.UpperZ=90]="UpperZ",n[n.LowerZ=122]="LowerZ",n[n.LowerX=120]="LowerX",n[n.OpeningSquareBracket=91]="OpeningSquareBracket",(i=o||(o={}))[i.Text=1]="Text",i[i.BeforeTagName=2]="BeforeTagName",i[i.InTagName=3]="InTagName",i[i.InSelfClosingTag=4]="InSelfClosingTag",i[i.BeforeClosingTagName=5]="BeforeClosingTagName",i[i.InClosingTagName=6]="InClosingTagName",i[i.AfterClosingTagName=7]="AfterClosingTagName",i[i.BeforeAttributeName=8]="BeforeAttributeName",i[i.InAttributeName=9]="InAttributeName",i[i.AfterAttributeName=10]="AfterAttributeName",i[i.BeforeAttributeValue=11]="BeforeAttributeValue",i[i.InAttributeValueDq=12]="InAttributeValueDq",i[i.InAttributeValueSq=13]="InAttributeValueSq",i[i.InAttributeValueNq=14]="InAttributeValueNq",i[i.BeforeDeclaration=15]="BeforeDeclaration",i[i.InDeclaration=16]="InDeclaration",i[i.InProcessingInstruction=17]="InProcessingInstruction",i[i.BeforeComment=18]="BeforeComment",i[i.CDATASequence=19]="CDATASequence",i[i.InSpecialComment=20]="InSpecialComment",i[i.InCommentLike=21]="InCommentLike",i[i.BeforeSpecialS=22]="BeforeSpecialS",i[i.BeforeSpecialT=23]="BeforeSpecialT",i[i.SpecialStartSequence=24]="SpecialStartSequence",i[i.InSpecialTag=25]="InSpecialTag",i[i.InEntity=26]="InEntity",(a=l||(l={}))[a.NoValue=0]="NoValue",a[a.Unquoted=1]="Unquoted",a[a.Single=2]="Single",a[a.Double=3]="Double";let h={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97]),XmpEnd:new Uint8Array([60,47,120,109,112])};class p{constructor({xmlMode:e=!1,decodeEntities:t=!0},r){this.cbs=r,this.state=o.Text,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=o.Text,this.isSpecial=!1,this.running=!0,this.offset=0,this.currentSequence=void 0,this.sequenceIndex=0,this.xmlMode=e,this.decodeEntities=t,this.entityDecoder=new c.Wf(e?c.sr:c.qN,(e,t)=>this.emitCodePoint(e,t))}reset(){this.state=o.Text,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=o.Text,this.currentSequence=void 0,this.running=!0,this.offset=0}write(e){this.offset+=this.buffer.length,this.buffer=e,this.parse()}end(){this.running&&this.finish()}pause(){this.running=!1}resume(){this.running=!0,this.index<this.buffer.length+this.offset&&this.parse()}stateText(e){e===s.Lt||!this.decodeEntities&&this.fastForwardTo(s.Lt)?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=o.BeforeTagName,this.sectionStart=this.index):this.decodeEntities&&e===s.Amp&&this.startEntity()}stateSpecialStartSequence(e){let t=this.sequenceIndex===this.currentSequence.length;if(t?d(e):(32|e)===this.currentSequence[this.sequenceIndex]){if(!t)return void this.sequenceIndex++}else this.isSpecial=!1;this.sequenceIndex=0,this.state=o.InTagName,this.stateInTagName(e)}stateInSpecialTag(e){if(this.sequenceIndex===this.currentSequence.length){if(e===s.Gt||u(e)){let t=this.index-this.currentSequence.length;if(this.sectionStart<t){let e=this.index;this.index=t,this.cbs.ontext(this.sectionStart,t),this.index=e}this.isSpecial=!1,this.sectionStart=t+2,this.stateInClosingTagName(e);return}this.sequenceIndex=0}(32|e)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:0===this.sequenceIndex?this.currentSequence===h.TitleEnd?this.decodeEntities&&e===s.Amp&&this.startEntity():this.fastForwardTo(s.Lt)&&(this.sequenceIndex=1):this.sequenceIndex=Number(e===s.Lt)}stateCDATASequence(e){e===h.Cdata[this.sequenceIndex]?++this.sequenceIndex===h.Cdata.length&&(this.state=o.InCommentLike,this.currentSequence=h.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=o.InDeclaration,this.stateInDeclaration(e))}fastForwardTo(e){for(;++this.index<this.buffer.length+this.offset;)if(this.buffer.charCodeAt(this.index-this.offset)===e)return!0;return this.index=this.buffer.length+this.offset-1,!1}stateInCommentLike(e){e===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===h.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index,2):this.cbs.oncomment(this.sectionStart,this.index,2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=o.Text):0===this.sequenceIndex?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):e!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}isTagStartChar(e){return this.xmlMode?!d(e):e>=s.LowerA&&e<=s.LowerZ||e>=s.UpperA&&e<=s.UpperZ}startSpecial(e,t){this.isSpecial=!0,this.currentSequence=e,this.sequenceIndex=t,this.state=o.SpecialStartSequence}stateBeforeTagName(e){if(e===s.ExclamationMark)this.state=o.BeforeDeclaration,this.sectionStart=this.index+1;else if(e===s.Questionmark)this.state=o.InProcessingInstruction,this.sectionStart=this.index+1;else if(this.isTagStartChar(e)){let t=32|e;this.sectionStart=this.index,this.xmlMode?this.state=o.InTagName:t===h.ScriptEnd[2]?this.state=o.BeforeSpecialS:t===h.TitleEnd[2]||t===h.XmpEnd[2]?this.state=o.BeforeSpecialT:this.state=o.InTagName}else e===s.Slash?this.state=o.BeforeClosingTagName:(this.state=o.Text,this.stateText(e))}stateInTagName(e){d(e)&&(this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=o.BeforeAttributeName,this.stateBeforeAttributeName(e))}stateBeforeClosingTagName(e){u(e)||(e===s.Gt?this.state=o.Text:(this.state=this.isTagStartChar(e)?o.InClosingTagName:o.InSpecialComment,this.sectionStart=this.index))}stateInClosingTagName(e){(e===s.Gt||u(e))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=o.AfterClosingTagName,this.stateAfterClosingTagName(e))}stateAfterClosingTagName(e){(e===s.Gt||this.fastForwardTo(s.Gt))&&(this.state=o.Text,this.sectionStart=this.index+1)}stateBeforeAttributeName(e){e===s.Gt?(this.cbs.onopentagend(this.index),this.isSpecial?(this.state=o.InSpecialTag,this.sequenceIndex=0):this.state=o.Text,this.sectionStart=this.index+1):e===s.Slash?this.state=o.InSelfClosingTag:u(e)||(this.state=o.InAttributeName,this.sectionStart=this.index)}stateInSelfClosingTag(e){e===s.Gt?(this.cbs.onselfclosingtag(this.index),this.state=o.Text,this.sectionStart=this.index+1,this.isSpecial=!1):u(e)||(this.state=o.BeforeAttributeName,this.stateBeforeAttributeName(e))}stateInAttributeName(e){(e===s.Eq||d(e))&&(this.cbs.onattribname(this.sectionStart,this.index),this.sectionStart=this.index,this.state=o.AfterAttributeName,this.stateAfterAttributeName(e))}stateAfterAttributeName(e){e===s.Eq?this.state=o.BeforeAttributeValue:e===s.Slash||e===s.Gt?(this.cbs.onattribend(l.NoValue,this.sectionStart),this.sectionStart=-1,this.state=o.BeforeAttributeName,this.stateBeforeAttributeName(e)):u(e)||(this.cbs.onattribend(l.NoValue,this.sectionStart),this.state=o.InAttributeName,this.sectionStart=this.index)}stateBeforeAttributeValue(e){e===s.DoubleQuote?(this.state=o.InAttributeValueDq,this.sectionStart=this.index+1):e===s.SingleQuote?(this.state=o.InAttributeValueSq,this.sectionStart=this.index+1):u(e)||(this.sectionStart=this.index,this.state=o.InAttributeValueNq,this.stateInAttributeValueNoQuotes(e))}handleInAttributeValue(e,t){e===t||!this.decodeEntities&&this.fastForwardTo(t)?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(t===s.DoubleQuote?l.Double:l.Single,this.index+1),this.state=o.BeforeAttributeName):this.decodeEntities&&e===s.Amp&&this.startEntity()}stateInAttributeValueDoubleQuotes(e){this.handleInAttributeValue(e,s.DoubleQuote)}stateInAttributeValueSingleQuotes(e){this.handleInAttributeValue(e,s.SingleQuote)}stateInAttributeValueNoQuotes(e){u(e)||e===s.Gt?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(l.Unquoted,this.index),this.state=o.BeforeAttributeName,this.stateBeforeAttributeName(e)):this.decodeEntities&&e===s.Amp&&this.startEntity()}stateBeforeDeclaration(e){e===s.OpeningSquareBracket?(this.state=o.CDATASequence,this.sequenceIndex=0):this.state=e===s.Dash?o.BeforeComment:o.InDeclaration}stateInDeclaration(e){(e===s.Gt||this.fastForwardTo(s.Gt))&&(this.cbs.ondeclaration(this.sectionStart,this.index),this.state=o.Text,this.sectionStart=this.index+1)}stateInProcessingInstruction(e){(e===s.Gt||this.fastForwardTo(s.Gt))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=o.Text,this.sectionStart=this.index+1)}stateBeforeComment(e){e===s.Dash?(this.state=o.InCommentLike,this.currentSequence=h.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=o.InDeclaration}stateInSpecialComment(e){(e===s.Gt||this.fastForwardTo(s.Gt))&&(this.cbs.oncomment(this.sectionStart,this.index,0),this.state=o.Text,this.sectionStart=this.index+1)}stateBeforeSpecialS(e){let t=32|e;t===h.ScriptEnd[3]?this.startSpecial(h.ScriptEnd,4):t===h.StyleEnd[3]?this.startSpecial(h.StyleEnd,4):(this.state=o.InTagName,this.stateInTagName(e))}stateBeforeSpecialT(e){switch(32|e){case h.TitleEnd[3]:this.startSpecial(h.TitleEnd,4);break;case h.TextareaEnd[3]:this.startSpecial(h.TextareaEnd,4);break;case h.XmpEnd[3]:this.startSpecial(h.XmpEnd,4);break;default:this.state=o.InTagName,this.stateInTagName(e)}}startEntity(){this.baseState=this.state,this.state=o.InEntity,this.entityStart=this.index,this.entityDecoder.startEntity(this.xmlMode?c.FJ.Strict:this.baseState===o.Text||this.baseState===o.InSpecialTag?c.FJ.Legacy:c.FJ.Attribute)}stateInEntity(){let e=this.entityDecoder.write(this.buffer,this.index-this.offset);e>=0?(this.state=this.baseState,0===e&&(this.index=this.entityStart)):this.index=this.offset+this.buffer.length-1}cleanup(){this.running&&this.sectionStart!==this.index&&(this.state===o.Text||this.state===o.InSpecialTag&&0===this.sequenceIndex?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===o.InAttributeValueDq||this.state===o.InAttributeValueSq||this.state===o.InAttributeValueNq)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}shouldContinue(){return this.index<this.buffer.length+this.offset&&this.running}parse(){for(;this.shouldContinue();){let e=this.buffer.charCodeAt(this.index-this.offset);switch(this.state){case o.Text:this.stateText(e);break;case o.SpecialStartSequence:this.stateSpecialStartSequence(e);break;case o.InSpecialTag:this.stateInSpecialTag(e);break;case o.CDATASequence:this.stateCDATASequence(e);break;case o.InAttributeValueDq:this.stateInAttributeValueDoubleQuotes(e);break;case o.InAttributeName:this.stateInAttributeName(e);break;case o.InCommentLike:this.stateInCommentLike(e);break;case o.InSpecialComment:this.stateInSpecialComment(e);break;case o.BeforeAttributeName:this.stateBeforeAttributeName(e);break;case o.InTagName:this.stateInTagName(e);break;case o.InClosingTagName:this.stateInClosingTagName(e);break;case o.BeforeTagName:this.stateBeforeTagName(e);break;case o.AfterAttributeName:this.stateAfterAttributeName(e);break;case o.InAttributeValueSq:this.stateInAttributeValueSingleQuotes(e);break;case o.BeforeAttributeValue:this.stateBeforeAttributeValue(e);break;case o.BeforeClosingTagName:this.stateBeforeClosingTagName(e);break;case o.AfterClosingTagName:this.stateAfterClosingTagName(e);break;case o.BeforeSpecialS:this.stateBeforeSpecialS(e);break;case o.BeforeSpecialT:this.stateBeforeSpecialT(e);break;case o.InAttributeValueNq:this.stateInAttributeValueNoQuotes(e);break;case o.InSelfClosingTag:this.stateInSelfClosingTag(e);break;case o.InDeclaration:this.stateInDeclaration(e);break;case o.BeforeDeclaration:this.stateBeforeDeclaration(e);break;case o.BeforeComment:this.stateBeforeComment(e);break;case o.InProcessingInstruction:this.stateInProcessingInstruction(e);break;case o.InEntity:this.stateInEntity()}this.index++}this.cleanup()}finish(){this.state===o.InEntity&&(this.entityDecoder.end(),this.state=this.baseState),this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){let e=this.buffer.length+this.offset;this.sectionStart>=e||(this.state===o.InCommentLike?this.currentSequence===h.CdataEnd?this.cbs.oncdata(this.sectionStart,e,0):this.cbs.oncomment(this.sectionStart,e,0):this.state===o.InTagName||this.state===o.BeforeAttributeName||this.state===o.BeforeAttributeValue||this.state===o.AfterAttributeName||this.state===o.InAttributeName||this.state===o.InAttributeValueSq||this.state===o.InAttributeValueDq||this.state===o.InAttributeValueNq||this.state===o.InClosingTagName||this.cbs.ontext(this.sectionStart,e))}emitCodePoint(e,t){this.baseState!==o.Text&&this.baseState!==o.InSpecialTag?(this.sectionStart<this.entityStart&&this.cbs.onattribdata(this.sectionStart,this.entityStart),this.sectionStart=this.entityStart+t,this.index=this.sectionStart-1,this.cbs.onattribentity(e)):(this.sectionStart<this.entityStart&&this.cbs.ontext(this.sectionStart,this.entityStart),this.sectionStart=this.entityStart+t,this.index=this.sectionStart-1,this.cbs.ontextentity(e,this.sectionStart))}}},3808:function(e,t,r){r.d(t,{RJ:()=>i,iX:()=>n.i});var n=r(4645);r(8866),r(5645);var i=r(2743);r(4993)},6570:function(e,t,r){let n,i,a,s;r.d(t,{P2:()=>f});let o=(e,t)=>t.some(t=>e instanceof t),l=new WeakMap,c=new WeakMap,u=new WeakMap,d={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return l.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return h(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function h(e){if(e instanceof IDBRequest){let t;return t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("success",i),e.removeEventListener("error",a)},i=()=>{t(h(e.result)),n()},a=()=>{r(e.error),n()};e.addEventListener("success",i),e.addEventListener("error",a)}),u.set(t,e),t}if(c.has(e))return c.get(e);let t=function(e){if("function"==typeof e)return(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(p(this),t),h(this.request)}:function(...t){return h(e.apply(p(this),t))};return(e instanceof IDBTransaction&&function(e){if(l.has(e))return;let t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",a),e.removeEventListener("abort",a)},i=()=>{t(),n()},a=()=>{r(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",i),e.addEventListener("error",a),e.addEventListener("abort",a)});l.set(e,t)}(e),o(e,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(e,d):e}(e);return t!==e&&(c.set(e,t),u.set(t,e)),t}let p=e=>u.get(e);function f(e,t,{blocked:r,upgrade:n,blocking:i,terminated:a}={}){let s=indexedDB.open(e,t),o=h(s);return n&&s.addEventListener("upgradeneeded",e=>{n(h(s.result),e.oldVersion,e.newVersion,h(s.transaction),e)}),r&&s.addEventListener("blocked",e=>r(e.oldVersion,e.newVersion,e)),o.then(e=>{a&&e.addEventListener("close",()=>a()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),o}let g=["get","getKey","getAll","getAllKeys","count"],m=["put","add","delete","clear"],y=new Map;function b(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(y.get(t))return y.get(t);let r=t.replace(/FromIndex$/,""),n=t!==r,i=m.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(i||g.includes(r)))return;let a=async function(e,...t){let a=this.transaction(e,i?"readwrite":"readonly"),s=a.store;return n&&(s=s.index(t.shift())),(await Promise.all([s[r](...t),i&&a.done]))[0]};return y.set(t,a),a}d={...a=d,get:(e,t,r)=>b(e,t)||a.get(e,t,r),has:(e,t)=>!!b(e,t)||a.has(e,t)};let w=["continue","continuePrimaryKey","advance"],S={},v=new WeakMap,x=new WeakMap,E={get(e,t){if(!w.includes(t))return e[t];let r=S[t];return r||(r=S[t]=function(...e){v.set(this,x.get(this)[t](...e))}),r}};async function*T(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;let r=new Proxy(t,E);for(x.set(r,t),u.set(r,p(t));t;)yield r,t=await (v.get(r)||t.continue()),v.delete(r)}function k(e,t){return t===Symbol.asyncIterator&&o(e,[IDBIndex,IDBObjectStore,IDBCursor])||"iterate"===t&&o(e,[IDBIndex,IDBObjectStore])}d={...s=d,get:(e,t,r)=>k(e,t)?T:s.get(e,t,r),has:(e,t)=>k(e,t)||s.has(e,t)}},1652:function(e,t,r){r.d(t,{N:()=>n});function n(){return"10000000000".replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}},3907:function(e,t,r){let n;r.d(t,{LW:()=>b,QR:()=>x});var i=r(1652);function a(e,t){try{return e.apply(this,t)}catch(r){let e,t=(e=n.__externref_table_alloc(),n.__wbindgen_export_2.set(e,r),e);n.__wbindgen_exn_store(t)}}let s="undefined"!=typeof TextDecoder?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};"undefined"!=typeof TextDecoder&&s.decode();let o=null;function l(){return(null===o||0===o.byteLength)&&(o=new Uint8Array(n.memory.buffer)),o}function c(e,t){return e>>>=0,s.decode(l().subarray(e,e+t))}let u=0,d="undefined"!=typeof TextEncoder?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},h="function"==typeof d.encodeInto?function(e,t){return d.encodeInto(e,t)}:function(e,t){let r=d.encode(e);return t.set(r),{read:e.length,written:r.length}};function p(e,t,r){if(void 0===r){let r=d.encode(e),n=t(r.length,1)>>>0;return l().subarray(n,n+r.length).set(r),u=r.length,n}let n=e.length,i=t(n,1)>>>0,a=l(),s=0;for(;s<n;s++){let t=e.charCodeAt(s);if(t>127)break;a[i+s]=t}if(s!==n){0!==s&&(e=e.slice(s)),i=r(i,n,n=s+3*e.length,1)>>>0;let t=h(e,l().subarray(i+s,i+n));s+=t.written,i=r(i,n,s,1)>>>0}return u=s,i}let f=null;function g(){return(null===f||!0===f.buffer.detached||void 0===f.buffer.detached&&f.buffer!==n.memory.buffer)&&(f=new DataView(n.memory.buffer)),f}function m(e){let t=n.__wbindgen_export_2.get(e);return n.__externref_table_dealloc(e),t}let y="undefined"==typeof FinalizationRegistry?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>n.__wbg_rewriter_free(e>>>0,1));class b{__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,y.unregister(this),e}free(){let e=this.__destroy_into_raw();n.__wbg_rewriter_free(e,0)}rewrite_js(e,t,r,i){let a=p(e,n.__wbindgen_malloc,n.__wbindgen_realloc),s=u,o=p(t,n.__wbindgen_malloc,n.__wbindgen_realloc),l=u,c=p(r,n.__wbindgen_malloc,n.__wbindgen_realloc),d=u,h=n.rewriter_rewrite_js(this.__wbg_ptr,a,s,o,l,c,d,i);if(h[2])throw m(h[1]);return m(h[0])}rewrite_js_bytes(e,t,r,i){let a,s=(a=(0,n.__wbindgen_malloc)(+e.length,1)>>>0,l().set(e,a/1),u=e.length,a),o=u,c=p(t,n.__wbindgen_malloc,n.__wbindgen_realloc),d=u,h=p(r,n.__wbindgen_malloc,n.__wbindgen_realloc),f=u,g=n.rewriter_rewrite_js_bytes(this.__wbg_ptr,s,o,c,d,h,f,i);if(g[2])throw m(g[1]);return m(g[0])}constructor(e){const t=n.rewriter_new(e);if(t[2])throw m(t[1]);return this.__wbg_ptr=t[0]>>>0,y.register(this,this.__wbg_ptr,this),this}}async function w(e,t){if("function"==typeof Response&&e instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if("application/wasm"!=e.headers.get("Content-Type"))console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t);else throw t}let r=await e.arrayBuffer();return await WebAssembly.instantiate(r,t)}{let r=await WebAssembly.instantiate(e,t);return r instanceof WebAssembly.Instance?{instance:r,module:e}:r}}function S(){let e={};return e.wbg={},e.wbg.__wbg_buffer_609cc3eee51ed158=function(e){return e.buffer},e.wbg.__wbg_call_7cccdd69e0791ae2=function(){return a(function(e,t,r){return e.call(t,r)},arguments)},e.wbg.__wbg_call_833bed5770ea2041=function(){return a(function(e,t,r,n){return e.call(t,r,n)},arguments)},e.wbg.__wbg_get_67b2ba62fc30de12=function(){return a(function(e,t){return Reflect.get(e,t)},arguments)},e.wbg.__wbg_new_405e22f390576ce2=function(){return{}},e.wbg.__wbg_new_78feb108b6472713=function(){return[]},e.wbg.__wbg_new_9ffbe0a71eff35e3=function(){return a(function(e,t){return new URL(c(e,t))},arguments)},e.wbg.__wbg_new_a12002a7f91c75be=function(e){return new Uint8Array(e)},e.wbg.__wbg_newwithbase_161c299e7a34e2eb=function(){return a(function(e,t,r,n){return new URL(c(e,t),c(r,n))},arguments)},e.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a=function(e,t,r){return new Uint8Array(e,t>>>0,r>>>0)},e.wbg.__wbg_scramtag_3a255d78b157986d=function(e){let t=p((0,i.N)(),n.__wbindgen_malloc,n.__wbindgen_realloc),r=u;g().setInt32(e+4,r,!0),g().setInt32(e+0,t,!0)},e.wbg.__wbg_set_bb8cecf6a62b9f46=function(){return a(function(e,t,r){return Reflect.set(e,t,r)},arguments)},e.wbg.__wbg_toString_5285597960676b7b=function(e){return e.toString()},e.wbg.__wbg_toString_c813bbd34d063839=function(e){return e.toString()},e.wbg.__wbindgen_boolean_get=function(e){return"boolean"==typeof e?+!!e:2},e.wbg.__wbindgen_error_new=function(e,t){return Error(c(e,t))},e.wbg.__wbindgen_init_externref_table=function(){let e=n.__wbindgen_export_2,t=e.grow(4);e.set(0,void 0),e.set(t+0,void 0),e.set(t+1,null),e.set(t+2,!0),e.set(t+3,!1)},e.wbg.__wbindgen_is_function=function(e){return"function"==typeof e},e.wbg.__wbindgen_memory=function(){return n.memory},e.wbg.__wbindgen_string_get=function(e,t){let r="string"==typeof t?t:void 0;var i=null==r?0:p(r,n.__wbindgen_malloc,n.__wbindgen_realloc),a=u;g().setInt32(e+4,a,!0),g().setInt32(e+0,i,!0)},e.wbg.__wbindgen_string_new=function(e,t){return c(e,t)},e.wbg.__wbindgen_throw=function(e,t){throw Error(c(e,t))},e}function v(e,t){return n=e.exports,E.__wbindgen_wasm_module=t,f=null,o=null,n.__wbindgen_start(),n}function x(e){if(void 0!==n)return n;void 0!==e&&(Object.getPrototypeOf(e)===Object.prototype?{module:e}=e:console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));let t=S();return e instanceof WebAssembly.Module||(e=new WebAssembly.Module(e)),v(new WebAssembly.Instance(e,t),e)}async function E(e){if(void 0!==n)return n;void 0!==e&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),void 0===e&&(e=new URL("wasm_bg.wasm",""));let t=S();("string"==typeof e||"function"==typeof Request&&e instanceof Request||"function"==typeof URL&&e instanceof URL)&&(e=fetch(e));let{instance:r,module:i}=await w(await e,t);return v(r,i)}}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},globalThis.$scramjetRequire=function(e){return r(409)(e)},globalThis.$scramjetLoadController=function(){return r(9052)},globalThis.$scramjetLoadClient=function(){return r(1323)},globalThis.$scramjetLoadWorker=function(){return r(7510)},globalThis.$scramjetVersion={build:"57ba89e",version:"1.1.0"},"document"in globalThis&&document?.currentScript&&document.currentScript.remove()})();
//# sourceMappingURL=scramjet.all.js.map