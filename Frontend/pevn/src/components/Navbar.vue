<template>
    
        <div id="nav" data-app class="navbar">
            <div class="logo">
                <router-link to="/">
                <img src="\Eshoplogo.png" width = 100 height=100 float:left>
                </router-link>
            </div>
            <div class="accountItems">
            <v-btn  @click='openCheckout()'>🛒</v-btn>
            <v-dialog v-model="modal" left="30%" width="30%" >
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Cart
                </v-card-title>
                 <v-divider></v-divider>
                 <ul id="Basket" v-if="basket.length > 0">
                    
                    <v-data-table :headers="headers" :items="basket">
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.name}}</td>
                        <td>
                        
                        {{row.item.quantity}}
                        
                            </td>
                        <td>{{row.item.price}}</td>
                        <td>
                            <v-btn class="mx-2" fab white small color="pink" @click="deleteItem(row.item.id)">
                                ❌
                            </v-btn>
                        </td>
                    </tr>
                </template>
                </v-data-table>
                            </ul> 
                            <p v-else>Basket is empty</p>
                            
                        <v-btn v-if="basket.length > 0" @click="$router.push('/checkout')">Check out</v-btn> 
                        <v-btn @click="modal = false;">Close</v-btn>
                        </v-card>
                    </v-dialog>

        <v-menu
      bottom
      :close-on-content-click="closeOnContentClick"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Account
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <router-link :to=item.directTo>{{ item.title }}</router-link>
        </v-list-item>
      </v-list>
    </v-menu>


            <p>Hi, {{this.name}}</p>
    </div>
        </div>
    
</template>


<script>
    export default {
        data(){
            return {
                modal:false,
                basket:[],
                items:[{"title":"Login", "directTo": "/login"},
                {"title":"Register", "directTo": "/register"},
                {"title":"Logout", "directTo": "/logout"},
                {"title":"My orders", "directTo": "/myorders"}],
                name : "please sign in",
                loggedin: false,

                headers: [
                    {
                        text: 'Name',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Amount', value: 'quantity' },
                    { text: 'Price', value: 'price' },
                    ],
                    closeOnContentClick: true,
                        }
        },
        created(){
            var name = sessionStorage.getItem("user_fname");
            var token = sessionStorage.getItem("token");
            if(name != undefined && token != undefined){
                this.name = name;
                this.loggedin = true;
                this.items = [{"title":"Logout", "directTo": "/logout"},
                {"title":"My orders", "directTo": "/myorders"}]
            }
            else{
                this.name = "please sign in";
                this.loggedin = false;
                this.items = [{"title":"Register", "directTo": "/register"},
                {"title":"Login", "directTo": "/login"}]
            }
        },
        methods: {
            openCheckout: function (){
                
                try {
                    var basket = JSON.parse(sessionStorage.getItem("basket"));
                } catch (error) {
                    console.log(error)
                }
                if (basket == undefined){
                    basket = []
                }else{
                    //Set the basket so vue can display the items
                    this.basket = basket;
                }
                // console.log("****")
                // console.log(basket)
                // console.log("****")
                this.modal = true;
            },
            deleteItem: function(id){
                // console.log("Deleting")
                // console.log(id)
                for(var i = 0; i < this.basket.length; i++){
                    if(this.basket[i].id == id){
                        this.basket.pop(i);
                        this.saveBasket();
                    }
                }
            },
            saveBasket: function(){
                sessionStorage.setItem("basket", JSON.stringify(this.basket))
            },
        }
    }
    
</script>