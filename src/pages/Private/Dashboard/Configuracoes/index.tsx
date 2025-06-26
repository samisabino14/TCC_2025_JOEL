import { Link } from "react-router-dom"


export const Configuracoes = () => {

    const links = [
        { title: "Usuários", link: "usuarios" },
        { title: "Pessoas", link: "pessoas" },
        { title: "Localidades", link: "localidades" },
        { title: "Tipos de usuário", link: "tipos-usuario" },
        { title: "Tipos de suporte", link: "tipos-suporte" },
        { title: "Suporte", link: "suporte" },
        { title: "Funcionários", link: "funcionarios" },
        { title: "Bônus", link: "bonus" },
        { title: "Promoções", link: "promocoes" },
        { title: "Tipos de funcionário", link: "tipos-funcionario" },
        { title: "Trajetos", link: "trajetos" },
        { title: "Pagamentos", link: "pagamentos" },
        { title: "Horários dos trajetos", link: "horarios-trajeto" },
        { title: "Reservas", link: "reservas" },
    ]

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Configurações</h1>

            <div className="grid grid-cols-5 gap-4">

                {links.map((link, index) => (
                    <Link 
                        key={index} 
                        to={`/dashboard/administrador/${link.link}`}
                        className="border border-gray-400 p-8 hover:bg-gray-50 text-base text-center shadow-xl rounded-xl"    
                    >
                        {link.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}