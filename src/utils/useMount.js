import {useEffect} from 'react';

export function useMount(func) {
  useEffect(func, []);
}
