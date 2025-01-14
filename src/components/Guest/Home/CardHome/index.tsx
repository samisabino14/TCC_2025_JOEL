export const CardHome = () => {


    return (
        <div className="flex flex-col lg:flex-row w-full justify-center items-center dark:bg-[#322159] p-10 rounded-lg shadow-lg gap-0 md:gap-10 lg:gap-20">

            <div>
                <img
                    src="/logo_wanna_pro.svg"
                    alt="Logo da Wanna Pro"
                    width={0}
                    height={0}
                    className="w-[240px] h-44 md:h-72 md:w-[320px] lg:w-[320px] "
                />
            </div>

            <div className="flex flex-col lg:w-[60%]">
                <p className="text-center text-base md:text-xl font-semibold lg:text-start">Através da nossa plataforma, usuários podem pesquisar por serviços específicos e visualizar em tempo real todas as entidades disponíveis na região, otimizando a experiência de acesso a informações e agendamentos.
                </p>
            </div>
        </div>
    )
}