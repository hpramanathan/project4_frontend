import UserSignup from "./UserSignup/UserSignup";
import UserLogin from './UserLogin/UserLogin'
import UserLogOut from './UserLogOut/UserLogOut'
import PrivateText from '../CurrentUser/CurrentUser'
import { useState } from "react";

const User = ({currUser, setCurrUser}) => {
    const [show, setShow] = useState(true)
    if(currUser) 
        return (
            <div>
            Hello {currUser.email}
            <PrivateText currUser={currUser}/>
            <UserLogOut setCurrUser={setCurrUser}/>
            </div>
        )
    return (
        <div>
            { show?
                <UserLogin setCurrUser={setCurrUser} setShow={setShow}/>  
                :
                <UserSignup setCurrUser={setCurrUser}  setShow={setShow} />
            }
        </div>
    )
}
export default User