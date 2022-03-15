<script>
import CreatePost from './create_post.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        CreatePost,
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods: {
        ...mapActions(['posts']),
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },
    computed: {
        ...mapGetters([ 'allPosts' ]),
    },
};

</script>
<template>
<div class='flex-container'>
    <div class='col-8'>
        <div class='post-box'>
            <div class='add'>
                <button class="btn btn-dark btns1" @click='showModal' type="button">+</button>
                <CreatePost v-show='isModalVisible' @close='closeModal' />
            </div>
            <div v-for='post in allPosts' :key='post.id'>
            <div class='posts' >
                <div class='post-title'>
                    {{post.title}}
                </div>
                <hr/>
                <div class='post-body'>
                    <img src='../assets/boom.jpeg' class='post-pic'>
                </div>
                <div class='post-info'>
                    {{post.description}}
                </div>
            </div>
            <div class='post-like'>
                <div class='icon-like'><i class="bi-emoji-heart-eyes"></i></div>
                <div class='icon-cmnt'><i class="bi-chat"></i></div>
                <div class='icon-stack'><i class="bi-stack"></i></div>
            </div>
            </div>
        </div>
    </div>
    <div class='col-4'>
        <div class='chat-box'>
            <div class="mb-3">
                <input type="text" class="form-control search" placeholder='search'>
            </div>
            <div class="form-check form-switch sw">
                <input class="form-check-input bg-secondary" type="checkbox" id="choose">
                <label class="form-check-label sw-title" for="choose">Call</label>
            </div>
            <div class='all_chats'>
                <div class='chats-box'>
                    <div class='chat-pic'>
                    </div>
                    <div class='chat-title'>
                        Title
                    </div>
                    <div class='chat-msg'>
                        blah
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style>
@import '../assets/space.css';
</style>








