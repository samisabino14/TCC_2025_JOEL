import { AiOutlineClose } from "react-icons/ai";

interface PopupProps {
    content: React.ReactNode; // Permite JSX em vez de apenas string
    header: string;
    size: string;
    onClose: () => void;

}

export function Popup({ content, header, size, onClose }: PopupProps) {

    const returnHour = (date: string) => {

        return `${new Date(date).getHours().toString().padStart(2, "0")}:${new Date(date).getMinutes().toString().padStart(2, "0")}`;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`bg-white p-6 rounded-lg shadow-lg ${size}`}>

                <div className="flex justify-between pb-10">
                    
                    <h2 className="text-lg font-semibold">{header}</h2>

                    <button
                        className="cursor-pointer p-2 bg-red-400 hover:bg-red-500 rounded-full transition duration-200"
                        onClick={onClose}
                    >
                        <AiOutlineClose className="w-4 h-4 text-white" />
                    </button>

                </div>

                <div className={`min-h-48 overflow-y-auto`} >
                    {content}
                </div>

            </div>
        </div>
    );
}
