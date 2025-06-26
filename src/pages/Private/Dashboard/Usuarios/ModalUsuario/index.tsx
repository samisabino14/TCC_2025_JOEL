import React, { useState, useEffect } from "react";
import { UsuarioProps } from "..";
import CountryDropdown from "../../../../../components/CountryDropdown";
import { CountriesProps, Locality } from "../../../../Guest/Register";
import { ErrorResponse } from "../../../../../App";
import { api } from "../../../../../services/apiClient";
import toast from "react-hot-toast";


type ModalProps = {
  usuario: UsuarioProps | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (usuarioAtualizado: UsuarioProps) => void;
};

export const ModalUsuario: React.FC<ModalProps> = ({ usuario, isOpen, onClose, onSave }) => {

  const [dadosUsuario, setDadosUsuario] = useState<UsuarioProps>({
    id_pessoa: 0,
    nome: "",
    localidade: 0,
    bairro: "",
    rua: "",
    bilhete_identidade: "",
    email: "",
    telefone: "",
    genero: "",
    data_nascimento: "",
    id_usuario: 0,
    tipo_usuario: "",
  });
  const [countries, setCountries] = useState<CountriesProps[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; code: string; flag: string } | null>(null);
  const [selectedNationality, setSelectedNationality] = useState<{ name: string; code: string; flag: string } | null>(null);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpenNacionality, setIsOpenNacionality] = useState(false);
  const [provinces, setProvinces] = useState<Locality[]>([]);
  const [municipalities, setMunicipalities] = useState<Locality[]>([]);
  const [provinceSelected, setProvinceSelected] = useState<string | null>(provinces[0]?.id_localidade);
  const [localityId, setLocalityId] = useState("");


  useEffect(() => {
    if (usuario) {
      setDadosUsuario(usuario); // Se for edição, preenche os campos com os dados do usuário
    } else {
      setDadosUsuario({
        id_pessoa: 0,
        nome: "",
        localidade: 0,
        bairro: "",
        rua: "",
        bilhete_identidade: "",
        email: "",
        telefone: "",
        genero: "",
        data_nascimento: "",
        id_usuario: 0,
        tipo_usuario: "",
      }); // Se for novo usuário, deixa os campos vazios
    }
  }, [usuario]);

  useEffect(() => {

    if (usuario !== null) return;

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

  }, [usuario]);
  useEffect(() => {
    if (usuario !== null) return;

    setProvinceSelected(provinces[0]?.id_localidade)
  }, [provinces, usuario]);

  useEffect(() => {
    if (usuario !== null) return;

    setLocalityId(municipalities[0]?.id_localidade)
  }, [municipalities, usuario]);

  useEffect(() => {
    if (usuario !== null) return;

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
  }, [provinceSelected, usuario])

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDadosUsuario({ ...dadosUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(dadosUsuario);
    onClose();
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[36vw] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{usuario ? "Editar Usuário" : "Novo Usuário"}</h2>
        <div className="space-y-3">
          <label className="block">
            <span className="text-gray-700">Nome Completo</span>
            <input
              type="text"
              name="nome"
              value={dadosUsuario.nome}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">E-mail</span>
            <input
              type="email"
              name="email"
              value={dadosUsuario.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>


          {usuario ?


            <label className="block mt-1">
              <span className="text-gray-700">Telefone</span>

              <input
                type="text"
                name="telefone"
                value={dadosUsuario.telefone}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
              />
            </label>

            :
            <div>
              <div>
                <span className="text-gray-700">Telefone</span>

                <div className='flex gap-2 items-center mt-1 rounded-lg w-full bg-white'>
                  <CountryDropdown
                    code={true}
                    countries={countries}
                    setCountries={setCountries}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    isOpen={isOpen2}
                    setIsOpen={setIsOpen2}
                  />
                  <label className="block w-[50vw]">
                    <input
                      type="text"
                      name="telefone"
                      placeholder="Número de telefone"
                      value={dadosUsuario.telefone}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-md"
                    />
                  </label>
                </div>

              </div>
              <div className="mt-1">
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

                  <label className="block w-[50vw]">
                    <input
                      type="text"
                      name="bilhete_identidade"
                      placeholder="Bilhete de identidade"
                      value={dadosUsuario.bilhete_identidade}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-md"
                    />
                  </label>
                </div>


              </div>

            </div>

          }

          <div className="grid grid-cols-2 gap-1">

            <label className="block">
              <span className="text-gray-700">Gênero</span>
              <select
                name="genero"
                value={dadosUsuario.genero}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              >
                <option value="">Selecione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </label>

            <label className="block w-full">
              <span className="text-gray-700">Data de Nascimento</span>
              <input
                type="date"
                name="data_nascimento"
                value={dadosUsuario.data_nascimento ? dadosUsuario.data_nascimento.split("T")[0] : ""}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-gray-700">Tipo de Usuário</span>
            <select
              name="tipo_usuario"
              value={dadosUsuario.tipo_usuario}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="">Selecione...</option>
              <option value="Usuário">Usuário</option>
              <option value="Gestor">Gestor</option>
              <option value="Administrador">Administrador</option>
            </select>
          </label>

          {!usuario &&
            <>

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
            </>
          }
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            {usuario ? "Salvar Alterações" : "Criar Usuário"}
          </button>
        </div>
      </div>
    </div >
  );
};
