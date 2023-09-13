import dotenv from "dotenv";

dotenv.config();

const DSN = process.env.DSN || "mongodb://127.0.0.1:27017/employees";

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1338;

export const config = {
    mongo: {
        url: DSN
    },
    server: {
        port: SERVER_PORT
    }
};
