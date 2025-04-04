const API_URL:string = 'http://localhost:3000/'

const requestFetch = async (endpoint:string, options={})=>{
    const response = await fetch(`${API_URL}${endpoint}`, options);
    return response;
}

export const requestModel = async (endpoint:string, options={})=>{
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    return data;
}

export default requestFetch;