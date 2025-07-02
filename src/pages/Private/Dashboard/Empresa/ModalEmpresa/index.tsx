import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LocalidadeProps } from "../../Localidades";
import { api } from "../../../../../services/apiClient";

export function ModalEmpresa({ isOpen, onClose, empresaSelecionada, onRefresh }: any) {
  const [nome, setNome] = useState("");
  const [nif, setNif] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [localidade, setLocalidade] = useState(0);
  const [localidades, setLocalidades] = useState<LocalidadeProps[]>([]);

  useEffect(() => {
    carregarLocalidades();
    if (empresaSelecionada) {
      setNome(empresaSelecionada.nome);
      setNif(empresaSelecionada.nif);
      setEmail(empresaSelecionada.email);
      setTelefone(empresaSelecionada.telefone);
      setEndereco(empresaSelecionada.endereco);
      setLocalidade(empresaSelecionada.localidade);
    } else {
      resetarCampos();
    }
  }, [empresaSelecionada]);

  const carregarLocalidades = async () => {
    try {
      const response = await api.get("/localidades");
      setLocalidades(response.data);
    } catch {
      toast.error("Erro ao carregar localidades.");
    }
  };

  const resetarCampos = () => {
    setNome("");
    setNif("");
    setEmail("");
    setTelefone("");
    setEndereco("");
    setLocalidade(0);
  };

  const handleSalvar = async () => {
    if (!nome || !nif || !email || !localidade) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const empresa = {
      nome,
      nif,
      email,
      telefone,
      endereco,
      localidade,
    };

    try {
      if (empresaSelecionada) {
        await api.put(`/empresas/${empresaSelecionada.id_empresa}`, empresa);
        toast.success("Empresa atualizada com sucesso!");
      } else {
        console.log({empresa})
        await api.post("/empresas", empresa);
        toast.success("Empresa cadastrada com sucesso!");
      }
      onClose();
      onRefresh();
    } catch {
      toast.error("Erro ao salvar empresa.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">{empresaSelecionada ? "Editar Empresa" : "Nova Empresa"}</h2>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input placeholder="NIF" value={nif} onChange={e => setNif(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input placeholder="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <select value={localidade} onChange={e => setLocalidade(Number(e.target.value))} className="w-full p-2 border rounded mb-4">
          <option value={0}>Selecione a Localidade</option>
          {localidades.map(loc => (
            <option key={loc.id_localidade} value={loc.id_localidade}>{loc.nome}</option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
          <button onClick={handleSalvar} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
        </div>
      </div>
    </div>
  );
}
