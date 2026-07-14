import { useEffect, useState } from 'react';
import { readLocal, writeLocal } from '../services/storage/localStorage.service';
export function useLocalStorage<T>(key: string, initial: T) { const [value, setValue] = useState(() => readLocal(key, initial)); useEffect(() => writeLocal(key, value), [key, value]); return [value, setValue] as const; }
