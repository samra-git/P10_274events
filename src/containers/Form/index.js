import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";


const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 950); }) // setTime initialement à 1000 mais par défaut test à 1 sec donc

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
 
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // ajout pour afficher la modale du message
      } catch (err) {
        setSending(false);
        onError(err);
      } finally {
        setSending(false)
      
      }
    },
    [onSuccess, onError]
  );



  
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="Entrer votre nom" label="Nom" />
          <Field placeholder="Entrer votre prénom" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="Veuiller saisir votre email" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
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
