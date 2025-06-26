import {

    FormEvent,
    useState,
    useContext,

} from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';
import toast from 'react-hot-toast';


export const Login = () => {
    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent) => {

        e.preventDefault();
        
        if (email === '' || password === '') {
            toast.error("Preencha todos os campos!");
            return;
        }

        setLoading(true);
        
        await signIn({ email, password });

        setLoading(false);
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
        <div className="flex bg-white bg-[url('/waves.svg')] text-gray-700 bg-no-repeat bg-cover max-w-[100vw] min-h-[90vh] flex-col justify-center items-center">
            <div className='bg-white w-[90%] lg:w-[40%] shadow-md mt-4 py-4 rounded-lg flex flex-col gap-10 justify-start items-center'>

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

                <h1 className="text-lg lg:text-xl font-semibold text-center lg:text-center px-4 w-[96%]">Iniciar sessão</h1>

                <form onSubmit={handleLogin} className="flex text-sm text-gray-700 flex-col gap-4 w-[90%]">
                    <div className="flex flex-col gap-3">

                        <input
                            type="email"
                            placeholder="Email"
                            className="border px-4 p-3 rounded-lg w-full bg-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            //required
                        />
                        <input
                            type="password"
                            placeholder="Palavra-passe"
                            className="border px-4 p-3 rounded-lg w-full bg-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            //required
                        />

                        {/*
                        
                        <div>
                            <Link to='' className='pb-4 float-right'>
                                Recuperar palavra-passe.
                            </Link>
                        </div> */}
                    </div>

                    <button type="submit" className="flex items-center justify-center p-3 rounded-xl w-full bg-orange-500 text-white font-semibold">
                        <p>Entrar</p>
                    </button>

                    <div className="flex gap-1 items-center justify-center text-center p-2 text-sm">

                        <span>Não possui uma conta?</span>

                        <Link to='/cadastro'>
                            <span className="">Criar conta.</span>
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