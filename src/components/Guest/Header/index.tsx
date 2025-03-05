import { useState, useEffect, useContext } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

export const Header = () => {

    const { user, signOut } = useContext(AuthContext);

    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <div
            className={`fixed w-full flex ${scrolled ? "bg-gray-900" : "bg-gray-900"} flex-row justify-center z-50 transition-all duration-1000`}
        >
            <div className={`lg:w-[88%] w-full lg:rounded-b-3xl ${toggle && 'lg:rounded-br-sm '} transition-all duration-1000 flex justify-between items-center p-4 lg:p-4`}>

                <Link to="/">
                    <img
                        src="/log_jobs.svg"
                        alt="Logo da Jobs"
                        width={0}
                        height={0}
                        className="w-[30px] h-8 md:h-10 md:w-[120px] lg:w-[100px] "
                    />

                </Link>

                {!user?.token ?

                    <div className='flex items-center gap-10'>

                        <Link to={'login'} className='hidden lg:block bg-gray-900 font-semibold hover:scale-105 duration-500 cursor-pointer border py-2 px-8 rounded-lg text-white text-sm'>
                            <p>Entrar</p>
                        </Link>
                        <Link to={'/cadastro'} className='hidden lg:block bg-gradient-to-r font-semibold hover:scale-105 duration-500 cursor-pointer from-[#F2994A] to-[#FFCA28] py-2 px-8 rounded-lg text-white text-sm'>
                            <p>Registe-se</p>
                        </Link>

                        <div onClick={() => setToggle(!toggle)} className={`border transition-all lg:hidden duration-300 text-gray-500 p-2 rounded-lg cursor-pointer`}>
                            {toggle ? (
                                <AiOutlineClose size={18} className={`block`} />
                            ) : (
                                <FiMenu size={18} className={`block`} />
                            )}
                        </div>

                    </div>
                    :
                    <div className='flex items-center gap-10'>
                        <Link to='/dashboard/utilizador/reservas'>
                            <span className='text-white mt-20 p-5'>Minhas reservas</span>
                        </Link>
                        <div onClick={signOut} className='hidden lg:block bg-gradient-to-r font-semibold hover:scale-105 duration-500 cursor-pointer from-red-500 to-red-400 py-2 px-8 rounded-lg text-white text-sm'>
                            <p>Sair</p>
                        </div>


                    </div>
                }

            </div>

            <div className={`duration-700 flex flex-col rounded-md lg:border bg-white w-[100%] md:w-[20%] h-full md:h-[84vh] fixed gap-6 
                 text-[#161634] text-xs font-semibold mt-16 lg:mt-20 ${toggle ? `right-[0%] lg:mr-20` : `right-[-100%] md:right-[-90%]`}`}
            >
                <p></p>
                <Link to='/'>
                    <span className='text-[#161634] mt-20 p-5'>Início</span>
                </Link>
                <Link to='/login'>
                    <span className='text-[#161634] mt-20 p-5'>Entrar</span>
                </Link>
                <Link to='/cadastro'>
                    <span className='text-[#161634] mt-20 p-5'>Registe-se</span>
                </Link>
            </div>



        </div>
    );
};

export default Header;