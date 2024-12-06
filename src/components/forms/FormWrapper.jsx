import "../../stylesheets/form.css";

function FormWrapper({ children }) {
  return <form className="form">{children}</form>;
}

export default FormWrapper;
