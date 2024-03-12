import React, { useState } from "react";
import Select from "../Select";
import {
  COUNTRIES,
  accommodationTypesForRB,
  accommodationTypesForRF,
  countriesOptions,
  countryCities,
  universityTypes,
} from "../../consts";
import { IFormData } from "../../interfaces";
import Button from "../Button";
import styles from "./Form.module.css";

const initialState = {
  country: "",
  city: "",
  universityType: "",
  accommodationType: "",
};

const Form: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>(initialState);

  const accommodationTypes =
    formData.country === COUNTRIES.RF
      ? accommodationTypesForRF
      : accommodationTypesForRB;

  const handleCountryChange = (country: string) => {
    setFormData({
      ...initialState,
      country,
    });
  };

  const handleCityChange = (city: string) => {
    setFormData({
      ...initialState,
      country: formData.country,
      city,
    });
  };

  const handleUniversityTypeChange = (universityType: string) => {
    setFormData({
      ...formData,
      universityType,
    });
  };

  const handleAccommodationTypeChange = (accommodationType: string) => {
    setFormData({
      ...formData,
      accommodationType,
    });
  };

  const isSubmitDisabled = Object.values(formData).some(
    (value) => value === ""
  );

  return (
    <div className={styles.container}>
      <Select
        title="Выберите страну"
        onChange={handleCountryChange}
        options={countriesOptions}
        value={formData.country}
      />

      <Select
        title="Выберите город"
        onChange={handleCityChange}
        isDisabled={!formData.country}
        options={countryCities[formData.country]}
        value={formData.city}
      />

      <Select
        title="Выберите вид ВУЗа"
        isDisabled={!formData.city}
        onChange={handleUniversityTypeChange}
        options={universityTypes}
        value={formData.universityType}
      />

      <Select
        title="Выберите вариант проживания"
        onChange={handleAccommodationTypeChange}
        isDisabled={!formData.universityType}
        options={accommodationTypes}
        value={formData.accommodationType}
      />

      <Button title="Отправить" isDisabled={isSubmitDisabled} />
    </div>
  );
};

export default Form;
