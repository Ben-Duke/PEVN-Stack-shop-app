<template>
    <div>
        <div id="nav" data-app>
            <router-link to="/">Home</router-link> |
            <router-link to="/login">Login</router-link> |
            <router-link to="/register">Register</router-link> |
            <router-link to="/logout">Logout</router-link> |
            <router-link to="/myorders">My orders</router-link>
            <router-view/>
            <v-btn @click='openCheckout()'>🛒</v-btn>
            <v-dialog v-model="modal" left="30%" width="30%" >
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Cart
                </v-card-title>
                 <v-divider></v-divider>
                 <ul id="Basket" v-if="basket.length > 0">
                     <p>Name | Amount</p>
                    <li v-for="item in basket" :key="item.id">
                        <p>{{ item.name }}     {{ item.quantity }}<v-btn @click="deleteItem( item.id )">X</v-btn></p>
                    </li>
                </ul> 
                <p v-else>Basket is empty</p>
                
            <v-btn @click="$router.push('/checkout')">Check out</v-btn> 
            <v-btn @click="modal = false;">Close</v-btn>
            </v-card>
        </v-dialog>
            <p v-if="loggedin">Hi {{this.name}}</p>
        </div>
        
    </div>
</template>
<script>
    export default {
        data(){
            return {
                modal:false,
                basket:[],
                name : "",
                loggedin: false
            }
        },
        created(){
            var name = sessionStorage.getItem("user_fname");
            var token = sessionStorage.getItem("token");
            if(name != undefined && token != undefined){
                this.name = name;
                this.loggedin = true;
            }
            else{
                this.name = "";
                this.loggedin = false;
            }
        },
        methods: {
            openCheckout: function (){
                console.log("Open Cart")
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
                console.log("****")
                console.log(basket)
                console.log("****")
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