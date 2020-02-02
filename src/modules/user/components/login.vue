<template>

    <v-card>
        
        <v-card-title primary-title>
            <center>
                <h2 class="headline mb-0">Login!</h2>
                <div></div>
            </center>
        </v-card-title>

        <v-card-text>

            <ValidationProvider rules="required" v-slot="{errors}">
                <v-text-field
                    name="username"
                    v-model="username"
                    label="username"id="id"
                    prepend-inner-icon="person"
                    outlined
                    :error-messages="errors"
                ></v-text-field>
            </ValidationProvider><br>

            <ValidationProvider rules="required" v-slot="{errors}">
                <v-text-field
                    name="password"
                    v-model="password"
                    label="Password"
                    :type="showPassword? 'text': 'password'"
                    prepend-inner-icon="lock"
                    outlined
                    :error-messages="errors"
                    
                >
                    <template v-slot:append>
                        <v-icon @click="showPassword = !showPassword">{{ showPassword? 'mdi-eye-off': 'mdi-eye'}}</v-icon>
                    </template>
                </v-text-field>
            </ValidationProvider>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="login">login</v-btn>
            <v-btn color="primary" @click="$router.push('/register')">Register</v-btn>
        </v-card-actions>
    </v-card>
    
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { ValidationProvider,ValidationObserver } from 'vee-validate'

@Component({
    components: { ValidationProvider , ValidationObserver}
})
export default class UserLogin extends Vue {

    username = '';

    password = '';

    private showPassword = false;



    public login(){
        
    }

}
</script>

