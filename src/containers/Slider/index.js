// import { useEffect, useState } from "react";
// import { useData } from "../../contexts/DataContext";
// import { getMonth } from "../../helpers/Date";

// import "./style.scss";

// const Slider = () => {
 
//   const { data } = useData();
//   const [index, setIndex] = useState();
//   const byDateDesc = data?.focus ? data?.focus.sort((evtA, evtB) =>
//     new Date(evtA.date) > new Date(evtB.date) ? 1 : -1  // placement du plus récent au plus ancien
//   ) : [];
//   const nextCard = () => {
//     setTimeout(
//       () => setIndex(index > (byDateDesc.length-1) ? index + 1 : 0), // erreur dans byDateDesc.length ajout de -1 
//       5000 
//     );
//   };
// // console.log(byDateDesc);
 
//   useEffect(() => {
//     nextCard();
//   }, );
//   return (
//     <div className="SlideCardList">
//       {byDateDesc?.map((event, idx) => (
//         <>
//           <div
//             key={event.id}
//             className={`SlideCard SlideCard--${
//               index === idx ? "display" : "hide"
//             }`}
//           >
//             <img src={event.cover} alt={event.description} />
//             <div className="SlideCard__descriptionContainer">
//               <div className="SlideCard__description">
//                 <h3>{event.title}</h3>
//                 <p>{event.description}</p>
//                 <div>{getMonth(new Date(event.date))}</div>
//               </div>
//             </div>
//           </div>
//           <div className="SlideCard__paginationContainer">
//             <div className="SlideCard__pagination">
//               {byDateDesc.map((_, radioIdx) => (
//                 <input
//                   key={_.date}  // key unique
//                   type="radio"
//                   name="radio-button"
//                   checked={index === radioIdx} // erreur corrigée idx remplacée par index conformément au useState
//                 />
                
//               ))}
//             </div>
//           </div>
//         </>
//       ))}
//     </div>
//   );
// };

// export default Slider;


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

  const goToSlide = (radioIdx) => {
    setIndex(radioIdx);
  };

  useEffect(() => {
    const nextCard = setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
    return () => clearTimeout(nextCard);
  });

  // besoin de generer une key au hasard :
  const newId = () => Math.random();

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
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
          {byDateDesc?.map((evt, radioIdx) => (
            <input
              key={newId()}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => goToSlide(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
