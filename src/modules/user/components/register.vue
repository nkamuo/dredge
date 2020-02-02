<template>
    <v-card>
        
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Create Account</h3>
            </div>
        </v-card-title>
        <v-card-text>
            <register-form ref="user-form"></register-form>
        </v-card-text>
        
        <v-card-actions>
            <ApolloMutation
                :mutation="gql=> gql `mutation($user: createUserInput!){
                    createUser(input: $user){
                        id, username
                    }
                }`"
                v-slot="{mutate, loading, error}"
                >
                {{error}}
                <v-btn color="orange" @click="save(mutate)" align="center" :disabled="loading">
                    <v-icon></v-icon>

                    <template v-if="loading">
                            creating accout<br/>
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </template>
                    <template v-else> Register</template>
                </v-btn>
            </ApolloMutation>
        </v-card-actions>
    </v-card>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import RegisterForm from './register.form.vue'
import UserRegisterForm from './register.form.vue';
import { Ref } from 'vue-property-decorator';

@Component({
    components: { RegisterForm }
})
export default class UserRegister extends Vue {


    @Ref('user-form')
    private userForm!: UserRegisterForm;


    async save(mutate: Function){

        try {

            var user =  <any>await this.userForm.validate();

            user.clientMutationId = 'nfhjdd';

            
            mutate({
                variables: {
                    user
                }
            });
            
        }
        
        catch (error) {
            
            console.log('error: ', error)
        }

    }


        onRegister(data: any){
            console.log('Usercreated: ', data)
        }


}
</script>

