"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    available: { type: Boolean, required: true },
    dominant: { type: String, required: true },
    thcPercent: { type: Map, required: true },
    cbdPercent: { type: Map, required: true },
    source: { type: String, required: true },
    thcGram: { type: Map, required: false },
    cbdGram: { type: Map, required: false },
    description: { type: String, required: true },
});
exports.default = mongoose_1.default.model('Product', ProductSchema);
