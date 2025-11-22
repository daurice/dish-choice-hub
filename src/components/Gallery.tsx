import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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

const galleryItems = [
  { id: 1, image: image1, title: "Event Setup", description: "Professional catering setup" },
  { id: 2, image: image2, title: "Delicious Spread", description: "Fresh and appetizing dishes" },
  { id: 3, image: image3, title: "Elegant Presentation", description: "Beautifully arranged platters" },
  { id: 4, image: image4, title: "Corporate Event", description: "Business lunch catering" },
  { id: 5, image: image5, title: "Wedding Catering", description: "Special occasion dining" },
  { id: 6, image: image6, title: "Buffet Style", description: "Self-service options" },
  { id: 7, image: image7, title: "Fine Dining", description: "Premium meal service" },
  { id: 8, image: image8, title: "Party Catering", description: "Social gatherings" },
  { id: 9, image: image9, title: "Outdoor Events", description: "Al fresco dining" },
  { id: 10, image: image10, title: "Themed Events", description: "Custom event styling" },
  { id: 11, image: image11, title: "Dessert Table", description: "Sweet treats display" },
  { id: 12, image: image12, title: "Cocktail Party", description: "Appetizers and drinks" },
  { id: 13, image: image13, title: "Formal Dinner", description: "Seated meal service" },
  { id: 14, image: image14, title: "Brunch Catering", description: "Morning events" },
  { id: 15, image: image15, title: "BBQ Events", description: "Grilled specialties" },
  { id: 16, image: image16, title: "International Cuisine", description: "Global flavors" },
  { id: 17, image: image17, title: "Seasonal Menu", description: "Fresh seasonal ingredients" },
];

const Gallery = () => {

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
          {galleryItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <img
                  src={item.image}
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
