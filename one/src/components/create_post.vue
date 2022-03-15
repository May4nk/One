<script>
import { mapActions } from 'vuex';

export default{
    data() {
        return{ 
            title: "",
            description: "",
            pic: "naj",
            owner: 1
        }
    },
    methods: {
        ...mapActions(['addPost']),
        onSubmit(e){
            e.preventDefault();
            this.addPost({ title: this.title, description: this.description, pic: this.pic, owner: this.owner })
            this.title=null;
            this.description=null;
            this.pic="";
        },
    }
}

</script>
<template>
    <div class='overlay'>
        <div class='modale-box'>
            <div class='icn' @click="close"> <i @click="close" class="bi-file-x-fill bi"></i></div>
            <div class='flex-container container'>
                <div class='box'>
                    <div class='box-title'>
                        Create Post
                    </div>
                    <form @submit='onSubmit'>
                        <div class="mb-3">
                            <input type='text' v-model="title" class="form-control" placeholder='Title'>
                        </div>
                        <div class="mb-3">
                            <textarea v-model="description" class="form-control" placeholder="Description" type='text' rows="3"></textarea>
                        </div>
                        <div class="input-group mb-4">
                            <div class="custom-file">
                                <input type="file" :change='pic' class="bg-dark text-light custom-file-input" id="file" />
                                <label class="custom-file-label" for="file">Choose file</label>
                            </div>
                        </div>
                        <div class='sub'>
                            <button type="submit" class="btn btn-dark">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style scoped>
@import '../assets/create_post.css'
</style>
