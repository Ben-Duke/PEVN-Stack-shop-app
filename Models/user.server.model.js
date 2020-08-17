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
                // console.log(res)
                callback(res.rows);
            }
            
        })
}

exports.insertUser= async function(values,req, res, callback){
    qs = "INSERT INTO public.user("
    qs = qs + " user_fname, user_lname, user_phone, user_email, user_password)"
    qs = qs + " VALUES ('" + values[0] + "', '"+ values[1] +"', '"+ values[2]+"','"
    qs = qs +  values[3] + "','" + values[4] + "');"
    runQuery(qs,callback);
    
}

exports.login = async function(email,req, res, callback){
    qs = "Select * from public.user where user_email ='" + email + "';"
    runQuery(qs,callback);
}
exports.saveToken = async function (token, email, callback){
    qs = "Update public.user set token = '" + token + "' where user_email ='" + email + "';"
    runQuery(qs,callback);
}
exports.clearToken = async function (id, token, callback){
    qs = "Update public.user set token = '' where token ='" + token  
    qs += "' and user_id ='" + id +"';"
    runQuery(qs,callback);
}