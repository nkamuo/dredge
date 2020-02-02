<template>
    <ValidationObserver ref="observer">
        <v-layout justify-space-around row wrap>
            <v-flex xs5>
                <ValidationProvider rules="required" v-slot="{errors}">
                        
                    <v-text-field
                        name="name"
                        label="Category name"
                        placeholder="Category name"
                        v-model="category.name"
                        outlined
                        :error-messages="errors"
                    ></v-text-field>
                </ValidationProvider>
            </v-flex>

            <v-flex xs6>
                <v-textarea
                :rows="1"
                placeholder="Describe category"
                label="Category description"
                outlined
                box>
                </v-textarea>
            </v-flex>
            
        </v-layout>

        <v-layout row wrap>
            <v-flex xs7>
                <v-treeview>
                    
                </v-treeview>
            </v-flex>
        </v-layout>

    </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import { Ref } from 'vue-property-decorator';


@Component({
    components: { ValidationProvider, ValidationObserver }
})
export default class CatalogCategoryForm extends Vue {

    private category = {};

    @Ref('observer')
    private observer!: any;



    private async validate(){

        if( await this.observer.validate()){
            return this.category;
        }

        throw new Error(this.observer.errors);
    }
}
</script>

