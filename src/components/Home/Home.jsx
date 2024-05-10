import Navbar from "../Navbar";
import Banner from "./Banner";
import Faq from "./Faq";
import Feature from "./Feature";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <Feature></Feature>
            <Faq></Faq>
        </div>
    );
};

export default Home;