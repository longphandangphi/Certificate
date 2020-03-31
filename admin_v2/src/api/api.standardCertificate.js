import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiStandardCertificate {
  static getAllStandardCertificate() {
    return RequestHelper.get(appConfig.apiUrl + "standardOfCertificates");
  }

  static getStandardCertificateList(params) {
    return RequestHelper.get(appConfig.apiUrl + "standardOfCertificates", params);
  }

  static getDeletedStandardCertificateList(params) {
    return RequestHelper.get(appConfig.apiUrl + "standardOfCertificates/deleted", params);
  }

  static postStandardCertificate(standardOfCertificate) {
    return RequestHelper.post(appConfig.apiUrl + "standardOfCertificates", standardOfCertificate);
  }

  static updateStandardCertificate(standardOfCertificate) {
    return RequestHelper.put(
      appConfig.apiUrl + `standardOfCertificates/${standardOfCertificate.id}`,
      standardOfCertificate
    );
  }

  static recordDeleteStandardCertificate(standardOfCertificateId) {
    return RequestHelper.delete(appConfig.apiUrl + `standardOfCertificates/${standardOfCertificateId}/recordDelete`);
  }

  static deleteStandardCertificate(standardOfCertificateId) {
    return RequestHelper.delete(appConfig.apiUrl + `standardOfCertificates/${standardOfCertificateId}`);
  }
}
