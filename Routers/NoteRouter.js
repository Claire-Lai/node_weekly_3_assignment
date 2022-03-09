/**********************************************
 * Routing for the NoteApplication
 * ==================================
 ***********************************************/
// Setup a NoteRouter class which takes the note service as a dependency, that was we can inject the   when we use our Router. As this is not a hard coded value we will need to inject the noteService for every instance of the note router.
class NoteRouter {
  constructor(noteService, express) {
    this.noteService = noteService;
    this.express = express;
  }
  // This utilises the express Router method, basically we are binding the path/ request to each restful verb
  router() {
    let router = this.express.Router();

    router.get("/",(req, res)=> {
      let user = req.auth.user;
      return (
        this.noteService
          .list(user)
          .then((notes) => {
            res.json(notes)
          })
          .catch((err) => {
            res.status(500).json(err);
            console.log(err)
          })
      );
    });
    
    router.post("/", (req,res)=>{
      // console.log(req.body.note,req.auth.user);
      return this.noteService
        .add(req.body.note,req.auth.user)
        .then(()=>this.noteService.list(req.auth.user))
        .then((notes)=>res.json(notes))
        .catch((err)=>res.status(500).json(err))
    });

    router.put("/:id", (req,res)=>{
      console.log(req.params.id)
      return this.noteService
        .update(req.params.id,req.body.note)
        .then(()=> this.noteService.list(req.auth.user))
    });

    router.delete("/:id",(req,res)=>{
      return this.noteService
        .remove(req.params.id,req.auth.user)
        .then(()=>  this.noteService.list(req.auth.user))
        .then((notes)=>res.json(notes))
        .catch((err)=> res.status(500).json(err))
    })

    // router.delete("/:id", this.delete.bind(this));
    return router;
  }

}

module.exports = NoteRouter;
