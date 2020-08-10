database = require('../Config/database');

exports.insertUser= async function(values,req, res, callback){
    qs = "INSERT INTO public.user("
    qs = qs + " user_fname, user_lname, user_phone, user_email, user_password)"
    qs = qs + " VALUES ('" + values[0] + "', '"+ values[1] +"', '"+ values[2]+"','"
    qs = qs +  values[3] + "','" + values[4] + "');"
    console.log(qs)
    pool = database.getPool();
        pool.query(qs, (err, res) => {
            if(err != undefined){
                console.log(err)
                error = {'error':err.routine}
                callback(error);
            }
            else{
                callback(res.rows);
            }
            
        })
}

exports.authUser = async function(email,req, res, callback){
    qs = "Select * from public.user where user_email ='" + email + "';"
    pool = database.getPool();
        pool.query(qs, (err, res) => {
            if(err != undefined){
                console.log(err)
                error = {'error':err.routine}
                callback(error);
            }
            else{

                
                callback(res.rows);
            }
            
        })
}