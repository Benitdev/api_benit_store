import { Router } from "express"
import { checkQuantity } from "@src/controllers/cartController"

const router = Router()

router.post("/check", checkQuantity)
/* router.get("/hello", (req, res) => {
  res.send("hello")
}) */

export default router
