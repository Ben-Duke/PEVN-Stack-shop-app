<template>
  <div class="home">
    <!-- <ul id="example-1">
<li v-for="product in products" :key = "product.product_id">
<v-card flat dark height="100%">
    <v-container fluid>
      <v-layout column>
        <v-flex>{{product.product_name}}</v-flex>
        <v-flex>
          <img v-bind:src="product.url" alt="product picture" width="250" height="200">
        </v-flex>
        <v-flex xs2 class="caption">
          <span>
            {{ product.product_price }}
          </span>
        </v-flex>
  
      </v-layout>
    </v-container>
  </v-card>    
    
  </li>
  </ul>
  
   -->
  <v-container fluid grid-list-md>
      
    <v-layout row wrap>
      <v-flex xs12 md4 v-for="product in products" :key = "product.product_id">
        <v-card flat deep-purple height="100%">
    <v-container fluid>
      <v-layout column>
        <v-flex>{{product.product_name}}</v-flex>
        <v-flex>
          <img v-bind:src="product.url" alt="product picture" width="250" height="200">
        </v-flex>
        <v-flex xs2 class="caption">
          <span>
            {{ product.product_price }} 
            <span>
            <v-btn small>Add to basket</v-btn>
            </span>
          </span>
          
        </v-flex>
  
      </v-layout>
    </v-container>
  </v-card> 
          </v-flex>
      </v-layout>
  </v-container>

  </div>
</template>

<script>
export default {  
  data() {
    return {
    title : "Home",
    products: []
    }
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
