const adminModel = require('../models/adminModel');
const {responseReturn} = require("../utiles/response");
const bcrypt = require('bcrypt');
const {createToken} = require('../utiles/tokenCreate');
class AuthControllers {
    admin_login = async (req, res) => {
        const {email, password} = req.body;
        try {
            const admin = await adminModel.findOne({email}).select('' +
                '+password');
            if (admin) {
                const match = await bcrypt.compare(password, admin.password);
                if (match) {
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role
                    });
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7*24*60*1000)
                    });
                    responseReturn(res, 200, {
                        token,
                        message: "Login Success"
                    })
                }else {
                    responseReturn(res, 404, {error: "Wrong password !"});
                }
            } else {
                responseReturn(res, 404, {error: "Email not found !"});
            }
        } catch (error) {
            responseReturn(res, 500, {error: error.message});
        }
    }
}

module.exports = new AuthControllers();