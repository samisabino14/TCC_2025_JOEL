



function Home() {

    function orangeText(text: string) {
        return (
            <span className="text-[#F57C00]">{text}</span>
        )
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        alert(e.target.innerHTML);
    }

    const handleOnChange = (e: any) => {
        e.preventDefault();

        alert(e.target.value);
    }

    return (
        <div className="mt-20 flex flex-col h-full justify-center items-center w-full">
            <div className="flex w-[90%] justify-between items-center ">

                <div className="flex flex-col gap-8 w-[40%]">
                    <h1 className="text-5xl font-bold leading-tight">Busque {orangeText('e')} acesse {orangeText('à')} serviços {orangeText('essenciais')}.</h1>

                    <form onSubmit={(e) => handleSubmit(e)} className="flex items-center gap-2 text-sm text-black rounded-full bg-white p-2 w-[100%]">

                        <input
                            type="search"
                            name="search"
                            id=""
                            onChange={(e) => handleOnChange(e)}
                            className="p-2 w-[72%] border rounded-full border-amber-500 text-black "
                        />

                        <button type="submit" className='bg-gradient-to-r font-semibold hover:scale-105 duration-500 cursor-pointer from-[#F57C00] to-[#FFCA28] py-2 px-8 rounded-full text-white text-sm'>
                            <p>Pesquisar</p>
                        </button>

                    </form>

                    <p>Listamos todas as entidades que ministram o serviço que procuras</p>
                </div>

                <div>
                    <img
                        src="/logo_wanna_pro.svg"
                        alt="Logo da Wanna Pro"
                        width={0}
                        height={0}
                        className="w-[60px] h-8 md:h-72 md:w-[120px] lg:w-[320px] "
                    />
                </div>

            </div>
        </div>
    )
}

export default Home;