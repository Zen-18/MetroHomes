import React from "react";
import {Avatar, Menu} from '@mantine/core'

const ProfileMenu = ({user, logout}) => {
    return(
        <div onClick={logout}>Log out</div>   
    )
}

export default ProfileMenu