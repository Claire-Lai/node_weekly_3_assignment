// This file contains the logic to read and write from our JSON file so that information persists between logins.
// Create a class with methods that can be invoked
/**********************************************
 * Editing the Notes
 * ==================================
 ***********************************************/
/*

 */
// You will be using promises - remember...
// Promises are essentially task queues that “promise” a value will at some point be returned from asynchronous code.

// Create a new NoteService class which takes a file as a dependency, this means whenever we are creating new instances of the noteService, we need to pass in a path to a file (this is the file that we will read, write and edit etc.)
class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

list(user){
      let query = this.knex
        .select("notes.id","notes.content")
        .from("notes")
        .innerJoin("users","notes.user_id","users.id")
        .where("users.username",user)
        .orderBy("notes.id","desc");

      return query.then((rows)=>{
        // console.log(rows)
        return rows.map((row)=>({
          id:row.id,
          content:row.content
        }
        ))
      })
    } catch(err){
      console.log("list error",err)
    }
  

  async add(note,user){
    let query = await this.knex
      .select("id")
      .from("users")
      .where("users.username",user);
    // console.log(query);
    if(query.length===1){
      await this.knex
        .insert({
          content:note,
          user_id:query[0].id,
        })
        .into("notes");
    }else {
      throw new Error
      (`Cannot add a note to a user that doesn't exist`)
    }
  }

  

  async update(id,note){
    try{
      return await this.knex("notes")   
      .update({content:note})
      .where("id",id);
      }  
    catch{
        throw new Error
        (`Unfortunately, the updateis not vaslid.`)
      }
    }

  remove(id,user){
    let query = this.knex
      .select("id")
      .from("users")
      .where("users.username",user);

    return query.then((rows)=>{
      if(rows.length===1){
        return this.knex("notes").where("id",id).del();
      } else{
        throw new Error (`Cannot remove a note  when the user doesn't exist!`)
      }
    })  
  }
}  


module.exports = NoteService;
