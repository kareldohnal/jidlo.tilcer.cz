import {NavLink} from "react-router";
import "./header.scss"

const Header = () => {
    return (
        <header className={"header"}>
            <nav className={"header__nav"}>
                <NavLink className={"header__navLink"} to={"/"}>Meal Plan</NavLink>
                <NavLink className={"header__navLink"} to={"/cook-book"}>Cook Book</NavLink>
            </nav>
            <div>
                Login
            </div>
        </header>
    );
}

export default Header;