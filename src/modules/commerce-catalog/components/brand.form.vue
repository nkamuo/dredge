<template>
    <div>
        <v-layout justify-space-around row wrap>
            
            <v-flex sm5>
                <v-input>
                    <v-text-field
                        name="brand.name"
                        v-model="brand.name"
                        label="Brand Name"
                        outlined
                    ></v-text-field>
                </v-input>
            </v-flex>

       

            <v-flex sm5>
                <v-input>
                    <v-text-field
                        name="slogan"
                        v-model="brand.slogan"
                        label="Brand slogan (optional)"
                        :rows="1"
                        outlined
                    ></v-text-field>
                </v-input>
            </v-flex>
        </v-layout>



        <v-layout justify-space-around row wrap>

            <v-flex sm5>
                <v-input>
                    <v-textarea
                        name="brand.shortdescription"
                        v-model="brand.shortDescription"
                        label="Enter description for Brand(optional)"
                        :rows="1"
                        filled
                        outlined
                    ></v-textarea>
                </v-input>
            </v-flex>
            
            <v-flex sm5>
                <v-input>
                    
                    <v-rating
                        name="brand.rating"
                        v-model="brand.rating"
                        :value="0"
                        color="amber"
                        half-increments
                        dense
                        rsize="14"
                        placeholder="Rate this brand"
                        outlined
                    ></v-rating> &nbsp <span v-if="brand.rating">( {{brand.rating}} )</span>
                </v-input>
            </v-flex>

       
        </v-layout>
    
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({})
export default class CatalogBrandForm extends Vue {


private brand: {[i: string]: any} = {};

@Prop()
private categories!: object[];


public async validate(){
        
        if( ! this.brand.name){
            throw new Error("Brand name not specified")
        }
        
        return {
            name: this.brand.name,
            slogan: this.brand.slogan,
            rating: this.brand.rating,
            shortDescription: this.brand.shortDescription,
        }
    
}


    public clear(){

    }


}
</script>

