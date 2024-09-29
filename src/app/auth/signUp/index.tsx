import Input from '@core/Input';
import PrimaryButton from '@core/PrimaryButton';
import styles from './index.module.scss';
import useApiHoc from '@hooks/useApiHoc';
import GoogleButton from '@common/GoogleButton';
import ROUTES from '@routes/constants';
import { Form, Formik, FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import useFirebase from '@hooks/useFirebase';
import { doc, setDoc } from 'firebase/firestore';

type FormValues = { email: string, pwd: string };

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const apiHoc = useApiHoc();
  const { auth, db } = useFirebase();

  // Function to create a new Firestore document for the user
  const createUserDocument = async (userId: string) => {
    const userDocRef = doc(db, 'users', userId); // Reference to Firestore document with userId as the document ID
    const initialData = { selected: [] }; // Initial data, could be an empty array or some default value
    await setDoc(userDocRef, initialData); // Create a new document in Firestore
  };

  const handleClick = (payload: any) => {
    apiHoc(() => createUserWithEmailAndPassword(auth, payload.email, payload.pwd).then(async (userCredential) => {
      const userId = userCredential.user.uid; // Get the user's uid
      await createUserDocument(userId); // Create Firestore document with the uid
      navigate(ROUTES.SELECT);
    }))
  }

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    apiHoc(() =>
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const userId = result.user.uid; // Get the user's uid from Google login
          await createUserDocument(userId); // Create Firestore document with the uid
          navigate(ROUTES.SELECT); // Navigate after successful sign up
        })
    );
  };

  const initialValues = { email: '', pwd: '' };
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email('Email non valida').required('Obbligatorio'),
    pwd: Yup.string().min(8, 'La password deve contenere almeno 8 caratteri').required('Obbligatorio'),
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
        <div>
          <span>Sei già registrato? </span>
          <span className={styles.link} onClick={() => navigate(ROUTES.SIGN_IN)}>Accedi</span>
        </div>
        <GoogleButton onClick={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default SignUp;
