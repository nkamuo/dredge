<template>
    <div>
        <ValidationObserver ref="validation">
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div>Personal Infomation</div>
                    </div>
                </v-card-title>

                <v-card-text>
                
                <v-layout justify-space-around row wrap>

                    <v-flex sm3 xs12>
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <v-text-field
                                name="firstname"
                                v-model="user.firstname"
                                label="Firstname"
                                :error-messages="errors"
                                outlined
                            ></v-text-field>
                        </ValidationProvider>
                    </v-flex>

                    <v-flex  sm3 xs12>
                        <v-text-field
                            name="middlename"
                            v-model="user.middlename"
                            label="Middlename"
                            outlined
                        ></v-text-field>
                    </v-flex>

                    <v-flex  sm3 xs12>
                        <v-text-field
                            name="lastname"
                            v-model="user.lastname"
                            label="Lastname"
                            outlined
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout justify-space-around row wrap>

                    <v-flex xs5>
                        <v-text-field
                            name="date of birth"
                            v-model="user.dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            outlined
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs5>
                        <ValidationProvider rules="required" v-slot="{errors}">

                            <v-radio-group :error-messages="errors" name="gender" v-model="user.gender" outlined row>
                                <v-radio label="Male" :value="1"></v-radio>
                                <v-radio label="Female" :value="2"></v-radio>
                            </v-radio-group>
                        </ValidationProvider>
                        
                    </v-flex>
                    
                </v-layout>


                </v-card-text>

            </v-card><br/><br/>






            <v-card>
                
                <v-card-title primary-title>
                    <div>
                        <h4 class="headline mb-0">Security Infomation</h4>
                    </div>
                </v-card-title>
                <v-card-text>
                
                <v-layout justify-space-around row wrap>
                    <v-flex sm5>
                        <ValidationProvider rules="required|alpha_num|min:5" v-slot="{ errors }">
                            <v-text-field
                                v-model="user.username"
                                :loading="checkingUsername"
                                name="username"
                                label="Choose a Username for your account"
                                rplaceholder="Choose a Username for your account"
                                prepend-inner-icon="person"
                                outlined
                                :error-messages="[...errors, ...usernameErrors]"
                                @input="validateUsername"
                            >
                                
                                <template v-if="usernameValidated" v-slot:append>
                                    <v-icon :color="usernameErrors.length == 0? 'green': 'red'">{{usernameErrors.length == 0? 'check': 'error' }}</v-icon>
                                </template>
                            
                            </v-text-field>
                        </ValidationProvider>
                    </v-flex>

                    <v-flex sm5>
                        <ValidationProvider rules="required|min:4" v-slot="{errors}">
                            <v-text-field
                                name="password"
                                v-model="user.password"
                                label="Enter a password to secure this account"
                                :type="showPassword? 'text': 'password'"
                                rplaceholder="Enter a password to secure this account"
                                prepend-inner-icon="lock"
                                outlined
                                :error-messages="errors"
                            >
                                <template v-slot:append>
                                  <v-icon :title="showPassword? 'Hide password': 'Show password'" @click="showPassword = !showPassword">{{ showPassword? 'mdi-eye-off': 'mdi-eye'}}</v-icon>
                                 </template>
                            </v-text-field>
                        </ValidationProvider>
                    </v-flex>
                </v-layout>
                </v-card-text>
            </v-card><br><br/>



            <v-card>
             <v-card-title primary-title>
                    <div>
                        <h4 class="headline mb-0">Contact Infomation</h4>
                    </div>
                </v-card-title>
                <v-card-text>
                
                <v-layout justify-space-around row wrap>
                    <v-flex sm5>
                        <ValidationProvider rules="email" v-slot="{errors}">
                            <v-text-field
                                v-model="user.email"
                                label="Email"
                                prepend-inner-icon="email"
                                type="email"
                                outlined
                                :error-messages="errors"
                            ></v-text-field>
                        </ValidationProvider>
                    </v-flex>

                    <v-flex sm5>
                        <v-text-field
                            name="Phone"
                            label="Phone"
                            type="tel"
                            prepend-inner-icon="phone"
                            outlined
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                </v-card-text>
            </v-card><br/><br/>


            <v-card>
               
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">User Roles</h3>
                        <div><small>Asign functional roles to this user</small></div>
                    </div>
                </v-card-title>
                
                <v-card-text>
                    
                    <v-select
                        :items="roles"
                        v-model="user.roles"
                        label="Roles"
                        multiple
                        outlined
                        chips
                        clearable
                        open-on-hover
                    ></v-select>

                </v-card-text>
            </v-card>

        </ValidationObserver>
    </div>
    
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import axios from 'axios';

@Component({
    components: { ValidationProvider, ValidationObserver }
})
export default class UserRegisterForm extends Vue {


    private user: {[i: string] : any} = {};


    private showPassword = false;

    private checkingUsername = false;

    private usernameErrors = [];

    private usernameValidated = false;

    private roles = [
        'Manager', 'Editor', 'Admin', 'Auditor', 'Cashier', 'Sales Person',
    ]



    public async validate(){

        var _this = <any>this;

        var valid =  await _this.$refs.validation.validate();

            if(!valid){
                throw new Error('data not valid')
            }

        
        return {
            firstname: this.user.firstname,
            middlename: this.user.middlename,
            lastname: this.user.lastname,
            gender: this.user.gender,
            dateOfBirth: this.user.dateOfBirth,

            username: this.user.username,
            password: this.user.password,

            email: this.user.email,
            phone: this.user.phone,

        }
    }



    public async validateUsername(username = ''){

        this.usernameErrors = [];

        
            this.usernameValidated = false;

        if(username.length < 5){
            return;
        }

        //this.usernameValidated = false;
       
       try {
           
            this.checkingUsername = true;
            

            var responseData = await axios.get('http://localhost:8000/user/username-check?username='+ username);

            this.checkingUsername = false;

            //console.log('ResponseData: ', responseData);

            const { data : {exists}} = responseData.data;


            if(exists){
                this.usernameErrors = [username+' is taken. Choose another username']
            }

            this.usernameValidated = true;


       } catch (error) {

           this.checkingUsername = false;
           console.error(error);
           
       }


       


    }


}
</script>

