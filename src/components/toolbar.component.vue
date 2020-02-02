<template>
    <v-app-bar rstyle="position:fixed; top:0px;" color="primary" app>
        
        <v-btn v-on:click="$emit('toggle-navbar')" text> <v-icon color="white">menu</v-icon></v-btn>

        <h2 style="align:center;">
            Nifrat Commerce Dredge
        </h2>

        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn text> <v-icon>account_circle</v-icon></v-btn>
            <v-btn text><v-icon>home</v-icon></v-btn>
            <v-btn text>
                <v-badge color="red" overlap>
                    <template v-slot:badge> 7
                    </template>
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';


@Component({})
export default class ToolbarComponent extends Vue {

    ///private app: boolean = false;

}
</script>

