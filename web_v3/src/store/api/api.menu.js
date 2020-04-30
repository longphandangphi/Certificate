import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiMenu {
  static getAllMenu() {
    return RequestHelper.get(appConfig.apiUrl + "menus/all");
  }

  static getMenuList(params) {
    return RequestHelper.get(appConfig.apiUrl + "menus", params);
  }

  static getDeletedMenuList(params) {
    return RequestHelper.get(appConfig.apiUrl + "menus/deleted", params);
  }

  static postMenu(menu) {
    return RequestHelper.post(appConfig.apiUrl + "menus", menu);
  }

  static updateMenu(menu) {
    return RequestHelper.put(appConfig.apiUrl + `menus/${menu.id}`, menu);
  }

  static recordDeleteMenu(menuId) {
    return RequestHelper.delete(appConfig.apiUrl + `menus/${menuId}/recordDelete`);
  }

  static deleteMenu(menuId) {
    return RequestHelper.delete(appConfig.apiUrl + `menus/${menuId}`);
  }
}
