import { createUser } from "../Controller/users.controller.js";
import { getUser } from "../Controller/users.controller.js";

export function CreateUserRoute(app){
    app.post("/api/user",createUser);
    
}

export function GetUserRoute(app){
    app.get("/api/users",getUser);
}