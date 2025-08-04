import mongoose from "mongoose";
async function connectionDB(){
    return mongoose.connect("mongodb://127.0.0.1:27017/backend").then(() => console.log("MongoDB Connected")).catch((err) => console.log("mONGO error", err))
}

export{
    connectionDB
}