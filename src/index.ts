import express from "express";
import axios from "axios";
import cors from "cors";
import { prisma } from "./db";

const PORT = 8000;

const app = express();
app.use(cors());

type APIData = {
    base_unit: string;
    quote_unit: string;
    low: string;
    high: string;
    last: string;
    type: string;
    open: string;
    volume: string;
    sell: string;
    buy: string;
    at: string;
    name: string;
}[];

app.post("/", async (req, res) => {
    try {
        const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
        const data: APIData = await response.data;

        const topData: APIData = Object.values(data).slice(0, 10);

        const finalData = topData.map((record) => ({
            name: record.name,
            last: record.last,
            buy: record.buy,
            sell: record.sell,
            volume: record.volume,
            base_unit: record.base_unit,
        }));

        await prisma.info.deleteMany({});

        const info = await prisma.info.createManyAndReturn({
            data: finalData,
        });

        return res.json(info);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT);
