const dayMap = {
  Lunes: "Lun",
  Martes: "Mar",
  Miércoles: "Mié",
  Jueves: "Jue",
  Viernes: "Vier",
  Sábado: "Sáb",
  Domingo: "Dom",
};

export default function useAbbreviatonDay() {
  const getAbbreviation = (day) => {
    return dayMap[day] || day;
  };
  return getAbbreviation;
}
