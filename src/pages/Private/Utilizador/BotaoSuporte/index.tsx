import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdHelpOutline } from "react-icons/md"; // Ícone de ajuda

export const BotaoSuporte: React.FC = () => {
  const [aberto, setAberto] = useState(false);

  const toggleModal = () => {
    setAberto(!aberto);
  };

  return (
    <>
      {/* Botão flutuante circular com efeito */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-xl animate-bounce z-50 transition-transform duration-300"
        title="Suporte"
      >
        <MdHelpOutline className="w-6 h-6" />
      </button>

      {/* Modal de suporte */}
      {aberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white p-6 rounded-lg w-[40%] shadow-xl">
            <h2 className="text-lg font-semibold mb-2">Central de Suporte</h2>
            <p className="text-sm text-gray-700 mb-4">
              Como podemos ajudar você? Escreva sua dúvida abaixo:
            </p>

            <textarea
              rows={4}
              className="w-full border rounded p-2 text-sm mb-4"
              placeholder="Digite sua mensagem..."
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  toggleModal();
                  toast.success("Mensagem enviada com sucesso!");
                }}
                className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-400"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
