import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiFaculty {
  static getAllFaculty() {
    return RequestHelper.get(appConfig.apiUrl + "faculties");
  }

  static getFacultyList(params) {
    return RequestHelper.get(appConfig.apiUrl + "faculties", params);
  }

  static getDeletedFacultyList(params) {
    return RequestHelper.get(appConfig.apiUrl + "faculties/deleted", params);
  }

  static postFaculty(faculty) {
    return RequestHelper.post(appConfig.apiUrl + "faculties", faculty);
  }

  static updateFaculty(faculty) {
    return RequestHelper.put(appConfig.apiUrl + `faculties/${faculty.id}`, faculty);
  }

  static recordDeleteFaculty(facultyId) {
    return RequestHelper.delete(appConfig.apiUrl + `faculties/${facultyId}/recordDelete`);
  }

  static deleteFaculty(facultyId) {
    return RequestHelper.delete(appConfig.apiUrl + `faculties/${facultyId}`);
  }
}
