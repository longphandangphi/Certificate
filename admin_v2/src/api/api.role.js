import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiRole {

    static getAllRole() {
        return RequestHelper.get(appConfig.apiUrl + 'roles/all');
    }

    static getRoleList(params) {
        return RequestHelper.get(appConfig.apiUrl + "roles", params);
    }

    static postRole(role) {
        return RequestHelper.post(appConfig.apiUrl + "roles", role);
    }

    static updateRole(role) {
        return RequestHelper.put(
            appConfig.apiUrl + `roles/${role.id}`,
            role
        );
    }

    static deleteRole(roleId) {
        return RequestHelper.delete(appConfig.apiUrl + `roles/${roleId}`);
    }
}
