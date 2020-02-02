<template>

    <tr> 
        <td>
            <template v-if="orderline.id"> {{orderline.id}}</template>
            <template v-else-if="index"> {{index + 1 }}</template>
            <template v-else> {{index + 1}}</template>

        </td>
           
        <td>
            {{orderline.product.name}}
                        
        </td>

        <!--td>
            <!--Selecet Condition->
            <v-edit-dialog
                    :return-value="orderline.productCondition"
                    large
                    cancel-text="Cancel"
                    save-text="Save"
                    lazy
                    persistent
                    transition="fade-transition"
                > 
                    {{orderline.productCondition}}
                    <template v-slot:input>
                       
                        <v-select
                            :items="[]"
                            v-model="orderline.productCondition"
                            label="Select"
                        ></v-select>

                    </template>
                </v-edit-dialog>
        </td-->


        <td>

            <!--Enter Quantity-->
            <v-edit-dialog
                :return-value="orderline.quantity"
                large
                cancel-text="Cancel"
                save-text="Save"
                lazy
                persistent
                transition="fade-transition"
                :disabled="!editable"
                v-model="orderline.quantity"
                v-if="editable"
            > 
                {{orderline.quantity}}
                <template v-slot:input>
                    <v-text-field
                    label="Edit"
                    v-model="orderline.quantity"
                    single-line
                    type="number"
                    counter
                ></v-text-field>
                </template>
            </v-edit-dialog>

            <span v-else> {{orderline.quantity}}</span> 

        </td>

        <td>
            <v-edit-dialog
                :return-value="orderline.unitPrice"
                large
                cancel-text="Cancel"
                save-text="Save"
                lazy
                persistent
                transition="fade-transition"
                :disabled="!editable"
                v-model="orderline.unitPrice"
                v-if="editable"
            > 
                {{orderline.unitPrice}}
                <template v-slot:input>
                    <v-text-field
                    label="Edit"
                    v-model="orderline.unitPrice"
                    single-line
                    type="number"
                    counter
                ></v-text-field>
                </template>
            </v-edit-dialog>

            <span v-else> {{orderline.unitPrice}} </span>
        
        </td>


        <td>
           
                {{orderline.unitPrice * orderline.quantity}}
           
        </td>

        <td v-if="deletable">
            <v-btn color="" @click="remove" title="Remove Orderline" text>
                <v-icon>delete</v-icon>
            </v-btn>
        </td>
    

    </tr>

</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop, Watch, Emit } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component
export default class SalesOrderlineForm extends Vue {


    @Prop({
        type: Object,
        required: false,
        default: () => {}
    })
    private orderline!: {};


    @Prop({

    })
    private index!: number;

    @Prop({
        type: Boolean,
        required: false,
        default: false
    })
    private editable!: boolean;


    @Prop({
        type: Boolean,
        required: false,
        default: false
    })
    private deletable!: boolean;


    private products = [];

    private canSearchProduct = false;

    private productSearch = '';

    private productFocused =  false;

    private queryCount = 0;




    updateProductList(data: any){

        var result = data.products.edges.map( (edge: any) => edge.node);

        this.products = result;

        console.log('Fetch Products: ', result);

        return result;
    }




    @Emit()
    private remove(){
        return this.orderline;
    }

    @Watch('productSearch')
    searchProducts(search: any){

        console.log('productSearch: ', search);
 
            const _this = <any> this;

            if(search == null || this.queryCount > 3 )
                 return;

                    this.queryCount ++;


                    //this.products = [];
                    _this.$apollo.query({
                         query: gql`query($name: String){ products(name: $name) { edges { node {id, name}}}}`,
                          variables: { name: search }
                          })
                            .then( (result: any) =>
                            {

                                console.log('result: ', result);

                                if(! result.data.products)
                                    return;
                                
                                this.products = result.data.products.edges.map( (edge: any) => edge.node) ;

                                this.queryCount --;
                                console.log('Products: ', this.products);
                            
                            })
                            .catch( (error) =>{

                                this.queryCount --;

                                 console.log(error) 
                                 });
                    

      ///console.log('Items: ', this.$refs.productSelect.items);
    }



    created(){
       
    }

}
</script>

