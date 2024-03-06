import auth_shema from "../../Models/auth_shema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// register
export const AuthRegister = async (req, res, next) => {
    const { roleNo, email, password, role } = req.body;

    try {
        const existuser = await auth_shema.findOne({ email: email });
        if (existuser) res.status(404).json({ message: "User Already Register" })
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        const response = await auth_shema({
            role: role, status: true, roleNo: roleNo, email: email, password: hashPassword
        });
        await response.save();
        return res.status(201).json({ message: "User Register Successfully", user: response });
    } catch (error) {
        res.status(404).json({ message: 'User Register Error' });
    }
}

// login
export const AuthLogin = async (req, res, next) => {
    const { EmailorRoleno, password } = req.body;
    try {
        const existemail = await auth_shema.findOne({
            $or: [{
                "email": EmailorRoleno
            }, {
                "roleNo": EmailorRoleno
            }]
        });
        if (existemail) {
            if (existemail?.status === true) {
                const hashPassword = await bcrypt.compare(password, existemail.password);
                if (hashPassword) {
                    const token = await jwt.sign({ id: existemail?._id?.toString() }, process.env.TOKENID, { expiresIn: "3d" });
                    const { password, ...others } = existemail._doc;
                    res.status(200).json({ message: "User Login Successfully", user: others, token });
                }
                else {
                    res.status(404).json({ message: "Wrong Password" });

                }
            }
            else {
                res.status(404).json({ message: "Please Contact Admin!..." });
            }
        }
        else {
            res.status(404).json({ message: "User dosn't Exist", });
        }

    } catch (error) {
        res.status(404).json({ message: "User Not Found", });
    }
}

// single user
export const GetSingleUserData = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (id) {
            const response = await auth_shema.findById({ _id: id });
            if (response) {
                await res.status(200).json({ message: "success", data: response });
            }
            else {
                await res.status(404).json({ message: "User Id Not Found", });
            }
        }

    } catch (error) {
        res.status(404).json({ message: "User Id Not Found", });
    }
}

// single user update
export const SingleUserUpdate = async (req, res, next) => {
    const id = req.params.id;
    try {

        const olduser = await auth_shema.findById({ _id: id })
        if (req.body.password) {
            const oldPassword = await bcrypt.compare(req.body.oldpassword, olduser?.password);
            if (oldPassword) {
                const salt = await bcrypt.genSalt(10);
                const comparepassword = await bcrypt.hashSync(req.body.password, salt)
                const response = await auth_shema.findByIdAndUpdate({ _id: id }, { password: comparepassword }, { new: true });
                if (response) { res.status(200).json({ message: "Updated Password successfully" }); }

            }
            else {
                res.status(404).json({ message: "Old Password Dosn't Matched" });
            }

        }
        else {
            const response = await auth_shema.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            if (response) { res.status(200).json({ message: "Updated successfully" }); }
            else {
                res.status(404).json({ message: "User Id Not Found", });
            }
        }

    } catch (error) {
        res.status(404).json({ message: "User Id Not Found", });
    }
}
// all users
export const AllUsers = async (req, res, next) => {
    try {
        const response = await auth_shema.find();
        if (response) {
            res.status(200).json({ message: "All Users", data: response });
        }
    } catch (error) {
        res.status(404).json({ message: error });

    }
}