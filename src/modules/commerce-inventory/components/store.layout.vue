<template>

    <v-card>
        <v-card-title primary-title>
            <v-toolbar >
                <h3 class="headline mb-0">Stores</h3>
                <v-spacer></v-spacer>
                
                <v-btn  @click="$router.push('/inventory/stores/create')" outlined text>Create Store</v-btn>
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
export default class InventoryStoreLayout extends Vue {
    
}
</script>

