import React, { useState } from "react";

import db from "../../db.json";
import styles from "./form.module.css";

let items = db.items;
let spliceLastItems = items.splice(3);
console.log(spliceLastItems[0]);

let select = spliceLastItems[0];
let options = select.options;

console.log(items);



const { styledForm } = styles;

export default function Form() {
  let initialState = {
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
    terms_and_conditions: false,
  };

  const getInputs = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const termsTrue = () => {
    setUserData({ ...userData, terms_and_conditions: true });
  };

  const guardarDatos = (e) => {
    console.log(userData);
    setUserData({ ...initialState });
    e.preventDefault();
  };

  const setCountry = (e) => {
    let valor = e.target.value;
    setUserData({ ...userData, country_of_origin: valor });
  };

  const [userData, setUserData] = useState(initialState);

  return (
    <form className={styledForm} id="userDataForm" onSubmit={guardarDatos}>
      <div>
        <h5>{select.label}</h5>
        <select name={select.name} onChange={setCountry}>
          {options.map((option) => {
            return (
              <option key={option.name} value={option.label} name={select.name}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>

      {items.map((input) => {
        return (
          <div>
            <h5>{input.label}</h5>
            {
              <input
                key={Number.toString()}
                type={input.type}
                label={input.label}
                name={input.name}
                id={input.name}
                onChange={getInputs}
                // value={userData.name}
              />
            }
          </div>
        );
      })}
      <h5>Aceptas términos y condiciones?</h5>
      <input type="checkbox" onChange={termsTrue} />
      <input type="submit"/>
    </form>
  );
}
