import { Outlet } from 'react-router-dom'
import Footer from '../../components/Guest/Footer'
import Header from '../../components/Guest/Header'

function Guest() {
    return (
        <div className='lg:w-[100%] grid'>
            <Header />
            <div className='flex flex-col justify-between min-h-screen max-w-screen pb-10 md:pb-20 bg-[#161634] text-white'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Guest