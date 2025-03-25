const API_URL:string = 'http://localhost:3000/'

const requestFetch = async (endpoint:string, options={})=>{
    const response = await fetch(`${API_URL}${endpoint}`, options);
    return response;
}

export default requestFetch;