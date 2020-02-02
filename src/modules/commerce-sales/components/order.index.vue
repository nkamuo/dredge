<template>

    <v-layout justify-space-around row wrap>

      <v-flex :sm8="previewMode">  
        <ApolloQuery
            :query="gql => productsQuery "
            :update="onResult">

                <template  v-slot="{ result: { loading, error, data}, isLoading}">

                    <v-data-table
                        :headers="[
                        { value: '_id', text: 'ID', divider: true},
                        { value: 'buyerName', text: 'Customer name', divider: true},
                        { value: 'date', text: 'Order date', divider: true},
                        { value: 'totalAmount', text: 'Total due', divider: true},
                        { value: order => order.totalAmount - order.amountPaid, text: 'Balance', divider: true}
                        ]"
                        :items="data||[]"
                        class="elevation-1"
                        rshow-select
                        scrollable
                        item-key="id"
                        :loading="isLoading? true : false"
                        loading-text="Loading data.... please wait"

                        @click:row="selectOrder"
                    >
                        
                    </v-data-table>
                </template>
            

        </ApolloQuery>

      </v-flex>


      <v-flex v-if="previewMode" sm4>
          
          <order-preview :product="previewOrder"></order-preview>
      </v-flex>

    </v-layout>
    
</template>



<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
//import OrderPreview from './order.preview.vue';

import gql from 'graphql-tag';

@Component({
  //  components: { OrderPreview }
})
export default class SalesOrderIndex extends Vue {


    private hasNextPage = true;

    private previewMode = false;

    private previewOrder: any = null;


    private productsQuery = gql`
        query {
            orders {
                pageInfo {
                    hasNextPage
                }
                edges {
                    cursor
                    node {
                        id
                        _id
                        date
                        totalAmount
                        amountPaid
                         buyerName
                    }
                }
            }
        } `;


    onResult(data: any){

        this.hasNextPage  = data.orders.pageInfo.hasNextPage;



        return data.orders.edges.map( (edge: any) => edge.node)
    }




    selectOrder(order: any){

        console.log('selected order: ', order)
        this.previewMode = true;
        this.previewOrder = order;
    }


    getOrders(data: any){

        console.log('data: ', data);

        return data || [];
    }




//end of class
}
</script>
