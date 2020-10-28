<template>
  <div class="Login">
    <Navbar></Navbar>
    <h1>Logged out</h1>
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
     this.logout();
  },
  methods:{
      logout: async function(){
        
        let user_id = sessionStorage['user_id'];
        let token = sessionStorage['token'];
        console.log(user_id + " " + token)
        if(user_id == undefined || token == undefined){
            //dont send request as may not be the right user
          sessionStorage.removeItem('user_id');
          sessionStorage.removeItem('token');
        }
        else{
          fetch('http://localhost:3000/user/logout',
          {method: 'post',
          headers:{
          "Content-Type": "application/JSON"
          },
          body: JSON.stringify(
              {
              user_id:user_id,
              token:token
              })
              })
          .then(response => 
          response.json())
          .then(data => {
              console.log("called")
              console.log(data);
              sessionStorage.removeItem('user_id');
              sessionStorage.removeItem('user_fname');
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('basket');
          })
        }
      },
      
  }
}
</script>>