import axios from 'axios';

export const baseProducstAPI = axios.create({
    baseURL: 'https://6256fc506ea7037005434e84.mockapi.io/api/v1/user'
})

export const basePostcodeAPI = axios.create({
    baseURL: 'https://viacep.com.br/ws'
})