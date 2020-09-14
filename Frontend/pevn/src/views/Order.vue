<template>
  <div class="Order">
    <Navbar></Navbar>
    <h1>Order page</h1>
    OrderId : {{this.$route.params.id}}

    <v-data-table
    :headers="headers"
    :items="order_products"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  Total Price :${{this.total}}
  </div> 
</template>

<style scoped>


</style>

<script>
import Navbar from "../components/Navbar";
export default {
    data(){
        return{
          headers:[
          { text: 'Product id', value: 'product_id' },
          { text: 'Product name', value: 'product_name' },
          { text: 'Price', value: 'product_price' },
          { text: 'Quantity', value: 'quantity' },

        ],
          order_products: [],
          total:0
        }
    },
  components:{
    Navbar
  },
  created: function (){
     this.getOrder();
  },
  methods:{
      getOrder: async function(){
        
        let user_id = sessionStorage['user_id'];
        let token = sessionStorage['token'];
        let order_id = this.$route.params.id
        if(user_id == undefined || token == undefined || order_id == undefined){
            //dont send request as may not be the right user
          console.log("Not valid user_id or token or order_id")
        }
        else{
          fetch('http://localhost:3000/user/orderbyid',
          {method: 'post',
          headers:{
          "Content-Type": "application/JSON"
          },
          body: JSON.stringify(
              {
              user_id:user_id,
              token:token,
              order_id:order_id
              })
              })
          .then(response => 
          response.json())
          .then(data => {
            console.log("Order details")
              console.log(data);
              this.order_products = data;
              this.totalPrice();
          })
        }
      }
      ,
      totalPrice: function(){
        var total = 0.00;
        console.log(this.order_products.length);
        for(var i = 0; i < this.order_products.length; i++){
          total += parseFloat(this.order_products[i].product_price);
        }
        this.total = total.toFixed(2);
      }
      
  }
}
</script>>