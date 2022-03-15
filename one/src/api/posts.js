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
export const AllPost = call({
    query: `{
        posts{
            id,
            title,
            description,
            owner,
            pic
        }
    }`
});

export const fetchPost = (id) => call({
    query: `{
        post(id: ${id}){
            id,
            title,
            description
        }
    }`
});

export const createPost = (pt) => call({
    query: `mutation{
        addPost(
            title: "${pt.title}", 
            description: "${pt.description}", 
            pic:"${pt.pic}",
            owner: ${pt.owner}
        ),{
            title,
            description,
            pic,
            owner
        }}`
});
