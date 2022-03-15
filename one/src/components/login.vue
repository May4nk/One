<script>
import { mapActions } from 'vuex';

export default{
   data(){
       return{
            email: "",
            password: "",
        }
    },
    methods:{
        ...mapActions(['getUsers']),                   
        onSubmit(e){
            try{
                const usr = this.getUsers({ email: this.email, password: this.password })
                if(usr){
                    this.email = null;
                    this.password = null;
                    this.$router.push({name:'Home'})
                }else{
                    throw new Error('Account Not Found.')
                }
            }catch(err){
                console.log(err);
            }
        },
    }    
}

</script>

<template>
<div class='flex-container'>
    <div class='log-box'>
        <div class='log-pic'>
            <img src= '../assets/jolly.ico' class='pic'>
            <div class='log-title'>
                One piece
                <div class='motto'>
                    Ask for it & suffer...
                </div>
            </div>
        </div>
        <div class='log-form'>
            <form @submit.prevent='onSubmit'>
                <div class="mb-3">
                    <input type="email" class="form-control" v-model='email' placeholder='Email'>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" v-model='password' placeholder='Password'>
                </div>

                <div class='submit'>
                    <button type="submit" class="btn btn-dark">Login</button>      
                </div>
            </form>
        </div>
    </div>
</div>
<router-link to='/signup'>
    <div class='signup'>
        Wanna join? Sign up here.
    </div>
</router-link>

</template>

<style scoped>
@import '../assets/login.css';
</style>
