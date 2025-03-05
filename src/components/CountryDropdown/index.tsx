import { useEffect } from "react";
import axios from "axios";
import { GrDown, GrUp } from "react-icons/gr";
import { CountriesProps } from "../../pages/Guest/Register";


export type CountryProps = {
    name: {
        common: string
    };
    code: string;
    flags: {
        png: string
    }
    idd: {
        root: string;
        suffixes: string[];
    };
}


type NameProps = {
    name: string;
}

interface ComponentProps {
    name?: boolean
    code?: boolean
    countries: {
        name: string;
        code: string;
        flag: string;
    }[]
    setCountries: (countryData: {
        name: string;
        code: string;
        flag: string;
    }[]) => void
    selectedCountry: CountriesProps | null
    setSelectedCountry: (country: CountriesProps) => void
    isOpen: boolean
    setIsOpen: (item: boolean) => void
}


const CountryDropdown = ({ name, code, countries, setCountries, selectedCountry, setSelectedCountry, isOpen, setIsOpen }: ComponentProps) => {

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all?fields=name,idd,flags").then((response) => {
            const countryData = response.data.map((country: CountryProps) => ({
                name: country.name.common,
                code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
                flag: country.flags.png,
            }))
                .sort((a: NameProps, b: NameProps) => a.name.localeCompare(b.name)); // Ordenação alfabética;
            setCountries(countryData);

            /*
            // Definir Angola como país padrão
            const defaultCountry = countryData.find((c: NameProps) => c.name === "Angola");
            if (defaultCountry) {
                setSelectedCountry(defaultCountry);
            }
            */
        });
    });

    return (
        <div className="relative lg:w-38 w-full max-w-full">
            <div
                className={`border p-3 rounded-lg bg-white flex items-start w-full lg:w-52 justify-start cursor-pointer`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedCountry ? (
                    <div className="flex items-center justify-between gap-2 w-full">
                        <img src={selectedCountry.flag} alt={`Bandeira ${name && "de " && selectedCountry.name}`} className="w-6 h-4 rounded" />
                        <span>{name && selectedCountry.name} {code && (selectedCountry.code)}</span>
                        {isOpen ? <GrUp size={14} /> : <GrDown size={14} />}
                    </div>
                ) : (
                    <div className="flex items-center justify-between gap-2 w-full">
                        <span>Escolha um país</span>
                        <span className="transition-all">{isOpen ? <GrUp size={14} /> : <GrDown size={14} />}</span>
                    </div>
                )}
            </div>

            {isOpen && (
                <ul className={`absolute top-12 z-50 bg-white border rounded-lg shadow-lg max-h-60 w-52 overflow-auto`}>
                    {countries.map((country, index) => (
                        <li
                            key={index}
                            className="p-2 flex items-start gap-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                                setSelectedCountry(country);
                                setIsOpen(false);
                            }}
                        >
                            <img src={country.flag} alt={`Bandeira ${name && "de " && country.name}`} className="w-6 h-4 rounded" />
                            {name && country.name} {code && (country.name)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CountryDropdown;
