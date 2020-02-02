<template>
    <ValidationObserver ref="validation">

        <v-dialog
            v-model="isSelectProductDialogOpen"
            scrollable
            rfullscreen 
            persistent
            :overlay="false"
            rmax-width="500px"
            open-on-hover
            rtransition="dialog-transition"
        >

        <v-card >
           
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Select Products</h3>
                    <div> <small> products to place under this order </small></div>
                </div>
            </v-card-title>
            <v-card-text rscrollable>
                <catalog-product-list selectable v-model="products"></catalog-product-list><br>
            </v-card-text>
            <v-card-actions>
                <v-btn rcolor="red" @click="isSelectProductDialogOpen = false" text outlined> Cancel</v-btn>
                <v-btn rcolor="success" @click="updateOrderlines(); isSelectProductDialogOpen = false;" text outlined>Select</v-btn>
            </v-card-actions>
        </v-card>

            
        </v-dialog>


        <form>
            


            <v-data-table
                :headers="[
                { value: 'id', text: 'S/N', divider: true },
                { value: item => item.product, text: 'Description', divider: true },
                //{ value: 'productCondition', text: 'Product Condition'},
                { value: 'quantity', text: 'Quantity', divider: true},
                { value: 'unitPrice', text: 'Unit Price', divider: true},
                { value: 'lineTotal', text: 'Line Total', divider: true},
                { value: 'action', text: 'Action', divider: true }
                ]"
                :items="orderlines"
                hide-default-footer
                class="elevation-1"
                ritem-key="id"
            >
                <template v-slot:item="{item, index}">
                    <orderline-form  :orderline="item" :index="index" @remove="removeOrderline"  editable deletable></orderline-form>
                </template>



                <template v-slot:body.append>
                    <tr >
                        <td></td>
                        <td></td>
                        <td></td>
                        <td >  <b>Subtotal</b></td>
                        <td title="Orderlines total"> {{subtotal}}</td>
                        <td>
                            
                            <v-btn color="blue" @click="isSelectProductDialogOpen = true" title="Add products to order" outlined text>
                                Add<v-icon>add</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                    <!--v-divider></v-divider-->
                </template>
                
            </v-data-table><br/><br/>



            <v-card>
               
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Billing Infomation</h3>
                    </div>
                </v-card-title>
                <v-card-text>

                    <v-layout justify-space-around row wrap>
                        <v-flex sm5>
                            <v-text-field
                                name="billingAddress"
                                label="Billing Address"
                                placeholder="Enter Billing address(recommended)"
                                v-model="order.billingAddress"
                                prepend-inner-icon="place"
                                hint="Address of the buyer"
                                outlined
                            ></v-text-field>
                        </v-flex>

                        <v-flex sm5>
                            
                            <v-text-field
                                name="orderDate"
                                v-model="order.date"
                                label="Order Date"
                                placeholder="Enter order date(optional)"
                                type="date"
                                prepend-inner-icon="event"
                                hint="when was this order made. Defaults to current date"
                                outlined
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout justify-space-around row wrap>
                        <v-flex sm5>
                            <v-text-field
                                name="customerName"
                                label="Customer's name"
                                prepend-inner-icon="person"
                                hint="name of the buyer"
                                outlined
                            ></v-text-field>
                        </v-flex>

                        <v-flex sm5>
                            <v-text-field
                                name="customerPhone"
                                label="Customer's Phone number"
                                prepend-inner-icon="phone"
                                outlined
                            ></v-text-field>
                            
                        </v-flex>

                    </v-layout>



                    <v-layout justify-space-around row wrap>
                        <v-flex sm5>
                            <!--v-input-->
                            <ValidationProvider rules="required|numeric" v-slot="{errors}">
                                <v-text-field
                                    name="totalAmount"
                                    v-model="order.totalAmount"
                                    label="Total Amount"
                                    type="number"
                                    :value="0"
                                    prepend-inner-icon="money"
                                    :error-messages="errors"
                                    outlined
                                >
                                
                                    <template v-slot:append>
                                        <div>
                                             Bal:  {{order.totalAmount - order.amountPaid}}
                                        </div>
                                    </template>

                                </v-text-field>
                            </ValidationProvider>
                                
                            <!--/v-input-->
                        </v-flex>

                        <v-flex sm5>
                            <ValidationProvider rules="required" v-slot="{errors}">
                                <v-text-field
                                    name="amountPaid"
                                    v-model="order.amountPaid"
                                    label="Amount paid"
                                    type="number"
                                    :value="0"
                                    prepend-inner-icon="payment"
                                    outlined
                                    :error-messages="errors"
                                ></v-text-field>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>

                </v-card-text>
            </v-card><br/><br/>



            <v-card>
                <v-card-title>
                    <div>
                        <h3 class="headline mb-0">Order Status</h3>
                    </div>
                </v-card-title>
                <v-card-text>

                    <v-layout  justify-space-around row wrap>
                        
        
                        <v-flex sm3>
                            <v-checkbox label="Created" v-model="order.created" value></v-checkbox>
                        </v-flex>
                        
                        <v-flex sm3>
                            <v-checkbox label="Suspened" v-model="order.suspended" value></v-checkbox>
                        </v-flex>

                        <v-flex sm3>
                            <v-checkbox label="Invoiced" v-model="order.invoiced" value></v-checkbox>
                        </v-flex>

                    </v-layout>



                        <v-layout justify-space-around row wrap>

                        <v-flex sm3>
                            <v-checkbox label="Shipped" v-model="order.shipped" value></v-checkbox>
                        </v-flex>

                        <v-flex sm3>
                            <v-checkbox label="Paid" v-model="order.paid" value></v-checkbox>
                        </v-flex>

                        <v-flex sm3>
                            <v-checkbox label="Completed" v-model="order.completed" value></v-checkbox>
                        </v-flex>

                    </v-layout>
                    
                </v-card-text>
            </v-card><br/><br/>






            <v-card>
                
                <v-card-title primary-title>
                    Shipment Infomation  &nbsp 
                        <span :title="shipmentEnabled? 'Disable Shipment for this Order': 'Enable Shipment for this Order'">
                        <v-switch
                        v-model="shipmentEnabled"
                        flat
                        inset>
                        </v-switch>
                        </span>
                      
                </v-card-title>
                <v-card-text v-if="shipmentEnabled">

                    <v-layout justify-space-around row wrap>
                        
                        <v-flex sm5>
                            <v-select
                                :items="[]"
                                v-model="order.carrier"
                                label="Carrier"
                                outlined
                                prepend-inner-icon="train"
                            ></v-select>
                        </v-flex>

                        <v-flex sm5>
                            <v-text-field
                                name="shippingDestinationAddress"
                                label="Shipping  destinantion address"
                                prepend-inner-icon="place"
                                outlined
                            ></v-text-field>
                        </v-flex>

                    </v-layout>


                    <v-layout justify-space-around row wrap>
                        <v-flex sm5>
                            
                            <v-text-field
                                name="shipmentAmount"
                                label="Shipment Cost"
                                type="number"
                                prepend-inner-icon="money"
                                placeholder="How much spent of shipment"
                                outlined
                            ></v-text-field>
                        </v-flex>

                        <v-flex sm5>
                            <v-text-field
                                name="shippingSourceAddress"
                                label="Shipping source address"
                                prepend-inner-icon="place"
                                hint="From where the order was shipped(optional)"
                                outlined
                            ></v-text-field>
                        </v-flex>

                    </v-layout>

                </v-card-text>
            </v-card>

            <!--v-date-picker v-model="order.dueDate" :landscape="true" :reactive="true"></v-date-picker-->



        </form>

    </ValidationObserver>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { Watch } from 'vue-property-decorator';
//import Query from '@/dev/graphql';
import gql from 'graphql-tag';
import OrderlineForm from './orderline.form.vue';


@Component({
    components: { ValidationProvider, ValidationObserver, OrderlineForm }
})
export default class SalesOrderForm extends Vue {



    private order = {};

    private customerSearch = ' ';

    private customerName = '';

    private isSelectProductDialogOpen = false;

    private products = [];

    private orderlines = [];

    private shipmentEnabled = false;


/*
    @Query({
        query: gql` query($name: String!){ products(name: $name) { edges { node {id, name}}}}`,

        update: data => data.products.edges.map( (edge: any) => edge.node.name),

        variables(){ return  { name: this.customerSearch}}
    })
    private matchedCustomers = ["Callistus"];
*/



    public removeOrderline(targetOrderline: any){

        var newOrderlines = [];

        this.orderlines.forEach( (orderline: any) => {

            if(orderline.product.id != targetOrderline.product.id){

                newOrderlines.push(orderline);
            }
            else{
                //do nothing
            }
            
        });

        this.orderlines = newOrderlines;
    }


    @Watch('customerSearch')
    onCustomerSearch(search: string){

        console.log('customerSearch: ', search);

        //this.customerName = search;
    }


    public updateOrderlines(){

        
            var products = this.products;

            this.products = [];


            console.log('product: ', products);

                    products.forEach( (product: any) => {

                        //if this products matches a product already in order
                        var matched = false;

                        this.orderlines.map( ( orderline: any) => {
                        
                                //case 1

                                if( orderline.product.id == product.id){
                                    //update the current orderline
                                    matched = true;
                                    return { ...orderline , product };
                                }

                                else return orderline;

                        });


                    if(matched)
                        return;
                    

                    this.orderlines.push({ product, unitPrice: product.unitPrice, quantity: 1 });
    
                        

                    });
                    
    }



    
    @Watch('isSelectProductDialogOpen')
    public addProducts(open: boolean){

        console.log('open: ', open)

            this.products = [];
    }


    searchCustomers( customerSearch: any[]){
        console.log('Customers: ', customerSearch);

        

        return [];
    }



    get subtotal(){
         var subtotal = 0;

         this.orderlines.forEach( (orderline: any) => {

             subtotal += (orderline.quantity * orderline.unitPrice) ;
         });

         return subtotal;
    }



    public async validate({transformProduct = false}){

            const _this = <any> this;

            const valid = await _this.$refs.validation.validate();

            if(! valid){
                throw new Error("Invalid Order Form input");
            }


            const order = this.order;

            var orderlines: {}[];
            
            if(transformProduct){
               orderlines = this.orderlines.map( (orderline: any) => {
                    orderline.product = orderline.product._id;
                    return orderline;
                })
            }

            else orderlines = this.orderlines;

            return {order, orderlines};
    }



    log(...data: any[]){
        console.log(...data);
    }




}
</script>
