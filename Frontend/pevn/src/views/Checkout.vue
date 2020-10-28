<template>
  <div class="Checkout">
    <Navbar></Navbar>
    <h1>Checkout</h1>


    <!-- <v-data-table
    :headers="headers"
    :items="basket"
    :items-per-page="5"
    class="elevation-1"
  >
  
  </v-data-table> -->

  <v-data-table :headers="headers" :items="basket">
      <template v-slot:item="row">
          <tr>
            <td>{{row.item.name}}</td>
            <td>
              <v-btn class="mx-2" fab white small color="pink" @click="minus(row.item.id)">
                    -
              </v-btn>
              {{row.item.quantity}}
              <v-btn class="mx-2" fab white small color="pink" @click="plus(row.item.id)">
                  +
              </v-btn>
                </td>
            <td>{{row.item.price}}</td>
            <td>
                <v-btn class="mx-2" fab white small color="pink" @click="deleteItem(row.item.id)">
                    ❌
                </v-btn>
            </td>
          </tr>
      </template>
    </v-data-table>
    <p>${{this.total.toFixed(2)}}</p>
    <v-btn v-if="loggedin" @click="processOrder()">Confirm order</v-btn>
    <p v-else>Need to be logged in to complete transaction</p>
  </div>
  
</template>

<style scoped>


</style>

<script>
import Navbar from "../components/Navbar";
export default {
    data(){
        return{
           headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Amount', value: 'quantity' },
          { text: 'Price', value: 'price' },
          ],
          basket: [],
          loggedin: false,
          total:0.00
        }
    },
  components:{
    Navbar
  },
  created: function (){
    this.getBasket()
    
    var name = sessionStorage.getItem("user_fname");
    var token = sessionStorage.getItem("token");
    if(name != undefined && token != undefined){
        this.name = name;
        this.loggedin = true;
    }
    else{
        this.name = "";
        this.loggedin = false;
    }
    this.updateTotal();
        
  },
  methods:{
      getBasket: function (){
                console.log("Open Cart")
                try {
                    var basket = JSON.parse(sessionStorage.getItem("basket"));
                } catch (error) {
                    console.log(error)
                }
                if (basket == undefined){
                    basket = []
                }else{
                    //Set the basket so vue can display the items
                    this.basket = basket;
                }
                console.log("****")
                console.log(basket)
                console.log("****")
                this.modal = true;
            },
      deleteItem: function(id){
                for(var i = 0; i < this.basket.length; i++){
                    if(this.basket[i].id == id){
                        this.basket.pop(i);
                        this.saveBasket();
                    }
                }
            },
      saveBasket: function(){
          sessionStorage.setItem("basket", JSON.stringify(this.basket))
          this.updateTotal();
      },
      minus: function (id){
        for(var i = 0; i < this.basket.length; i++){
            if(this.basket[i].id == id){
                if(this.basket[i].quantity > 1){
                  this.basket[i].quantity = this.basket[i].quantity-1;
                  this.saveBasket();
                }  
            }
          }
          
      },
      plus: function (id){
        for(var i = 0; i < this.basket.length; i++){
            if(this.basket[i].id == id){
                this.basket[i].quantity = this.basket[i].quantity+1;
                this.saveBasket(); 
            }
          }
          
      },
      processOrder: async function(){

        var basketJson = this.basket.map(x => {return {"id":x.id,"amount":x.quantity}} )

        let user_id = sessionStorage.getItem("user_id");
        let token = sessionStorage.getItem("token");

        if(basketJson != undefined){
          fetch('http://localhost:3000/user/order',
          {method: 'post',
          headers:{
          "Content-Type": "application/JSON"
          },
          body: JSON.stringify(
              {
              user_id:user_id,
              token:token,
              basket: basketJson
              })
              })
          .then(response => {
            response.json();
            this.basket = [];
            this.saveBasket();
            this.$router.push('/myorders');
          }
          )
        }
        else{
          console.log("Not valid")
        }
      },
      updateTotal: function(){
        this.total = 0;
        for(var i =0; i < this.basket.length; i++){
          this.total += this.basket[i].price * this.basket[i].quantity
        }
      }
      }
}
</script>>