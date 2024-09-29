import { useTranslation } from 'react-i18next';

type TranslatorProps = {
    path: string;
}

const Translator: React.FC<TranslatorProps> = ({ path }) => {
    const { t } = useTranslation();
    return t(path);
};

export default Translator;