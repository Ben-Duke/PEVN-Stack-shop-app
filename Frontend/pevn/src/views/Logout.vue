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
        var router = this.$router
        
        if(user_id == undefined || token == undefined){
            //dont send request as may not be the right user
          sessionStorage.removeItem('user_id');
          sessionStorage.removeItem('token');
          setTimeout(function(){ router.push('/');}, 2000);
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
          .then(async () => {
              sessionStorage.removeItem('user_id');
              sessionStorage.removeItem('user_fname');
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('basket');
              
              setTimeout(function(){ router.push('/');}, 2000);
            }
          )
          
        }
      },
      
  }
}
</script>>