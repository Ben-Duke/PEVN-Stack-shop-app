database = require('../Config/database');

function runQuery (qs, callback){
    pool = database.getPool();
        pool.query(qs, (err, res) => {
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
    runQuery(qs,callback);
    
}
exports.login = async function(email,req, res, callback){
    qs = "Select * from public.user where user_email ='" + email + "';"
    runQuery(qs,callback);
}
exports.saveToken = async function (token, email, callback){
    qs = "Update public.user set token = '" + token + "' where user_email ='" + email + "' RETURNING *;"
    runQuery(qs,callback);
}
exports.clearToken = async function (id, token, callback){
    qs = "Update public.user set token = '' where token ='" + token  
    qs += "' and user_id ='" + id +"';"
    runQuery(qs,callback);
}
exports.checkAddress = async function(street, town, postcode, callback){
    qs = "Select * from public.address where "
    qs += "street ='"+ street + "' and town ='"
    qs += town +"' and postcode ='" + postcode +"';"
    runQuery(qs,callback);
}
exports.insertAddress = async function(street, town, postcode, callback){
    qs = "INSERT INTO public.address("
    qs += "street, town, postcode) "
    qs += "VALUES ('" + street +"','"+ town + "','" + postcode +"') RETURNING *;"
    runQuery(qs,callback);
}