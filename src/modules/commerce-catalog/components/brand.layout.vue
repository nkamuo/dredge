<template>

    <v-card>
        <v-card-title primary-title>
            <v-toolbar>
                <h3 class="headline mb-0">Brands</h3>

                <v-spacer></v-spacer>
                
                <v-btn  @click="$router.push('/catalog/brands/create')" text outlined>Create Brand</v-btn>
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
export default class CatalogBrandLayout extends Vue {
    
}
</script>

