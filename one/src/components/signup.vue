<script>
import { mapActions } from 'vuex';

export default{
   data(){
       return{
            name: "",
            email: "",
            password: "",
            cpassword: ""
        }
    },
    methods:{
        ...mapActions(['addUser']),                   
        onSubmit(e){
            e.preventDefault();
            try{
                if(this.password === this.cpassword){
                    this.addUser({ name: this.name, email: this.email, password: this.password })
                    this.name = null;
                    this.email = null;
                    this.password = null;
                    this.cpassword = null;
                    this.$router.push({name:'Home'})
                }else{
                    throw new Error('Enter Same password in both fields.')
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
           <router-link to='/'> <img src= '../assets/jolly.ico' class='pic'></router-link>
            <div class='log-title'>
                One piece
                <div class='motto'>
                    Ask for it & suffer...
                </div>
            </div>
        </div>
        <div class='log-form'>
            <div v-if='this.password !== this.cpassword' class='text-danger'> Passwords don't match.</div>
            <form @submit.prevent='onSubmit'>
                <div class="mb-3">
                    <input type="name" class="form-control" placeholder='Name' v-model='name'>
                </div>
                <div class="mb-3">
                    <input type="email" class="form-control" placeholder='Email' v-model='email'>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" placeholder='Password' v-model='password'>
                </div>
                    <input type="password" class="form-control" placeholder='Confirm Password' v-model='cpassword'>

                <div class='submit'>
                    <button type="submit"  class="btn btn-dark">Signup</button>
                </div>
            </form>
        </div>
    </div>
</div>
<router-link to='/login'>
<div class='signup'>
    Already done? Log in here.
</div>
</router-link>

</template>
<style scoped>
@import '../assets/login.css';
</style>
