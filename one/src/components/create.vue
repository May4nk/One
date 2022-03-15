<script>
import { mapActions } from 'vuex';

export default{
    data() {
        return{ 
            name: "",
            description: "",
            seen: "false",
            room: [],
            owner: 1
        }
    },
    methods: {
        ...mapActions(['addSpace']),
        onSubmit(e){
            e.preventDefault();
            this.addSpace({ name: this.name, description: this.description, seen: this.seen, room: this.room, owner: this.owner })
            this.name=null;
            this.description=null;
            this.seen=null;
            this.room=null;
        },
    }
}

</script>
<template>
<div class='flex-container'>
    <div class='box'>
        <div class='box-title'>
            Create Room
        </div>
        <form @submit='onSubmit'>
            <div class="mb-3">
                <input type='text' v-model="name" class="form-control" placeholder='Room Name'>
            </div>
            <div class="mb-3">
                <textarea v-model="description" class="form-control" placeholder="Description" type='text' rows="3"></textarea>
            </div>
            <div>
                <div class='lab'>
                    In your Space:
                </div>
                <div class='feature-box'>
                    <div class='features'>
                        <input type="checkbox" class="btn-check" id='chat' autocomplete="off" value='chat' v-model='room'>
                        <label class="btn btn-outline-dark" for='chat'>Chat</label>
                    </div>
                    <div class='features'>
                        <input type="checkbox" class="btn-check" id='videos' autocomplete="off" value='videos' v-model='room'>
                        <label class="btn btn-outline-dark" for='videos' >Videos</label>
                    </div>
                    <div class='features'>
                        <input type="checkbox" class="btn-check" id="calling" autocomplete="off" value='calling' v-model='room'>
                        <label class="btn btn-outline-dark" for="calling">Calling</label>                
                    </div>
                    <div class='features'>
                        <input type="checkbox" class="btn-check" id='post' autocomplete="off" value='post' v-model='room'>
                        <label class="btn btn-outline-dark" for='post'>Post</label>
                    </div>
                </div>
            </div>
            <div class="form-check form-switch mb-3 ms-2">
                <input class="form-check-input bg-dark text-light" type="checkbox" id="private" value='true' v-model='seen'>
                <label class="form-check-label" for="private">Private</label>
            </div>
            <div class='sub'>
                <button type="submit" class="btn btn-dark">Create</button>
            </div>
        </form>
    </div>
</div>
</template>
<style scoped>
@import '../assets/create.css';
</style>
