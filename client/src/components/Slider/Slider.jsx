import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import './slider.css';

const sliderData = [
  {
    image: "https://gizmodo.com/app/uploads/2024/11/Hurricane-Milton-Florida.jpg",
    title: "What Trump’s Re-Election Means for Our Warming Planet",
    description: "With control of the White House and the Senate, Republicans are poised to upend U.S. climate policy."
  },
  {
    image: "https://ichef.bbci.co.uk/news/1024/branded_news/9f5a/live/fa62f580-9e01-11ef-9260-19e6a950e830.jpg",
    title: "Climate talks to open in shadow of Trump victory",
    description: "Leaders heading to the annual UN climate talks have a lot of other distractions to contend with"
  },
  {
    image: "https://ichef.bbci.co.uk/news/1024/branded_news/6b4b/live/e31c7570-a047-11ef-8ab9-9192db313061.jpg",
    title: "Climate fight 'bigger than one election', says Biden’s top envoy",
    description: "COP29 climate summit opens amid fears the US election will derail efforts to stop the planet heating up."
  },
  {
    image: "https://ichef.bbci.co.uk/news/1024/branded_news/14ff/live/df45e960-a0f4-11ef-99df-c9ce88d27eae.jpg",
    title: "Oil and gas are a 'gift of god', says COP29 host",
    description: "Azerbaijan's president said countries should not be blamed for having fossil fuel reserves."
  },
  {
    image: "https://ichef.bbci.co.uk/news/1024/branded_news/1065/live/f7d70cb0-9c4f-11ef-93ac-57886715ae8d.jpg",
    title: "Trump victory 'major setback' to climate action",
    description: "Trump's election will hit immediate efforts to tackle climate change, experts say - but the longer-term effect is less certain."
  },
  {
    image: "https://ichef.bbci.co.uk/news/1024/branded_news/d310/live/8aab2200-a296-11ef-b8c0-b996e628df5a.jpg",
    title: "'The sixth great extinction is happening', conservation expert warns",
    description: "Conservationist Jane Goodall on the urgent need to turn the tide on climate change and nature loss."
  },
  {
    image: "https://ichef.bbci.co.uk/news/1024/branded_news/8def/live/f720df30-9d17-11ef-9260-19e6a950e830.jpg",
    title: "COP29 chief exec caught promoting fossil fuel deals",
    description: "Undercover filming shows COP29 chief exec discussing new oil and gas projects ahead of climate summit."
  },
  {
    image: "https://ichef.bbci.co.uk/news/1024/branded_news/f15f/live/dee21aa0-9363-11ef-9d60-ffb075b6e630.jpg",
    title: "Big UK emissions cut needed, says climate watchdog",
    description: "The government's advisers say faster action is needed but the UK has the tools to achieve this."
  },
  {
    image: "https://ichef.bbci.co.uk/news/1024/branded_news/ad1f/live/17f7b880-a82d-11ef-bdf5-b7cb2fa86e10.png",
    title: "Cop29: US out, China in - the future of climate talks?",
    description: "What it means for the global climate effort if another superpower comes to the fore, just as Trump steps back."
  },
  {
    image: "https://ichef.bbci.co.uk/news/1024/branded_news/1752/live/f64f29a0-9c4e-11ef-b80c-51ebf6f5ee4f.jpg",
    title: "2024 on track to be world's warmest year on record",
    description: "It is also set to be the world's first breach of 1.5C of warming across an entire calendar year."
  }
];

const Slider = () => {
  return (
    <>
      <div className="container">
        <div className="slidertwopart">
          <p style={{userSelect:"none", fontSize:"34px",fontWeight:"500"}}>Latest News</p>
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
                slidesPerView: 1, 
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
                    alt={item.title}
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

export default Slider;
