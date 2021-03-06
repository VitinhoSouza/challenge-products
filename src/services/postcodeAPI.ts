import { IAddress } from '../utils/interfaces';
import {basePostcodeAPI} from './api';

export const postcodeAPI = {

    getPostcode: async (postcode:number) => {

        let postcodeResponse;
        const objectAddress:IAddress = {} as IAddress
        
        await basePostcodeAPI.get(`/${postcode}/json`)
            .then((res:any) => {
                postcodeResponse = res.data.cep;
                objectAddress.city = res.data.localidade;
                objectAddress.state = res.data.uf;
                objectAddress.complement = res.data.complemento;
                objectAddress.district = res.data.bairro;
                objectAddress.publicPlace = res.data.logradouro;
            }).catch((e:any) => {
                console.log(e);
            })

        return {postcodeResponse,objectAddress};
    }
}