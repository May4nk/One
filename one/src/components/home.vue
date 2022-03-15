<script>
import { mapGetters, mapActions } from 'vuex';

export default{
    methods: {
        ...mapActions(['getSpace']),
        ...mapActions(['users']),
        ...mapActions(['posts'])
        

    },
    computed: {
        ...mapGetters(['allSpaces']),
        ...mapGetters(['allUsers']),
        ...mapGetters(['allPosts']),
    },
    created(){
        this.getSpace();
        this.users();
        this.posts();
    }
}
</script>

<template>
<div class='container flex-container'>
    <div class='main-box'>
        <div class='row'>
            <div class='col-6'>
                <div class='sign-box'>
                    <div class='usr'>
                        Hey User
                    </div>
                    <div class='msg'>
                        Good to be back, let's go.
                    </div>
                    <div class='button-space'>
                        <router-link to='/create'><button class="btn btn-dark btns" type="button">Create your Space!</button></router-link>
                    </div>
                    <div class='button-space'>
                       <router-link to='/login'><button class="btn btn-primary btns text-black" type="button">Sign In</button></router-link>
                    </div>
                </div>
                <div class='vertical'> 
                </div>
            </div>
            <div class='col-6'>
                <div class='sign-box'>
                    <div class='qlin-title'> 
                        Doorways:
                    </div>
                    <div class='qlin'> 
                    <div class='button-space1'>
                        <button class="btn btn-dark btns1" type="button">Go Dark</button>
                    </div>
                    <div class='button-space1'>
                        <button class="btn btn-secondary text-black btns2" type="button">In Public</button>
                    </div>
                    <div class='button-space1'>
                        <button class="btn btn-light btns3" type="button">See Light</button>
                    </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class='body-title'>
    Explore Some Spaces 
</div>
<div class='flex-container1'>
    <div v-for:='space in allSpaces' :key='space.id' class='col-3'>
        <div class='spaces'> 
           <div class='header'>
                <div class='space-name'>
                    {{space.name}}
                </div>
                <div class='users'>
                    users:{{space.users}}
                </div>
            </div>
            <router-link to='/space'>
            <div class='space-body'>
                <img src='../assets/boom.jpeg' class='body-pic'>
            </div>
            </router-link>
        </div> 
    </div>
</div>

</template>

<style scoped>
@import '../assets/home.css';
</style>



