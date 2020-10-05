import "reflect-metadata";
import {createConnection} from "typeorm";
import {App} from "./app";

createConnection().then(async connection => {

    console.log('Connected to Database');

    await new App().app.listen(8080,()=>{
        console.log('Listen on port 8080')
    })

}).catch(error => console.log(error));
