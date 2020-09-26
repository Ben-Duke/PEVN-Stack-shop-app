
<template>

<div class="home">
  <Navbar></Navbar>

  <v-container fluid grid-list-md>
      
    <v-layout row wrap>
      <v-flex xs12 md4 v-for="product in products" :key = "product.product_id">
        <v-card >
    <v-container fluid>
      <v-layout column >
        <v-flex>{{product.product_name}}</v-flex>
        <v-flex>
          <img v-bind:src="product.url" alt="product picture" width="250" height="200">
        </v-flex>
        <v-flex xs2 class="caption">
          <span>
            {{ product.product_price }} 
            <span>
            <v-btn @click="addToBasket(product.product_id, product.product_name)" small >Add to basket</v-btn>
            </span>
          </span>
          
        </v-flex>
  
      </v-layout>
    </v-container>
  </v-card> 
  
          </v-flex>
          
      </v-layout>
      <v-btn v-on:click="offsetMinus" small >previous 10 products</v-btn>
      <v-btn v-on:click="offsetPlus" small >next 10 products</v-btn>
  </v-container>

  </div>
</template>



<script>
import Navbar from "../components/Navbar";


export default {  
  
  data() {
    return {
    title : "Home",
    products: [],
    offset:0
    }
  },
  components:{
    Navbar
  },
  mounted(){
    
  },
  created(){
    document.title = this.title
    this.getProducts();
  },

  methods: {
    getProducts: function (){
      fetch('http://localhost:3000/products?offset='+this.offset)
      .then(response => 
      response.json())
      .then(data => {
        this.products = data.products;
        })
    },
    offsetPlus: function(){
      this.offset += 9;
      this.getProducts()
      
    },
    offsetMinus: function(){
      this.offset -= 9;
      if(this.offset < 0){
        this.offset = 0
      }
      this.getProducts()
    },
    addToBasket: function(id, name){
      console.log(id);
      try {
        var basket = JSON.parse(sessionStorage.getItem("basket"));
      } catch (error) {
        basket = []
      }
      
      var addedToBasket = false;
      if(basket == undefined){
        basket = []
      }

      for(var i =0; i < basket.length; i++){
        if(basket[i].id == id){
          basket[i].quantity += 1;
          addedToBasket = true;
        }
      }
      if (!addedToBasket){
        basket.push({"id":id, "name":name, "quantity":1})
      }

      sessionStorage.setItem("basket", JSON.stringify(basket))
      console.log(JSON.stringify(basket))


    }
  }
    
};
</script>
