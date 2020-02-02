<template>

    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">headline</h3>
                <div>description</div>
            </div>
        </v-card-title>
        <v-card-text>

            
            <v-data-table
                :headers="[
                { value: item => item.product.name, text: 'Product' },
                //{ value: 'productCondition', text: 'Product Condition'},
                { value: 'quantity', text: 'Quantity'},
                { value: 'unitPrice', text: 'Unit Price'},
                { value: 'lineTotal', text: 'Line Total'},
               // { value: 'action', text: 'Action' }
                ]"
                :items="order.orderlines"
                hide-default-footer
                class="elevation-1"
                item-key="id"
            >
                <template v-slot:item="{item}">
                    <orderline-form :orderline="item" @remove="removeOrderline" deletable></orderline-form>
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
                        <td>
                            <v-btn color="blue" @click="isSelectProductDialogOpen = true" text>
                                <v-icon>add</v-icon> Add
                            </v-btn>
                        </td>
                    </tr>
                    <!--v-divider></v-divider-->
                </template>
                
            </v-data-table><br/><br/>

        </v-card-text>
        <v-card-actions>
            <v-btn flat color="primary">text</v-btn>
            <v-btn flat color="primary">text</v-btn>
        </v-card-actions>
    </v-card>
    
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component({})
export default class SalesOrder extends Vue {

}
</script>

