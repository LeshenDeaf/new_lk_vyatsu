import {KeyboardEvent} from 'react';

export const useEnter = (callback: () => void) => {
  return (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      callback()
    }
  }
}