import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(" ")[1];

        jwt.verify(token, process.env.TOKENID, (error, decoded) => {
            if (error) {
                res.status(404).json("Token is Unauthorized")
            }
            else {
                req.userid = decoded.id
                next();
            }
        })
    }
    else {
        res.status(404).json({ message: "Please Provide Token!.." })
    }
}



