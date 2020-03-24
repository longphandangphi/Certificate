import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiExtracurricular {
  static getAllExtracurricular() {
    return RequestHelper.get(appConfig.apiUrl + "extracurriculars/all");
  }

  static getExtracurricularList(params) {
    return RequestHelper.get(appConfig.apiUrl + "extracurriculars", params);
  }

  static getDeletedExtracurricularList(params) {
    return RequestHelper.get(appConfig.apiUrl + "extracurriculars/deleted", params);
  }

  static postExtracurricular(extracurricular) {
    return RequestHelper.post(appConfig.apiUrl + "extracurriculars", extracurricular);
  }

  static updateExtracurricular(extracurricular) {
    return RequestHelper.put(appConfig.apiUrl + `extracurriculars/${extracurricular.id}`, extracurricular);
  }

  static recordDeleteExtracurricular(extracurricularId) {
    return RequestHelper.delete(appConfig.apiUrl + `extracurriculars/${extracurricularId}/recordDelete`);
  }

  static deleteExtracurricular(extracurricularId) {
    return RequestHelper.delete(appConfig.apiUrl + `extracurriculars/${extracurricularId}`);
  }
}
