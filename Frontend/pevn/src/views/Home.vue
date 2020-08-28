
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
            <v-btn small >Add to basket</v-btn>
            </span>
          </span>
          
        </v-flex>
  
      </v-layout>
    </v-container>
  </v-card> 
  
          </v-flex>
          
      </v-layout>
      <v-btn small >previous 10 products</v-btn>
      <v-btn small >next 10 products</v-btn>
  </v-container>

  </div>
</template>



<script>
import Navbar from "../components/Navbar";


export default {  
  
  data() {
    return {
    title : "Home",
    products: []
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
      fetch('http://localhost:3000/products')
      .then(response => 
      response.json())
      .then(data => {
        console.log(data)
        
        this.products = data.products;
        console.log(this.products)
        })
    }
  }
};
</script>
