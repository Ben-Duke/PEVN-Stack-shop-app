<template>
  <div class="Login">
    <Navbar></Navbar>
    <v-form align="center"
      ref="form" class="loginForm"
    >
      <v-text-field
        id="email"
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        id="password"
        type="password"
        label="Password"
        required
      ></v-text-field>
      <v-btn
        
        color="success"
        class="mr-4"
        @click="login"
      >
        Login
      </v-btn>
    </v-form>

  </div>
  
</template>

<style scoped>
.loginForm{
    width:70%;
    left:20%;
    padding-left: 35%;
}

</style>

<script>
import Navbar from "../components/Navbar";
export default {
    data(){
        return{
        email: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password:'',
        }
    },
  components:{
    Navbar
  },
  created: function (){
     
  },
  methods:{
      login: async function(){
        // this.$refs.form.validate();
        let email = this.email;
        let password = this.password;

        if(this.validate()){
          fetch('http://localhost:3000/user/login',
          {method: 'post',
          headers:{
          "Content-Type": "application/JSON"
          },
          body: JSON.stringify(
              {
              email:email,
              password:password
              })
              })
          .then(response => 
          response.json())
          .then(data => {
              sessionStorage.setItem("user_id", data["id"])
              sessionStorage.setItem("token", data["token"])
          })
        }
        else{
          console.log("Not valid")
        }
      },
      validate: function(){
        var valid = true;
        if(this.email.length < 1){
          valid = false;
        }
        if(this.password.length < 1){
          valid = false;
        }
        return valid;
      }
  }
}
</script>>