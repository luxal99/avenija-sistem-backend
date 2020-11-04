import {Application, Request, Response} from "express";
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
import {UserService} from "./service/UserService";
import {User} from "./entity/User";
import {UserInfoService} from "./service/UserInfoService";
import {UserInfo} from "./entity/UserInfo";
import {TransactionTypeService} from "./service/TransactionTypeService";
import {Estate} from "./entity/Estate";
import {EstateService} from "./service/EstateService";
import {ImageService} from "./service/ImageService";
import {Image} from "./entity/Image";
import {AdvertisingRequest} from "./entity/AdvertisingRequest";
import {AdvertisingRequestService} from "./service/AdvertisingRequestService";
import express = require("express");
import bodyParser = require("body-parser");

import bcrypt = require("bcrypt");
import {watch} from "fs";

const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');

export class App {


    public app: Application;

    private accessoriesRouteName: string;
    private advertisingRequestRouteName: string;
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
        this.advertisingRequestRoute();
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
        this.advertisingRequestRouteName = "advertising"
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

        this.app.put(`/${this.accessoriesRouteName}`, async (req: Request, res: Response) => {
            try {
                await new AccessoriesService().update(req.body).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.delete(`/${this.accessoriesRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                const accessories = await Accessories.findOne(req.params.id);
                await new AccessoriesService().delete(accessories).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
            }
        })

        this.app.post(`/${this.userRouteName}/hash`, async (req: Request, res: Response) => {
            try {
                res.send({username:await new UserService().findByHashedUsername(req.body.token)})
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }

    protected advertisingRequestRoute() {
        this.app.post(`/${this.advertisingRequestRouteName}`, async (req: Request, res: Response) => {
            console.log(req.body)
            try {
                let advertisingRequest = new AdvertisingRequest();


                advertisingRequest.priceFrom = req.body.priceFrom;
                advertisingRequest.priceTo = req.body.priceTo;
                advertisingRequest.description = req.body.description;
                advertisingRequest.quadrature = req.body.quadrature;

                advertisingRequest.id_estate_sub_category = req.body.id_estate_sub_category;
                advertisingRequest.id_transaction_type = req.body.id_transaction_type;
                advertisingRequest.id_user_info = await new UserInfoService().save(new UserInfo(req.body.id_user_info.full_name, req.body.id_user_info.email, req.body.id_user_info.telephone));
                advertisingRequest.id_location = await new LocationService().save(new Location(req.body.id_location.address, req.body.id_location.id_part_of_city))


                await new AdvertisingRequestService().save(advertisingRequest).then(() => {
                    res.send({status: 200})
                })
            } catch (e) {
                res.send(e);
            }
        })

        this.app.get(`/${this.advertisingRequestRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new AdvertisingRequestService().getAll())
            } catch (e) {
                res.send(e)
            }
        })

        this.app.put(`/${this.advertisingRequestRouteName}`, async (req: Request, res: Response) => {
            try {
                await new AdvertisingRequestService().update(req.body).then(() => {
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

        this.app.put(`/${this.cityRouteName}`, async (req: Request, res: Response) => {
            try {
                await new CityService().update(req.body).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.delete(`/${this.cityRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                const city = await City.findOne(req.params.id);
                await new CityService().delete(city).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
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

        this.app.put(`/${this.equipmentRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EquipmentService().update(req.body).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.delete(`/${this.equipmentRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                const equipment = await Equipment.findOne(req.params.id);
                await new EquipmentService().delete(equipment).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
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

            await new EstateService().save(estate).then(() => {
                listOfImages.forEach(async image => {
                    await new ImageService().save(new Image(image.title, image.url, estate)).then(() => {

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

        this.app.put(`/${this.estateRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateService().update(req.body);
                res.sendStatus(200);
            } catch (e) {
                res.send(500)
            }
        })

        this.app.get(`/${this.estateRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                res.send(await new EstateService().findById(Number.parseInt(req.params.id)))
            } catch (e) {
                res.sendStatus(500)
            }
        })

        this.app.delete(`/${this.estateRouteName}/:id`, async (req: Request, res: Response) => {
            console.log(req.body)
            try {
                const estateService = new EstateService();
                const locationService = new LocationService();
                const imageService = new ImageService();

                const estateById = await estateService.findById(Number.parseInt(req.params.id));

                for (const image of estateById.listOfImages) {
                    await imageService.delete(image)
                }

                await estateService.delete(estateById).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
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
                res.sendStatus(e)
            }
        })

        this.app.put(`/${this.estateCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateCategoryService().update(req.body).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
            }
        })


        this.app.delete(`/${this.estateCategoryRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                const estateCategory = await EstateCategory.findOne(req.params.id);
                await new EstateCategoryService().delete(estateCategory).then(() => {
                    res.sendStatus(200)
                })
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

        this.app.put(`/${this.estateSubCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateSubCategoryService().update(req.body).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.delete(`/${this.estateSubCategoryRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                const estateSubCategory = await EstateSubCategory.findOne(req.params.id);
                await new EstateSubCategoryService().delete(estateSubCategory).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
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

        this.app.delete(`/${this.estateTypeRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                const estateType = await EstateType.findOne(req.params.id);
                await new EstateTypeService().delete(estateType).then(() => {
                    res.sendStatus(200)
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

        this.app.put(`/${this.estateTypeRouteName}`, async (req: Request, res: Response) => {
            try {
                await new EstateTypeService().update(req.body).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
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

        this.app.put(`/${this.heatingRouteName}`, async (req: Request, res: Response) => {
            try {
                await new HeatingService().update(req.body).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.delete(`/${this.heatingRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                const heating = await Heating.findOne(req.params.id);
                await new HeatingService().delete(heating).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
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

        this.app.delete(`/${this.partOfCityRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                const partOfCity = await PartOfCity.findOne(req.params.id);
                await new PartOfCityService().delete(partOfCity).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
            }
        })

        this.app.put(`/${this.partOfCityRouteName}`, async (req: Request, res: Response) => {
            try {
                await new PartOfCityService().update(req.body).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
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
            } catch (e) {
                res.send({mess: e});
            }
        })

        this.app.post(`/${this.userRouteName}/auth`, async (req: Request, res: Response) => {
                try {

                    const user = await new UserService().findByName(req.body.username);
                    const auth = ((user != null && await bcrypt.compare(req.body.password, user.password))
                        ? res.send({token: await bcrypt.hash(user.username, 10), role: user.id_role}) : res.sendStatus(403))

                } catch {
                    res.sendStatus(500);
                }
            }
        )

        this.app.put(`/${this.userRouteName}`, async (req: Request, res: Response) => {
            try {

                let listOfUsers: Array<User> = await new UserService().getAll();
                let userByHash = new User();

                for (const user of listOfUsers) {
                    if (await bcrypt.compare(user.username, req.body.token)) {
                        userByHash = user
                    }
                }


                if (userByHash) {
                    const userForUpdate = new User();
                    userForUpdate.username = req.body.username;
                    userForUpdate.password = await bcrypt.hash(req.body.password, 10);
                    userForUpdate.id = userByHash.id;

                    await new UserService().update(userForUpdate);
                }

                res.sendStatus(200)

            } catch (e) {
                res.sendStatus(500)
            }
        })
    }


}
