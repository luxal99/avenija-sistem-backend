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
import {TransactionTypeService} from "./service/TransactionTypeService";
import {Estate} from "./entity/Estate";
import {EstateService} from "./service/EstateService";
import {ImageService} from "./service/ImageService";
import {Image} from "./entity/Image";

const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');

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
    private imageRouteName: string
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
        this.userRoute();

        this.app.use(cors());
        this.app.use(bodyParser.json({limit: '200mb', type: 'application/json'}));
    }


    protected plugins() {
        this.app.use(bodyParser.json());

        this.accessoriesRouteName = "accessories";
        this.transactionTypeRouteName = "transaction"
        this.cityRouteName = "city"
        this.equipmentRouteName = "equipment";
        this.estateRouteName = "estate";
        this.estateCategoryRouteName = "estateCategory";
        this.estateSubCategoryRouteName = "estateSubCategory";
        this.estateTypeRouteName = "estateType";
        this.heatingRouteName = "heating";
        this.locationRouteName = "location";
        this.imageRouteName = "image";
        this.partOfCityRouteName = "partOfCity";
        this.userRouteName = "user"

    }

    protected accessoriesRoute() {

        this.app.post(`/${this.accessoriesRouteName}`, async (req: Request, res: Response) => {
            try {
                await new AccessoriesService().save(new Accessories(req.body.title)).then(() => {
                    res.send({status: 200})
                })
            } catch (e) {

            }
        })

        this.app.get(`/${this.accessoriesRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new AccessoriesService().getAll())
            } catch (e) {

            }
        })
    }

    protected cityRoute() {
        this.app.post(`/${this.cityRouteName}`, async (req: Request, res: Response) => {
            try {
                await new CityService().save(new City(req.body.title)).then(() => {
                    res.send({status: 200})
                })
            } catch (e) {
                res.sendStatus(500)
            }
        })

        this.app.get(`/${this.cityRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new CityService().getAll())
            } catch (e) {

            }
        })
    }

    protected equipmentRoute() {
        this.app.post(`/${this.equipmentRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EquipmentService().save(new Equipment(req.body.title)).then(() => {
                    res.send({status: 200})
                })
            } catch (e) {

            }
        })


        this.app.get(`/${this.equipmentRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new EquipmentService().getAll())
            } catch (e) {

            }
        })
    }

    protected estateRoute() {
        this.app.post(`/${this.estateRouteName}`, async (req: Request, res: Response) => {

            let estate = new Estate();
            estate.title = req.body.title
            estate.description = req.body.description;
            estate.price = req.body.price;
            estate.quadrature = req.body.quadrature;
            estate.num_of_bathrooms = req.body.num_of_bathrooms;
            estate.floor = req.body.floor;
            estate.max_floor = req.body.max_floor;
            estate.rooms = req.body.rooms;
            estate.parking = req.body.parking;

            estate.id_estate_sub_category = req.body.id_estate_sub_category;
            estate.id_transaction_type = req.body.id_transaction_type;
            estate.id_heating = req.body.id_heating;
            estate.id_estate_type = req.body.id_estate_type;
            estate.id_equipment = req.body.id_equipment;
            estate.id_location = req.body.id_location;
            estate.listOfAccessories = req.body.listOfAccessories

            let listOfImages: Image[] = req.body.listOfImages


            console.log(req.body)

            await new EstateService().save(estate).then(() => {
                listOfImages.forEach(async image => {
                    await new ImageService().save(new Image(image.url, estate)).then(() => {

                    })
                })
                res.send({status: 200})
            });
        })

        this.app.get(`/${this.estateRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new EstateService().getAll())
            } catch (e) {

            }
        })
    }

    protected estateCategoryRoute() {
        this.app.post(`/${this.estateCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateCategoryService().save(new EstateCategory(req.body.title)).then(() => {
                    res.send({status: 200})
                })
            } catch (e) {

            }
        })


        this.app.get(`/${this.estateCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new EstateCategoryService().getAll())
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }

    protected estateSubCategoryRoute() {
        this.app.post(`/${this.estateSubCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateSubCategoryService().save(new EstateSubCategory(req.body.title, req.body.id_estate_category)).then(() => {
                    res.send({status: 200})
                })
            } catch (e) {

            }
        })

        this.app.get(`/${this.estateSubCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new EstateSubCategoryService().getAll())
            } catch (e) {

            }
        })
    }

    protected estateTypeRoute() {
        this.app.post(`/${this.estateTypeRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateTypeService().save(new EstateType(req.body.title)).then(() => {
                    res.send({status: 200})
                })
            } catch (e) {
                res.sendStatus(500)
            }
        })
        this.app.get(`/${this.estateTypeRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new EstateTypeService().getAll())
            } catch (e) {
                res.sendStatus(500)
            }
        })

    }

    protected heatingRoute() {
        this.app.post(`/${this.heatingRouteName}`, async (req: Request, res: Response) => {
            try {
                await new HeatingService().save(new Heating(req.body.title)).then(() => {
                    res.send({status: 200})
                })
            } catch (e) {

            }
        })


        this.app.get(`/${this.heatingRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new HeatingService().getAll())
            } catch (e) {

            }
        })
    }


    protected locationRoute() {
        this.app.post(`/${this.locationRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new LocationService().save(new Location(req.body.address, req.body.id_part_of_city)))
            } catch (e) {

            }
        })
    }

    protected partOfCityRoute() {
        this.app.post(`/${this.partOfCityRouteName}`, async (req: Request, res: Response) => {
            try {
                console.log(req.body)
                await new PartOfCityService().save(new PartOfCity(req.body.title, req.body.id_city)).then(() => {
                    res.send({status: 200})
                })
            } catch (e) {

            }
        })

        this.app.get(`/${this.partOfCityRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new PartOfCityService().getAll());
            } catch (e) {

            }
        })
    }


    protected transactionTypeRoute() {
        this.app.get(`/${this.transactionTypeRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new TransactionTypeService().getAll())
            } catch (e) {

            }
        })
    }

    protected userRoute() {

        this.app.post(`/${this.userRouteName}`, async (req: Request, res: Response) => {

            try {
                let userInfo = await new UserInfoService().save(new UserInfo(req.body.id_user_info.full_name, req.body.id_user_info.email, req.body.id_user_info.telephone));
                const userService = await new UserService().save(new User(req.body.username, await bcrypt.hash(req.body.password, 10), req.body.id_role, userInfo));
                res.send({status: 200});
            } catch {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.userRouteName}/auth`, async (req: Request, res: Response) => {

            try {

                const user = await new UserService().findByName(req.body.username);
                console.log(user)
                const auth = ((user != null && await bcrypt.compare(req.body.password, user.password))
                    ? res.send({token: user.password, role: user.id_role}) : res.sendStatus(403))

            } catch {
                res.sendStatus(500);
            }
        })
    }


}
