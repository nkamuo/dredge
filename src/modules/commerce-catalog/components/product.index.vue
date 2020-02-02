<template>

    <v-layout justify-space-around row wrap>

      <v-flex :sm8="previewMode">  
        <ApolloQuery
            :query="gql => productsQuery "
            :update="onResult">

                <template  v-slot="{ result: { loading, error, data}, isLoading, query}">

                    <v-data-table
                        :headers="[
                        { value: 'id', text: 'ID'},
                        { value: 'sku', text: 'SKU'},
                        { value: 'name', text: 'Name'},
                        { value: 'unitPrice', text: 'Unit Price'}
                        ]"
                        :items="data||[]"
                        class="elevation-1"
                        rshow-select
                        item-key="id"
                        :loading="isLoading? true : false"
                        loading-text="Loading products.... please wait"

                        @click:row="selectProduct"
                    >
                        
                    </v-data-table>
                </template>
            

        </ApolloQuery>

      </v-flex>


      <v-flex v-if="previewMode" sm4>
          
          <product-preview :product="previewProduct"></product-preview>
      </v-flex>

    </v-layout>
    
</template>



<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ProductPreview from './product.preview.vue';

import gql from 'graphql-tag';

@Component({
    components: { ProductPreview }
})
export default class CatalogProductIndex extends Vue {


    private hasNextPage = true;

    private previewMode = false;

    private previewProduct: any = null;


    private productsQuery = gql`
        query {
            products {
                pageInfo {
                    hasNextPage
                }
                edges {
                    cursor
                    node {
                        id
                        name
                        sku
                        unitPrice
                    }
                }
            }
        } `;


    onResult(data: any){

        this.hasNextPage  = data.products.pageInfo.hasNextPage;



        return data.products.edges.map( (edge: any) => edge.node)
    }




    selectProduct(product){

        console.log('selected product: ', product)
        this.previewMode = true;
        this.previewProduct = product;
    }


    getProducts(data: any){

        console.log('data: ', data);

        return data || [];
    }




//end of class
}
</script>
