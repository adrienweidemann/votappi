import { Server, IncomingMessage, ServerResponse } from "http";
import path from "path";
import { fastify, FastifyInstance } from "fastify";
import autoLoad from "@fastify/autoload";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastifyFormbody from "@fastify/formbody";
import pino from "pino";

import errorMiddleware from "./middleware/error.middleware";
import GLOBAL from "./constants/global.constant";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      token: string;
    };
  }
}

class App {
  public readonly server: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  public readonly logger: pino.Logger;
  private port: number;
  private host: string;

  constructor(port: number, host: string) {
    this.logger = pino({
      enabled: true,
      level: "info",
      formatters: {
        level: (label: string): { level: string } => {
          return { level: label };
        }
      }
    });

    this.server = fastify({
      logger: this.logger
    });

    this.port = port;
    this.host = host;

    this.init();
  }

  public async listen(): Promise<void> {
    try {
      await this.server.listen({ port: this.port, host: this.host });

      console.log(`Server listening on ${this.host}:${this.port}`);
    } catch (err) {
      this.server.log.error(err);
      process.exit(1);
    }
  }

  private init(): void {
    this.initErrorMiddleware();
    this.initRoutes();
    this.initMiddleware();
  }

  private initRoutes(): void {
    const API_VERSION: string = "v1";

    this.server.register(autoLoad, {
      dir: path.join(__dirname, "routes"),
      options: { prefix: `/${API_VERSION}` }
    });
  }

  private initMiddleware(): void {
    this.server.register(helmet);

    this.server.register(cors, {
      methods: ["HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", GLOBAL.API_KEY.HEADER_KEY_NAME]
    });

    this.server.register(fastifyFormbody);
  }

  private initErrorMiddleware(): void {
    this.server.setErrorHandler(errorMiddleware);
  }
}

export default App;
