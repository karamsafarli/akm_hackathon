import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import './slidertwo.css';

const sliderData = [
    {
      image: 'https://cdn.trend.az/2024/06/07/samruk_kazyna_sibur_070624.jpg',
      title: 'SIBUR to Offset Carbon Footprint of Russia’s COP29 Delegation',
      description: 'Russian petrochemical company, plans to offset the carbon emissions of Russia’s COP29 delegation by using internationally verified carbon credits.',
    },
    {
      image: 'https://countervortex.org/wp-content/uploads/2024/11/Azerbaijanoil.jpg',
      title: '"Global Carbon Emissions Hit Record High in 2024"',
      description: 'Despite efforts to reduce emissions, global carbon emissions reached a new high in 2024, with countries like China and the U.S. contributing significantly.',
    },
    {
      image: 'https://www.mdpi.com/ijerph/ijerph-20-02318/article_deploy/html/images/ijerph-20-02318-g001.png',
      title: '"The Surging Carbon Footprint of Global Food Waste"',
      description: 'Food waste continues to contribute significantly to global carbon emissions, with up to 10% of total emissions tied to wasted food.',
    },
    {
      image: 'https://news.berkeley.edu/wp-content/uploads/2024/04/pexels-mike-bird-2000px.jpg',
      title: 'Carbon Footprint of Electric Cars Declining Rapidly',
      description: 'New research shows that the carbon footprint of electric vehicles (EVs) is dropping faster than expected, driven by cleaner production processes and more sustainable energy sources.',
    },
    {
      image: 'https://futurumgroup.com/wp-content/uploads/2022/03/Amazon-and-Global-Optimism-Announce-The-Climate-Pledge-Experiences-600-Growth-Showing-Impressive-Increase-in-Commitment-to-Climate-Action.jpg',
      title: 'Amazon’s Commitment to Net Zero Carbon by 2040',
      description: 'Amazon has reaffirmed its commitment to achieving net zero carbon emissions by 2040, a decade ahead of the Paris Agreement.',
    },
    {
      image: 'https://cdn.catf.us/wp-content/uploads/2023/05/05082915/power-plant-us-scaled.jpg',
      title: 'EPA Finalizes Emission Standards for Power Plants: ',
      description: 'The U.S. Environmental Protection Agency (EPA) has finalized stricter carbon pollution standards for both new natural gas-fired and existing coal-fired power plants. ',
    },];

const Slidertwo = () => {
  return (
    <>
    <div className="container">

  
      <div className="slidertwopart">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1, // For small screens
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2, // For tablets
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3, // For desktops
              spaceBetween: 30,
            },
          }}
        >
          {sliderData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="slide-content">
                <img
                  src={item.image}
                                    className="slider-image"
                />
                <h3 className="slider-title">{item.title}</h3>
                <p className="slider-description">{item.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
    </>
  );
};

export default Slidertwo;
