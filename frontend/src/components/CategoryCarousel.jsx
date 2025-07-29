import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'FullStack Developer',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query)); // Dispatch the category search query
    navigate('/browse'); // Navigate to the browse page
  };

  return (
    <section className="py-16 bg-orange-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🔍 Explore by Category
      </h2>

      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent className="gap-6">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)} // Trigger search and navigate
                className="bg-white text-orange-600 border border-orange-300 shadow-sm hover:shadow-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 ease-in-out rounded-full px-6 py-3 text-sm font-semibold tracking-wide"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-6 flex justify-center gap-4">
          <CarouselPrevious className="hover:scale-105 hover:text-orange-500 transition-transform" />
          <CarouselNext className="hover:scale-105 hover:text-orange-500 transition-transform" />
        </div>
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
