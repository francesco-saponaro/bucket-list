import Input from '@core/Input';
import PrimaryButton from '@core/PrimaryButton';
import styles from './index.module.scss';
import useApiHoc from '@hooks/useApiHoc';
import ROUTES from '@routes/constants';
import { Form, Formik, FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import useFirebase from '@hooks/useFirebase';

type FormValues = { email: string };

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const apiHoc = useApiHoc();
  const { auth } = useFirebase();

  const initialValues = { email: '' }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email non valida').required('Obbligatorio'),
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Registrati</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            apiHoc(() => sendPasswordResetEmail(auth, values.email.trim().toLowerCase()).then((result) => navigate(ROUTES.SIGN_IN)))
          }}
        >
          {({ values, setFieldValue, errors, touched, handleBlur, handleSubmit
          }
            : FormikProps<FormValues>
          ) => {
            const inputProps = (name: keyof FormValues) => {
              return {
                name: name,
                value: values[name],
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(name, e.target.value),
                onBlur: handleBlur(name),
                error: touched[name] && errors[name] ? errors[name] : ''
              }
            }

            return (
              <Form className={styles.form}>
                <Input
                  {...inputProps('email')}
                  placeholder="Inserisci l'email"
                  label={'Email'}
                  showIcon={true}
                  type='email'
                />
                <PrimaryButton
                  text={'Invia email'}
                  width='100%'
                  type='submit'
                  variety='primary'
                  margin='20px 0 0 0'
                  onClick={() => handleSubmit()}
                />
              </Form>
            )
          }}
        </Formik>
        <div>
          <span>Ti ricordi la password? </span>
          <span className={styles.link} onClick={() => navigate(ROUTES.SIGN_IN)}>Accedi</span>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword