<template>
    <v-card>

        <v-card-title primary-title>
            <div>
               
            </div>
        </v-card-title>

        <v-card-text>

            <v-data-table
                :headers="[
                    { text: 'ID', value: 'id' },
                    { text: 'Name', value: 'name'},
                    { text: 'Address', value: 'address'}
                ]"
                :items="stores"
                hide-actions
                class="elevation-1"
                select-all
                rpagination.sync="pagination"
                ritem-key="id"
                rloading="true"
                rsearch="search"
            >
                
            </v-data-table>
            
        </v-card-text>

        <!--v-card-actions>
            <v-btn flat color="primary">text</v-btn>
            <v-btn flat color="primary">text</v-btn>
        </v-card-actions-->
    </v-card>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class InventoryStoreIndex extends Vue {

    private stores: any[] = [];

}
</script>

