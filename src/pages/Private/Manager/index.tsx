import {

    FormEvent,
    useState,

} from 'react';
import toast from 'react-hot-toast';
import { LayoutDashboard } from '../../../hooks/Private/LayoutDashboard';


function Manager() {

    const [search, setSearch] = useState("");

    const cards = [
        {
            id: 1,
            title: "1"
        },
        {
            id: 2,
            title: "2"
        },
        {
            id: 3,
            title: "3"
        }
    ]

    const handleSearch = async (e: FormEvent) => {

        e.preventDefault();

        toast.success(search)
    }

    return (
        <>
            <LayoutDashboard
                cards={cards}
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default Manager;
