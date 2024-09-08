const express = require('express');
const {Login} = require("../controllers/auth");
const {AuthMiddleware} = require("../middlewares/auth");
const {Upload} = require("../controllers/general");
const router = express.Router();
const {UploadMiddleware} = require("../utils/helper");
const {SearchRecipeByImages} = require("../controllers/search");

exports.PublicRoutes = (app) => {
    router.post('/api/login', Login);
    router.post('/api/upload', UploadMiddleware(), Upload);

    router.post('/api/recipe/search', UploadMiddleware(), SearchRecipeByImages);

    app.use('/', router);
};

exports.ProtectedRoutes = (app) => {
    router.route('/register').get(Login);

    app.use('/api', AuthMiddleware, router);
};