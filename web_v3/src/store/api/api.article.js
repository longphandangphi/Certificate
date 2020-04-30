import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiArticle {
  static getAllArticle() {
    return RequestHelper.get(appConfig.apiUrl + "articles/all");
  }

  static getArticleList(params) {
    return RequestHelper.get(appConfig.apiUrl + "articles", params);
  }

  static getDeletedArticleList(params) {
    return RequestHelper.get(appConfig.apiUrl + "articles/deleted", params);
  }

  static postArticle(article) {
    return RequestHelper.post(appConfig.apiUrl + "articles", article);
  }

  static updateArticle(article) {
    return RequestHelper.put(appConfig.apiUrl + `articles/${article.id}`, article);
  }

  static recordDeleteArticle(articleId) {
    return RequestHelper.delete(appConfig.apiUrl + `articles/${articleId}/recordDelete`);
  }

  static deleteArticle(articleId) {
    return RequestHelper.delete(appConfig.apiUrl + `articles/${articleId}`);
  }
}
