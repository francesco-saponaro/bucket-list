import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, FormikProps } from 'formik';
import Input from '@core/Input';
import PrimaryButton from '@core/PrimaryButton';
import styles from './index.module.scss';
import { useAuthStore } from '@store/storeAuth';
import { useObjectivesStore } from '@store/storeObjectives';
import { useStoreLoader } from '@store/storeLoader';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useFirebase from '@hooks/useFirebase';
import ROUTES from '@routes/constants';
import alertToast from "@core/AlertToast";

type FormValues = { objective: string };

function ObjectiveForm() {
    const navigate = useNavigate();
    const { setLoaderQuery, stopLoader, startLoader } = useStoreLoader();
    const { objectives, setObjectives, fetchSearchResults } = useObjectivesStore();
    const initialValues = { objective: '' };
    const { user } = useAuthStore();
    const { db } = useFirebase();
    console.log(user, 'user')
    console.log(objectives, 'objectives')

    useEffect(() => {
        if (user && db) {
            const fetchObjectives = async () => {
                const userDocRef = doc(db, 'users', user.uid); // Reference to the user's document
                const docSnap = await getDoc(userDocRef); // Fetch the user's document from Firestore

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setObjectives(data.selected || []); // Populate state with Firestore data if it exists
                }
            };

            fetchObjectives();
        }
    }, [user, db]);

    const handleFinalSubmit = async () => {
        if (user && db) {

            setLoaderQuery(true);
            startLoader();

            try {
                const userDocRef = doc(db, 'users', user.uid); // Reference to the user's document
                await setDoc(userDocRef, { selected: objectives }); // Update Firestore document with selected objectives

                fetchSearchResults(objectives, (results) => {
                    console.log('Search results fetched');
                    if (!results.length) {
                        alertToast(
                            "error",
                            "No results found",
                        );
                    } else {
                        navigate(ROUTES.HOME);
                    }

                    stopLoader();
                    setLoaderQuery(false);
                });
            } catch (error) {
                console.error('Error saving objectives:', error);
                stopLoader();
                setLoaderQuery(false);
            }
        }
    };

    const handleRemoveObjective = (indexToRemove: number) => {
        setObjectives(objectives.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={(values, { resetForm }) => {
                        if (values.objective.trim() !== '') {
                            setObjectives([...objectives, values.objective]);
                            resetForm();
                        }
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
                                <div className={styles.inputContainer}>
                                    <Input
                                        {...inputProps('objective')}
                                        placeholder="Aggiungi un obiettivo"
                                        type='text'
                                    />
                                    <button
                                        type="submit"
                                        className={styles.addButton}
                                        onClick={() => handleSubmit()}
                                        aria-label="Add objective"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className={styles.objectiveList}>
                                    {objectives.map((obj, index) => (
                                        <div key={index} className={styles.card}>
                                            <span className={styles.cardText}>{obj}</span>
                                            <button
                                                className={styles.removeButton}
                                                onClick={() => handleRemoveObjective(index)}
                                                aria-label="Remove objective"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Form>
                        )
                    }}
                </Formik>

                {objectives.length > 0
                    ? (
                        <PrimaryButton
                            text={'Sottometti'}
                            width='100%'
                            type='submit'
                            variety='primary'
                            margin='20px 0 0 0'
                            onClick={() => handleFinalSubmit()}
                        />
                    )
                    : null}
            </div>
        </div>
    );
}

export default ObjectiveForm;
