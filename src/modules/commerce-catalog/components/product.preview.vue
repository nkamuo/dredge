<template>

            <v-card
                class="mx-auto my-12"
                max-width="374"
                >
                            <!--v-img
                            height="250"
                            src="/img/thread/store.jpg"
                            ></v-img-->

                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0"> {{product.name}}</h3>
                                        <div>{{ product.sku }}[description]</div>
                                    </div>
                                </v-card-title>

                            <v-card-text>
                            <!--v-row align="center"-->
                                <v-rating
                                :value="4.5"
                                color="amber"
                                half-increments
                                dense
                                size="14"
                                readonly
                                ></v-rating>

                                <div class="grey--text ml-4">4.5 (413)</div>
                            <!--/v-row-->

                            <div class="my-4 subtitle-1 black--text">
                                $ • Italian, Cafe
                            </div>

                            <div>Small plates, salads & sandwiches an inteimate setting with 12 indoor seats plus patio seating.</div>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-text>
                            
                                <v-chip>5:30PM</v-chip>
                                <v-chip>7:30PM</v-chip>
                                <v-chip>8:00PM</v-chip>
                                <v-chip>9:00PM</v-chip>
                            
                            </v-card-text>

                            <v-card-actions>
                            <v-btn
                                color="deep-purple accent-4"
                                text
                                @click=""
                            >
                                Reserve
                            </v-btn>
                            </v-card-actions>
  </v-card>


</template>



<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class CatalogProductPreview extends Vue {


    @Prop()
    private product: object;

}
</script>
