import React, { useState, useEffect } from "react";
import "./banner.css";

const banners = [
  {
    id: 1,
    title: "Festive Offers Are Live 🎉",
    desc: "Grab up to 50% OFF on trending gifts!",
    btnText: "Shop Now",
    bg: "linear-gradient(135deg, #ffdee9 0%, #b5fffc 100%)",
    img: "/assets/banner1.png",
  },
  {
    id: 2,
    title: "Deliver Happiness Anywhere 🌸",
    desc: "Same-day delivery available across India",
    btnText: "Order Now",
    bg: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    img: "/assets/banner2.png",
  },
  {
    id: 3,
    title: "Gifts that Speak Love 💝",
    desc: "Discover our best-selling personalised gifts.",
    btnText: "Explore",
    bg: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    img: "/assets/banner3.png",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % banners.length);
  const prevSlide = () =>
    setCurrent((current - 1 + banners.length) % banners.length);

  return (
    <div className="banner-container">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`banner-slide ${
            index === current ? "active" : "inactive"
          }`}
          style={{ background: banner.bg }}
        >
          <div className="banner-content">
            <h2>{banner.title}</h2>
            <p>{banner.desc}</p>
            <button className="banner-btn">{banner.btnText}</button>
          </div>
          <div className="banner-img">
            <img src={banner.img} alt={banner.title} />
          </div>
        </div>
      ))}

      <button className="nav-btn prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="nav-btn next" onClick={nextSlide}>
        ❯
      </button>

      <div className="dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active-dot" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
