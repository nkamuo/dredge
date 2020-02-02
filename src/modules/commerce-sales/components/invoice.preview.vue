<template>
    <v-dialog
        v-model="isOpen"
        transition="dialog-transition"
    >
        <div ref="base-element" id="invoice-preview-printer">
            <v-card>
                
                <v-card-title color="primary" primary-title>
                    
                    <v-layout % row wrap>
                        <v-flex xs2>
                            <v-img width="70%" src="/img/icons/divinics.jpg"></v-img>
                        </v-flex>

                        <v-flex xs10>
                            <div>
                                <h1 class="blue-text">DIVINICS ELECTRICAL SHOP</h1><br>
                                <p class="center"><q class="red-text">Best Quality, Best Price</q> </p>
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-layout justify-space-between row wrap>
                        <v-flex xs5>
                            <small>
                                Shop C28<br>
                                No. 26 Oko Road Ekwulobia<br>
                                Anambra, Nigeria
                            </small>
                        </v-flex>

                        <v-flex xs5>
                            <small>
                                <v-icon>call</v-icon> &nbsp 07069799304<br>
                                <v-icon>mdi-web</v-icon>  &nbsp www.divinics.com<br>
                                <v-icon>mdi-facebook-box</v-icon> &nbsp fb.com/DivinicsElectricalShop
                            </small>
                        </v-flex>
                    </v-layout>
                </v-card-title>

                <v-card-text>

                    <v-layout row wrap>
                        
                    </v-layout>
                    
                    <v-data-table
                        :headers="[
                        { value: 'num', text: 'S/N', divider: true },
                        { value: item => item.product.name, text: 'Description', divider: true },
                        //{ value: 'productCondition', text: 'Product Condition'},
                        { value: 'quantity', text: 'Quantity', divider: true},
                        { value: 'unitPrice', text: 'Unit Price', divider: true},
                        { value: 'lineTotal', text: 'Line Total', divider: true},
                        //{ value: 'action', text: 'Action' }
                        ]"
                        :items="orderlines"
                        hide-default-footer
                        class="elevation-1"
                        item-key="id"
                    >
                        <template v-slot:item="{item, index}">
                            <orderline-form :index="index" :orderline="item"></orderline-form>
                        </template>


                        <template v-slot:item.product="{item}">
                            {{item}}
                        </template>


                        <template v-slot:body.append>
                            <tr >
                                <!--td></td-->
                                <td></td>
                                <td></td>
                                <td >  <b>Subtotal</b></td>
                                <td > {{subtotal}}</td>
                                <!--td>
                                    <v-btn color="blue" @click="isSelectProductDialogOpen = true" text>
                                        <v-icon>add</v-icon> Add
                                    </v-btn>
                                </td-->
                            </tr>
                            <!--v-divider></v-divider-->
                        </template>
                        
                    </v-data-table><br/><br/>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="success" @click="print">print</v-btn>
                </v-card-actions>
            </v-card>
        </div>

        <a id="link" ref="download" download hidden></a>
    </v-dialog>
</template>


<style scoped>
 .blue-text {
     color: blue;
 }

 .red-text {
     color:red;
 }

 .center {
     justify-self: center;
     align-self: center;
 }
</style>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';
import OrderlineForm from './orderline.form.vue';
import jsPDF from 'jspdf';

@Component({
    components: { OrderlineForm }
})
export default class SalesInvoicePreview extends Vue {



    private order = null;

    
    private orderlines = [];

    private isOpen = false;

    @Ref('base-element')
    private baseElement!: HTMLElement;



    public open({order,orderlines}){
         
         this.order = order;

         this.orderlines = orderlines;


         console.log('invoice preview-orderlines: ', orderlines)

         this.isOpen = true;
    }

    get subtotal(){
         var subtotal = 0;

         this.orderlines.forEach( (orderline: any) => {

             subtotal += (orderline.quantity * orderline.unitPrice) ;
         });

         return subtotal;
    }


    public print(){
        console.log('baseELement: ', this.baseElement)

        
        const doc = new jsPDF();

        doc.fromHTML( this.baseElement);
        //doc.autoPrint();
        doc.save('hope.pdf');

        //document.body.innerHTML = this.baseElement.innerHTML;

        //printJS('invoice-preview-printer', 'html')

        
    }

}
</script>
