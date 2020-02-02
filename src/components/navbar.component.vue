<template>
    
        <!--v-navigation-drawer absolute app>
          <v-toolbar flat>
            <v-list>
              <v-list-item>
                <v-list-item-title class="title">
                  Application
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-toolbar>

          <v-divider></v-divider>
          <v-list dense class="pt-0">
            <v-list-item v-for="submenu in items" :key="submenu.key" @click="navigate(submenu.path)">
              <v-list-item-action>
                <v-icon>{{ submenu.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ submenu.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer-->






<v-card class="primary py-0"   @mouseleave="setMiniVariant(true)" @mouseenter="setMiniVariant(false)">

  <v-card-text rstyle="color:white;">
    <v-navigation-drawer v-model="isOpen" class="primary" :mini-varian.sync="miniVariant" rpermanent rexpand-on-hover rfloating app>
     
      <template v-slot:prepend>
            <v-list class="pt-0"  dense nav>
              <br/>
                <v-list-item>
                    <v-list-item-avatar>
                         <img src="/img/profile.jpg">
                    </v-list-item-avatar>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                     <v-list-item-title class="title">
                      Callistus Nkamuo
                     </v-list-item-title>
                    <v-list-item-subtitle> Web Developer</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <!--/v-list-->
      </template>

      <v-divider rcolor="white"></v-divider>


  <!--v-expansion-panel class="primary">
    <v-expansion-panel-content v-for="(submenu,i) in items" :key="i" class="primary">
      <div slot="header" style="color:white; font-size: 100%;">{{submenu.title}}</div-->

        <!--v-list dense class="pt-0" nav-->


            <!--v-list-item v-for="subItem in items" :key="subItem.key" @click="navigate(subItem.path)" style="color:gray;" >
                <v-list-item-action>
                    <span style="color:gray;"><v-icon color="#aaaaaa"> {{ subItem.icon }}  </v-icon>  </span>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                      <div>
                       <!--v-icon>{{subItem.icon}}</v-icon> {{ subItem.title }}
                        <small> {{subItem.subTitle}} </small>
                        <v-divider color="gray"></v-divider>
                      </div>
                    </v-list-item-title>
                </v-list-item-content><br/>
                
            </v-list-item>
        </v-list-->



            <v-list class="pt-0" rstyle="color:white;" nav>

                <v-list-item
                  key="Dashboard"
                  to="/dashboard"
                  rprepend-icon="dashboard"
                >
                  <v-list-item-content>
                          <v-list-item-title>
                            <v-icon>dashboard</v-icon> &nbsp &nbsp &nbsp
                            Dashboard
                            </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                </v-list-item>

                <v-list-group
                  v-for="submenu in menu"
                  :key="submenu.title"
                  v-model="submenu.active"
                  :prepend-icon="submenu.icon"
                  color="black"
                  rstyle="color:white;"
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title rcolor="white" v-text="submenu.title"></v-list-item-title>
                    </v-list-item-content><br>
                  </template>

                      <v-list-item
                        v-for="item in submenu.items"
                        :key="item.title"
                        :to="item.path"
                        append
                        selectable
                      >

                          <v-list-item-icon v-if="item.icon">
                            <v-icon>{{item.icon}}</v-icon>
                          </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                </v-list-group>

                

             </v-list>


 <!--/v-expansion-panel-content>

 <v-divider></v-divider>

  </v-expansion-panel-->

        
                      <!--v-expansion-panel>
                        <v-expansion-panel-content v-for="(submenu,i) in 5" :key="i">
                          <div slot="header">Item</div>
                          <v-card>
                            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                          </v-card>
                        </v-expansion-panel-content>
                      </v-expansion-panel-->
    </v-navigation-drawer>

  </v-card-text>
  </v-card>




</template>




<style>

.nav {
    color:blue;
}

</style>



<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'

@Component({})
export default class NavbarComponent extends Vue {


private isOpen: boolean = false;


private miniVariant: boolean = true;

  private menu: object[] = [
   /* {
      key: 'dashboard',
      title: 'Dashboard',
      path: '/dashboard',
      subTitle: 'Get an overview  of your entire app',
      icon: 'dashboard'
    },*/
    {
      key: 'first',
      icon: 'list',
      title: 'Catalog',
      path: '/catalog',
      subTitle:'Create and manage products, brands and categories',
      items: [
        {
          key: 'catalog_product', icon: 'mdi-home', path: '/catalog/products', title: "Products"
        },
        {
          key: 'catalog_category', icon: 'category', path: '/catalog/categories', title: 'Categories'
        },
        {
          key: 'catalog_brand', icon: 'mdi-group', path: '/catalog/brands', title: 'Brands'
        }
      ]
    },
    {
      key: 'second',
      icon: 'store',
      title: 'Sales',
      path: '/sales',
      items: [
        {
          key: 'sales.orders', icon: 'mdi-market', title: "Orders", path: '/sales/orders'
        },
        {
          key: 'sales.invoices', icon: 'mdi-invoice', title: 'Invoices', path: '/sales/invoices'
        },
        {
          key: 'sales.supplies', icon: 'mdi-supplies', title: 'Supplies', path:'/sales/supplies'
        }
      ]
    }, 

    {
      key: 'inventory', title: 'Inventory', path: '/inventory', icon: 'inventory',
      items: [
        { key: 'inventory.stores', icon: 'store', title: 'Stores', path: '/inventory/stores',},
        { key: 'inventory.stock', icon: 'list', title: 'Stock',  path: '/inventory/stock', }
      ]
    },
    {
      key: 'system', title: 'System', path: '/system', icon: 'settings',
      items: [
        { key: 'system.people', icon: 'group', title: 'People', path: '/system/people',},
        { key: 'system.roles', icon: 'mdi-function', title: 'Roles',  path: '/system/roles', }
      ]
    }
  ];



  public open(): void{

      this.isOpen = true;

  }


  public close(): void {

      this.isOpen = false;
  }

public toggle(): void {
    this.isOpen = ! this.isOpen;
}

  public navigate(path: any): void {
     console.log('navigation path: ', path);

    // this.$router.push(path);

  }



  public setMiniVariant(value: boolean = true){

   // setTimeout(function(){
      this.miniVariant = value;
    //  console.log("Executed with: ",value)
   // }, 10)
  }

}
</script>

