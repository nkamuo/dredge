<template>
    <div>
        <v-dialog
            rattach="false"
            rcontent-class="class"
            rdisabled
            rfull-width fullscreen
            rhide-overlay
            rlazy
            rmax-width="none"
            origin="center center"
            persistent
            rreturn-value="returnValue"
            rscrollable
            transition="dialog-transition"
            rvalue="value"
            width="80px"
            v-model="savingDialogOpen"
        >

        <v-card>
            <p> Creating Store </p><br>
            <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-card>
            
        </v-dialog>
        <v-card>
            
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Create Store</h3>
                    <div>description</div>
                </div>
            </v-card-title>

            <v-card-text>

                <store-form ref="store-form"></store-form>
            
            </v-card-text>

            <v-card-actions>
                <v-btn @click="save" outlined text>Save</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import StoreForm from './store.form.vue';
import { Ref, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';


@Component({
    components: { StoreForm }
})
export default class InventoryStoreCreate extends Vue {


    private saving = false;

    private error = false;

    private savingDialogOpen = false;

    @Ref('store-form')
    private storeForm!: StoreForm;


    public async save(){


        try{
        var store = await this.storeForm.validate();

        this.saving = true;

        var result  =   await    (<any>this).$apollo.mutate({
                    mutation: gql `mutation($store: createStoreInput!){
                        createStore(input: $store){
                            id
                        }
                    }`,
                    variables: { store}
                });

        console.log('Store saved: ', result );

        this.saving  = false;

        }
        catch(error){
            this.saving = false;
            this.error = true;
            console.error(error);
        }


    }


    @Watch('saving')
    private onSaving( saving: boolean)
    {
        this.savingDialogOpen = saving;
    }

}
</script>

