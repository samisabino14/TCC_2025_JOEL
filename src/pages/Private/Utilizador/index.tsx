import {

    useState,
    useEffect,
    useContext,

} from 'react';
import toast from 'react-hot-toast';
import { api } from '../../../services/apiClient';
import { ErrorResponse } from '../../../App';
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';
import { CardsCompanies } from "../../../components/Guest/Home/CardsCompanies";
import { SearchSection } from "../../../components/Guest/Home/SearchSection";
import { Description } from "../../../components/Guest/Home/Description";
import SearchCard from "../../../components/SearchCard";

export interface TrajetoProps {
    id_trajeto: number,
    id_partida: number,
    id_destino: number,
    lotacao: number,
    preco: string,
    percentual_parcela_inicial: string,
    criacao: string,
    atualizacao: string,
    partida: string,
    destino: string
}

function Utilizador() {
    const { user } = useContext(AuthContext);

    // Exibe um carregador se `user` for nulo
    if (!user) {
        return (
            <div className="flex w-64 items-center justify-center h-screen">
                <Loading size={5} />
            </div>
        );
    }

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

export default Utilizador;
