import axios from 'axios';

const headers = { 
    headers:{
        'Content-Type': 'application/json'
    }
}

const URL = 'http://127.0.0.1:5000/graphql';

const call = async (Data) => {
    const res = await axios({
        method: "POST",
        url: URL,
        data: Data,
        headers
    });
    return res;
}

//request GET, POST, PATCH, DELETE 

export const AllUser = call({
    query: `{
        users{
            id,
            name,
            email
        }
    }`
});

export const fetchUser = (email,password) => call({
    query: `{
        user(email: "${email}", password: "${password}")
    }`
});

export const createUser = (us) => call({
    query: `mutation{
        addUser(
            name: "${us.name}", 
            email: "${us.email}", 
            password:"${us.password}"
        )}`
});
