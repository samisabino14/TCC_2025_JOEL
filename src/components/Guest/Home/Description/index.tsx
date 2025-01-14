import { orangeText } from "../../../../utils/functions/orangeText";


export function Description() {

    const items = [
        {
            title: "Objetivo e Propósito",
            image: "/objective.svg",
            description: "O projeto tem como objetivo facilitar a busca e acesso a serviços essenciais . . ."
        },
        {
            title: "Problema a Resolver",
            image: "/problem.svg",
            description: "A busca por serviços próximos e a necessidade de agendar visitas . . ."
        },
        {
            title: "Solução Oferecida",
            image: "/soluction.svg",
            description: "Nosso sistema utiliza a localização em tempo real do usuário . . ."
        },
    ];

    return (
        <div className="flex lg:flex-row flex-col gap-10 justify-between w-full items-center">

            <div className="lg:w-[40%]">
                <img
                    src="/diverse_people.svg"
                    alt=""
                    width={0}
                    height={0}
                    className="w-[240px] h-72 lg:h-[420px] lg:w-[220px] lg:w-[420px] "
                />
            </div>

            <div className='grid md:gap-8 gap-10 lg:gap-10 lg:w-[60%]'>

                <div className='grid gap-4'>
                    <p className="lg:text-3xl text-xl font-bold">Conectando {orangeText('indivíduos')} a entidades próximas que oferecem esses {orangeText('serviços')}.</p>
                    <p>Pesquisar por serviços específicos e visualizar em tempo real todas as entidades disponíveis na região.</p>
                </div>

                <div className='grid md:gap-10 gap-16'>

                    {items.map((item, index) => (


                        <div key={index} className="flex md:flex-row flex-col gap-4 md:gap-6 lg:gap-8 justify-start items-center">
                            <img
                                src={item.image}
                                alt=""
                                width={0}
                                height={0}
                                className="w-16 shadow-md rounded-3xl shadow-white"
                            />

                            <div className="grid gap-4 lg:gap-0">
                                <p className="text-lg font-bold text-center md:text-start">{item.title}</p>
                                <p className="text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    )
}