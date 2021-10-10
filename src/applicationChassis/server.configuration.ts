import express from "express";
import http from "http";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import * as bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";


class ServerConfiguration {

    public port: number | string;
    protected app: express.Application;
    protected server: http.Server;
    private routes: string[] = [];
    private corsOptions = {
        origin: "https://challange-getir.herokuapp.com/",
        optionsSuccessStatus: 200
    };


    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.app.set("port", port);
        this.config();
    }

    public addRoute(routeUrl: string, routerHandler: express.Router): void {
        if (this.routes.indexOf(routeUrl) === -1) {
            this.routes.push(routeUrl);
            this.app.use(routeUrl, routerHandler);
        }
    }

    public getRoutes(): string[] {
        return this.routes;
    }

    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            // @ts-ignore
            console.log(("App is running at http://localhost:%d in %s mode"), this.app.get("port"), this.app.get("env"));
        });
    }

    private config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(logger("combined"));

        this.app.use(cors(this.corsOptions));
        this.app.use(express.json());
        this.server = http.createServer(this.app);
        this.configOpenApi();
        this.app.use(helmet());


    }

    private configOpenApi() {
        const yamlSpecFile = "./openapi.yml";
        const apiDefinition = YAML.load(yamlSpecFile);
        this.app.use(
            "/docs",
            swaggerUi.serve,
            swaggerUi.setup(apiDefinition)
        );

    }
}

export default ServerConfiguration;
