<template>
  <div class="home">
    <ul id="example-1">
  <li v-for="product in products" :key = "product.product_id">
    {{ product.product_name }}
  </li>
  </ul>
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
