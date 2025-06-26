import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <div className="flex px-4 lg:mx-0 w-full h-20 justify-center items-center text-xs">
            <div className="flex flex-reverse flex-col md:flex-row lg:w-[88%] w-full justify-between items-center">

                <Link className='text-gray-700' to={`/login`}>JQTravel © {new Date().getFullYear()}</Link>
                <p>Redes Sociais</p>

            </div>
        </div>
    )
}