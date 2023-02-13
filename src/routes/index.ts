import { Router } from "express"
import cartRoute from "./cart"
import orderRouter from "./order"

const router = Router()

/* GET home page. */
// router.use("/auth", require("./users"))
// router.use("/products", require("./products"))
router.use("/cart", cartRoute)
router.use("/order", orderRouter)

export default router
