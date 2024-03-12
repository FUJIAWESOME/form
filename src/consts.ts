import { ICountryCities } from "./interfaces";

export const COUNTRIES = {
  RF: "РФ",
  RB: "РБ",
};

export const countryCities: ICountryCities = {
  РБ: ["Минск", "Гомель"],
  РФ: ["Москва", "Сочи"],
};

export const countriesOptions = ["РФ", "РБ"];

export const universityTypes = ["Технический", "Гуманитарный"];

export const accommodationTypesForRF = [
  "Общежитие",
  "Аренда",
  "Не интересует",
  "Общежития + Аренда",
];

export const accommodationTypesForRB = ["Общежитие", "Не интересует"];
