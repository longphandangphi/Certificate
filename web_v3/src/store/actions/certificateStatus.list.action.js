export const GET_CERTIFICATE_STATUS_LIST = "[CERTIFICATE_STATUS_LIST] GET_CERTIFICATE_STATUS_LIST";
export const GET_CERTIFICATE_STATUS_LIST_SUCCESS = "[CERTIFICATE_STATUS_LIST] GET_CERTIFICATE_STATUS_LIST_SUCCESS";
export const GET_CERTIFICATE_STATUS_LIST_FAILED = "[CERTIFICATE_STATUS_LIST] GET_CERTIFICATE_STATUS_LIST_FAILED";
export const GET_DELETED_CERTIFICATE_STATUS_LIST = "[CERTIFICATE_STATUS_LIST] GET_DELETED_CERTIFICATE_STATUS_LIST";
export const GET_DELETED_CERTIFICATE_STATUS_LIST_SUCCESS =
  "[CERTIFICATE_STATUS_LIST] GET_DELETED_CERTIFICATE_STATUS_LIST_SUCCESS";
export const GET_DELETED_CERTIFICATE_STATUS_LIST_FAILED =
  "[CERTIFICATE_STATUS_LIST] GET_DELETED_CERTIFICATE_STATUS_LIST_FAILED";

export const getCertificateStatusList = params => {
  return {
    type: GET_CERTIFICATE_STATUS_LIST,
    payload: {
      params
    }
  };
};

export const getCertificateStatusListSuccess = params => {
  return {
    type: GET_CERTIFICATE_STATUS_LIST_SUCCESS,
    payload: params
  };
};

export const getCertificateStatusListFailed = () => {
  return {
    type: GET_CERTIFICATE_STATUS_LIST_FAILED
  };
};

export const getDeletedCertificateStatusList = params => {
  return {
    type: GET_DELETED_CERTIFICATE_STATUS_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedCertificateStatusListSuccess = params => {
  return {
    type: GET_DELETED_CERTIFICATE_STATUS_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedCertificateStatusListFailed = () => {
  return {
    type: GET_DELETED_CERTIFICATE_STATUS_LIST_FAILED
  };
};
