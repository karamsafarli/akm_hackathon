import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import './slider.css'

const Slider = () => {
  const sliderData = [
      {
      image: "https://iea.imgix.net/5798f38b-9757-4240-a3c4-d44acbef22f5/combo-unfccc-2.png?auto=compress%2Cformat&fit=min&q=80&rect=0%2C0%2C1920%2C1080&w=1220&h=686&fit=crop&fm=jpg&q=70&auto=format",
      title: "UNFCCC Announces New Global Carbon Program to Combat Emissions – The Guardian.",
    },
  
    {
      image: "https://static1.straitstimes.com.sg/s3fs-public/styles/large30x20/public/articles/2024/11/18/IMG3607.JPG?VersionId=G6sbzucfIjLgjJwg0y9k5y7iwi0fV_.8&h=12e2edfa",
      title: "Singapore Public Sector Shrinks Carbon Footprint, Aims for Net-Zero Emissions by 2045 – The Straits Times",
    },
  
    {
      image: "https://aristokrat.az/public/blog/1721907901Cop%2029%20Will%20be%20Held%20in%20Which%20Country",
      title: "COP29 in Baku has highlighted the challenge of balancing climate commitments with the carbon emissions from large-scale international gatherings. ",
    },
    {
      image: "https://www.reuters.com/resizer/v2/M3ISMUNRE5KA3GYSTY6XVOPW6E.jpg?auth=c85ed2f3ebeff2deb1d4f5e77aab805f490235ddd2ff91d003f992773879a45e&width=4139&quality=80",
      title: "US and EU Commit to Reducing Carbon Footprint through New Climate Pact – Reuters",
    },
           ];
  return (
    <>
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {sliderData.map((item, index) => (
        <SwiperSlide key={index}>
          <div style={{ position: "relative" }} className='swiper_part'>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "600px" }}
              className='imgs'
            />
            <div
            className='text'
              style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: 'translate(-50%)',
                background: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                padding: "10px 30px",
                borderRadius: "5px",
                
              }}
            >
              <h3>{item.title}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    
  </>
  )
}

export default Slider