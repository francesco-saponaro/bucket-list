import Input from '@core/Input';
import PrimaryButton from '@core/PrimaryButton';
import styles from './index.module.scss';
import GoogleButton from '@common/GoogleButton';
import useApiHoc from '@hooks/useApiHoc';
import ROUTES from '@routes/constants';
import { Form, Formik, FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import useFirebase from '@hooks/useFirebase';

type FormValues = { email: string, pwd: string };

const Login: React.FC = () => {
  const navigate = useNavigate();
  const apiHoc = useApiHoc();
  const { auth } = useFirebase();

  const handleClick = (payload: any) => {
    apiHoc(() => signInWithEmailAndPassword(auth, payload.email, payload.pwd).then((userCredential) => {
      navigate(ROUTES.SELECT);
    }))
  }

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    apiHoc(() => signInWithPopup(auth, provider).then((result) => navigate(ROUTES.SELECT)))
  };

  const initialValues = { email: '', pwd: '' };
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email('Email non valida').required('Obbligatorio'),
    pwd: Yup.string().min(8, 'La password deve contenere almeno 8 caratteri').required('Obbligatorio'),
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Accedi</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            const payload = {
              ...values,
              email: values.email.trim().toLowerCase(),
            }
            handleClick(payload);
          }}
        >
          {({ values, setFieldValue, errors, touched, handleBlur, handleSubmit
          }
            : FormikProps<FormValues>
          ) => {
            const inputProps = (name: keyof FormValues) => {
              console.log(values, 'values')
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
                <Input
                  {...inputProps('pwd')}
                  placeholder='Inserisci la password'
                  label={'Password'}
                  showIcon={true}
                  type='password'
                />
                <PrimaryButton
                  text={'Registrati'}
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
        <div style={{ cursor: 'pointer' }} onClick={(e) => navigate(ROUTES.FORGOT_PWD)}>
          <span>Hai dimenticato la password? </span>
          <span className={styles.link}>Clicca qui</span>
        </div>
        <div className={styles.button} onClick={() => navigate(ROUTES.SIGN_UP)}>
          <span>Non hai un account? <span className={styles.link}>Registrati</span></span>
        </div>
        <GoogleButton onClick={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default Login;
