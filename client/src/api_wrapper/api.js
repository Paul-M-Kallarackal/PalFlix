import axios from 'axios';
async function createApi(method, url, body) {
  try{ 
    const baseURL="http://localhost:3000/api/v1"
    const token=localStorage.getItem('token');
    const api = await axios({
    method,
    url:baseURL+url,
    body,
    headers:{
       Authorization: `Bearer ${token}`,
    },
  })
  return api.data;
  }
  catch(error){
    return error;
  }
}



export default createApi;

