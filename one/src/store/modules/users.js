import { AllUser, fetchUser, createUser } from '../../api/user.js';

const state = []

const getters = {
    allUsers: state => state.user
}

const actions = {
    async users ({ commit }) {
       const res = await AllUser;
       
       commit('ppl', res.data.data.users);
    },

    async getUsers ({ commit },{ email, password }) {
        const res = await fetchUser(email,password);
        
        localStorage.setItem("token", `Bearer ${res.data.data.user}`);     
    },

    async addUser({ commit }, { name, email, password }){
        const res = await createUser ({ name, email, password });
        
        localStorage.setItem("token", `Bearer ${res.data.data.addUser}`);
        
        commit('newUser', res.data.data.addUser);
    },


}

const mutations = {
    ppl: (state, user) => (state.user = user),
    newUser: (state, nuser) => state.user.unshift(nuser)
}


export default {
    state,
    getters,
    actions,
    mutations
}
;
