import {toast} from 'react-toastify';

export const displayErrorToast = (error: any) => {
  let errorStr = '';

  if (typeof error === 'string') {
    errorStr = error;
  } else if (error?.response?.data) {
    errorStr = JSON.stringify(error.response.data);
  } else {
    errorStr = JSON.stringify(error);
  }

  toast.error(errorStr);
};
