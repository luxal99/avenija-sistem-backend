import {Application, Request, Response} from "express";
import express = require("express");
import bodyParser = require("body-parser");
import {AccessoriesService} from "./service/AccessoriesService";
import {Accessories} from "./entity/Accessories";
import {CityService} from "./service/CityService";
import {City} from "./entity/City";
import {EquipmentService} from "./service/EquipmentService";
import {Equipment} from "./entity/Equipment";
import {EstateCategoryService} from "./service/EstateCategoryService";
import {EstateCategory} from "./entity/EstateCategory";
import {EstateSubCategoryService} from "./service/EstateSubCategoryService";
import {EstateSubCategory} from "./entity/EstateSubCategory";
import {EstateType} from "./entity/EstateType";
import {EstateTypeService} from "./service/EstateTypeService";
import {HeatingService} from "./service/HeatingService";
import {Heating} from "./entity/Heating";
import {LocationService} from "./service/LocationService";
import {Location} from "./entity/Location";
import {PartOfCityService} from "./service/PartOfCityService";
import {PartOfCity} from "./entity/PartOfCity";

import bcrypt = require("bcrypt");
import {UserService} from "./service/UserService";
import {User} from "./entity/User";
import {UserInfoService} from "./service/UserInfoService";
import {UserInfo} from "./entity/UserInfo";

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

        this.app.post(`/${this.accessoriesRouteName}`, async (req: Request, res: Response) => {
            try {
                await new AccessoriesService().save(new Accessories(req.body.title)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {

            }
        })
    }

    protected cityRoute() {
        this.app.post(`/${this.cityRouteName}`, async (req: Request, res: Response) => {
            try {
                await new CityService().save(new City(req.body.title)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {

            }
        })
    }

    protected equipmentRoute() {
        this.app.post(`/${this.equipmentRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EquipmentService().save(new Equipment(req.body.title)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {

            }
        })
    }

    protected estateRoute() {

    }

    protected estateCategoryRoute() {
        this.app.post(`/${this.estateCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateCategoryService().save(new EstateCategory(req.body.title)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {

            }
        })
    }

    protected estateSubCategoryRoute() {
        this.app.post(`/${this.estateSubCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateSubCategoryService().save(new EstateSubCategory(req.body.title, req.body.id_category)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {

            }
        })
    }

    protected estateTypeRoute() {
        this.app.post(`/${this.estateTypeRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateTypeService().save(new EstateType(req.body.title)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {

            }
        })
    }

    protected heatingRoute() {
        this.app.post(`/${this.heatingRouteName}`, async (req: Request, res: Response) => {
            try {
                await new HeatingService().save(new Heating(req.body.title)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {

            }
        })
    }


    protected locationRoute() {
        this.app.post(`/${this.locationRouteName}`, async (req: Request, res: Response) => {
            try {
                await new LocationService().save(new Location(req.body.address, req.body.id_part_of_city)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {

            }
        })
    }

    protected partOfCityRoute() {
        this.app.post(`/${this.partOfCityRouteName}`, async (req: Request, res: Response) => {
            try {
                await new PartOfCityService().save(new PartOfCity(req.body.title, req.body.id_city)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {

            }
        })
    }


    protected transactionTypeRoute() {

    }

    protected userRoute() {

        this.app.post(`/${this.userRouteName}`, async (req: Request, res: Response) => {

            try {
                let userInfo = await new UserInfoService().save(new UserInfo(req.body.user_info.full_name, req.body.user_info.email, req.body.user_info.telephone));
                const userService = await new UserService().save(new User(req.body.username, await bcrypt.hash(req.body.password, 10), req.body.id_role, userInfo));
                res.sendStatus(200);
            } catch {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.userRouteName}/auth`, async (req: Request, res: Response) => {

            try {

                const user = await new UserService().findByName(req.body.username);
                const auth = ((user != null && await bcrypt.compare(req.body.password, user.password))
                    ? res.send({token: user.password, role: user.id_role}) : res.sendStatus(403))

            } catch {
                res.sendStatus(500);
            }
        })
    }


}
