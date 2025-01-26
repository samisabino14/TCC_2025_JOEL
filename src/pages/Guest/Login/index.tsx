import {

    FormEvent,
    useState,
    useContext,

} from 'react';
import { Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc'; // Ícone do Google
import { FaFacebook } from 'react-icons/fa'; // Ícone do Facebook
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';


export const Login = () => {
    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent) => {

        e.preventDefault();

        if (email === '' || password === '') {
            alert("Credenciais inválidas!");
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
                <Loading size={10}/>
            </div>
        );
    }

    return (
        <div className="flex bg-white bg-[url('/waves.svg')] text-gray-700 bg-no-repeat bg-cover max-w-[100vw] min-h-[100vh] flex-col justify-center items-center">
            <div className='bg-white w-[90%] lg:w-[40%] shadow-md mt-4 py-4 rounded-lg h-[100%] flex flex-col gap-6 justify-start items-center'>

                <div className="flex gap-2 px-4 justify-between items-center w-full">
                    <img
                        src="/logo_wanna_pro.svg"
                        alt="Logo da Wanna Pro"
                        width={0}
                        height={0}
                        className="w-10 h-12 md:h-20 md:w-[240px] lg:w-[100px] "
                    />

                    <select className="shadow-lg border p-2 w-20 rounded-xl bg-white">
                        <option>PT</option>
                        <option>EN</option>
                        <option>ES</option>
                    </select>

                </div>

                <h1 className="text-lg lg:text-xl font-semibold text-start lg:text-center px-4 w-[96%]">Iniciar sessão</h1>

                <div className="flex flex-col text-sm font-semibold md:flex-row gap-4 mt-10 px-4 justify-center items-center w-full lg:w-[96%]">
                    <div
                        className="p-3 flex justify-center items-center gap-2 border w-full max-w-md text-center rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition duration-300 cursor-pointer"
                        role="button"
                        tabIndex={0}
                    >
                        <FcGoogle size={24} /> {/* Ícone do Google */}

                        <p>Google</p>
                    </div>

                    <div
                        className="p-3 flex justify-center items-center gap-2 border w-full max-w-md text-center rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition duration-300 cursor-pointer"
                        role="button"
                        tabIndex={0}
                    >
                        <FaFacebook size={24} color="blue" /> {/* Ícone do Facebook */}

                        <p>Facebook</p>
                    </div>
                </div>

                <p className="text-sm font-semibold">Ou</p>

                <form onSubmit={handleLogin} className="flex text-sm text-gray-700 flex-col gap-4 w-[90%]">
                    <div className="flex flex-col gap-3">

                        <input
                            type="email"
                            placeholder="Email"
                            className="border px-4 p-3 rounded-lg w-full bg-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Palavra-passe"
                            className="border px-4 p-3 rounded-lg w-full bg-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div>
                            <Link to='' className='pb-4 float-right'>
                                Recuperar palavra-passe.
                            </Link>
                        </div>
                    </div>

                    <button type="submit" className="flex items-center justify-center p-3 rounded-xl w-full bg-orange-500 text-white font-semibold">
                        <p>Entrar</p>
                    </button>

                    <div className="flex gap-1 items-center justify-center text-center p-2 text-sm">

                        <span>Não possui uma conta?</span>

                        <Link to=''>
                            <span className="">Criar conta.</span>
                        </Link>
                    </div>
                    
                </form>
            </div>

            <div className="flex px-4 lg:mx-0 w-full h-20 justify-center items-center text-xs">
                <Link className='' to={`/login`}>WannaPro © {new Date().getFullYear()}</Link>
            </div>
        </div>
    )
}