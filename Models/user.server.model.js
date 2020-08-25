database = require('../Config/database');

function runQuery (qs, callback){
    pool = database.getPool();
        pool.query(qs, (err, res) => {
            if(err != undefined){
                //console.log(err)
                error = {'error':err.routine}
                callback(error);
            }
            else{
                // console.log("****************")
                // console.log(res)
                // console.log("****************")
                callback(res);
            }
            
        })
}

function runQueryValues (qs, values, callback){
    pool = database.getPool();
        pool.query(qs, values, (err, res) => {
            if(err != undefined){
                console.log(err)
                error = {'error':err.routine}
                callback(error);
            }
            else{
                // console.log("****************")
                // console.log(res)
                // console.log("****************")
                callback(res);
            }
            
        })
}
//RETURNING * is used to get the insert id from the request
//wont return anything otherwise
exports.insertUser= async function(values,req, res, callback){
    qs = "INSERT INTO public.user("
    qs = qs + " user_fname, user_lname, user_phone, user_email, user_password)"
    qs = qs + " VALUES ('" + values[0] + "', '"+ values[1] +"', '"+ values[2]+"','"
    qs = qs +  values[3] + "','" + values[4] + "') RETURNING *;"
    runQuery(qs, callback);
    
}
exports.login = async function(email,req, res, callback){
    qs = "Select * from public.user where user_email ='" + email + "';"
    runQuery(qs, callback);
}
exports.saveToken = async function (token, email, callback){
    qs = "Update public.user set token = '" + token + "' where user_email ='" + email + "' RETURNING *;"
    runQuery(qs, callback);
}
exports.clearToken = async function (id, token, callback){
    qs = "Update public.user set token = '' where token ='" + token  
    qs += "' and user_id ='" + id +"';"
    runQuery(qs, callback);
}
exports.checkAddress = async function(street, town, postcode, callback){
    qs = "Select * from public.address where "
    qs += "street ='"+ street + "' and town ='"
    qs += town +"' and postcode ='" + postcode +"';"
    runQuery(qs, callback);
}
exports.insertAddress = async function(street, town, postcode, callback){
    qs = "INSERT INTO public.address("
    qs += "street, town, postcode) "
    qs += "VALUES ('" + street +"','"+ town + "','" + postcode +"') RETURNING *;"
    runQuery(qs, callback);
}
exports.updateUser = async function(values, callback){
    qs =  "UPDATE public.user "
	qs += "SET user_fname=$2, user_lname=$3, user_phone=$4, address_id=$7 "
    qs += "WHERE user_id=$1 and token = $6 and user_email=$5 RETURNING *;"
    runQueryValues(qs, values, callback);
}
exports.checkUserLoggedIn = async function(values,callback){
    qs = "Select * From public.user where user_id = $1 and token = $2"
    runQueryValues(qs,values,callback);
}
exports.createOrder = async function(user_id, callback){
    /*
    INSERT INTO public.customer_orders(
	user_id, "Date")
	VALUES (?, NOW());
   */
  qs =  "INSERT INTO public.customer_orders( "
  qs += "user_id, \"Date\") "
  qs += "VALUES ($1, NOW()) RETURNING *;"
  runQueryValues(qs, user_id, callback);
}

exports.addToOrder = async function(values, callback){
    /*Insert into order_item(order_id, quantity, product_id, item_id)
    Values(1, 1, 1, 1)
    returning *;
    */
    qs =  "Insert into order_item(order_id, quantity, product_id) "
    qs += "Values($3, $2, $1) "
    qs += "returning *;"
    runQueryValues(qs, values, callback);
}