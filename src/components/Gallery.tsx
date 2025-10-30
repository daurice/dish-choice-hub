"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Gallery = () => {
  const images = [
    {
      src: "/src/assets/image 1.jpg",
      title: "Corporate Event",
      description: "Networking and innovation in action.",
    },
    {
      src: "/src/assets/image 2.jpg",
      title: "Delicious Dishes",
      description: "A taste of our creative culinary art.",
    },
    {
      src: "/src/assets/image 3.jpg",
      title: "Outdoor Setup",
      description: "Charming ambience for open-air events.",
    },
    {
      src: "/src/assets/image 4.jpg",
      title: "Cultural Evening",
      description: "A celebration of culture and connection.",
    },
    {
      src: "/src/assets/image 5.jpg",
      title: "Team Moments",
      description: "Building strong bonds through shared joy.",
    },
      {
      src: "/src/assets/image 6.jpg",
      title: "Team Moments",
      description: "Building strong bonds through shared joy.",
    },
      {
      src: "/src/assets/image 7.jpg",
      title: "Team Moments",
      description: "Building strong bonds through shared joy.",
    },
      {
      src: "/src/assets/image 8.jpg",
      title: "Team Moments",
      description: "Building strong bonds through shared joy.",
    },
      {
      src: "/src/assets/image 9.jpg",
      title: "Team Moments",
      description: "Building strong bonds through shared joy.",
    },
      {
      src: "/src/assets/image 10.jpg",
      title: "Team Moments",
      description: "Building strong bonds through shared joy.",
    },
      {
      src: "/src/assets/image 11.jpg",
      title: "Team Moments",
      description: "Building strong bonds through shared joy.",
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-4 text-foreground">Our Gallery</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          A glimpse into our events, people, and experiences that define us.
        </p>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 3000, // 3 seconds
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-10"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-card text-card-foreground">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
