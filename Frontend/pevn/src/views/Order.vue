<template>
  <div class="Order">
    <Navbar></Navbar>
    <h1>Order page</h1>
    OrderId : {{this.$route.params.id}}
  </div>
  
</template>

<style scoped>


</style>

<script>
import Navbar from "../components/Navbar";
export default {
    data(){
        return{
        }
    },
  components:{
    Navbar
  },
  created: function (){
     console.log(this.$route.params.id)
     console.log("Order page works")
     this.getOrder();
  },
  methods:{
      getOrder: async function(){
        
        let user_id = sessionStorage['user_id'];
        let token = sessionStorage['token'];
        let order_id = this.$route.params.id
        console.log(user_id + " " + token + " " + order_id + "||")
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
              console.log("called")
              console.log(data);
              
          })
        }
      },
      
  }
}
</script>>