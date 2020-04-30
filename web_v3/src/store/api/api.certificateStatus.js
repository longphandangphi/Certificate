import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiCertificateStatus {
  static getAllCertificateStatus() {
    return RequestHelper.get(appConfig.apiUrl + "certificateStatuses");
  }

  static getCertificateStatusList(params) {
    return RequestHelper.get(appConfig.apiUrl + "certificateStatuses", params);
  }

  static getDeletedCertificateStatusList(params) {
    return RequestHelper.get(appConfig.apiUrl + "certificateStatuses/deleted", params);
  }

  static postCertificateStatus(certificateStatus) {
    return RequestHelper.post(appConfig.apiUrl + "certificateStatuses", certificateStatus);
  }

  static updateCertificateStatus(certificateStatus) {
    return RequestHelper.put(appConfig.apiUrl + `certificateStatuses/${certificateStatus.id}`, certificateStatus);
  }

  static recordDeleteCertificateStatus(certificateStatusId) {
    return RequestHelper.delete(appConfig.apiUrl + `certificateStatuses/${certificateStatusId}/recordDelete`);
  }

  static deleteCertificateStatus(certificateStatusId) {
    return RequestHelper.delete(appConfig.apiUrl + `certificateStatuses/${certificateStatusId}`);
  }
}
