import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiTable {
  static getTableList(params) {
    return RequestHelper.get(appConfig.apiUrl + "tables", params);
  }

  static getDeletedTableList(params) {
    return RequestHelper.get(appConfig.apiUrl + "tables/deleted", params);
  }

  static postTable(table) {
    return RequestHelper.post(appConfig.apiUrl + "tables", table);
  }

  static updateTable(table) {
    return RequestHelper.put(appConfig.apiUrl + `tables/${table.id}`, table);
  }

  static recordDeleteTable(tableId) {
    return RequestHelper.delete(appConfig.apiUrl + `tables/${tableId}/recordDelete`);
  }

  static deleteTable(tableId) {
    return RequestHelper.delete(appConfig.apiUrl + `tables/${tableId}`);
  }
}
