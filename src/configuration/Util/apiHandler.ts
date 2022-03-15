import type { NextApiResponse } from "next";
import type { NextApiCustomHandlerProps } from "@util/types";

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
};