import express from "express";
import { ContactForm } from "../Controllers/contactCont.js";

const router = express.Router();

router.post('/contact', ContactForm);

export default router;