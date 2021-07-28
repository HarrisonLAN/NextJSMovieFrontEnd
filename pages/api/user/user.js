import axios from "axios";
const userController = {};


userController.registeruser = async (name, password, email) => {
    try {
        const user = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, {
            name: name,
            password: password,
            email: email
        });
        if (user.data) {
            //console.log('Response from server auth:', user.data);
            return user.data;
        }
        return null;
    } catch (e) {
        console.log(e);
        const errorMsg = e.response.data.message[0].messages[0].message;
        throw new Error(errorMsg);
    }
}
userController.updateUser = async () => {
}
userController.updatePassword = async (id) => {
}


module.exports = userController;