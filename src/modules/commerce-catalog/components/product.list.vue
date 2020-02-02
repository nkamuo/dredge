<template>

        <ApolloQuery
            :query="gql => productsQuery "
            :update="onResult"
            :variables="{
                //next: nextCursor,
                name: productSearch
            }">

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
                        :value="selectedProducts"
                        :show-select="selectable"
                        rsearch="search"
                        :server-items-length="totalCount"
                        hide-default-footer
                        no-data-text="No products found..."
                        no-results-text="No products matched..."
                        item-key="id"
                        :loading="isLoading? true : false"
                        loading-text="Loading products.... please wait"

                        @input="select"
                    >

                        <template v-if="data" v-slot:footer>
                            <infinite-loading :identifier="productSearch" @infinite=" state => loadMoreProducts(query, state, error)">

                                <template v-slot:no-more>
                                    <span></span>
                                </template>

                                <template v-slot:no-results>
                                    <span></span>
                                </template>

                                <template v-slot:error="{trigger}">
                                    <span>An error occured</span>
                                </template>

                                <template v-slot:spinner>
                                    <v-progress-circular indeterminate :size="70" color="primary">Loading...</v-progress-circular>
                                </template>

                            </infinite-loading>
                        </template>


                        <template v-slot:top>
                            <v-text-field @input="input => search(query, input)" placeholder="Search products" prepend-icon="search"></v-text-field>
                        </template>
                        
                    </v-data-table>
                </template>
            

        </ApolloQuery>
    
</template>



<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import gql from 'graphql-tag';
import { Emit, Prop, Model, Watch } from 'vue-property-decorator';

@Component({
    components: { }
})
export default class CatalogProductList extends Vue {


    private hasNextPage = false;

    private nextCursor = '';

    private totalCount = 0;

    private selectedProducts: any[] = [];

    private productSearch = '';

    //private search = '';


    @Prop({
        type: Boolean,
        required: false,
        default: false
    })
    private selectable;


    @Model('select')
    private selected;



    private productsQuery = gql`
        query($next: String, $name: String) {
            products(first: 10, after: $next, name: $name) {
                totalCount,
                pageInfo {
                    hasNextPage
                }
                edges {
                    cursor
                    node {
                        _id: id
                        id: _id
                        name
                        sku
                        unitPrice
                    }
                }
            }
        } `;


    onResult(data: any){

        this.hasNextPage  = data.products.pageInfo.hasNextPage;

        this.totalCount = data.products.totalCount;

        var lastEdge = data.products.edges.slice(-1).pop();

       // console.log('edges: ', data.products.edges)
       // console.log('lastEdge: ', lastEdge)

        if(lastEdge){
            this.nextCursor = lastEdge.cursor;
        }


        return data.products.edges.map( (edge: any) => edge.node)
    }



    public search(query: any, input: string){

        this.hasNextPage = false;
        this.nextCursor = '';
        this.productSearch = input;

        if(input.length < 3){
            // to few characters to search with
            return
        }

        query.refetch(
            /*{
            variables: { name: input}
        }*/
        )
            .then( (data: any) => console.log('refetch: ',data));
    }

    @Emit()
    select(products: any[]){

        return products;
    }




        @Watch('selected')
        onSelectedChange(selected: any){
            console.log('input selection changed: ', selected)
            this.selectedProducts ==  selected;
        }





    /**
     * Loads more products from a persistent storage
     */
        loadMoreProducts( query: any, state: any, error){

            console.log('Loadmore....');

            if(! this.hasNextPage){
                 //Loading complete
                 console.log('no longer running...');
                 state.loaded();
                 state.complete();
                 return;
            }





            console.log('next Cursor: ', this.nextCursor);

            var variables = { next: this.nextCursor };
        
            query.fetchMore({
                variables: { next: this.nextCursor, name: this.productSearch },
                    updateQuery: (previousResult: any, {fetchMoreResult } : any) => {

                        var newProducts = fetchMoreResult.products.edges.map( (edge: any) => edge.node);

                        var pageInfo = fetchMoreResult.products.pageInfo;


                        console.log("Fetchmore result: ", fetchMoreResult);
                        console.log('New Fetch Result Products: ', newProducts);
                        console.log("previous Results: ", previousResult);

                        var result = {
                            products: {

                                __typename: previousResult.products.__typename,
                                edges: [ ...previousResult.products.edges, ...fetchMoreResult.products.edges],
                                pageInfo,

                            }


                        };

                        //Notify infinite loader that loading is complete
                        state.loaded();

                        if(error){
                            state.error(error);
                        }

                        console.log("Result: ", result);

                        return result;
                    }
                });

        }




        clear(){
            this.selectedProducts = [];
        }


//end of class
}
</script>
