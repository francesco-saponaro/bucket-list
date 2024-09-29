import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toastify.scss";
import styles from "./AlertToast.module.scss";

interface CustomToastProps {
  type: "error" | "success" | "warning";
  header: string;
  subheader?: string;
}

const typesMapping = {
  success: {
    progressClass: "progress-bar-success",
  },
  warning: {
    progressClass: "progress-bar-warning",
  },
  error: {
    progressClass: "progress-bar-error",
  },
}

const CustomToast: React.FC<CustomToastProps> = ({ type, header, subheader }) => (
  <div className={styles.custom_toast}>
    <div className={styles.custom_toast__header}>
      <div className={styles.custom_toast__header__text}>{header}</div>
    </div>
  </div>
);

const alertToast = (type: "error" | "success" | "warning", header: string, callback?: () => void) => {
  toast(<CustomToast type={type} header={header} />, {
    progressClassName: typesMapping[type].progressClass,
    autoClose: 5000,
    onClose: callback,
  });
};

export default alertToast;
