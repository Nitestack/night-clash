import type { NextApiResponse } from "next";
import type { NextApiCustomHandlerProps } from "@util/types";

export default class ApiHandler {
    private static setStatusCode(res: NextApiResponse<NextApiCustomHandlerProps & any>, code: number) {
        return res.status(code);
    };
    /**
     * Returns an error json object to the client
     * @param {NextApiResponse} res The Next API response
     * @param {number} error `0` Bad Request (`400`) | `1` Internal Server Error (`500`)
     * @param {string?} errorMessage An optional error message to pass the user
     */
    public static sendError(res: NextApiResponse<NextApiCustomHandlerProps & any>, error?: 0 | 1, response?: {
        errorMessage?: string, redirectUrl?: string
    }) {
        if (!error) error = 0;
        if (!response) response = {};
        if (!response.errorMessage) response.errorMessage = error == 0 ? "Bad Request" : "Internal Server Error";
        const returnResponse = ApiHandler.setStatusCode(res, error == 0 ? 400 : 500);
        returnResponse.statusMessage = response.errorMessage;
        return returnResponse.json({ success: false, ...response });
    };
    /**
     * Returns an successful json object to the client
     * @param {NextApiResponse} res The Next API Response 
     * @param sendObject The object to be sent to the client 
     */
    public static sendSuccess<SendObject>(res: NextApiResponse<NextApiCustomHandlerProps & SendObject>, sendObject: SendObject & { [key: string]: any; }) {
        return ApiHandler.setStatusCode(res, 200).json({
            success: true,
            ...sendObject
        });
    };
};