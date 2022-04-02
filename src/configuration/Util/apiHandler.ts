import type { NextApiResponse } from "next";
import type { NextApiCustomHandlerProps, NextApiError } from "@util/types";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export default class ApiHandler {
    private static setStatusCode<T = any>(res: NextApiResponse<NextApiCustomHandlerProps & T>, code: number) {
        return res.status(code);
    };
    /**
     * Returns an error json object to the client
     * @param {NextApiResponse} res The Next API response
     * @param {number} error `0` Bad Request (`400`) | `1` Internal Server Error (`500`)
     */
    public static sendError(res: NextApiResponse, error?: 0 | 1, response?: Partial<NextApiError>) {
        if (!error) error = 1;
        const returnResponse = ApiHandler.setStatusCode<NextApiError>(res, error == 1 ? 500 : 400);
        const errorMessage = response && response.errorMessage ? response.errorMessage : (error == 1 ? "An error happened on the server! Please try again!" : "Something wrent wrong! Please try again!");
        returnResponse.statusMessage = errorMessage;
        return returnResponse.json({ 
            success: false,  
            errorMessage: errorMessage,
            ...response
        });
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
     * Handles errors
     * @param {AxiosError<NextApiError>} error The error 
     */
    public static errorHandler(error: AxiosError<NextApiError>) {
        const { response, request }: AxiosError<NextApiError> = error;
        if (response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const { errorMessage } = response.data;
            toast.error(errorMessage);
        } else if (request) {
            // Something happened in setting up the request that triggered an Error
            toast.error("An error happened on the server! Please try again!");
        } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("An error happened on the server! Please try again!");
        };
    };
    /**
     * Handles errors of requests on the client side
     * 
     * Edit the error handler in `src/pages/_app.tsx` too  
     * @param {Function} exeCute The function to execute (asynchronously)
     */
    public static async clientSideErrorHandler(exeCute: Function) {
        try {
            await exeCute();
        } catch (error: any) {
            this.errorHandler(error);
        };
    };
};