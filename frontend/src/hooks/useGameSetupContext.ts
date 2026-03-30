import { useOutletContext } from 'react-router-dom';
import { type GameSetupContextType } from '../types/gameSetup.types';

export function useGameSetupContext() {
  const context = useOutletContext<GameSetupContextType>();
  if (!context) {
    throw new Error("useGameSetupContext doit être utilisé à l'intérieur d'une route enfant de GameSetupLayout");
  }

  return context;
}