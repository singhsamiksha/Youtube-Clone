import { createUser } from "../Controller/users.controller.js";

export function routes(app){
    console.log("posted the request on the route.");
    app.post("/api/user",createUser);
    
}