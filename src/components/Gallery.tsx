"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import image1 from "@/assets/image 1.jpg";
import image2 from "@/assets/image 2.jpg";
import image3 from "@/assets/image 3.jpg";
import image4 from "@/assets/image 4.jpg";
import image5 from "@/assets/image 5.jpg";
import image6 from "@/assets/image 6.jpg";
import image7 from "@/assets/image 7.jpg";
import image8 from "@/assets/image 8.jpg";
import image9 from "@/assets/image 9.jpg";
import image10 from "@/assets/image 10.jpg";
import image11 from "@/assets/image 11.jpg";
import image12 from "@/assets/image 12.jpg";
import image13 from "@/assets/image 13.jpg";
import image14 from "@/assets/image 14.jpg";
import image15 from "@/assets/image 15.jpg";
import image16 from "@/assets/image 16.jpg";
import image17 from "@/assets/image 17.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/image 1.jpg": image1,
  "/src/assets/image 2.jpg": image2,
  "/src/assets/image 3.jpg": image3,
  "/src/assets/image 4.jpg": image4,
  "/src/assets/image 5.jpg": image5,
  "/src/assets/image 6.jpg": image6,
  "/src/assets/image 7.jpg": image7,
  "/src/assets/image 8.jpg": image8,
  "/src/assets/image 9.jpg": image9,
  "/src/assets/image 10.jpg": image10,
  "/src/assets/image 11.jpg": image11,
  "/src/assets/image 12.jpg": image12,
  "/src/assets/image 13.jpg": image13,
  "/src/assets/image 14.jpg": image14,
  "/src/assets/image 15.jpg": image15,
  "/src/assets/image 16.jpg": image16,
  "/src/assets/image 17.jpg": image17,
};

const Gallery = () => {
  const { data: images, isLoading } = useGalleryImages();

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {images?.map((item) => {
            const imageSrc = imageMap[item.image_path] || item.image_path;
            return (
              <SwiperSlide key={item.id}>
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                <div className="p-4 bg-card text-card-foreground">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
