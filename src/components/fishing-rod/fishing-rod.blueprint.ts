import { useEffect, useReducer, useRef } from 'react';

export type FishingRodStatus =
  | 'idle'
  | 'fishing'
  | 'baiting'
  | 'reeling'
  | 'failed';

type FishingRodState = {
  status: FishingRodStatus;
};

type FishingRodAction = {
  type: 'startFishing' | 'reelIn' | 'takeBait' | 'stopFishing' | 'failed';
};

const initialState = {
  status: 'idle',
} as FishingRodState;

const fishingRodReducer = (
  state: FishingRodState,
  action: FishingRodAction
): FishingRodState => {
  switch (action.type) {
    case 'startFishing':
      return { status: 'fishing' };
    case 'reelIn':
      return { status: 'reeling' };
    case 'takeBait':
      return { status: 'baiting' };
    case 'stopFishing':
      return { status: 'idle' };
    case 'failed':
      return { status: 'failed' };
  }
};

export const FishingRodBlueprint = () => {
  const [state, dispatch] = useReducer(fishingRodReducer, initialState);
  const fishingTimer = useRef<NodeJS.Timeout>();
  const baitingTimer = useRef<NodeJS.Timeout>();
  const fishingRodRef = useRef<HTMLDivElement>(null);

  const stopBaitingTimer = () => {
    if (baitingTimer.current) {
      clearInterval(baitingTimer.current);
      baitingTimer.current = undefined;
    }
  };

  const startBaitingTimer = () => {
    if (baitingTimer.current) return;
    const randomNumber = Math.floor(Math.random() * 3000) + 3000;
    baitingTimer.current = setInterval(() => {
      dispatch({ type: 'failed' });
      stopBaitingTimer();
    }, randomNumber);
  };

  const stopFishingTimer = () => {
    if (fishingTimer.current) {
      clearInterval(fishingTimer.current);
      fishingTimer.current = undefined;
    }
  };

  const startFishingTimer = () => {
    fishingTimer.current = setInterval(() => {
      const randomNumber = Math.random() * 100;
      if (randomNumber < 5) {
        dispatch({ type: 'takeBait' });
        stopFishingTimer();
        startBaitingTimer();
      }
    }, 500);
  };

  const handleClick = () => {
    switch (state.status) {
      case 'idle':
        dispatch({ type: 'startFishing' });
        break;
      case 'fishing':
        dispatch({ type: 'stopFishing' });
        stopFishingTimer();
        break;
      case 'baiting':
        dispatch({ type: 'reelIn' });
        stopBaitingTimer();
        break;
      case 'failed':
        dispatch({ type: 'stopFishing' });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName === 'reeling') {
        dispatch({ type: 'stopFishing' });
      }
    };

    fishingRodRef.current?.addEventListener('animationend', handleAnimationEnd);

    return () => {
      fishingRodRef.current?.removeEventListener(
        'animationend',
        handleAnimationEnd
      );
    };
  }, []);

  useEffect(() => {
    if (state.status === 'fishing') {
      startFishingTimer();
    }
  }, [state.status]);

  return { state, handleClick, fishingRodRef };
};
