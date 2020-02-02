<template>

<div>



 <ValidationObserver v-slot="{valid, passes, validate}" ref="primary_fields_observer">

     <form @submit="passes(onSubmit)" >

        <v-layout row wrap justify-space-around>
            
            <v-flex sm5>
                <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                        <v-text-field
                            name="name"
                            label="Product name"
                            rplaceholder="Enter name for product"
                            v-model="productData.name"
                            :error-messages="errors"
                            @input="updateSKU"
                            outlined
                        ></v-text-field>
                        <!--span style="color:red;"> {{errors[0]}} </span-->
                </ValidationProvider>
            </v-flex>





            <v-flex sm5>
                <ValidationProvider ref="sku_validator" name="sku" rules="required" v-slot="{errors}">
                    <v-text-field
                        name="sku"
                        label="Product SKU"
                        rplaceholder="Enter SKU for product"
                        v-model="productData.sku"
                        :error-messages="errors"
                        clearable
                        @input="(value) => value == ''? $refs.sku_validator.dirty = false : null"
                        outlined
                    ></v-text-field>
                </ValidationProvider>
            </v-flex>

        </v-layout><br/>


        <v-layout row wrap justify-space-around>
            
            <v-flex sm5>
                <ValidationProvider name="price" rules="required|numeric" v-slot="{errors}">
                        <v-text-field
                            name="price"
                            type="number"
                            :scale="4"
                            label="Product Price"
                            rplaceholder="Enter product price"
                            v-model.number="productData.unitPrice"
                            :error-messages="errors"
                            outlined
                        ></v-text-field>
                        <!--span style="color:red;"></span>
                

                    <!--template slot="append">
                    <small> Advanced pricing </small>
                        <v-switch
                            :false-value="false"
                            placeholder="placeholder"
                            :ripple="true"
                            toggle-keys="[13\,32]"
                            :true-value="true"
                            validate-on-blur
                            v-model="advancedPricingEnabled"
                        ></v-switch>
                    </template-->
                </ValidationProvider>

            </v-flex>



            <v-flex sm5>
                    <v-textarea
                        name="shortDescription"
                        label="Short description"
                        v-model="productData.shortDescription"
                        :rows="4"
                        filled
                        outlined></v-textarea>
            </v-flex>

        </v-layout>



        <v-layout row wrap justify-space-around>
            
            <v-flex sm5>
                <v-input
                outlined
                >  

                            <v-treeview
                            :loading="true" 
                            :items="[{name: 'Electrical'}]"
                            item-text="name"
                            item-value="id"
                            v-model="productData.categories"
                            selectable
                            activatable
                            outlined
                            >
                            </v-treeview>
                </v-input>

            </v-flex>

            <v-flex sm5>
                <ApolloQuery
                    :query="gql => gql`query{ brands { edges { node { id,name,slogan}}}}`"
                    :update="data => data.brands.edges.map( edge => edge.node)"
                    >
                    <template v-slot="{result:{loading,error,data}, isLoading}">
                        <v-select
                            :loading="isLoading? true: false"
                            :items="data"
                            v-model="productData.brand"
                            item-value="id"
                            item-text="name"
                            label="Select Product Brand"
                            rplaceholder="Select the Brand for this Product (Optional)"
                            chips
                            clearable
                            outlined
                        ></v-select>
                    </template>
                </ApolloQuery>
            </v-flex>


        </v-layout>

     </form>


 </ValidationObserver>

<br/>
<br/>





    </div>
    
</template>




<style>

</style>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Watch, Ref, Prop, Emit, Model } from 'vue-property-decorator'


import { ValidationProvider, ValidationObserver } from 'vee-validate';

import gql from 'graphql-tag';

//import Page from '@/dev/page';

//@Page({opt: 6})
@Component({
  components: { ValidationProvider, ValidationObserver }
})
export default class CatalogProductForm extends Vue {


    //@Page({page:60}, {options: 72})
    private productData: any = {};

/*
    @Query({
            query: gql`
                query {
                    brands {
                        edges {
                            node {
                                id, name
                            }
                        }
                    }
                } `,
            update: (data: any) => data.brands.edges.map(( edge: any) => edge.node)
    })
    private brands = [];



    @Query({
        guery: gql`
        query {
            categories {
                edges {
                    node {
                        id, name
                    }
                }
            }
        }`,
        update: (data: any) => data.categories.edges.map(( edge: any) => edge.node)
    })
    private categories = [];
*/

    private advancedPricingEnabled: boolean = false;


    @Model('change')
    private product!: {};




    

    public async validate(){
         
         var _this: any = this;

       var valid = await _this.$refs.primary_fields_observer.validate();

    console.log("Product Valid: ", this.productData);
    
    if(! valid){
        throw new Error("Product data invalid");
        return;
    }

    var productData = this.productData;

    return {
        name: productData.name,
        sku: productData.sku,
        unitPrice: productData.unitPrice,
        shortDescription: productData.shortDescription,
        brand: productData.brand,
        categories: productData.categories
    }

    }


    
    private onAdvancedPricingClose(isValid: boolean){


        console.log("isValid: ", isValid)

        if( isValid){

        }
        else {
           // this.productData.price.advancedPricingEnabled = false;
            this.advancedPricingEnabled = false;
        }
    }

    @Watch('productData.name')
    private updateSKU(name: string = "", oldName){

        var status: any = (<any>this).$refs.sku_validator.flags;

            const toSKU = (value: string) => value.trim()
                                        .replace(/\s*&+\s*/ig,'-and-')
                                            .replace(/\s+/gi,'-')
                                            .toUpperCase();

            console.log(oldName, ':', name);

        

        if(status.untouched || status.invalid || this.productData.sku == toSKU(oldName)  ){

            var sku = toSKU(name);

            this.productData.sku = sku;
        }

        console.log('Status: ', status);
    }


    @Watch('productData')
    @Emit('change')
    private onChange(productData: object){

        return productData;
    }



    log(...data){
        console.log(...data);
    }



}
</script>

