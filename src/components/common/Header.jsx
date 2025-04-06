"use client";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const Header = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem className="">
          <div className="w-full h-[300px] md:h-[600px] bg-[url('/assets/shimul-bagan.jpg')] bg-cover bg-center">
            <div className="flex flex-col justify-center items-center h-full bg-black/50">
              <h1 className="text-2xl md:text-5xl text-white text-center font-extrabold md:leading-[55px]">
                শিমুল বাগান
              </h1>
              <p className="w-full md:w-1/2 text-center text-white mt-4 px-2">
                সুনামগঞ্জ জেলার তাহিরপুর উপজেলার যাদুকাটা নদীর নিকটবর্তী
                মানিগাঁও গ্রামে প্রায় ১০০ বিঘারও বেশি জায়গা জুড়ে গড়ে তোলা এক
                শিমুল গাছের বাগান। নদীর ওপারে ভারতের মেঘালয় পাহাড়, মাঝে মায়ার
                নদী যাদুকাটা আর এপারে রক্তিম ফুলের সমারোহ, অগুণতি পাখির কলকাকলি।
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-[300px] md:h-[600px] bg-[url('/assets/tanguar_haor.jpg')] bg-cover bg-center">
            <div className="flex flex-col justify-center items-center h-full bg-black/50">
              <h1 className="text-2xl md:text-5xl text-white text-center font-extrabold md:leading-[55px]">
                টাঙ্গুয়ার হাওর
              </h1>
              <p className="w-full md:w-1/2 text-center text-white mt-4 px-2">
                টাঙ্গুয়ার হাওর বাংলাদেশের সিলেটের সুনামগঞ্জ জেলায় অবস্থিত একটি
                হাওর। প্রায় ১২৬ বর্গকিলোমিটার এলাকা জুড়ে বিস্তৃত এ হাওর
                বাংলাদেশের দ্বিতীয় বৃহত্তম মিঠা পানির জলাভূমি। স্থানীয় লোকজনের
                কাছে হাওরটি নয়কুড়ি কান্দার ছয়কুড়ি বিল নামেও পরিচিত।
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-[300px] md:h-[600px] bg-[url('/assets/niladri.webp')] bg-cover bg-center">
            <div className="flex flex-col justify-center items-center h-full bg-black/50">
              <h1 className="text-2xl md:text-5xl text-white text-center font-extrabold md:leading-[55px]">
                নীলাদ্রি লেক
              </h1>
              <p className="w-full md:w-1/2 text-center text-white mt-4 px-2">
                নীলাদ্রি লেক (Niladri Lake) খ্যাত পর্যটন স্থানটি চুনাপাথরের
                পরিত্যাক্ত খনির লাইম স্টোন লেক। সুনামগঞ্জ জেলার তাহিরপুর উপজেলার
                উত্তর শ্রীপুর ইউনিয়নের টেকেরঘাট নামক গ্রামে নীলাদ্রি লেকের
                অবস্থান। এই লেকের প্রকৃত নাম শহীদ সিরাজ লেক।
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-[300px] md:h-[600px] bg-[url('/assets/pahar_bilash_02.jpg')] bg-cover bg-center">
            <div className="flex flex-col justify-center items-center h-full bg-black/50">
              <h1 className="text-2xl md:text-5xl text-white text-center font-extrabold md:leading-[55px]">
              পাহাড় বিলাস
              </h1>
              <p className="w-full md:w-1/2 text-center text-white mt-4 px-2">
                সুনামগঞ্জের বিশ্বম্ভরপুরে সুইজারল্যান্ডখ্যাত পাহাড় বিলাস
                মেঘালয় পাহাড়ের পাদদেশে ভারতের শিলং শহরের দক্ষিণে বাংলাদেশের
                সীমান্ত জনপদ বিশ্বম্ভরপুর উপজেলার সলুকাবাদ ইউপির চ্যাংবিল
                এলাকায় অবস্থিত।
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-[300px] md:h-[600px] bg-[url('/assets/haor_bilash.jpg')] bg-cover bg-center">
            <div className="flex flex-col justify-center items-center h-full bg-black/50">
              <h1 className="text-2xl md:text-5xl text-white text-center font-extrabold md:leading-[55px]">
              হাওর বিলাস
              </h1>
              <p className="w-full md:w-1/2 text-center text-white mt-4 px-2">
              সুনামগঞ্জের বিশ্বম্ভরপুর উপজেলার খরচার হাওর পাড়ে অবস্থিত পর্যটন এলাকা ‘হাওর বিলাস’।
              </p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 md:left-16" />
      <CarouselNext className="absolute right-4 md:right-16" />
    </Carousel>
  );
};

export default Header;
