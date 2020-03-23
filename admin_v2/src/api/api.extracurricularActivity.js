import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiExtracurricularActivity {
  static getAllExtracurricularActivity() {
    return RequestHelper.get(appConfig.apiUrl + "extracurricularActivities");
  }

  static getExtracurricularActivityList(params) {
    return RequestHelper.get(appConfig.apiUrl + "extracurricularActivities", params);
  }

  static getDeletedExtracurricularActivityList(params) {
    return RequestHelper.get(appConfig.apiUrl + "extracurricularActivities/deleted", params);
  }

  static postExtracurricularActivity(extracurricularActivity) {
    return RequestHelper.post(appConfig.apiUrl + "extracurricularActivities", extracurricularActivity);
  }

  static updateExtracurricularActivity(extracurricularActivity) {
    return RequestHelper.put(
      appConfig.apiUrl + `extracurricularActivities/${extracurricularActivity.id}`,
      extracurricularActivity
    );
  }

  static recordDeleteExtracurricularActivity(extracurricularActivityId) {
    return RequestHelper.delete(
      appConfig.apiUrl + `extracurricularActivities/${extracurricularActivityId}/recordDelete`
    );
  }

  static deleteExtracurricularActivity(extracurricularActivityId) {
    return RequestHelper.delete(appConfig.apiUrl + `extracurricularActivities/${extracurricularActivityId}`);
  }
}
