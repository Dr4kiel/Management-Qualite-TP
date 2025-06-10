interface Client {
    id: number;
    nom: string;
    email: string;
    telephone: string;
}

interface ClientsTableProps {
    clients: Client[];
}

export const ClientsTable = ({ clients }: ClientsTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
                <thead>
                <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Téléphone
                    </th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{client.nom}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{client.telephone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};