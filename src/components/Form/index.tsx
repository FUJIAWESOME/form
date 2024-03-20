import React, { useState } from "react";
import Select from "../Select";
import {
  COUNTRIE,
  SELECTOR_TYPE,
  accommodationOptionsForRussia,
  accommodationOptionsForBelarus,
  countriesOptions,
  universityOptions,
  citiesFromRussia,
  citiesFromBelarus,
  universityOptionsSochi,
  CITY,
  UNIVERSITY_TYPE,
  technolohyFacultyOptions,
  humantiesFacultyOptions,
  SEQUENCE_NUMBER,
} from "../../consts";
import Button from "../Button";
import styles from "./Form.module.css";
import { IFormData, IFormValue } from "../../interfaces";

const initialState = [
  {
    sequenceNumber: SEQUENCE_NUMBER.FIRST,
    selectorName: SELECTOR_TYPE.COUNTRY,
    value: "",
    isVisibleNext: false,
  },
  {
    sequenceNumber: SEQUENCE_NUMBER.SECOND,
    selectorName: SELECTOR_TYPE.CITY,
    value: "",
    isVisibleNext: false,
  },
  {
    sequenceNumber: SEQUENCE_NUMBER.THIRD,
    selectorName: SELECTOR_TYPE.UNIVERSITY_TYPE,
    value: "",
    isVisibleNext: false,
  },
  {
    sequenceNumber: SEQUENCE_NUMBER.FOURTH,
    selectorName: SELECTOR_TYPE.ACCOMMODATION_TYPE,
    value: "",
    isVisibleNext: false,
  },
  {
    sequenceNumber: SEQUENCE_NUMBER.FIFTH,
    selectorName: SELECTOR_TYPE.FACULTY,
    value: "",
    isVisibleNext: false,
  },
];

const Form: React.FC = () => {
  const [formData, setFormData] = useState<Array<IFormData>>(initialState);

  const formValues = formData.reduce<IFormValue>((acc, item: IFormData) => {
    acc[item.selectorName] = {
      value: item.value,
      isVisibleNext: item.isVisibleNext,
    };
    return acc;
  }, {});

  const accommodationOptions =
    formValues.country?.value === COUNTRIE.RUSSIAN_FEDERADITON
      ? accommodationOptionsForRussia
      : accommodationOptionsForBelarus;

  const citiesOptions =
    formValues.country?.value === COUNTRIE.RUSSIAN_FEDERADITON
      ? citiesFromRussia
      : citiesFromBelarus;

  const currentUniversityOptions =
    formValues.city?.value === CITY.SOCHI
      ? universityOptionsSochi
      : universityOptions;

  const facultyOptions =
    formValues.universityType?.value === UNIVERSITY_TYPE.TECHNICAL
      ? technolohyFacultyOptions
      : humantiesFacultyOptions;

  const getNewFormData = (
    selectorName: string,
    newValue: string,
    sequenceNumber: number
  ) => {
    const newFormData = formData.map((item) => {
      const currentSequenceNumber = item.sequenceNumber;
      const currentSelectorName = item.selectorName;
      if (currentSelectorName === selectorName) {
        return {
          ...item,
          value: newValue,
          isVisibleNext: !!newValue,
        };
      } else if (currentSequenceNumber > sequenceNumber) {
        return {
          ...item,
          value: "",
          isVisibleNext: false,
        };
      } else {
        return item;
      }
    });

    return newFormData;
  };

  const handleCountryChange = (value: string) => {
    const newFormData = getNewFormData(
      SELECTOR_TYPE.COUNTRY,
      value,
      SEQUENCE_NUMBER.FIRST
    );
    setFormData(newFormData);
  };

  const handleCityChange = (value: string) => {
    const newFormData = getNewFormData(
      SELECTOR_TYPE.CITY,
      value,
      SEQUENCE_NUMBER.SECOND
    );
    setFormData(newFormData);
  };

  const handleUniversityTypeChange = (value: string) => {
    const newFormData = getNewFormData(
      SELECTOR_TYPE.UNIVERSITY_TYPE,
      value,
      SEQUENCE_NUMBER.THIRD
    );
    setFormData(newFormData);
  };

  const handleAccommodationTypeChange = (value: string) => {
    const newFormData = getNewFormData(
      SELECTOR_TYPE.ACCOMMODATION_TYPE,
      value,
      SEQUENCE_NUMBER.FOURTH
    );
    setFormData(newFormData);
  };

  const handleFacultyTypeChange = (value: string) => {
    const newFormData = getNewFormData(
      SELECTOR_TYPE.FACULTY,
      value,
      SEQUENCE_NUMBER.FIFTH
    );
    setFormData(newFormData);
  };

  const isSubmitDisabled = Object.values(formValues).some(
    (item) => item.value === ""
  );

  return (
    <div className={styles.container}>
      <Select
        title="Выберите страну"
        onChange={handleCountryChange}
        options={countriesOptions}
        value={formValues.country?.value}
      />

      <Select
        title="Выберите город"
        onChange={handleCityChange}
        isDisabled={!formValues.country?.isVisibleNext}
        options={citiesOptions}
        value={formValues.city?.value}
      />

      <Select
        title="Выберите вид ВУЗа"
        isDisabled={!formValues.city?.isVisibleNext}
        onChange={handleUniversityTypeChange}
        options={currentUniversityOptions}
        value={formValues.universityType?.value}
      />

      <Select
        title="Выберите вариант проживания"
        onChange={handleAccommodationTypeChange}
        isDisabled={!formValues.universityType?.isVisibleNext}
        options={accommodationOptions}
        value={formValues.accommodationType?.value}
      />

      <Select
        title="Выберите факультет"
        onChange={handleFacultyTypeChange}
        isDisabled={!formValues.accommodationType?.isVisibleNext}
        options={facultyOptions}
        value={formValues.faculty?.value}
      />

      <Button title="Отправить" isDisabled={isSubmitDisabled} />
    </div>
  );
};

export default Form;
