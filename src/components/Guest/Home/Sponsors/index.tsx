import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";


export default function Sponsors() {

  const sponsors = [
    {
      id: 1,
      name: "",
      image: "/logo_wanna_pro.svg",
    },
    {
      id: 2,
      name: "",
      image: "/vite.svg",
    },
    {
      id: 1,
      name: "",
      image: "/logo_wanna_pro.svg",
    },
    {
      id: 2,
      name: "",
      image: "/vite.svg",
    },
    {
      id: 1,
      name: "",
      image: "/logo_wanna_pro.svg",
    },
    {
      id: 2,
      name: "",
      image: "/vite.svg",
    },
    {
      id: 1,
      name: "",
      image: "/logo_wanna_pro.svg",
    },
    {
      id: 2,
      name: "",
      image: "/vite.svg",
    },
    {
      id: 1,
      name: "",
      image: "/logo_wanna_pro.svg",
    },
    {
      id: 2,
      name: "",
      image: "/vite.svg",
    },
  ]

  return (
    <div className="flex flex-col w-[96vw] lg:w-[87vw] gap-6">

      <h1 className="text-xl text-center font-semibold">Parceiros</h1>

      {sponsors?.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView="auto"
          loop={true}
          resistance={true}
          resistanceRatio={0.85}
          touchRatio={1.5}
          autoplay={{
            delay: 0, // Sem atraso entre slides
            disableOnInteraction: false, // Continua mesmo após interação
          }}
          speed={2000} // Velocidade de deslizamento (maior = mais lento)
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20
            }
          }}
          className="w-full py-2"
        >
          {sponsors.map((sponsor, index) => (
            <SwiperSlide
              key={index}
              style={{ width: "auto" }} // Ajusta para caber dinamicamente
            >
              <div
                className="flex text-sm items-center justify-center py-4 md:py-2"
              >

                <img
                  src={sponsor.image}
                  alt={`Logo da empresa ${sponsor.name}`}
                  className="h-20 dark:bg-none p-2"
                />

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Nenhum patrocinador encontrado.
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-white">
              Não existem patrocinadores cadastrados no momento.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}