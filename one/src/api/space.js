import axios from 'axios';


const headers = { 
    headers:{
        'Content-Type': 'application/json'
    }
}


const URL = 'http://127.0.0.1:5000/graphql';


const call = async (Data) => {
    return await axios({
        method: "POST",
        url: URL,
        data: Data,
        headers
    });
}


//request GET, POST, PATCH, DELETE 
export const fetchSpace = call({
    query: `{
        spaces{
            id,
            description,
            name,
            seen,
            owner
        }
    }`
});

export const createSpace = (sp) => call({
    query: `mutation{
        addSpace(
            name: "${sp.name}", 
            description: "${sp.description}", 
            seen: ${sp.seen}, 
            room: "${sp.room}",
            owner: ${sp.owner}
        ){
            name,
            description,
            seen,
            room,
            owner
        }
    }`
});
