export const GET_REPORT_LIST = "[REPORT_LIST] GET_REPORT_LIST";
export const GET_REPORT_LIST_SUCCESS = "[REPORT_LIST] GET_REPORT_LIST_SUCCESS";
export const GET_REPORT_LIST_FAILED = "[REPORT_LIST] GET_REPORT_LIST_FAILED";
export const GET_DELETED_REPORT_LIST = "[REPORT_LIST] GET_DELETED_REPORT_LIST";
export const GET_DELETED_REPORT_LIST_SUCCESS = "[REPORT_LIST] GET_DELETED_REPORT_LIST_SUCCESS";
export const GET_DELETED_REPORT_LIST_FAILED = "[REPORT_LIST] GET_DELETED_REPORT_LIST_FAILED";

export const getReportList = params => {
  return {
    type: GET_REPORT_LIST,
    payload: {
      params
    }
  };
};

export const getReportListSuccess = params => {
  return {
    type: GET_REPORT_LIST_SUCCESS,
    payload: params
  };
};

export const getReportListFailed = () => {
  return {
    type: GET_REPORT_LIST_FAILED
  };
};

export const getDeletedReportList = params => {
  return {
    type: GET_DELETED_REPORT_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedReportListSuccess = params => {
  return {
    type: GET_DELETED_REPORT_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedReportListFailed = () => {
  return {
    type: GET_DELETED_REPORT_LIST_FAILED
  };
};
