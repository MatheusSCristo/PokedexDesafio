import axios from 'axios'


export const UseFetchData =async (link)=>{
    const response=await axios.get(link)
    return response.data

}