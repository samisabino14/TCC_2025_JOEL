import StarRating from "../../../../StarRating";
import { CompanyProps } from "..";


interface Props {
    handleRedirect: (company: CompanyProps) => void,
    company: CompanyProps
}


export const Company = ({ handleRedirect, company }: Props) => {

    return (
        <div
            onClick={() => handleRedirect(company)}
            className="flex text-sm items-center justify-start text-gray-800 gap-4 rounded-lg shadow-lg p-4"
        >
            <img
                src={company.image ? company.image : '/log_jobs.svg'}
                alt={`Logo da empresa ${company.name}`}
                className="w-[56px] h-14 md:h-10 md:w-[40px] lg:w-[40px] rounded-full border bg-white p-2"
            />
            <div>
                <p className="font-medium">{company.name}</p>
            </div>
        </div>
    )
}