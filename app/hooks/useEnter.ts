import {KeyboardEvent} from 'react';

export const useEnter = (clbck: () => void) => {
  return (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      clbck()
    }
  }
}