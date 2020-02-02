<template>

    <!--v-layout justify-space-around row wrap-->

      <!--v-flex :sm7="previewMode"-->  
        <ApolloQuery
            :query="gql => gql `query{ brands{pageInfo { hasNexPage}, edges{ node {id,name,slogan}}}}` "
            :update="onResult">

                <template  v-slot="{ result: { loading, error, data}, isLoading}">

                    <v-data-table
                        :headers="[
                        { value: 'id', text: 'ID'},
                        { value: 'name', text: 'Name'},
                        { value: 'slogan', text: 'Slogan'}
                        ]"
                        :items="data||[]"
                        class="elevation-1"
                        rshow-select
                        item-key="id"
                        :loading="isLoading? true : false"
                        loading-text="Loading products.... please wait"

                        @click:row="selectBrand"
                    >
                        
                    </v-data-table>
                </template>
            

        </ApolloQuery>

      <!--/v-flex>


      <v-flex v-if="previewMode" sm4>
          
          <product-preview :product="previewProduct"></product-preview>
      </v-flex-->

    <!--/v-layout-->
    
</template>



<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
//import ProductPreview from './product.preview.vue';

import gql from 'graphql-tag';

@Component({
    components: {/* ProductPreview */}
})
export default class CatalogProductIndex extends Vue {


    private hasNextPage = true;

   // private previewMode = false;

   // private previewProduct: any = null;



    onResult(data: any){

        this.hasNextPage  = data.brandss.pageInfo.hasNextPage;



        return data.brandss.edges.map( (edge: any) => edge.node)
    }




    selectBrand(product){

        console.log('selected product: ', product)
       // this.previewMode = true;
       // this.previewProduct = product;
    }


    getBrands(data: any){

        console.log('data: ', data);

        return data || [];
    }




//end of class
}
</script>
