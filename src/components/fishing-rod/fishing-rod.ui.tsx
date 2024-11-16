import { twMerge } from 'tailwind-merge';
import { Box } from '../building/box';
import { FishingRodBlueprint } from './fishing-rod.blueprint';
import { FishingRodIcon } from './fishing-rod.icon';
import './fishing-rod.css';

export const FishingRodUI = () => {
  const { state, handleClick, fishingRodRef } = FishingRodBlueprint();

  return (
    <Box
      className={twMerge(
        'p-10 rounded-full cursor-pointer w-[200px] h-[200px] animate-glow transition-colors ',
        state.status === 'idle' && 'fishing-rod-idle',
        state.status === 'fishing' && 'fishing-rod-fishing',
        state.status === 'baiting' && 'fishing-rod-baiting',
        state.status === 'reeling' && 'fishing-rod-reeling',
        state.status === 'failed' && 'fishing-rod-failed'
      )}
      ref={fishingRodRef}
      onClick={handleClick}
    >
      <div className="relative animate-pendulum">
        <FishingRodIcon></FishingRodIcon>
      </div>
    </Box>
  );
};
