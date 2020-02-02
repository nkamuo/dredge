<template>
    <v-card>
        <v-card-title primary-title>
            Create Product
        </v-card-title>
        <v-card-text>
            <product-form ref="product-form"></product-form>
        </v-card-text>

       <v-card-actions>
            <span style="color:red;" v-if="error">{{error}} </span><br>
            <v-btn color="" @click="save" :disabled="loading"> <span v-if="loading">Saving...</span> <span v-else>Save</span></v-btn>
               
        </v-card-actions>
    </v-card>
</template>




<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import ProductForm from './product.form.vue';
import { Ref } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({
    components: { ProductForm }
})
export default class catalogProductCreate extends Vue {


@Ref('product-form')
private productForm: ProductForm;

private loading = false;

private error = null;

    public async save(){

        try {

            this.loading = true;

            var product = await this.productForm.validate();


            var {createBasicProduct:{id}} = (<any>this).$apollo.mutate({
                mutation: gql `mutation($product: CreateBasicProductInput!){
                    createBasicProduct(input: $product){ id, name,unitPrice}}`,
                variables: { product}
                });
        this.loading = false;

        

        } catch (error) {

            this.loading = false;

            console.log(error);
        }
    
    }


    private onSaved(data: any){
        console.log('Saved Product: ', data)
    }

    public showError(error){
        alert('Error saving product: '+error);
    }
}
</script>
