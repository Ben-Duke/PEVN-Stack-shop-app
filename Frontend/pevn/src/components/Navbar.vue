<template>
    <div>
        <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/product">Product</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
      <router-view/>
        <!-- <button @click="openLogin">
           Login
        </button> -->
    </div>
    
    </div>
</template>
<script>
    export default {
        name: 'todoTask',
        methods: {
            openLogin: function (){
                console.log("Function call for openlogin")
            }
        }
    }
    
</script>