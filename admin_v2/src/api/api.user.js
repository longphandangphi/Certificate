import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiUser {
    static getUserList(params) {
        return RequestHelper.get(appConfig.apiUrl + "users", params);
    }

    // static postUser(user) {
    //     return RequestHelper.post(appConfig.apiUrl + "users", user);
    // }

    static postUser(user) {
        return RequestHelper.post(appConfig.apiUrl + "sso/admin", user);
      }

    static updateUser(user) {
        return RequestHelper.put(
            appConfig.apiUrl + `users/${user.id}`,
            user
        );
    }

    static deleteUser(userId) {
        return RequestHelper.delete(appConfig.apiUrl + `users/${userId}`);
    }
}
