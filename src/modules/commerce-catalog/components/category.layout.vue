<template>

    <v-card>
        <v-card-title primary-title>
            <v-toolbar rcolor="primary">
                <h3 class="headline mb-0">Categories</h3>

                <v-spacer></v-spacer>
                
                <v-btn rcolor="orange" @click="$router.push('/catalog/categories/create')" text outlined> Create Category</v-btn>
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
export default class CatalogCategoryLayout extends Vue {
    
}
</script>

