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

const Form: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    country: "",
    city: "",
    universityType: "",
    accommodationType: "",
  });

  const accommodationTypes =
    formData.country === COUNTRIES.RF
      ? accommodationTypesForRF
      : accommodationTypesForRB;

  const handleCountryChange = (country: string) => {
    setFormData({
      ...formData,
      country,
    });
  };

  const handleCityChange = (city: string) => {
    setFormData({
      ...formData,
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
      />

      <Select
        title="Выберите город"
        onChange={handleCityChange}
        isDisabled={!formData.country}
        options={countryCities[formData.country]}
      />

      <Select
        title="Выберите вид ВУЗа"
        onChange={handleUniversityTypeChange}
        options={universityTypes}
      />

      <Select
        title="Выберите вариант проживания"
        onChange={handleAccommodationTypeChange}
        isDisabled={!formData.city}
        options={accommodationTypes}
      />

      <Button title="Отправить" isDisabled={isSubmitDisabled} />
    </div>
  );
};

export default Form;
