import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiItem {
  static getItemList(params) {
    return RequestHelper.get(appConfig.apiUrl + "items", params);
  }

  static postItem(item) {
    return RequestHelper.post(appConfig.apiUrl + "items", item);
  }

  static updateItem(item) {
    return RequestHelper.put(appConfig.apiUrl + `items/${item.id}`, item);
  }

  static deleteItem(itemId) {
    return RequestHelper.delete(appConfig.apiUrl + `items/${itemId}`);
  }
}
