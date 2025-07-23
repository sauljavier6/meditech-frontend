import { useQuery } from "@tanstack/react-query";
import { getBatch } from "../../../api/Post/BatchApi/BatchApi";

interface ModalCajasProps { 
  openCaja: (Lote:string) => void;
}

export interface User {
  ID_User: number;
  Name: string;
}

export interface Batch {
  ID_Batch: number;
  Lote: string;
  Date: Date;
  User: User;
  State: boolean;
}


const CajasList = ({ openCaja }: ModalCajasProps) => {

  const { data: batchsData } = useQuery({
    queryKey: ['batchs'],
    queryFn: getBatch,
  });

  const handleRowClick = (Lote:string) => {
    openCaja(Lote);
  };

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-5 py-2"><input type="checkbox" /></th>
            <th className="px-5 py-2">ID</th>
            <th className="px-5 py-2">Lote</th>
            <th className="px-10 py-2">Creado por</th>
            <th className="px-5 py-2">Fecha</th>
            <th className="px-5 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {batchsData?.map((batchsData:Batch) => (
            <tr key={batchsData.ID_Batch} className="border-t" onClick={() => handleRowClick(batchsData.Lote)}>
              <td className="px-5 py-2"><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
              <td className="px-5 py-2">{batchsData.ID_Batch}</td>
              <td className="px-5 py-2">{batchsData.Lote}</td>
              <td className="px-10 py-2">{batchsData.User.Name}</td>
              <td className="px-5 py-2">
                {batchsData.Date
                  ? new Date(batchsData.Date).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""}
              </td>
              <td className="px-5 py-2">{batchsData.State? "Activo": "Innactivo" }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CajasList;
