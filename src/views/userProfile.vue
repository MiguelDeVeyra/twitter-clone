<template>
    <div class="user_profile">
    
        <div class="user-profile_user-panel">
            <h1 class="username">{{state.user.username}}</h1>
            <h3> {{ userId }}</h3> 
            <div class="admin-badge" v-if="state.user.isAdmin">
                Admin {{state.user.id}}
            </div>

            <div class="follower-count">

                <strong>Followers: </strong> {{ state.followers }}

            </div>
            <createTwootPanel  @add-twoot="addTwoot"/>
        </div>

        <div class="twoots_wrapper">
            <!-- passing data from parent to child -->
            <TwootItem 
            v-for="twoot in state.user.twoots" 
            :key="twoot.id" 
            :username="state.user.username" 
            :twoot="twoot" 
            @favorite="toggleFavourite" 
            />
    
        </div>
        
    </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRoute } from 'vue-router';
import TwootItem from "../components/twootItem.vue";
import createTwootPanel from "../components/createTwootPanel.vue";
import { users  } from '../assets/users';


export default {
    name: 'UserProfile',

    components: {
        TwootItem,
        createTwootPanel,
    },

    setup() {
        const route = useRoute();
        // automaticall refers to id
        const userId = computed(() => route.params.userId);

        const state = reactive({
            followers: 0,
            // array always start at zero and zero here = userId 1
            user: users[userId.value - 1] || null
        })

        function addTwoot(twoot){
            state.user.twoots.unshift({ id: state.user.twoots.length+1, content:twoot})
        }

        function toggleFavourite(id) {
            console.log(`favourite twoot ${id}`)
        }

        return{
            state,
            addTwoot,
            toggleFavourite,
            userId
        }

    },

    // // watch start
    // watch: {
    //     followers(newF, oldF) {
    //         if (oldF < newF) {
    //             console.log(`${this.user.username}  has gained a new follower`)
    //         }
    //     }
    // },

    // // computed start
    // computed: {
    // },
    // // methods start
    // methods: {
    //     followUser() {
    //         this.followers++
    //     },
    //     toggleFavourite(id) {
    //         console.log(`favourite twoot ${id}`)
    //     }
    // },

    // // start mounted
    // // runs the method every time the component is rendered
    // mounted() {
    //     this.followUser();
    // }
}
</script>

<style lang="scss" scoped>
    .user_profile {
        display: grid;
        grid-template-columns: 1fr 2fr;
        padding: 10px 5%;

        .user-profile_user-panel {
            display: flex;
            flex-direction: column;
            margin-right: 50px;
            padding: 20px;
            background-color: white;
            
        }

        .username {
            margin: 10px 0;
        }   

        .admin-badge {
            background: purple;
            color: white;
            border-radius: 5px;
            margin-right: auto;
            padding: 0 10px;
            margin-bottom: 20px;
        }

       
    }

    .twoots_wrapper{
        display: grid;
        grid-gap: 10px;
    }
</style>
