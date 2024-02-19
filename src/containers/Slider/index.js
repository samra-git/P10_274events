import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
 
  const { data } = useData();
  const [index, setIndex] = useState();
  const byDateDesc = data?.focus ? data?.focus.sort((evtA, evtB) =>
  // new Date(evtA) - new Date(evtB) // placement du plus récent au plus ancien
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1  
  ) : [];
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < (byDateDesc.length-1) ? index + 1 : 0), // erreur dans byDateDesc.length ajout de -1 
      5000 
    );
  };
// console.log(byDateDesc);
 
  useEffect(() => {
    nextCard();
  }, );

  


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.id}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.description} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((ev, radioIdx) => (
                <input
                  key={`${ev.id}`}  // key unique
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // erreur corrigée idx remplacée par index conformément au useState
                  readOnly
                  
                />
                
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;

