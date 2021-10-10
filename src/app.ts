import ServerConfiguration from "./applicationChassis/server.configuration";
import RecordController from "./record/record.controller";
import * as dotenv from "dotenv";

if (!process.env.PRODUCTION) {
    dotenv.config({path: ".env.dev"});
}
const app = new ServerConfiguration(parseInt(<string>process.env.PORT, 10) || 8080);

const recordController = new RecordController(app);

app.start();
