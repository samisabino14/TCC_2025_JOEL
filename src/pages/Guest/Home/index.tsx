import { CardsCompanies } from "../../../components/Guest/Home/CardsCompanies";
import { SearchSection } from "../../../components/Guest/Home/SearchSection";
import { Description } from "../../../components/Guest/Home/Description";
import { Plans } from "../../../components/Guest/Home/Plans";
import Sponsors from "../../../components/Guest/Home/Sponsors";
import { CardHome } from '../../../components/Guest/Home/CardHome'
function Home() {

    return (
        <div className="lg:pt-19 pt-16 max-w-[100vw] grid gap-10">

            <SearchSection />

            <div className="md:w-full w-[100vw] flex flex-col justify-center items-center">
                <div className="flex flex-col px-4 lg:px-0 gap-20 lg:w-[88%] w-full items-center ">

                    <CardsCompanies />

                    <Description />

                    <Plans />

                    <CardHome />

                    <Sponsors />
                </div>
            </div>
        </div>
    )
}

export default Home;