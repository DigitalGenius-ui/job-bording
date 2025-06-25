export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT!;
export const FRONTEND_URL = process.env.FRONTEND_URL!;
export const NODE_ENV = process.env.NODE_ENV!;

// resend email
export const EMAIL_SENDER = process.env.EMAIL_SENDER!;
export const RESEND_API_KEY = process.env.RESEND_API_KEY!;

// auth keys
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

// cloudinary keys
export const CLOUD_NAME = () => process.env.CLOUD_NAME!;
export const CLOUD_API_KEY = () => process.env.CLOUD_API_KEY!;
export const CLOUD_SECRET_KEY = () => process.env.CLOUD_SECRET_KEY!;
