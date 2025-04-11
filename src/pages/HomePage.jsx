import React, { useEffect } from 'react'
import CategoryItem from '../components/CategoryItem';
import { useProductStore } from '../stores/useProductStore';
import FeaturedProducts from '../components/FeaturedProducts';

const categories = [
  {href: "/arts", name: "Arts", imageUrl: "/images/arts/img1.jpeg"},
  {href: "/bamboproducts", name: "Bamboo Products", imageUrl: "/images/bambooProducts/img1.jpeg"},
  {href: "/nakshikhantha", name: "Nakshi Kantha", imageUrl: "/images/nakshiKantha/img1.jpg"},
  {href: "tatkapoor", name: "Tat Kapoor", imageUrl: "/images/tatKapoor/img1.jpg"},
  {href: "/teracotta", name: "Teracotta", imageUrl: "/images/teracotta/img1.jpg"},
  {href: "/woodProducts", name: "Wood Products", imageUrl: "/images/woodProducts/img1.webp"},
];

const HomePage = () => {

  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  // useEffect(() => {
  //   fetchFeaturedProducts();
  // }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-cyan-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
        {/* {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )} */}
      </div>
    </div>
  );
}

export default HomePage