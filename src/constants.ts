import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const MONGODB_URI = process.env.MONGO_URI!;
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME || "";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
export const EMAIL_BATCH_SIZE = Number(process.env.EMAIL_BATCH_SIZE) || 30;
