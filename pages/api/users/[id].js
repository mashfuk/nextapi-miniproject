// pages/api/hello.js
import nc from "next-connect";
import connectDb from "../../../utils/connectDb";
import UserModel from "../../../models/UserModel";

connectDb();
const handler = nc()

    .delete(async (req, res) => {
        try {
            await UserModel.findOneAndDelete({_id : req.query.id});
            res.send('User Deleted Successfully');
        } catch (error) {
            console.log(error);
        }
    })
    .put(async (req, res) => {
        try{
            const user = await UserModel.findOne({_id:req.query.id});
            user.username=req.body.username;
            user.fullname=req.body.fullname;
            user.age=req.body.age;
            user.gender=req.body.gender;
            user.department=req.body.department;
            user.accountnumber=req.body.accountnumber;
            user.mobile=req.body.mobile;
            user.email=req.body.email;
            await user.save();
            res.send("User Update!!");            
        }catch(error){
            console.log(error);
        }
    });


export default handler;