import { Outlet } from "react-router-dom";
import Header from "../../../../components/Guest/Header";

export const Rotas = () => {

    return (
        <div className={`bg-gray-50 h-[100vh] w-[100vw]`}>
            <div className="grid justify-start text-sm w-full ">
                <Header />
                <div className="w-[100vw] px-16 pt-20 h-[100vh] grid gap-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}