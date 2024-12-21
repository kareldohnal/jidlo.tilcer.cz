import {NavLink} from "react-router";
import "./header.scss"
import {useAtom} from "jotai/react";
import {tokenAtom} from "../atomStore.ts";
import {isJwtValid} from "../utils/isJwtValid.ts";
import {fetchMe} from "../api/me.ts";
import Login from "./Login.tsx";
import {useQuery} from "@tanstack/react-query";
import {Avatar, Button, Popover} from "antd";

const Header = () => {
    const [token, setToken] = useAtom(tokenAtom);

    const tokenValid = isJwtValid(token);

    const {data: userData} = useQuery({
        queryKey: ['fetchMe'],
        queryFn: () => fetchMe(token),
        enabled: tokenValid,
    })

    const handleLogout = () => {
        setToken("")
    }

    return (
        <header className={"header"}>
            <nav className={"header__nav"}>
                <NavLink className={"header__navLink"} to={"/"}>Meal Plan</NavLink>
                <NavLink className={"header__navLink"} to={"/cook-book"}>Cook Book</NavLink>
            </nav>
            <div>
                {tokenValid
                    ?
                    <Popover
                        content={
                        <Button onClick={handleLogout} block={true}>Logout</Button>
                        }
                        title={`${userData?.firstName} ${userData?.lastName}`}
                        trigger="click">
                        <Avatar size={40}>
                            {`${userData?.firstName.charAt(0).toUpperCase()}${userData?.lastName.charAt(0).toUpperCase()}`}
                        </Avatar>
                    </Popover>
                    : <Login/>
                }
            </div>
        </header>
    );
}

export default Header;