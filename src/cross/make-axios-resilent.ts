import axios from "axios";
const axiosInstance = axios.create();

(axiosInstance.defaults as any).raxConfig = {
    instance: axiosInstance
};

require('retry-axios').attach(axiosInstance);
