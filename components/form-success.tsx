import { FaExclamationTriangle, FaGlassCheers } from "react-icons/fa";

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({message}: FormSuccessProps) => {
    if(!message) return null;

    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 text-[16px]" >
            <FaGlassCheers className="w-5 h-5 text-destructive" />
            <p>{message}</p>
        </div>
    )
}