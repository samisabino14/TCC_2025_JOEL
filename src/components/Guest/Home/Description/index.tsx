export function Description() {

    return (
        <div className="flex flex-col gap-10 justify-between w-full items-center">

            <h1 className="text-xl text-center w-full font-semibold">Locais em destaque</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-full items-center">
                <div className="bg-[url('/dest1.jpg')] bg-cover bg-center h-full rounded-lg flex items-end justify-start p-2 text-white">

                    <p>Lubango</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="bg-[url('/dest2.jpg')] bg-cover bg-center h-[40vh] rounded-lg flex items-end justify-start p-2 text-white">

                        <p>Lubango</p>
                    </div>
                    <div className="bg-[url('/dest3.jpg')] bg-cover bg-center h-[40vh] rounded-lg flex items-end justify-start p-2 text-white">

                        <p>Lobito</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="bg-[url('/dest4.jpg')] bg-cover bg-center h-[40vh] rounded-lg flex items-end justify-start p-2 text-white">

                        <p>Malanje</p>
                    </div>
                    <div className="bg-[url('/dest1.jpg')] bg-cover bg-center h-[40vh] rounded-lg flex items-end justify-start p-2 text-white">

                        <p>Lubango</p>
                    </div>
                </div>
                <div className="bg-[url('/dest2.jpg')] bg-cover bg-center h-full rounded-lg flex items-end justify-start p-2 text-white">

                    <p>Lubango</p>
                </div>
            </div>
        </div>

    )
}