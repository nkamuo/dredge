<template>
    
</template>



<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';


@Component
export default class SalesReturnForm extends Vue {

    @Prop({
        type: Object,
        required: true
    })
    private order!: Object;

}
</script>

