import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiSpecialty {
  static getAllSpecialty() {
    return RequestHelper.get(appConfig.apiUrl + "specialties");
  }

  static getSpecialtyList(params) {
    return RequestHelper.get(appConfig.apiUrl + "specialties", params);
  }

  static getDeletedSpecialtyList(params) {
    return RequestHelper.get(appConfig.apiUrl + "specialties/deleted", params);
  }

  static postSpecialty(specialty) {
    return RequestHelper.post(appConfig.apiUrl + "specialties", specialty);
  }

  static updateSpecialty(specialty) {
    return RequestHelper.put(appConfig.apiUrl + `specialties/${specialty.id}`, specialty);
  }

  static recordDeleteSpecialty(specialtyId) {
    return RequestHelper.delete(appConfig.apiUrl + `specialties/${specialtyId}/recordDelete`);
  }

  static deleteSpecialty(specialtyId) {
    return RequestHelper.delete(appConfig.apiUrl + `specialties/${specialtyId}`);
  }
}
