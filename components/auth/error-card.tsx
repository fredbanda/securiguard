import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FaExclamationTriangle } from "react-icons/fa";


export const ErrorCard = () => {
  return (
    <CardWrapper
    headerLabel="Oops! Something went wrong"
    backButtonHref="/auth/login"
    backButtonLabel="Back to login"
    >

        <div className="w-full flex justify-center items-center">
            <FaExclamationTriangle className="text-red-500 text-6xl" />
        </div>

    </CardWrapper>
  );
};
