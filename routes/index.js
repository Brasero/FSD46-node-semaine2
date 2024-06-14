import express from "express";
import userRoutes from "./userRoutes.js";

const router = express.Router()

router.use("/",userRoutes)

router.all("*", (req,res) => {
  res.status(404).send("Page not found");
})
export default router