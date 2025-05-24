import requestFetch from "./api"
const path:string = `Pay/`

interface preferenceProps{
    days:number;
    user_id:string;
    room_id:string;
    success_url:string;
}

export const createPay = async (preference:preferenceProps)=>{
    const response = await requestFetch(path, {
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(preference)
    })
    const pay = await response.json();
    return pay;
}