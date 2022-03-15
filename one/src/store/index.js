import { createStore } from 'vuex';
import space from './modules/space.js';
import user from './modules/users.js';
import post from './modules/posts.js';

const store = createStore({
    modules: { space, user, post }
});

store.state.space;
store.state.user;
store.state.post;

export default store;
