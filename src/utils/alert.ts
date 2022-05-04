import { toast } from "react-toastify";

export function showAlert(type: "success" | "info" | "error" | "warning", message: string ) {
    toast[type](
        message
    )
};
