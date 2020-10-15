<template>
    <form 
        class="user-profile_create-twoot" 
        @submit.prevent="createNewTwoot" 
        :class="{ '--exceeded': newTwootCharCount > 180}
    ">

        <label for="newTwoot">
            <strong>
                New Twoot
            </strong>
            ({{newTwootCharCount}}/180)
        </label>

        <textarea id="newTwoot" rows="4" v-model="state.newTwootContent"/>
    
        <div class="user-profile_create-twoot-type">

            <label for="newTwootType"> <strong>Type: </strong> </label>

            <select id="newTwootType" v-model="state.selectedTwootType">
                <!-- if theres no id from data add index to key -->
                <option 
                    :value="option.value" 
                    v-for="(option, index) in state.twootTypes" 
                    :key="index"
                >
                {{ option.name}}
                </option>

            </select>

        </div>

        <button >
            Twoot
        </button>
    </form>
</template>

<script>

import {reactive, computed} from 'vue';

export default {
    name: 'createTwootPanel',
    setup(props, cntx){
        const state = reactive({
            newTwootContent: '',
            selectedTwootType: 'instant',
            twootTypes : [
                {value: 'draft', name: 'Draft'},
                {value: 'instant', name: 'Instant Twoot'}
            ],
        })

        const newTwootCharCount = computed(() => state.newTwootContent.length);

        function createNewTwoot() {
            if (state.newTwootContent && state.selectedTwootType !== 'draft'){
               cntx.emit('add-twoot', state.newTwootContent),
               state.newTwootContent = '';
            }
        }

        return {
            state,
            newTwootCharCount,
            createNewTwoot
        }
    },
}
</script>

<style lang="scss" scoped>
    .user-profile_create-twoot {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        padding-top: 10px;

            &.--exceeded {
            color:red;
            border-color: red;

            button { 
                background-color:red;
                border: none;
                color: white;
            }
        }
    }

    .user-profile_create-twoot-type{
        margin-top: 10px;
        }

</style>
