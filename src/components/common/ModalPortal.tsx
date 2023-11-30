import { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const el = document.getElementById('modal') as HTMLElement;

  return ReactDom.createPortal(children, el);
};

export default ModalPortal;
