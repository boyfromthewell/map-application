import React from 'react';
import useSWR from 'swr';
import { NaverMap } from '../../../types/map';
import { MAP_KEY } from '@/hooks/useMap';
import { Store } from '../../../types/store';
import { STORE_KEY } from '@/hooks/useStores';
import Marker from './Marker';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  if (!map || !stores) return null;

  return (
    <>
      {stores.map(({ coordinates, nid }) => (
        <Marker
          map={map}
          coordinates={coordinates}
          key={nid}
          onClick={() => console.log('hi!')}
        />
      ))}
    </>
  );
};

export default Markers;
