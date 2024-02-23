import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";


const Slider = () => {
 
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1  
  ); 
  
  
// console.log(byDateDesc);
  
useEffect(() => {
const nextCard =
  setTimeout(
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0), // erreur dans byDateDesc.length ajout de -1 
      5000 
    );
    
    return () => clearTimeout(nextCard)
  });

      const goToSlide = (radioIdx) => {
      setIndex(radioIdx);
    };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        
          <div
            key={event.title}
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
           ))}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((ev, radioIdx) => (
                
                <input
                  key={ev.title}  // key unique
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // erreur corrigée idx remplacée par index conformément au useState
                  onChange={() => goToSlide(radioIdx)} 
                  readOnly
                  
                />
                
              ))}
            </div>
          </div>
        
     
    </div>
  );
};

export default Slider;



  
