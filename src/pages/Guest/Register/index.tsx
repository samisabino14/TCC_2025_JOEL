import {

    FormEvent,
    useState,
    useEffect,
    useContext,

} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import toast from 'react-hot-toast';
import CountryDropdown from '../../../components/CountryDropdown';
import { api } from '../../../services/apiClient';
import { ErrorResponse } from '../../../App';
import { AuthContext } from '../../../contexts/AuthContext';

export type CountriesProps = { name: string; code: string; flag: string }

export interface Locality {
    id_localidade: string,
    nome: string,
    status: boolean,
    localidade_pai: string,
    criacao: string,
    atualizacao: string,
}


export const Register = () => {
    const { signIn } = useContext(AuthContext);

    const genres = [
        {
            id: "1",
            title: "Feminino"
        },
        {
            id: "2",
            title: "Masculino"
        },
    ];

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [genre, setGenre] = useState(genres[0].title);
    const [biNumber, setBiNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [provinces, setProvinces] = useState<Locality[]>([]);
    const [municipalities, setMunicipalities] = useState<Locality[]>([]);
    const [provinceSelected, setProvinceSelected] = useState<string | null>(provinces[0]?.id_localidade);
    const [localityId, setLocalityId] = useState("");
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<CountriesProps[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<{ name: string; code: string; flag: string } | null>(null);
    const [selectedNationality, setSelectedNationality] = useState<{ name: string; code: string; flag: string } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNacionality, setIsOpenNacionality] = useState(false);

    useEffect(() => {

        api.get('/localidades')
            .then((response) => {
                setProvinces(response.data.filter((locality: Locality) => locality.localidade_pai === null));
            }).catch((error) => {
                const err = error as ErrorResponse;

                if (err?.response?.data) {
                    toast.error(err.response.data.mensagem);
                }
                else {
                    toast.error("Falha na conexão de rede.");
                }
            })

    }, []);

    useEffect(() => {
        setProvinceSelected(provinces[0]?.id_localidade)
    }, [provinces]);

    useEffect(() => {
        setLocalityId(municipalities[0]?.id_localidade)
    }, [municipalities]);

    useEffect(() => {

        try {

            api.get(`/localidades/com/localidades/${provinceSelected}`)
                .then((response) => {
                    setMunicipalities(response.data)
                }).catch((error) => {
                    const err = error as ErrorResponse;

                    if (err?.response?.data) {
                        toast.error(err.response.data.mensagem);
                    }
                    else {
                        toast.error("Falha na conexão de rede.");
                    }
                })
        } catch (error) {
            const err = error as ErrorResponse;

            if (err?.response?.data) {
                toast.error(err.response.data.mensagem);
            }
            else {
                toast.error("Falha na conexão de rede.");
            }
        }
    }, [provinceSelected])

    const handleRegister = async (e: FormEvent) => {

        e.preventDefault();

        if (name === '' || email === '' || password === '' || birthDate === '' || phoneNumber === '' || biNumber === '' || genre === '' || localityId === '') {
            toast.error("Preencha todos os campos!");
            return;
        }

        if (!selectedCountry?.code) {
            toast.error(`Selecione o indicativo do teu país!`);
            return;
        }

        if (selectedCountry.code === "+244" && phoneNumber.length < 9 || phoneNumber.length > 9) {
            toast.error(`O telefone deve conter 9 dígitos!`);
            return;
        }

        if (!selectedNationality?.name) {
            toast.error(`Selecione a tua nacionalidade!`);
            return;
        }

        const phone = selectedCountry.code + phoneNumber

        setLoading(true);

        try {

            const response = await api.post("pessoas", {
                "nome": name,
                "bilhete_identidade": biNumber,
                "genero": genre,
                "email": email,
                "data_nascimento": birthDate,
                "telefone": phone,
                "password": password,
                "localidade": localityId,
                "nacionalidade": selectedNationality.name === "Angola" ? "angolana" : "estrangeira"
            });

            const insertId = response.data.pessoa[0].insertId;

            await api.post("usuarios", {
                id_pessoa: insertId,
                senha: password
            })

            toast.success("Cadastrado com sucesso.");

            await signIn({ email, password });

        } catch (error) {
            const err = error as ErrorResponse;
            if (err?.response?.data?.erro) {
                toast.error(err.response.data.erro);
            }
            else {
                toast.error("Falha na conexão de rede.");
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        // Exibe um indicador de carregamento enquanto verifica a autenticação
        return (
            <div className="flex items-center justify-center h-screen">
                <Loading size={10} />
            </div>
        );
    }

    return (
        <div className="flex bg-white bg-[url('/waves.svg')] text-gray-700 bg-no-repeat bg-cover max-w-[100vw] min-h-[100vh] flex-col justify-center items-center">
            <div className='bg-white w-[90%] lg:w-[40%] shadow-md mt-4 py-4 rounded-lg h-[100%] flex flex-col gap-10 justify-start items-center'>

                <Link to='/' className="flex gap-2 bg-gray-900 px-4 rounded-md justify-between items-center w-full">
                    {/*
                    <img
                        src="/log_jobs.svg"
                        alt="Logo da Jobs"
                        width={0}
                        height={0}
                        className="w-20 h-12 md:h-20 md:w-[240px] lg:w-[100px] "
                    />
                    */}

                    <h1 className='text-2xl h-12 text-white mt-4'><span className='text-amber-500 font-bold'>JQ</span>Travel</h1>

                </Link>

                <h1 className="text-lg lg:text-xl font-semibold text-center px-4 lg:w-[80%] w-[90%]">Cadastre-se para encontrar destinos incríveis!</h1>

                <form onSubmit={handleRegister} className="flex text-sm text-gray-700 flex-col gap-4 w-[90%]">
                    <p className='text-xs italic'><span className='text-red-500 font-bold text-base'>*</span> Indica campos obrigatórios</p>
                    <div className="flex flex-col gap-3">

                        <div>
                            <label htmlFor="name">Nome completo <span className='text-red-500 font-bold text-base'>*</span> </label>
                            <input
                                type="text"
                                placeholder='Informe seu nome completo'
                                className="border px-4 p-3 rounded-lg w-full bg-white"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email">Email <span className='text-red-500 font-bold text-base'>*</span></label>
                            <input
                                type="email"
                                placeholder='utilizador@exemplo.com'
                                className="border px-4 p-3 rounded-lg w-full bg-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Palavra-passe <span className='text-red-500 font-bold text-base'>*</span></label>
                            <input
                                type="password"
                                placeholder='123456'
                                className="border px-4 p-3 rounded-lg w-full bg-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="">
                            <label htmlFor="phoneNumber">Telefone <span className='text-red-500 font-bold text-base'>*</span> </label>
                            <div className='flex gap-2 items-center rounded-lg w-full bg-white'>

                                <CountryDropdown
                                    code={true}
                                    countries={countries}
                                    setCountries={setCountries}
                                    selectedCountry={selectedCountry}
                                    setSelectedCountry={setSelectedCountry}
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                />

                                <input
                                    type="phoneNumber"
                                    placeholder='910000000'
                                    className="border px-4 p-3 rounded-lg w-[40vw] bg-white"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">

                            <div className="">
                                <label htmlFor="phoneNumber">Nacionalidade <span className='text-red-500 font-bold text-base'>*</span> </label>
                                <div className='flex gap-2 items-center rounded-lg w-full bg-white'>

                                    <CountryDropdown
                                        name={true}
                                        countries={countries}
                                        setCountries={setCountries}
                                        selectedCountry={selectedNationality}
                                        setSelectedCountry={setSelectedNationality}
                                        isOpen={isOpenNacionality}
                                        setIsOpen={setIsOpenNacionality}
                                    />

                                </div>
                            </div>
                            <div>
                                <label htmlFor="biNumber">Número de Identificação <span className='text-red-500 font-bold text-base'>*</span> </label>
                                <input
                                    type="biNumber"
                                    placeholder='000000000LA000'
                                    className="border px-4 p-3 rounded-lg w-full bg-white"
                                    value={biNumber}
                                    onChange={(e) => setBiNumber(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className="flex gap-4">

                            <div>
                                <label htmlFor="biNumber">Gênero <span className='text-red-500 font-bold text-base'>*</span> </label>
                                <select name="" id="" className="border px-4 p-3 rounded-lg w-full bg-white" onChange={(e) => setGenre(e.target.value)}>
                                    <option value="" disabled>Selecione o gênero</option>
                                    {genres.map((type, index) => (
                                        <option key={index} value={type.title}>{type.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="biNumber">Data de Nascimento <span className='text-red-500 font-bold text-base'>*</span> </label>
                                <input
                                    type="date"
                                    className="border px-4 p-3 rounded-lg w-full bg-white"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <h3>Localização</h3>

                        <div>
                            <label htmlFor="">Província <span className='text-red-500 font-bold text-base'>*</span> </label>
                            <select name="" id="" className="border px-4 p-3 rounded-lg w-full bg-white" onChange={(e) => setProvinceSelected(e.target.value)}>
                                <option value="" disabled>Selecione a província</option>
                                {provinces?.map((province, index) => (
                                    <option key={index} value={province.id_localidade}>{province.nome}</option>
                                ))}
                            </select>
                        </div>

                        {provinceSelected && municipalities.length > 0 ?
                            <div>
                                <label htmlFor="">Município <span className='text-red-500 font-bold text-base'>*</span> </label>
                                <select name="" id="" className="border px-4 p-3 rounded-lg w-full bg-white" onChange={(e) => setLocalityId(e.target.value)}>
                                    <option value="" disabled>Selecione o município</option>
                                    {municipalities?.map((municipe, index) => (
                                        <option key={index} value={municipe.id_localidade}>{municipe.nome}</option>
                                    ))}
                                </select>
                            </div>
                            :
                            <div>
                                <p>Esta província não contém nenhum município.</p>
                            </div>
                        }
                    </div>

                    <button type="submit" className="flex items-center justify-center p-3 rounded-xl w-full bg-orange-500 text-white font-semibold">
                        <p>Cadastrar-me</p>
                    </button>

                    <div className="flex gap-1 items-center justify-center text-center p-2 text-sm">

                        <span>Já possui uma conta?</span>

                        <Link to='/login'>
                            <span className="">Entrar</span>
                        </Link>
                    </div>

                </form>
            </div>

            <div className="flex px-4 lg:mx-0 w-full h-20 justify-center items-center text-xs">
                <Link className='' to={`/login`}>JQTravel © {new Date().getFullYear()}</Link>
            </div>
        </div>
    )
}