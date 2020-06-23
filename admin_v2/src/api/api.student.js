import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiStudent {
  static getAllStudent() {
    return RequestHelper.get(appConfig.apiUrl + "students/all");
  }

  static getStudentList(params) {
    return RequestHelper.get(appConfig.apiUrl + "students/noPagination", params);
  }

  static getStudentList2(params) {
    return RequestHelper.get(appConfig.apiUrl + "students", params);
  }

  static getDeletedStudentList(params) {
    return RequestHelper.get(appConfig.apiUrl + "students/deleted", params);
  }

  static postStudent(student) {
    return RequestHelper.post(appConfig.apiUrl + "sso/student", student);
  }

  static updateStudent(student) {
    return RequestHelper.put(appConfig.apiUrl + `students/${student.id}`, student);
  }

  static recordDeleteStudent(studentId) {
    return RequestHelper.delete(appConfig.apiUrl + `students/${studentId}/recordDelete`);
  }

  static deleteStudent(studentId) {
    return RequestHelper.delete(appConfig.apiUrl + `students/${studentId}`);
  }
}
