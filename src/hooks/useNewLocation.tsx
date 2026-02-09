import { useContext, useEffect } from 'react';
import { AppContext } from '../store/App/app-context';

const useNewLocation = (location) => {
  const { onSetLastLocation } = useContext(AppContext);
  useEffect(() => {
    if (location) {
      return onSetLastLocation(location);
    }
  }, [location, onSetLastLocation]);
};

export default useNewLocation;
