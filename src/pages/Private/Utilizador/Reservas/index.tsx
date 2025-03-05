import { Link } from "react-router-dom";

export function Reservas() {

    return (

        <div className="flex flex-col p-10">
            <div className="flex justify-between">

                <h1>Minhas reservas</h1>

                <Link to={'nova'} className='bg-gradient-to-r font-semibold duration-500 cursor-pointer from-green-400 to-green-600 py-3 px-8 rounded-lg text-white text-sm'>
                    <p>Fazer reserva</p>
                </Link>

            </div>
        </div>
    )
}