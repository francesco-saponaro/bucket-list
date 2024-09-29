import styles from '../../index.module.scss'
import { useState } from 'react';
import clsx from 'clsx';
import { useAuthStore } from '@store/storeAuth';
import ModifyIcon from '@assets/icons/modify.svg';
import IconButton from '@core/IconButton';
import CheckIcon from '@assets/icons/check.svg';
import CrossIcon from '@assets/icons/cross.svg';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import Input from '@core/Input';
import useApiHoc from '@hooks/useApiHoc';

type FieldProps = {
    title: string;
    value: string;
    fieldName: string;
    validation: Yup.ObjectSchema<any, any, any, any>;
};

type FormValues = { [key: string]: string };

const Field: React.FC<FieldProps> = ({ title, value, fieldName, validation }) => {
    const apiHoc = useApiHoc();
    const { editUser, fetchUser } = useAuthStore();
    const [isModify, setIsModify] = useState(false);
    const initialValues = { [fieldName]: value };

    return (
        <div className={styles.modify__fields__field}>
            <div className={styles.modify__fields__field__title}>{title}</div>
            <div className={clsx(styles.card, styles.modify_card)}>
                {!isModify ?
                    <>
                        <div className={styles.modify_card__value}>{value}</div>
                        <IconButton icon={<ModifyIcon />} backgroundColor='#D9EEFF' onClick={() => setIsModify(true)} />
                    </>
                    :
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validation}
                        enableReinitialize={true}
                        onSubmit={async (values) => {
                            await apiHoc(() => editUser(values));
                            await apiHoc(() => fetchUser());
                            setIsModify(false);
                        }}
                    >
                        {({ values, setFieldValue, errors, touched, handleBlur, handleSubmit }
                            : FormikProps<FormValues>
                        ) => {
                            const inputProps = (name: string) => {
                                return {
                                    name: name,
                                    value: values[name],
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(name, e.target.value),
                                    onBlur: handleBlur(name),
                                    error: touched[name] && errors[name] ? errors[name] : '',
                                    isWhiteBackground: true

                                }
                            }

                            return (
                                <Form className={styles.form}>
                                    <Input
                                        {...inputProps(fieldName)}
                                        placeholder={title}
                                        showIcon={true}
                                        type={fieldName === "email" ? "email" : "text"}
                                    />
                                    <div className={styles.modify_card__ctas}>
                                        <IconButton icon={<CheckIcon />} type="success" onClick={() => handleSubmit()} buttonType='submit' />
                                        <IconButton icon={<CrossIcon />} type="reset" onClick={() => setIsModify(false)} />
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                }
            </div>
        </div>
    )
}

const Modify = () => {
    const { user } = useAuthStore();

    return (
        <div className={styles.modify__fields}>
            <Field title='Nome' value={user?.name || ""} fieldName="name" validation={Yup.object().shape({
                name: Yup.string().min(3, 'Troppo corto').required('Obbligatorio'),
            })
            } />
            <Field title='Cognome' value={user?.surname || ""} fieldName="surname" validation={Yup.object().shape({
                surname: Yup.string().min(3, 'Troppo corto').required('Obbligatorio'),
            })} />
            <Field title='E-mail' value={user?.email || ''} fieldName="email" validation={Yup.object().shape({
                email: Yup.string().email('Email non valida').required('Obbligatorio'),
            })} />
        </div>
    )
}

export default Modify