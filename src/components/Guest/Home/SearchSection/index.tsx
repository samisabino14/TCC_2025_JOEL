import { orangeText } from "../../../../utils/functions/orangeText";

export const SearchSection = () => {

    return (
        <div
            className="flex xl:flex-row justify-center items-center lg:h-[100vh] md:h-[90vh] h-[80vh] w-full transition-all duration-500 dark:border-b-8 border-[#F2994A] rounded-b-3xl bg-[url('/fundo1.jpg')] bg-cover bg-center"
        >
            <div className="flex xl:h-[100vh] w-[92%] md:w-[88%] xl:w-[60%] text-white lg:flex-row flex-col-reverse justify-between items-center text-center">
                <div>
                    <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">
                        Bem-vindo ao {orangeText('Sistema')} de {orangeText('Agendamento')} de {orangeText('Viagens!')}!
                    </h1>
                    <p className="text-base md:text-base mt-4">
                        Planeje sua próxima jornada de forma rápida e fácil.
                    </p>
                    <p className="text-base md:text-base lg:block hidden">
                        Preencha os campos abaixo para encontrar a viagem ideal para você.
                    </p>
                </div>
            </div>
        </div>
    );
};
