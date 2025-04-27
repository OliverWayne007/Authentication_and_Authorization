import User from "../schemas/user.schema.js";
import bcrypt from "bcrypt";

const registerUser = async (req , res) => {

    console.log("Request Session: " , req.session);

    console.log("Request Body: " , req.body);

    console.log("Request Cookies: " , req.cookies);

    const { username , password , email } = req.body;

    const existingUser = await User.findOne( { username } );

    if(existingUser)
    {
        return res.status(400).json( { message: "username already taken" } );
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    console.log(hashedPassword);

    await User.create( {
        username: username , 
        password: hashedPassword, 
        email: email
    } );

    res.status(201).json( { message: "User registered successfully"} );
}

export default registerUser;