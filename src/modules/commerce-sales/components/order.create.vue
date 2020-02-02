<template>
    <div>

    <v-dialog
        origin="center center"
        persistent
        scrollable
        transition="dialog-transition"
        v-model="loading"
        width="400"
    >


    <v-card>
        <v-card-title primary-title>
            <div>
                <h5 class="headline mb-0"></h5>
            </div>
        </v-card-title>
        
        <v-card-text>
            <center>
                <template v-if="savingOrder"> Saving Order</template>
                <template v-if="orderlineBeingSaved">Adding <b>{{ orderlineBeingSaved.product.name }}</b> to order</template>
            </center><br>
            <v-progress-linear indeterminate></v-progress-linear>
         </v-card-text>
        <v-card-actions>
            <!--v-btn flat color="primary">text</v-btn>
            <v-btn flat color="primary">text</v-btn-->
        </v-card-actions>
    </v-card>

    </v-dialog>

       
            <invoice-preview ref="invoice-preview"></invoice-preview>


        <v-card>
        
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Enter Sales Order</h3>
                    <div></div><br/>
                </div>
            </v-card-title>
            <v-card-text>
                <order-form ref="order-form"></order-form>
            </v-card-text>

            <v-card-actions>
               

                        {{error}}
                    <v-btn @click="save" color="primary" :disabled="loading">
                         Save
                    </v-btn>&nbsp
                    <v-btn color="success" @click="preview" outlined>Preview</v-btn>

            </v-card-actions>
        </v-card>
    </div>
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import OrderForm from './order.form.vue';
import InvoicePreview from './invoice.preview.vue';
import { Ref } from 'vue-property-decorator';
import gql from 'graphql-tag';
import sweetalert from 'sweetalert2';


@Component({
    components: { OrderForm, InvoicePreview }
})
export default class SalesOrderCreate extends Vue {


    @Ref('order-form')
    private orderForm!: OrderForm;

    @Ref('invoice-preview')
    private invoicePreview!: InvoicePreview;

    private loading = false;

    private error = '';

    private savingOrder = false;

    private orderlineBeingSaved = null;


    private async save(mutate: Function){

        const _this = <any> this;

        try {
            
            const {order , orderlines } = await <any>this.orderForm.validate({transformProduct: false});

            order.clientMutationId = '778070jk';


            this.loading = true;
            this.savingOrder = true;

           var {data: {createOrder: { orderId }}} = await _this.$apollo.mutate({
                mutation: gql`mutation($order:createOrderInput!){ createOrder(input: $order){ orderId :id}}`,
                variables: { order },
            });

           console.log('result[id]: ', orderId);

           this.savingOrder = false
           // order saved...

           try{
                var id = 1;


                var running = [];


                for( var index in orderlines){

                    var orderline = orderlines[index];

                    orderline._id = id++;
                    orderline.salesOrder = orderId;
                    orderline.clientMutationId = '47890xtcfuvybnj'

                    this.orderlineBeingSaved = orderline;

                    var result =  await _this.$apollo.mutate({
                        mutation: gql ` mutation($orderline: createOrderlineInput!){ createOrderline(input: $orderline){ id }}`,
                        variables: { orderline : { ...orderline, product: orderline.product._id } }
                    });
                    
                    //running.push(result);


                }


                /*

                orderlines.forEach( (orderline: any) => {

                    orderline._id = id++;
                    orderline.salesOrder = orderId;
                    orderline.clientMutationId = '47890xtcfuvybnj'

                    this.orderlineBeingSaved = orderline;

                    var result =   _this.$apollo.mutate({
                        mutation: gql ` mutation($orderline: createOrderlineInput!){ createOrderline(input: $orderline){ id }}`,
                        variables: { orderline : { ...orderline, product: orderline.product._id } }
                    });
                    
                    running.push(result);
                    
                  //end of foreach
                });

                */


               // Promise.all(running)
                 //   .then( () => { this.loading = false;})

           }
           catch( error ){
                this.loading = false;
                console.error('Error: ', error)
           }
           

            
        } 
        catch (error) {

            console.error('errors: ', error)
            this.loading = false;
            
        }


        // done saving
        this.loading = false;

        
        
        //sweetalert.enableButtons();
        sweetalert.fire({
            title: 'Order Saved',
            titleText:  'Order saved succesfully. Generate invoice to issue to customer',
            icon: 'success',
            confirmButtonText: 'Generate',
            cancelButtonText: 'Cancel',
            
            
        }).then(
            swal => {}
        )


    }


    private onSaved(data: any){
        console.log('saved: ', data);
        // save orderlines now


    }





    private async preview(){

        try {
            
            const result = await <any> this.orderForm.validate({transformProduct: false});
            
            this.invoicePreview.open(result);

        } catch (error) {

            console.log('validation errors: ', error)
            
        }

    }

}
</script>

