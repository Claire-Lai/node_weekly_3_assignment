const request = require("supertest");
const app =  require("../index");

describe("Route testing", ()=>{
  test("GET request to / without username and password should return 401", (done)=>{
    request(app)
        .get("/")
        .expect(401)
        .end((err)=>{
            if(err) throw err
            done();
        })  
    })
    test("Get request to / should return the  index page",(done)=>{
        let username= "sam";
        let password = "12345";
        // let encode = Buffer.from(username+":"+password).toString("base64");
        let encode = "c2FtOjEyMzQ1";
        let auth= `Basic ${encode}`;
        console.log(auth)

        request(app)
        .get("/")
        .set("Authorization",auth)
        .expect(200)
        .end(()=>{
            done();
        })

    })
})