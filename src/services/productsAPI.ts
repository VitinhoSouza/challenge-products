/* eslint-disable import/prefer-default-export */
import {baseProducstAPI} from './api';


export const productsAPI = {

    registerUser: async (user:any) => {

        let response = 'invalid';
        await baseProducstAPI.post("",user)
        .then((res:any) => {
            response = res.data;
        }).catch((e:any) => {
            console.log(e);
        })

        return response;
    },

    login: async (email:string/* , password:string */) => {

        // eslint-disable-next-line prefer-const
        let response = 'invalid';
        await baseProducstAPI.post(`search=${email}`)
        .then((res:any) => {
            // response = res.data;
            console.log(res)
        }).catch((e:any) => {
            console.log(e);
        })

        return response;
    }
}