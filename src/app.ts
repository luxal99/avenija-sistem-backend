import {Application} from "express";
import express = require("express");

export class App {


    public app: Application;

    constructor() {

        this.app = express();
    }

}
