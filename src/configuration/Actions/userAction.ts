import Util from "@util/index";
import type { AppDispatch } from "@util/types";

export function loadUser(email: string, user) {
    return async function(dispatch: AppDispatch) {
        try {
            dispatch(Util.StateManagement.loadUserRequest());
            const { data } = await Util.Axios.post(`/api/user/profile`, { email: email });
            dispatch(Util.StateManagement.loadUserSuccess(data || user));
        } catch (error: any) {
            dispatch(Util.StateManagement.loadUserFail(error.response && error.response.data.message ? error.response.data.message : error.message))
        };
    };
};