<template>
    <ValidationObserver ref="observer">
        <v-layout justify-space-around row wrap>
            <v-flex  md3>
                <validationProvider rules="required" v-slot={errors}>
                    <v-text-field
                        name="name"
                        v-model="store.name"
                        label="Store name"
                        :error-messages="errors"
                        outlined
                    ></v-text-field>
                </validationProvider>
            </v-flex>

            <v-flex md4>
                <ValidationProvider>
                    <v-text-field
                        name="address"
                        v-model="store.address"
                        label="Store address"
                        outlined
                    ></v-text-field>
                </ValidationProvider>
            </v-flex>

            <v-flex md3>
                <validationProvider>
                    <v-text-field
                        name="slogan"
                        v-model="store.slogan"
                        label="Store Slogan"
                        outlined
                    ></v-text-field>
                </validationProvider>
            </v-flex>

        </v-layout>
    </ValidationObserver>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { Ref } from 'vue-property-decorator';

@Component({
    components: { ValidationObserver, ValidationProvider }
})
export default class InventoryStoreForm extends Vue {



    private store = {};

    @Ref('observer')
    private observer!:any;


    public async validate(){

        var valid = await this.observer.validate();

        if( valid){
            return this.store;
        }

        throw new Error('Invalid form data');
    }
}
</script>

