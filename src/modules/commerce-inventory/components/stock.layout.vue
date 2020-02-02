<template>

    <v-card>
        <v-card-title primary-title>
            <v-toolbar >
                <h3 class="headline mb-0">Stock</h3>
                <v-spacer></v-spacer>
                
                <v-btn rcolor="orange" @click="$router.push('/inventory/stock-units')" outlined text>SKUs</v-btn>
            </v-toolbar>

        </v-card-title>

        <v-card-text>
        
           <transition>
            
            <router-view></router-view>

           </transition>

        </v-card-text>
       
    </v-card>
    
</template>



<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component({})
export default class InventoryStockLayout extends Vue {
    
}
</script>

