import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiOrder {
  static getAllOrder() {
    return RequestHelper.get(appConfig.apiUrl + "orders/all");
  }

  static getOrderList(params) {
    return RequestHelper.get(appConfig.apiUrl + "orders", params);
  }

  static getDeletedOrderList(params) {
    return RequestHelper.get(appConfig.apiUrl + "orders/deleted", params);
  }

  static postOrder(order) {
    return RequestHelper.post(appConfig.apiUrl + "orders", order);
  }

  static updateOrder(order) {
    return RequestHelper.put(appConfig.apiUrl + `orders/${order.id}`, order);
  }

  static recordDeleteOrder(orderId) {
    return RequestHelper.delete(appConfig.apiUrl + `orders/${orderId}/recordDelete`);
  }

  static deleteOrder(orderId) {
    return RequestHelper.delete(appConfig.apiUrl + `orders/${orderId}`);
  }
}
