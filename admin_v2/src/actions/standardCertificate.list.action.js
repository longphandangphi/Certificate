export const GET_STANDARD_CERTIFICATE_LIST = "[STANDARD_CERTIFICATE_LIST] GET_STANDARD_CERTIFICATE_LIST";
export const GET_STANDARD_CERTIFICATE_LIST_SUCCESS =
  "[STANDARD_CERTIFICATE_LIST] GET_STANDARD_CERTIFICATE_LIST_SUCCESS";
export const GET_STANDARD_CERTIFICATE_LIST_FAILED = "[STANDARD_CERTIFICATE_LIST] GET_STANDARD_CERTIFICATE_LIST_FAILED";
export const GET_DELETED_STANDARD_CERTIFICATE_LIST =
  "[STANDARD_CERTIFICATE_LIST] GET_DELETED_STANDARD_CERTIFICATE_LIST";
export const GET_DELETED_STANDARD_CERTIFICATE_LIST_SUCCESS =
  "[STANDARD_CERTIFICATE_LIST] GET_DELETED_STANDARD_CERTIFICATE_LIST_SUCCESS";
export const GET_DELETED_STANDARD_CERTIFICATE_LIST_FAILED =
  "[STANDARD_CERTIFICATE_LIST] GET_DELETED_STANDARD_CERTIFICATE_LIST_FAILED";

export const getStandardCertificateList = params => {
  return {
    type: GET_STANDARD_CERTIFICATE_LIST,
    payload: {
      params
    }
  };
};

export const getStandardCertificateListSuccess = params => {
  return {
    type: GET_STANDARD_CERTIFICATE_LIST_SUCCESS,
    payload: params
  };
};

export const getStandardCertificateListFailed = () => {
  return {
    type: GET_STANDARD_CERTIFICATE_LIST_FAILED
  };
};

export const getDeletedStandardCertificateList = params => {
  return {
    type: GET_DELETED_STANDARD_CERTIFICATE_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedStandardCertificateListSuccess = params => {
  return {
    type: GET_DELETED_STANDARD_CERTIFICATE_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedStandardCertificateListFailed = () => {
  return {
    type: GET_DELETED_STANDARD_CERTIFICATE_LIST_FAILED
  };
};
