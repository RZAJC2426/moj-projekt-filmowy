import React from "react"

export default function About() {
    return (
        <div className="page-container">
            <h2> O nas</h2>
            <p> PL: 
Jest to aplikacja filmowa, która działa poprzez połączenie się z bazą themoviedb.org. Zostały użyte narzędzia o następujących technologiach:
    <ol>
        <li>React</li>
        <li>Redux</li>
        <li>Formik</li>
        <li>Framer-motion</li>
        <li>emailjs</li>
        <li>yup</li>
        <li>css</li>
    </ol>
    Strona główna zawiera menu rozwijalne, gdzie zakładka gatunki rozwija się z listą gatunków filmów, a kontakt prowadzi do formularza utworzonego w formiku wraz z Recaptchą, po wypełnieniu którego wyświetla się komunikat z potwierdzeniem e-mail. 
    Zakładka about zawiera informacje o stronie i jego autora.<br/>
    Strona główna posiada karty plakatów filmów ułożone szeregowo, po wejściu których wyświetla się data premiery, ocena i opis filmu. Jest wyszukiwwarka, gdzie można wpisać konkretny tytuł filmu, a obok niej przy lewej stronie są ułożone trzy przyciski sortujące wg. wyświetleń, ocen czy nadchodzące. 
    Dla ułatwienia przeglądania strony jest przełącznik zmiany motywu na ciemny/jasny. 
    <br/>
Autor: Robert Zając 2025</p>
        </div>
    );
}

