<template>
    <div>
        <v-card>
            
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">...</h3>
                    <!--div>description</div-->
                </div>
            </v-card-title>
            <v-card-text>

                <v-layout justify-space-around row wrap>

                    <v-flex xs4>
                        <ValidationProvider v-slot="{errors}" rules="alpha_spaces|max:25">
                            <v-text-field label="Role Name" :error-messages="errors" v-model="role.name" :count="25" flat outlined></v-text-field>
                        </ValidationProvider>
                    </v-flex>

                    <v-flex xs4>
                        <ValidationProvider rules="required|alpha_num|max:48" v-slot="{errors}">
                            <v-text-field label="Role code" hint="System reference code for this role (required, not updatable)" :count="48" :error-messages="errors" v-model="role.systemName" flat outlined></v-text-field>
                        </ValidationProvider>
                    </v-flex>

                    
                </v-layout>
          
            </v-card-text>
        </v-card><br>


        <v-card>
            
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">...</h3>
                    
                </div>
            </v-card-title>
            <v-card-text>

                <v-select
                    :items="privilages"
                    v-model="role.privilages"
                    label="Privilages"
                    outlined
                    chips
                    multiple
                    multi-line
                ></v-select>
               
            </v-card-text>
        </v-card>

    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { ValidationProvider, ValidationObserver } from 'vee-validate';


@Component({
    components: { ValidationProvider, ValidationObserver }
})
export default class SystemRoleForm extends Vue{


    private role = {};

    private privilages  =  ['Create Product', 'Create App'];

}
</script>

