'use strict';

const {UserModel} = require("../models/user");
const {ValidatePassword, GenerateToken, GeneratePassword} = require("../utils/jwt");
const moment = require("moment/moment");
const { v4: uuid } = require('uuid');

exports.LoginService = async (params) => {
    const user = await UserModel.findOne({email: params.email}, {}, null);
    if (!user) {
        return { status: 404, data: "Account not found"};
    }

    const passwordValid = ValidatePassword(params.password, user.password)
    if (!passwordValid) {
        return { status: 400, data: 'Wrong password!'};
    }

    user.lastActive = moment();

    await UserModel.updateOne({id: user.id}, user);

    const token = GenerateToken(params.email);

    return { status: 200, data: token };
};

exports.RegisterService = async (params) => {
    params.id = uuid();
    params.password = GeneratePassword(params.password);

    const result = await UserModel.create(params, null);
    if (!result) {
        return { status: 400, data: 'Failed to proceed data!'};
    }

    return { status: 200, data: params};
}