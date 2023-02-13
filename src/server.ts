import cookieParser from "cookie-parser"
import morgan from "morgan"
import path from "path"
import helmet from "helmet"
import express, { Request, Response, NextFunction } from "express"

import "express-async-errors"

import logger from "jet-logger"
import EnvVars from "@src/declarations/major/EnvVars"
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes"
import { NodeEnvs } from "@src/declarations/enums"
import { RouteError } from "@src/declarations/classes"

//Apollo Server
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors"
import { json } from "body-parser"
import { readFileSync } from "fs"

import type { Resolvers } from "./generated/resolvers-types"
import resolvers from "./graphql/resolvers"

import indexRouter from "./routes"

const typeDefs = readFileSync("./src/graphql/schema.graphql", {
  encoding: "utf-8",
})

// **** Init express **** //

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startServer = async () => {
  await server.start()
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      // eslint-disable-next-line @typescript-eslint/require-await
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  )
}
startServer()
// **** Set basic express settings **** //

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(EnvVars.cookieProps.secret))
app.use(express.static(path.join(__dirname, "public")))

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan("dev"))
}

// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet())
}

// **** Add API routes **** //

// Add APIs
app.use("/api/v1", indexRouter)

// Setup error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    logger.err(err, true)
    let status = HttpStatusCodes.BAD_REQUEST
    if (err instanceof RouteError) {
      status = err.status
    }
    return res.status(status).json({ error: err.message })
  }
)

// **** Export default **** //

export default app
