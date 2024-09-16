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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const PORT = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.wazirx.com/api/v2/tickers");
        const data = yield response.data;
        const topData = Object.values(data).slice(0, 10);
        const finalData = topData.map((record) => ({
            name: record.name,
            last: record.last,
            buy: record.buy,
            sell: record.sell,
            volume: record.volume,
            base_unit: record.base_unit,
        }));
        yield db_1.prisma.info.deleteMany({});
        const info = yield db_1.prisma.info.createManyAndReturn({
            data: finalData,
        });
        return res.json(info);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
app.listen(PORT);
