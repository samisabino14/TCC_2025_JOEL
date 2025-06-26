import { CardsCompanies } from "../../../components/Guest/Home/CardsCompanies";
import { SearchSection } from "../../../components/Guest/Home/SearchSection";
import { Description } from "../../../components/Guest/Home/Description";
import SearchCard from "../../../components/SearchCard";
import Header from '../../../components/Guest/Header';

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

export interface TrajetoEmpresasProps {
    id_trajeto_empresa: number,
    id_trajeto: number,
    id_empresa: number,
    lotacao: number,
    preco: string,
    percentual_parcela_inicial: string,
    status: number,
    criacao: string,
    atualizacao: string,
    nome_empresa: string,
    nif: string,
    email: string,
    telefone: string,
    endereco: string,
    partida: string,
    destino: string
}

function Utilizador() {

    return (
        <div className="max-w-[100vw] grid gap-10">

            <Header/>

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
