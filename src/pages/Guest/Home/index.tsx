import { CardsCompanies } from "../../../components/Guest/Home/CardsCompanies";
import { SearchSection } from "../../../components/Guest/Home/SearchSection";
import { Description } from "../../../components/Guest/Home/Description";
import SearchCard from "../../../components/SearchCard";

function Home() {

    return (
        <div className="max-w-[100vw] grid gap-10">

            <SearchSection />

            <SearchCard />

            <div className="md:w-full w-[100vw] flex flex-col justify-center items-center">
                <div className="flex flex-col px-4 lg:px-0 gap-20 lg:w-[88%] w-full items-center ">
                    <CardsCompanies />

                    <Description />
                </div>
            </div>
        </div>
    )
}

export default Home;