'use client';

import { GameProvider, useGame } from '@/contexts/GameContext';
import { GameScreen } from '@/components/game/GameScreen';
import { TitleScreen } from '@/components/game/TitleScreen';

function GameContent() {
  const { isTitleScreen } = useGame();
  
  return isTitleScreen ? <TitleScreen /> : <GameScreen />;
}

export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
