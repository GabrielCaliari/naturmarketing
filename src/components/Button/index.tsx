import { ButtonHTMLAttributes, ReactNode } from "react"
import { trackButtonClick } from '@/lib/analytics';

import * as S from './styles';

type Props = {
  children: ReactNode
  isLoading?: boolean;
  trackName?: string; // Nome do botão para rastreamento
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  isLoading,
  trackName,
  ...props
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Envia evento de tracking se trackName estiver definido
    if (trackName) {
      trackButtonClick(trackName);
    }
    
    // Chama o onClick original se existir
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <S.Button
      {...props}
      onClick={handleClick}
      disabled={isLoading || props.disabled} // Desabilita quando carregando
      className={`${isLoading ? 'cursor-not-allowed opacity-50' : ''} ${props.className}`}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> // Spinner usando Tailwind
      ) : (
        children
      )}
    </S.Button>
  )
}

export { Button };
