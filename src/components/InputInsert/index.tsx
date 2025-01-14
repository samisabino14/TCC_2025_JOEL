import { AiFillInfoCircle } from "react-icons/ai"

export default function InputInsert({ info }) {
    return (
        <span className="flex text-xs items-center gap-1 text-amber-500">
            <AiFillInfoCircle className='' size={14} />
            <p className='md:text-xs text-xs text-red-500 md:py-2'>{info}</p>
        </span>
    )
}