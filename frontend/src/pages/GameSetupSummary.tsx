import Button from "../components/ui/Button"
import { useGameSetupContext } from "../hooks/useGameSetupContext"

const GameSetupSummary = () => {

    const {submitSetup} = useGameSetupContext()

  return (
    <Button onClick={submitSetup}>Créer la partie</Button>
  )
}

export default GameSetupSummary