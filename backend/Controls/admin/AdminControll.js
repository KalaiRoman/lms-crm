import auth_shema from "../../Models/auth_shema.js";


export const DeleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await auth_shema.findByIdAndUpdate({ _id: id }, { status: false }, { new: true });
        res.status(200).json({ message: "User Deleted Successfully" })
    } catch (error) {
        res.status(404).json({ message: "admin delete Error User" })
    }
}