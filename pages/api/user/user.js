import axios from "axios";
const userController = {};


userController.registeruser = async ({name, password, email}) => {
    try {
        const payload = { name, email, password };
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`,payload);
        if(data.success){
            return true;
        }else{
            return false;
        }
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