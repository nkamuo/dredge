<template>
    <div>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Create a product category</h3>
                    <div>description</div>
                </div>
            </v-card-title>
            <v-card-text>

                <category-form ref="category-form"></category-form>
            </v-card-text>
            <v-card-actions>
                <v-btn flat color="primary">text</v-btn>
                <v-btn flat color="primary">text</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import CategoryForm from './category.form.vue'
import { Ref } from 'vue-property-decorator';

@Component({
    components: { CategoryForm }
})
export default class CatalogCategoryCreate extends Vue {

    @Ref('category-form')
    private categoryForm!: CategoryForm;
}
</script>

