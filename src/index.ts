import "reflect-metadata";
import {createConnection} from "typeorm";
import {App} from "./app";

import * as path from 'path';
import {EstateCategory} from "./entity/EstateCategory";
import {Accessories} from "./entity/Accessories";
import {AdvertisingRequest} from "./entity/AdvertisingRequest";
import {City} from "./entity/City";
import {Equipment} from "./entity/Equipment";
import {Estate} from "./entity/Estate";
import {EstateType} from "./entity/EstateType";
import {EstateSubCategory} from "./entity/EstateSubCategory";
import {Heating} from "./entity/Heating";
import {Image} from "./entity/Image";
import {Location} from "./entity/Location";
import {PartOfCity} from "./entity/PartOfCity";
import {UserInfo} from "./entity/UserInfo";
import {User} from "./entity/User";
import {Role} from "./entity/Role";
import {TransactionType} from "./entity/TransactionType";


createConnection({
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "Luxal.99",
        "database": "sistem_nekretnine",
        "synchronize": true,
        "logging": false,
        "entities": [
            Accessories,
            AdvertisingRequest,
            City,
            Equipment,
            Estate,EstateType,EstateSubCategory,
            Heating,Image,Location,PartOfCity,
            Role,UserInfo,User,TransactionType,
            EstateCategory
        ],
        "migrations": [
            "src/migration/**/*.ts"
        ],
        "subscribers": [
            "src/subscriber/**/*.ts"
        ],
        "cli": {
            "entitiesDir": "src/entity",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    }
).then(async connection => {


    console.log('Connected to Database');

    await new App().app.listen(8080, () => {
        console.log('Listen on port 8080')
    })

}).catch(error => console.log(error));
