import { Outlet } from 'react-router-dom'
import Footer from '../../components/Guest/Footer'
import Header from '../../components/Guest/Header'

function Guest() {
    
    return (
        <div className={`max-w-[100vw] grid gap-20 transition-all duration-1000 text-gray-700 bg-gray-50`}>
            <Header />
            <div className={`flex flex-col justify-between items-center min-h-screen max-w-screen pb-10 md:pb-20`}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Guest