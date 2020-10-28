<template>
  <div class="MyOrders">
     <Navbar></Navbar>
    <h1>MyOrders</h1>
    <br>
    <br>
    <ul id="Orders">
        <li v-for="order in orders" :key="order.order_id">
        Order Number: <router-link :to=" {path: 'Order/' + order.order_id}">{{order.order_id }}</router-link> 
        |
        {{order.Date}}
  </li>
</ul>
    
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
    data(){
        return {
            orders:[]
        }
    },
  components:{
    Navbar
  },
  created: function (){
      this.getOrders();
  },
  methods:{
      getOrders: function(){
        var user_id = sessionStorage["user_id"];
        var token = sessionStorage["token"]
        if(user_id==undefined || token==undefined){
            console.log("Not logged in");
        }else{
              // console.log(this.$route.params.id)
          fetch('http://localhost:3000/user/myorders',
          {method: 'post',
          headers:{
          "Content-Type": "application/JSON"
          },
          body: JSON.stringify(
              {
              user_id: sessionStorage["user_id"],
              token: sessionStorage["token"]
              })
              })
        .then(response => 
        response.json())
        .then(data => {
            
            this.orders= data
            
        })
        }
        
      }
  }
}
</script>>