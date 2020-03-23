import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiArticleCategory {
  static getAllArticleCategory() {
    return RequestHelper.get(appConfig.apiUrl + "articleCategories");
  }

  static getArticleCategoryList(params) {
    return RequestHelper.get(appConfig.apiUrl + "articleCategories", params);
  }

  static getDeletedArticleCategoryList(params) {
    return RequestHelper.get(appConfig.apiUrl + "articleCategories/deleted", params);
  }

  static postArticleCategory(articleCategory) {
    return RequestHelper.post(appConfig.apiUrl + "articleCategories", articleCategory);
  }

  static updateArticleCategory(articleCategory) {
    return RequestHelper.put(appConfig.apiUrl + `articleCategories/${articleCategory.id}`, articleCategory);
  }

  static recordDeleteArticleCategory(articleCategoryId) {
    return RequestHelper.delete(appConfig.apiUrl + `articleCategories/${articleCategoryId}/recordDelete`);
  }

  static deleteArticleCategory(articleCategoryId) {
    return RequestHelper.delete(appConfig.apiUrl + `articleCategories/${articleCategoryId}`);
  }
}
