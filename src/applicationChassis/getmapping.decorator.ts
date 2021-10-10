import { Request, Response } from "express";

function PostMapping(param?: string): any {
    param = param || "/";
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (request: Request,
                                     response: Response,
                                     func: Function) {
            const resultPromise: Promise<any> = originalMethod.call(this, request.body);
            resultPromise
                .then((result: any) => {
                    response.status(200).json(result);
                }).catch((error: Error) => {
                response.status(500).json(error);
            });
        };
        target._routes = target._routes || [];
        target._routes.push({url: param, method: "post", handler: descriptor});
        return descriptor;
    };
}

export { PostMapping };
