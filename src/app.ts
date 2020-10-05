import {Application} from "express";
import express = require("express");
import bodyParser = require("body-parser");

export class App {


    public app: Application;

    private accessoriesRouteName: string;
    private cityRouteName: string;
    private equipmentRouteName: string;
    private estateRouteName: string;
    private estateCategoryRouteName;
    private estateSubCategoryRouteName: string;
    private estateTypeRouteName: string;
    private heatingRouteName;
    private locationRouteName: string;
    private partOfCityRouteName: string;
    private transactionTypeRouteName: string;
    private userRouteName: string;

    constructor() {

        this.app = express();

        this.plugins();

        //    Routes

        this.accessoriesRoute();
        this.cityRoute();
        this.equipmentRoute();
        this.estateRoute();
        this.estateCategoryRoute();
        this.estateSubCategoryRoute();
        this.estateTypeRoute();
        this.heatingRoute();
        this.locationRoute();
        this.partOfCityRoute();
        this.transactionTypeRoute();
        this.userRoute()
    }


    protected plugins() {
        this.app.use(bodyParser.json());

        this.accessoriesRouteName = "accessories";
        this.transactionTypeRouteName = "city"
        this.equipmentRouteName = "equipment";
        this.estateRouteName = "estate";
        this.estateCategoryRouteName = "estateCategory";
        this.estateSubCategoryRouteName = "estateSubCategory";
        this.estateTypeRouteName = "estateType";
        this.heatingRouteName = "heating";
        this.locationRouteName = "location";
        this.partOfCityRouteName = "partOfCity";
        this.transactionTypeRouteName = "transaction";
        this.userRouteName = "user"

    }

    protected accessoriesRoute() {

    }

    protected cityRoute() {

    }

    protected equipmentRoute() {

    }

    protected estateRoute() {

    }

    protected estateCategoryRoute() {

    }

    protected estateSubCategoryRoute() {

    }

    protected estateTypeRoute() {

    }

    protected heatingRoute() {

    }


    protected locationRoute() {

    }

    protected partOfCityRoute() {

    }


    protected transactionTypeRoute() {

    }

    protected userRoute() {

    }

}
