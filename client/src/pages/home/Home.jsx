import Slider from "../../components/Slider/Slider";
import Slidertwo from '../../components/Slidertwo/Slidertwo';
import './home.css'; // Import the CSS file to style your image

const Home = () => {
  return (
    <>
      <div className="container home">
        <div className="row">
          <div className="col-lg-6 left">
            <h2>
            Every small step you take leads to big changes for the planet.            </h2>
          </div>
          <div className="image-container col-lg-6">
        <img src="../../public/images/home.jpeg" alt="Home" className="home-image" />
      </div>
        </div>
      </div>
      
    

      <Slider />
      <Slidertwo />
    </>
  );
};

export default Home;
