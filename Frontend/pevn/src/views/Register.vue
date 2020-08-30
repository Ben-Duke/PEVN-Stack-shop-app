<template>
  <div class="register">
   <Navbar></Navbar>
    <v-form align="center"
      ref="form" class="loginForm"
    >
      <v-text-field
        v-model="fname"
        :counter="20"
        :rules="nameRules"
        label="First name"
        required
      ></v-text-field>
      <v-text-field
        v-model="lname"
        :counter="20"
        :rules="nameRules"
        label="Last lame"
        required
      ></v-text-field>
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
      <v-text-field
        v-model="confirmPassword"
        id="password"
        type="password"
        label="Confirm Password"
        :rules="passwordRules"
        required
      ></v-text-field>
      <v-btn
        
        color="success"
        class="mr-4"
        @click="register"
      >
        Register
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
        fname: '',
        lname: '',
        email: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
        password:'',
        confirmPassword:'',
        passwordRules: [
        this.confirmPassword != this.password || 'Password doesnt match is required',
        v => (v && v.length < 6) || 'password much be at least 6',
      ],
        }
    },
  components:{
    Navbar
  },
  created: function (){
     
  },
  methods:{
      validate: function(){
        var valid = true;
        if(this.email.length < 1){
          valid = false;
        }
        if(this.password.length < 1){
          valid = false;
        }
        return valid;
      },
      register: function(){
      //validate 

      //insert address first

      //Create new user

      //If successful login them in at the same time
      console.log("will call register")
    }
  }
}
</script>>