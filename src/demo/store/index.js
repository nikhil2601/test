import configureStore from './store';
import axiosClient from './axios';

// Configure the store beforehand.
const storeConfig = configureStore();

export { axiosClient, storeConfig };
