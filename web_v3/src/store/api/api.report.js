import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiReport {
  static getAllReport() {
    return RequestHelper.get(appConfig.apiUrl + "reports/all");
  }

  static getReportList(params) {
    return RequestHelper.get(appConfig.apiUrl + "reports", params);
  }

  static getDeletedReportList(params) {
    return RequestHelper.get(appConfig.apiUrl + "reports/deleted", params);
  }

  static postReport(report) {
    return RequestHelper.post(appConfig.apiUrl + "reports", report);
  }

  static updateReport(report) {
    return RequestHelper.put(appConfig.apiUrl + `reports/${report.id}`, report);
  }

  static recordDeleteReport(reportId) {
    return RequestHelper.delete(appConfig.apiUrl + `reports/${reportId}/recordDelete`);
  }

  static deleteReport(reportId) {
    return RequestHelper.delete(appConfig.apiUrl + `reports/${reportId}`);
  }
}
