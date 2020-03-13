import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiCustomer {
  static getCustomerList(params) {
    return RequestHelper.get(appConfig.apiUrl + "customers", params);
  }

  static postCustomer(customer) {
    return RequestHelper.post(appConfig.apiUrl + "customers", customer);
  }

  static updateCustomer(customer) {
    return RequestHelper.put(appConfig.apiUrl + `customers/${customer.id}`, customer);
  }

  static deleteCustomer(customerId) {
    return RequestHelper.delete(appConfig.apiUrl + `customers/${customerId}`);
  }
}
