<template>
  <div class="register">
   <Navbar></Navbar>
    <v-form align="center"
      ref="form" class="loginForm"
    >
      <h1>User Details</h1>
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
        id="phone"
        v-model="phone"
        :rules="phoneRules"
        label="Phone"
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
        id="passwordconfirm"
        type="password"
        label="Confirm Password"
        required
      ></v-text-field>
      <br>
      <h1>Address</h1>
      <v-text-field
        v-model="street"
        :counter="20"
        :rules="nameRules"
        label="Street"
        required
      ></v-text-field>
      <v-text-field
        v-model="town"
        :counter="20"
        :rules="nameRules"
        label="Town"
        required
      ></v-text-field>
      <v-text-field
        v-model="postcode"
        :counter="20"
        :rules="nameRules"
        label="Postcode"
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
        phone:'',
        street:'',
        town:'',
        postcode:'',
        password:'',
        confirmPassword:'',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
        phoneRules: [
        v => !!v || 'Phone number is required',
        v => (v && v.isNaN) || 'Name must be less than 20 characters',
      ],
        passwordRules: [
        this.passwordcheck() == false || 'Password doesnt match is required',
        v => (v.length < 6) || 'password much be at least 6',
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
        if(!this.passwordcheck()){
          valid = false;
          this.$refs.form.passwordconfirm.error = "No try again";
        }
        if(this.street == ''){
          valid = false;
        }
        if(this.town == ''){
          valid = false;
        }
        if(this.postcode == ''){
          valid = false;
        }
        return valid;
      },
      register: async function(){
      //validate 
      if(this.validate()){
        console.log("will call register")
        //insert address first
         var address_id = await fetch('http://localhost:3000/user/newaddress',
          {method: 'post',
          headers:{
          "Content-Type": "application/JSON"
          },
          body: JSON.stringify(
              {
              street:this.street,
              town:this.town,
              postcode:this.postcode
              })
              })
          .then(response => 
          response.json())
          .then(data => {
              return data.address_id

          })
                 //Create new user
              fetch('http://localhost:3000/user/register',
              {method: 'post',
              headers:{
              "Content-Type": "application/JSON"
              },
                body: JSON.stringify({
                fname: this.fname,
                lname: this.lname,  
                phone: this.phone,  
                email: this.email,
                password: this.password,
                address_id: address_id,
                })
                })
              .then(response => 
                response.json()
              
              ).then(data => {
              console.log(data)
              this.$router.push({ name: 'Home' });
          })
              
            }
          //If successful login them in at the same time
            
 

        
      
     
    },
    passwordcheck: function(){
      console.log("checked")
      console.log(this.password)
      console.log(this.confirmPassword)
      return this.password == this.confirmPassword
    }
  }
}
</script>>