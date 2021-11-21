import { useEffect, useState } from "react";

const DATE_UNITS: [string , number][] = [
  ['day', 86400],
  ['hours', 3600],
  ['minute', 60],
  ['second', 1],
]

interface TimeAgoProps {
  value: number;
  unit: string;
}

const getDateDiff = (date: number): TimeAgoProps => {
  const now = Date.now();
  const diff = (date - now) / 1000;

  for (const [unit, secondsUnitValue] of DATE_UNITS) {
    if (Math.abs(diff) > secondsUnitValue || unit === 'second') {
      return {
        value: Math.floor(diff / secondsUnitValue),
        unit,
      }
    }
  }
  
}


export default function useTimeAgo(timestamp: number): number | string {
  const { value, unit } = getDateDiff(timestamp);
  const [timeago, setTimeago] = useState({value, unit});
  
  const rtf = new Intl.RelativeTimeFormat('es', {
    style: 'long'
  })
  
  useEffect(()=> {
    const interval = setInterval(() => {
      const { value, unit } = getDateDiff(timestamp);
      setTimeago({value, unit});
    } , 10000);

    return () => clearInterval(interval);
  }, [timestamp])
  
  
  return rtf.format(timeago.value, timeago.unit)
}
