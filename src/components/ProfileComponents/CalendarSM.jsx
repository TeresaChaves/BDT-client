import useAbbreviatonDay from "../../utils/useAbbreviation";

function CalendarSM({ hours, blackBackgroung, cardList, disponibility }) {
  const getAbbreviation = useAbbreviatonDay();

  return (
    <>
      {disponibility?.map((el, index) => (
        <>
          <div className="calendar-container--sm">
            <div
              className="calendar_detail--sm"
              style={{ backgroundColor: blackBackgroung ? "black" : "white" }}>
              <span
                className="day_calendar--sm"
                style={{ color: blackBackgroung ? "white" : "black" }}>
                {getAbbreviation(el.day)}
              </span>
              <br />
              <span
                className="hours_calendar--sm"
                style={{ color: blackBackgroung ? "white" : "black" }}>
                {el.time}
              </span>
            </div>
          </div>
        </>
      ))}
      {cardList ? (
        <></>
      ) : (
        <>
          {" "}
          <div
            className="calendar_detail--sm"
            style={{
              backgroundColor: blackBackgroung ? "black" : "white",
            }}>
            <span
              className="day_calendar--sm"
              style={{ color: blackBackgroung ? "white" : "black" }}>
              {hours}
            </span>
            <br />
            <span
              className="calendar_detail-text_hours"
              style={{ color: blackBackgroung ? "white" : "black" }}>
              HORAS
            </span>
          </div>
        </>
      )}
    </>
  );
}
export default CalendarSM;
