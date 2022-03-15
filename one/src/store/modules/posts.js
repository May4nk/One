import { AllPost, fetchPost, createPost } from '../../api/posts.js';

const state = []

const getters = {
    allPosts: state => state.post
}

const actions = {
    async posts ({ commit }) {
       const res = await AllPost;
       
       commit('post', res.data.data.posts);
    },

    async getPost ({ commit },id ) {
        const res = await fetchPost(id);
        
    },

    async addPost({ commit }, { title, pic, description, owner }){
        const res = await createPost ({ title, pic, description, owner });
         
        commit('newPost', res.data.data.addPost);
    },


}

const mutations = {
    post: (state, user) => (state.post = post),
    newPost: (state, npost) => state.post.unshift(npost)
}


export default {
    state,
    getters,
    actions,
    mutations
}
;
