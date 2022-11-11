import axios from 'axios';

export const loadConfigAndData = async (pageName: string, id: number) => {
    const URL_FOR_CONFIG = `http://localhost:3007/Config/${pageName}`;
    const URL_FOR_FORM_DATA = `http://localhost:3007/${pageName}/${id}`;
    const URL_FOR_DOMAIN_DATA = `http://localhost:3007/domain`;

    return Promise.all([axios.get(URL_FOR_CONFIG), axios.get(URL_FOR_FORM_DATA), axios.get(URL_FOR_DOMAIN_DATA)]);
};
