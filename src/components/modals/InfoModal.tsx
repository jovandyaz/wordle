import { MAX_CHALLENGES } from "@/globals/constants/settings";
import { Cell } from "../grid/Cell";
import { BaseModal } from "./BaseModal";

interface InfoModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const InfoModal = ({ isOpen, handleClose }: InfoModalProps) => {
  return (
    <BaseModal title="Cómo jugar" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {`Adivina la palabra oculta en ${MAX_CHALLENGES} intentos. Cada intento debe ser una
        palabra válida de 5 letras. Después de cada intento el color de las
        letras cambia para mostrar qué tan cerca estás de acertar la palabra.`}
      </p>

      <p className="text-sm text-black dark:text-white font-bold text-left pl-4">
        Ejemplos
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="G"
          status="correct"
        />
        <Cell value="A" isCompleted={true} />
        <Cell value="T" isCompleted={true} />
        <Cell value="O" isCompleted={true} />
        <Cell value="S" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La letra G está en la palabra y en la posición correcta.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="V" isCompleted={true} />
        <Cell value="O" isCompleted={true} />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="C"
          status="present"
        />
        <Cell value="A" isCompleted={true} />
        <Cell value="L" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La letra C está en la palabra pero en la posición incorrecta.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="C" isCompleted={true} />
        <Cell value="A" isCompleted={true} />
        <Cell value="N" isCompleted={true} />
        <Cell value="T" isCompleted={true} />
        <Cell isRevealing={true} isCompleted={true} value="0" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La letra O no está en la palabra.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-5">
        Puede haber letras repetidas. Las pistas son independientes para cada
        letra.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-5">
        ¡Una palabra nueva cada 5 minutos!
      </p>
      <button
        className="mt-5 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 text-white border-green-500 px-4 py-2 text-center text-sm font-medium shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
        onClick={handleClose}
      >
        Jugar
      </button>
    </BaseModal>
  );
};
