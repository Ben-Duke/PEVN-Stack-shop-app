<template>
  <div class="product">
    <Navbar></Navbar>
    <h1>This is a product page</h1>
    <br>
    <h1>{{product.product_name}}</h1>

  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
    data(){
        return{
            product:{}
        }
    },
  components:{
    Navbar
  },
  created: function (){
      this.getProduct();
  },
  methods:{
      getProduct: function(){
        var id = this.$route.params.id;
          // console.log(this.$route.params.id)
          fetch('http://localhost:3000/products/'+id)
        .then(response => 
        response.json())
        .then(data => {
            // console.log(data)
        
            this.product = data[0];
            // console.log("****")
            // console.log(this.product)
        })
      }
  }
}
</script>>