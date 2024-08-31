import ReactDOM from "react-dom";

const DomRender = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default DomRender;