import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";


const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 950); }) // setTime initialement à 1s mais par défaut les tests  mettent 1 sec donc diminue le temps

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const formRef = useRef(); // ajout d'une référence 
 
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // ajout pour afficher la modale du message
        formRef.current.reset(); // réinitialisation du formulaire        
      } catch (err) {
        setSending(false);
        onError(err);
      } 
    },
    [onSuccess, onError]
  );



  
  return (
    <form ref={formRef} onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="Entrer votre nom" label="Nom" type={FIELD_TYPES.INPUT_TEXT} />
          <Field placeholder="Entrer votre prénom" label="Prénom"  type={FIELD_TYPES.INPUT_TEXT} />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            
            
          />
          <Field placeholder="Veuiller saisir votre email" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending} >
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
