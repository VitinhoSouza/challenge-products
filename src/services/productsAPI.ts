/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import {baseProducstAPI} from './api';


export const productsAPI = {

    registerUser: async (user:any) => {

        let response = 'invalid';
        await baseProducstAPI.post("/user",user)
        .then((res:any) => {
            response = res.data;
        }).catch((e:any) => {
            console.log(e);
        })

        return response;
    },

    login: async (email:string, password:string) => {

        let responseData = {
            name:'invalid',
            token:'',
            image:'',
        }
        await baseProducstAPI.get(`/user?search=${email}`)
        .then((res:any) => {
            const response = res.data.map((user:any) => user.senha === password ? user: 'invalid')
            responseData = {
                name:response[0].nome+" "+response[0].sobrenome,
                token:response[0].token,
                image:response[0].image
            }
        }).catch((e:any) => {
            console.log(e);
        })

        return responseData;
    },

    getAllProducts: async (token:string,filter:string) => {

        let responseData:any = [];
        await baseProducstAPI.get(`/produto?search=${filter}`,
            { headers: { 'Authorization': token}})
        .then(res => {
            responseData = res.data;
        }).catch((e:any) => {
            console.log(e);
        })

        return responseData;
    },

    getProducts: async (token:string,filter:string,page:number) => {

        let responseData:any = [];
        await baseProducstAPI.get(`/produto?search=${filter}&page=${page}&limit=15`,
            { headers: { 'Authorization': token}})
        .then(res => {
            responseData = res.data;
        }).catch((e:any) => {
            console.log(e);
        })

        return responseData;
    }
}