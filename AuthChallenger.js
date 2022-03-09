// Declare the function Auth Challenger that takes in one parameter, the users

const authChallenger = (knex) => {
  // This will return True or False
  return async function (username, password,cb){
    // console.log(username,password)
  try{
    let query  = await knex
      .select("username")
      .from("users")
      .where("username",username)
      .where("password",password)
    // console.log(query)
    if(query.length ===1){
      return cb(null,true)
    } else{
      return cb(null,false)
    } 
    }catch(err){
      console.log(err)
  }

  };
};
// This code exports the function we hae just defined.
module.exports = authChallenger;
