import { useStoreError } from "@store/storeError";
import { useEffect } from "react";
import alertToast from "@core/AlertToast";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';

export default () => {
  const { error, clearError } = useStoreError();
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      const errorMessagesToAvoid = [""];
      if (errorMessagesToAvoid.includes(error) || typeof error === "object") {
        return;
      }

      alertToast(
        "error", // type
        t(`errors.${error}`, { defaultValue: "C'è stato un problema, riprova più tardi o contatta l'assistenza." }), // title
        clearError
      );
    }
  }, [error]);

  return <ToastContainer />;
};























// type ToastType = "error" | "success" | "warning";

// interface ErrorInfo {
//   title: string;
//   subtitle: string;
//   type: ToastType;
// }



// const selectError = (error: string | null): ErrorInfo => {
//   switch (error) {
//     case "OTP non valido o scaduto.":
//       return {
//         title: "OTP non valido o scaduto",
//         subtitle: "",
//         type: "error",
//       };
//     case "Credenziali non valide.":
//       return {
//         title: "Credenziali non valide.",
//         subtitle: "",
//         type: "error",
//       };
//     case "L'email è già in uso.":
//       return {
//         title: "L'email è già in uso",
//         subtitle: "",
//         type: "error",
//       };
//     case "Non autorizzato.":
//       return {
//         title: "Non autorizzato",
//         subtitle: "",
//         type: "error",
//       };
//     case "Sessione non trovata.":
//       return {
//         title: "Sessione non trovata",
//         subtitle: "",
//         type: "error",
//       };
//     case "Nessun documento trovato.":
//       return {
//         title: "Nessun documento trovato",
//         subtitle: "",
//         type: "error",
//       };
//     case "Richiesta non valida.":
//       return {
//         title: "Richiesta non valida",
//         subtitle: "",
//         type: "error",
//       };
//     case "OTP non valido o scaduto.":
//       return {
//         title: "OTP non valido o scaduto",
//         subtitle: "",
//         type: "error",
//       };
//     case "OTP non valido o scaduto.":
//       return {
//         title: "OTP non valido o scaduto",
//         subtitle: "",
//         type: "error",
//       };
//     default:
//       return {
//         title: "Messaggio di errore per la foto non caricata correttamente",
//         subtitle: "",
//         type: "error",
//       };
//   }
// };


// const errorInfo = selectError(error);
// alertToast(
//   errorInfo.type,
//   errorInfo.title,
//   errorInfo.subtitle,
//   clearError
// );