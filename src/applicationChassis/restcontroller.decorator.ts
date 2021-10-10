import { Router } from "express";
import ServerConfiguration from "./server.configuration";

function RestcontrollerDecorator(resourceUrl: string): any {
    return function provideRouteHandler<T extends { new(...args: any[]): any }>(target: T): T {
        // @ts-ignore
        return class RouteProvidedController extends target {

            constructor(server: ServerConfiguration) {
                super(server);
                this.configureAndRegisterRouter(server);
            }

            private configureAndRegisterRouter(server: ServerConfiguration) {
                const self = this;
                target.prototype.router = Router();

                // bind
                target.prototype._routes.forEach((route: any) => {
                    target.prototype.router.route(route.url)[route.method](route.handler.value.bind(self));
                });

                // Add route to server
                server.addRoute(resourceUrl, target.prototype.router);

            }

        };
    };
}

export { RestcontrollerDecorator };
