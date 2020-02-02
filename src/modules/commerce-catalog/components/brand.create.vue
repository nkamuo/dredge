<template>
    <v-card class="elevation-1">
        <v-card-title primary-title>
            Create Brand
        </v-card-title>
        <v-card-text>
            <brand-form ref="brand-form"></brand-form>
        </v-card-text>

       <v-card-actions>
            <ApolloMutation
                :mutation="gql => gql`mutation($brand: createBrandInput!){
                    createBrand(input: $brand){ id, name,slogan, rating}}`"
                    @done="onSaved"
            >
                <template v-slot="{ mutate, loading, error}">
                    <span style="color:red;" v-if="error" :t="showError(error)">{{error}} </span><br>
                    <v-btn color="" @click="save(mutate)" :disabled="loading"> <span v-if="loading">Saving...</span> <span v-else>Save</span></v-btn>
                </template>
            </ApolloMutation>
        </v-card-actions>
    </v-card>
</template>




<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import BrandForm from './brand.form.vue';
import { Ref } from 'vue-property-decorator';

@Component({
    components: { BrandForm }
})
export default class catalogBrandCreate extends Vue {


@Ref('brand-form')
private brandForm: BrandForm;

    public async save(mutate: Function){

        try {
            var brand = await this.brandForm.validate();


            mutate({ variables: { brand: { ...brand, clientMutationId: "7894788" }}})

        } catch (error) {
            
        }
    
    }


    private onSaved(data: any){
        console.log('Saved Brand: ', data);

       (<any>this).$router.push('/catalog/brands');
    }

    public showError(error){
        alert('Error saving brand: '+error);
    }
}
</script>
