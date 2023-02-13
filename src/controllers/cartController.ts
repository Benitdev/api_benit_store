import Product from "@src/models/Product"
import type { Request, Response } from "express"

type Body = {
  _id: string
  size: number
  quantity: number
}
export const checkQuantity = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { _id, size, quantity }: Body = req.body
    const product = await Product.findById(_id)
    const existProductSize = product?.countInStock.find(
      (item) => item.size == size
    )
    if (existProductSize!.count >= quantity)
      res.status(200).json({ message: "Ok" })
    else res.status(400).json({ message: "Out of stock" })
  } catch (err) {
    res.status(500).json(err)
  }
}
