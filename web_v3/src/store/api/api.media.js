import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiMedia {
  // static postMedia(folder, fileName, file) {
  //   return RequestHelper.post(appConfig.apiUrl + "media", folder, fileName, file);
  // }

  static getArticleList(folder, fileName) {
    return RequestHelper.get(appConfig.apiUrl + `media/${folder}/${fileName}`);
  }
}
