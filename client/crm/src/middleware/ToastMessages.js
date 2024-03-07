import toast from 'react-hot-toast';

export const ToastSuccess = (message) => {
    return toast.success(message);
}

export const ToastError = (message) => {
    return toast.error(message);
}