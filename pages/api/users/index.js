// pages/api/hello.js
import nc from "next-connect";
import connectDb from "../../../utils/connectDb";
import UserModel from "../../../models/UserModel";

connectDb();
const handler = nc()

    .get(async (req, res) => {
        try {
            const users = await UserModel.find({});
            res.send(users);
        } catch (error) {
            console.log(error);
        }

    })
    .post(async (req, res) => {
        const { username, fullname, age, gender, department, accountnumber, mobile, email } = req.body
        const newUser = new UserModel({ username, fullname, age, gender, department, accountnumber, mobile, email });
        try {
            await newUser.save();
            res.send({
                message: "user created successfully",
                data: newUser
            });
        } catch (error) {
            console.log(error);
        }
    });


export default handler;