import { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const Header = () => {
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

    //const borderColor = scrolled ? 'border-[#000]' : 'border-white';
    //const menuIconColor = scrolled ? 'text-[#000]' : 'text-white';
    //const menuIconColor = 'text-black';

    return (
        <div
            className='fixed w-full flex flex-row justify-center bg-[#161634] z-50 transition duration-300 lg:py-1'
        //style={headerStyle}
        >
            <div className={`lg:w-[91%] bg-white lg:rounded-b-3xl ${toggle && 'lg:rounded-br-sm transition-all duration-1000'} flex justify-between items-center p-4`}>

                <Link to="/">
                    <img
                        src="/logo_wanna_pro.svg"
                        alt="Logo da Wanna Pro"
                        width={0}
                        height={0}
                        className="w-[60px] h-8 md:h-10 md:w-[120px] lg:w-[100px] "
                    />

                </Link>

                {/*                
                <div className=' hidden lg:flex items-center justify-center gap-5 text-sm'>
                    <Link to='/' className='text-black'>
                        <span className='transition-all hover:text-red-600 duration-300'>Início</span>
                    </Link>

                    <Link to='/sobre' className='text-black'>
                        <span className='transition-all hover:text-red-600 duration-300'>Sobre</span>
                    </Link>

                    <Link to='/anuncio' className='text-black'>
                        <span className='transition-all hover:text-red-600 duration-300'>Anúncio</span>
                    </Link>

                </div>
                */}

                <div className='flex items-center gap-10'>
                    <div className='bg-gradient-to-r font-semibold hover:scale-105 duration-500 cursor-pointer from-[#F57C00] to-[#FFCA28] py-2 px-8 rounded-lg text-white text-sm'>
                        <p>Registe-se</p>
                    </div>

                    <div onClick={() => setToggle(!toggle)} className={`border transition-all duration-300 hover:bg-[#F57C00] hover:text-white p-2 rounded-lg cursor-pointer`}>
                        {toggle ? (
                            <AiOutlineClose size={18} className={`block`} />
                        ) : (
                            <FiMenu size={18} className={`block`} />
                        )}
                    </div>
                </div>
            </div>

            <div className={`duration-700 flex flex-col bg-white w-[100%] md:w-[20%] h-full md:h-[84vh] fixed gap-6 
                 text-[#161634] text-xs font-semibold mt-20 ${toggle ? `right-[0%] md:mr-16` : `right-[-100%] md:right-[-90%]`}`}
            >
                <p></p>
                <Link to='/'>
                    <span className='text-[#161634] mt-20 p-5'>Início</span>
                </Link>
                <Link to='/'>
                    <span className='text-[#161634] p-5'>Registe-se</span>
                </Link>
                <Link to='/'>
                    <span className='text-[#161634] p-5'>Consultar</span>
                </Link>

            </div>



        </div>
    );
};

export default Header;