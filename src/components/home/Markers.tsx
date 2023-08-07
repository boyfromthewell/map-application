import React from 'react';
import useSWR from 'swr';
import { ImageIcon, NaverMap } from '../../../types/map';
import { MAP_KEY } from '@/hooks/useMap';
import { Store } from '../../../types/store';
import { STORE_KEY } from '@/hooks/useStores';
import Marker from './Marker';
import useCurrentStore, { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  if (!map || !stores) return null;

  return (
    <>
      {stores.map((store) => (
        <Marker
          map={map}
          coordinates={store.coordinates}
          key={store.nid}
          icon={generateStoreMarkerIcon({
            markerIndex: store.season,
            isSelected: false,
          })}
          onClick={() => setCurrentStore(store)}
        />
      ))}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          key={currentStore.nid}
          icon={generateStoreMarkerIcon({
            markerIndex: currentStore.season,
            isSelected: true,
          })}
          onClick={clearCurrentStore}
        />
      )}
    </>
  );
};

export default Markers;

export const generateStoreMarkerIcon = ({
  markerIndex,
  isSelected,
}: {
  markerIndex: number;
  isSelected: boolean;
}): ImageIcon => {
  return {
    url: isSelected ? 'markers-selected.png' : 'markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
};
