import { fetchSpace, createSpace } from '../../api/space.js';

const state = []

const getters = {
        allSpaces: state => state.space
}

const actions = {
    async getSpace ({ commit }) {
       const res = await fetchSpace;
       
       commit('setSpace', res.data.data.spaces);
    },

    async addSpace({ commit }, { name, description, seen, room, owner}){
        const res = await createSpace ({ name, description, seen, room, owner });
        commit('newSpace', res.data.data.addSpace);
    },

    async deleteSpacae({ commit }, id){
        
    }

}

const mutations = {
    setSpace: (state, space) => (state.space = space),
    newSpace: (state, nspace) => state.space.unshift(nspace)
}


export default {
    state,
    getters,
    actions,
    mutations
}
;
