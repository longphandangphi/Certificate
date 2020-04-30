import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiClass {
  static getAllClass() {
    return RequestHelper.get(appConfig.apiUrl + "classes");
  }

  static getClassList(params) {
    return RequestHelper.get(appConfig.apiUrl + "classes", params);
  }

  static getDeletedClassList(params) {
    return RequestHelper.get(appConfig.apiUrl + "classes/deleted", params);
  }

  static postClass(classObj) {
    return RequestHelper.post(appConfig.apiUrl + "classes", classObj);
  }

  static updateClass(classObj) {
    return RequestHelper.put(appConfig.apiUrl + `classes/${classObj.id}`, classObj);
  }

  static recordDeleteClass(classObjId) {
    return RequestHelper.delete(appConfig.apiUrl + `classes/${classObjId}/recordDelete`);
  }

  static deleteClass(classObjId) {
    return RequestHelper.delete(appConfig.apiUrl + `classes/${classObjId}`);
  }
}
