import type { NextApiResponse } from "next";
import type { NextApiCustomHandlerProps } from "@util/types";
import { toast } from "react-toastify";
import type { NextRouter } from "next/router";

export default class ApiHandler {
    private static setStatusCode<T = any>(res: NextApiResponse<NextApiCustomHandlerProps & T>, code: number) {
        return res.status(code);
    };
    /**
     * Returns an error json object to the client
     * @param {NextApiResponse} res The Next API response
     * @param {number} error `0` Bad Request (`400`) | `1` Internal Server Error (`500`)
     */
    public static sendError(res: NextApiResponse, error?: 0 | 1, response?: { errorMessage?: string, redirectUrl?: string }) {
        if (!error) error = 0;
        if (!response) response = {};
        if (!response.errorMessage) response.errorMessage = error == 0 ? "Bad Request" : "Internal Server Error";
        const returnResponse = ApiHandler.setStatusCode<{
            errorMessage?: string,
            redirectUrl?: string
        }>(res, error == 0 ? 400 : 500);
        returnResponse.statusMessage = response.errorMessage;
        return returnResponse.json({ success: false });
    };
    /**
     * Returns an successful json object to the client
     * @param {NextApiResponse} res The Next API Response 
     * @param sendObject The object to be sent to the client 
     */
    public static sendSuccess<SendObject>(res: NextApiResponse, sendObject: SendObject & { [key: string]: any; }) {
        return ApiHandler.setStatusCode<NextApiCustomHandlerProps & SendObject>(res, 200).json({
            success: true,
            ...sendObject
        });
    };
    /**
     * Handles errors of requests on the client side
     * 
     * Edit the error handler in `src/pages/_app.tsx` too  
     * @param {Function} exeCute The function to execute (asynchronously) 
     * @param {NextRouter} router The Next Router object 
     */
    public static async clientSideErrorHandler(exeCute: Function, router?: NextRouter) {
        try {
            await exeCute();
        } catch (error: any) {
            const { response, request } = error;
            if (response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const { data } = response;
                const redirectUrl: string | undefined = data.redirectUrl;
                const errorMessage: string = data.errorMessage;
                if (redirectUrl && router) {
                    router.push(redirectUrl);
                } else toast.error(errorMessage);
            } else if (request) {
                // Something happened in setting up the request that triggered an Error
                toast.error("An error happened on the server! Please try again!");
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error("An error happened on the server! Please try again!");
            };
        };
    };
};