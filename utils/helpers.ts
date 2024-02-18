import moment from "moment";

export const findHoroscope = (dateString: string) => {
  const signs = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];

  const month = parseInt(moment(dateString).format("M")) - 1;
  const day = parseInt(moment(dateString).format("D"));

  if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 1 && day >= 19) || (month === 2 && day <= 20)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 2 && day >= 21) || (month === 3 && day <= 19)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 22)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 6 && day >= 23) || (month === 7 && day <= 22)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 21)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 10 && day >= 22) || (month === 11 && day <= 21)) return signs[month - 1 < 0 ? 0 : month - 1];
  if ((month === 11 && day >= 22) || (month === 0 && day <= 19)) return signs[month - 1 < 0 ? 0 : month - 1];

  return "";
}