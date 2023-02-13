import { Router } from "express"
import { checkQuantity } from "@src/controllers/cartController"

const router = Router()

router.get("/", checkQuantity)
/* router.get("/hello", (req, res) => {
  res.send("hello")
}) */

export default router
