import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Image } from "@nextui-org/react";
import logo from "../assets/logo.svg";

const NavBar = () => {
  return (
    <Navbar className="bg-primary-600 shadow-medium">
      <NavbarBrand>
        <Link
          to="/"
          className="text-foreground-50 font-bold text-xl flex items-center"
        >
          <Image src={logo} alt="Logo" className="size-14 mr-2" />
          <p className="font-bold text-inherit">Secret Sleigh</p>
        </Link>
      </NavbarBrand>
    </Navbar>
  );
};

export default NavBar;
