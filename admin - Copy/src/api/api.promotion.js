import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiPromotion {
  static getPromotionList(params) {
    return RequestHelper.get(appConfig.apiUrl + "promotions", params);
  }

  static postPromotion(promotion){
    return RequestHelper.post(appConfig.apiUrl + "promotions", promotion);
  }

  static updatePromotion(promotion) {
    return RequestHelper.put(
      appConfig.apiUrl + `promotions/${promotion.id}`,
      promotion
    );
  }

  static deletePromotion(promotionId) {
    return RequestHelper.delete(appConfig.apiUrl + `promotions/${promotionId}`);
  }
}
