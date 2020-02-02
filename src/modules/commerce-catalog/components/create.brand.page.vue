<template>

    <v-card flat>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Create a new Brand</h3>
                <div></div>
            </div>
        </v-card-title>

        <v-card-text>
            <brand-form ref="brand-form" :categories="categories"></brand-form>
        </v-card-text>
        <v-card-actions>
            <ApolloMutation
                :mutation="gql => gql`mutation($brand: createBrandInput!){
                    createBrand(input: $brand){
                        id, name, slogan , shortDescription
                    }
                }`"
                @done="onSaved"
                >
                <template v-slot="{mutate,error,loading}">
                    <span v-if="error">{{error}}</span>
                    <v-btn  color="blue" :disabled="loading" @click="save(mutate)" outline><span v-if="loading" outline> Saving...</span>  <span v-else>Save</span></v-btn>
                    <v-btn color="blue" :disabled="loading" @click="saveAndNew(mutate)" outline><span v-if="loading">Saving...</span> <span v-else>Save and New</span></v-btn>
                </template>
            </ApolloMutation>
        </v-card-actions>
    </v-card>
    
</template>




<script lang="ts">
import Vue from 'vue'

import BrandForm from './brand.form.vue';
import Component from 'vue-class-component';
import { Ref } from 'vue-property-decorator';
import gql from 'graphql-tag'


@Component({
    components: { BrandForm }
})
export default class CatalogCreateBrandPage extends Vue {

    
    private categories = [
    {id: 10, name: "Switches and Sockets", children: [
        {id: 7687889, name: "Switches", children: [
            {id: 7678789, name: "Fancy Gold Switches"}
        ]},
        {id: 767889, name: "3Gang fancy switches"}
    ]},
    {id: 684783, name: "Fittings", children: [
        {id: 76789, name: "Light Fittings"}
    ]}
]

    @Ref('brand-form')
    brandForm!: BrandForm;


    public async save(mutate: Function){
        
        try {

            var brand = await this.brandForm.validate();

            

            mutate({ variables: { brand: {...brand, clientMutationId: '0789tr8vhbvhlyu4'} }});
            
        } catch (error) {
            
            console.log(error);
        }
    }



    public async saveAndNew(mutate: Function){

        await this.save(mutate);

        // prepare for creating another brand
        this.brandForm.clear();
    }



    private onSaved(data: any){
        console.log('saved brand: ', data);
    }

}
</script>
