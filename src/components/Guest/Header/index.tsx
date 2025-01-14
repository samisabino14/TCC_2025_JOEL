import { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

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

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div
            className={`fixed w-full flex ${scrolled ? "bg-none" : "bg-[#161634]"} flex-row justify-center z-50 transition-all duration-1000`}
        //style={headerStyle}
        >
            <div className={`lg:w-[88%] w-full dark:bg-[#161634] lg:border bg-white lg:rounded-b-3xl ${toggle && 'lg:rounded-br-sm '} transition-all border-b duration-1000 flex justify-between items-center p-4 lg:p-4`}>

                <Link to="/">
                    <img
                        src="/logo_wanna_pro.svg"
                        alt="Logo da Wanna Pro"
                        width={0}
                        height={0}
                        className="w-[30px] h-8 md:h-10 md:w-[120px] lg:w-[100px] "
                    />

                </Link>

                <div className='flex items-center gap-10'>
                    <div className="relative group">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 dark:bg-gray-100 dark:text-amber-500 dark:hover:bg-gray-300 transition-colors"
                        >
                            {darkMode ? <MdLightMode  /> : <MdDarkMode  />}

                        </button>
                        <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden w-24 text-center text-[11px] group-hover:block bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-2 py-1 rounded">
                            {darkMode ? "Modo Claro" : "Modo Escuro"}
                        </span>
                    </div>

                    <div className='hidden lg:block bg-gradient-to-r font-semibold hover:scale-105 duration-500 cursor-pointer from-[#F57C00] to-[#FFCA28] py-2 px-8 rounded-lg text-white text-sm'>
                        <p>Registe-se</p>
                    </div>

                    <div onClick={() => setToggle(!toggle)} className={`border transition-all duration-300 dark:text-white text-gray-500 p-2 rounded-lg cursor-pointer`}>
                        {toggle ? (
                            <AiOutlineClose size={18} className={`block`} />
                        ) : (
                            <FiMenu size={18} className={`block`} />
                        )}
                    </div>
                </div>
            </div>

            <div className={`duration-700 flex flex-col dark:bg-[#161634] rounded-md dark:text-white lg:border bg-white w-[100%] md:w-[20%] h-full md:h-[84vh] fixed gap-6 
                 text-[#161634] text-xs font-semibold mt-16 lg:mt-20 ${toggle ? `right-[0%] lg:mr-20` : `right-[-100%] md:right-[-90%]`}`}
            >
                <p></p>
                <Link to='/'>
                    <span className='dark:text-white text-[#161634] mt-20 p-5'>Início</span>
                </Link>
                <Link to='/'>
                    <span className='dark:text-white text-[#161634] p-5'>Registe-se</span>
                </Link>
                <Link to='/'>
                    <span className='dark:text-white text-[#161634] p-5'>Consultar</span>
                </Link>

            </div>



        </div>
    );
};

export default Header;