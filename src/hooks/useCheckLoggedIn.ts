import { useContext } from "react";
import { CheckLoggedInContext } from "../context/CheckLoggedInContext";
export const useCheckLoggedIn = () => {
    const context = useContext(CheckLoggedInContext);
    if (!context) {
        throw new Error("useCheckLoggedIn must be used within a CheckLoggedInProvider");
    }
    return context;
};