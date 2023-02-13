import Product from "@src/models/Product"

type productParams = {
  category: string
  style: string
  gender: string
  size: number[]
  search: string
  isSlide: boolean
  isDiscount: boolean
  isBestSale: boolean
  isNew: boolean
  isTopRate: boolean
  limit: number
  skip: number
}

export default {
  products: async (
    _: any,
    {
      category,
      style,
      gender,
      size,
      search,
      isSlide,
      isDiscount,
      isBestSale,
      isTopRate,
      isNew,
      limit = 0,
      skip = 0,
    }: productParams
  ) => {
    console.log({
      category,
      style,
      gender,
      size,
      search,
      isSlide,
      isDiscount,
      isBestSale,
      isTopRate,
    })
    if (isDiscount) return Product.find({ isFeatured: isDiscount }).limit(limit)
    if (isSlide) return Product.find({ isSlide })
    if (isNew) return Product.find().sort({ createdAd: -1 }).limit(limit)
    if (isTopRate) return Product.find().sort({ rating: -1 }).limit(limit)

    const criteria = []
    const styleRegex = new RegExp(`${style || ""}`, "g")
    if (category && category != "products") criteria.push({ category })
    if (style) criteria.push({ childrenCategory: styleRegex })
    if (gender && (category == "products" || category == "sales"))
      criteria.push({ category: gender })
    if (search) criteria.push({ name: new RegExp(`${search}`, "i") })
    const query = criteria.length > 0 ? { $and: criteria } : {}
    return Product.find(query).limit(limit).skip(skip)
  },
  productDetail: async (_: any, { slug }: { slug: string }) => {
    return Product.findOne({ slug }).lean()
  },
}
