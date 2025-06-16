import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";


const contactSchema = Yup.object().shape({
    name: Yup.string().required("Imię jest wymagane"),
    email: Yup.string().email("Niepoprawny email").required("Email jest wymagany"),
    message: Yup.string().min(10, "Wiadomość musi mieć conajmniej 10 znaków").required("Wiadomość jest wymagana"),
});

 const Contact= () => {
    const recaptchaRef = useRef();

    const handleSubmit = async (values, actions) => {
        try {
            const token = await recaptchaRef.current?.executeAsync();
            recaptchaRef.current.reset();

            if (!token) throw new Error("Nie udało się uzyskać tokenu reCAPTCHA");

            const payload = {
                ...values,
                "g-recaptcha-response": token,
            };

            console.log("wysyłam dane do emailJS:", payload);

            await emailjs.send(
                process.env.REACT_APP_EMAILJS_SERVICE,
                process.env.REACT_APP_EMAILJS_TEMPLATE,
                payload,
                process.env.REACT_APP_EMAILJS_USER,
            );

            alert("Wiadomość wysłana. Sprawdź email w celu potwierdzenia!");
            actions.resetForm();
        }   catch(error) {
            console.error("błąd wysłania:", error);
            if (error instanceof Error) {
            alert(`Wystąpił błąd, spróbuj ponownie. ${error.message}`);
            } else {
                alert("wystąpił nieznany błąd");
            }
        }   finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="page-container">
            <h2>Kontakt</h2>
            <Formik
            initialValues={{name: "", email: "", message:""}}
            validationSchema={contactSchema}
            onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="contact-form">
                        <label htmlFor="name">Imię</label>
                        <Field name="name" type="text"/>
                        <ErrorMessage name="name" component="div" className="error"/>

                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email"/>
                        <ErrorMessage name="email" component="div" className="error"/>

                        <label htmlFor="message">Wiadomość</label>
                        <Field as="textarea" name="message" rows="5"/>
                        <ErrorMessage name="message" component="div" className="error"/>

                        <button type="submit" disabled={isSubmitting}>
                            Wyślij
                            </button>

                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                            />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Contact;