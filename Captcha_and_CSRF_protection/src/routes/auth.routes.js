import express from "express";
import { validateCaptcha } from "../middlewares/validateCaptcha.middleware.js";
import { generateCaptcha } from "../services/captcha.service.js";
import registerUser from "../services/userRegistration.service.js";

const authRouter = express.Router();

authRouter.post("/register" , validateCaptcha , registerUser);
authRouter.get("/captcha" , generateCaptcha);

export default authRouter;