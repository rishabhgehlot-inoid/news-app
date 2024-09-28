import { ReactComponent as LogoDark } from "../assets/images/logos/adminprowhite.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className=" text-decoration-none bg-white text-black lead">
      NewsPro
    </Link>
  );
};

export default Logo;
