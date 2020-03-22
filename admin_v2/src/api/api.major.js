import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiMajor {
  static getAllMajor() {
    return RequestHelper.get(appConfig.apiUrl + "majors");
  }

  static getMajorList(params) {
    return RequestHelper.get(appConfig.apiUrl + "majors", params);
  }

  static getDeletedMajorList(params) {
    return RequestHelper.get(appConfig.apiUrl + "majors/deleted", params);
  }

  static postMajor(major) {
    return RequestHelper.post(appConfig.apiUrl + "majors", major);
  }

  static updateMajor(major) {
    return RequestHelper.put(appConfig.apiUrl + `majors/${major.id}`, major);
  }

  static recordDeleteMajor(majorId) {
    return RequestHelper.delete(appConfig.apiUrl + `majors/${majorId}/recordDelete`);
  }

  static deleteMajor(majorId) {
    return RequestHelper.delete(appConfig.apiUrl + `majors/${majorId}`);
  }
}
