import { appConfig } from "../config/app.config";
import RequestHelper from "../helpers/request.helper";

export default class ApiReview {
    static getReviewList(params) {
        return RequestHelper.get(appConfig.apiUrl + "reviews", params);
    }

    static postReview(review) {
        return RequestHelper.post(appConfig.apiUrl + "reviews", review);
    }

    static updateReview(review) {
        return RequestHelper.put(
            appConfig.apiUrl + `reviews/${review.id}`,
            review
        );
    }

    static deleteReview(reviewId) {
        return RequestHelper.delete(appConfig.apiUrl + `reviews/${reviewId}`);
    }
}
