import { Product } from "./types";
import axios from 'axios'

export default {
    list : async () : Promise< Product[] > =>{
        
        return axios.get('https://dummyjson.com/products').then(response =>{
            // console.log(response.data);
            return response.data;
        }).catch(error =>{
            console.log(error);
        }) 
    }
}