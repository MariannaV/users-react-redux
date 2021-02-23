import React from "react";
import { useSelector } from "react-redux";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as NLeafletMap from "leaflet";
import { CheckedUsersContext } from "../index";
import { IStore } from "../../../store";
import mapStyles from "./index.scss";

export default React.memo(UsersMap);

function UsersMap() {
  const users = useSelector<IStore, IStore["users"]["map"]>(
    (store) => store.users.map
  );

  const usersContext = React.useContext(CheckedUsersContext),
    { checkedUsersIds } = usersContext;

  const mapReference = React.useRef<null | NLeafletMap.Map>(null),
    onMapMount = React.useCallback((map) => {
      mapReference.current = map;
    }, []);

  const createMarkers = React.useMemo(
    () =>
      checkedUsersIds.map((userId) => (
        <Marker
          children={
            <Popup>
              <p>{users[userId].name}</p>
              <p>
                <strong>City: </strong>
                {users[userId].address.city}
              </p>
              <p>
                <strong>Street: </strong>
                {users[userId].address.street}
              </p>
            </Popup>
          }
          key={userId}
          position={[
            users[userId].address.geo.lat,
            users[userId].address.geo.lng,
          ]}
        />
      )),
    [checkedUsersIds]
  );

  const zoom = 3,
    mapCenterPositionDefault = React.useMemo<NLeafletMap.LatLngExpression>(
      () => [24.8918, 21.8984],
      []
    );

  React.useEffect(() => {
    const isMounting = !mapReference.current;
    if (isMounting) return;

    const indexOfLastCheckedUser = checkedUsersIds.length - 1;
    const centerCoords =
      checkedUsersIds.length > 0
        ? ([
            Number(
              users[checkedUsersIds[indexOfLastCheckedUser]].address.geo.lat
            ),
            Number(
              users[checkedUsersIds[indexOfLastCheckedUser]].address.geo.lng
            ),
          ] as NLeafletMap.LatLngTuple)
        : mapCenterPositionDefault;
    mapReference.current!.setView(centerCoords, zoom);
  }, [checkedUsersIds, mapCenterPositionDefault]);

  return (
    <MapContainer
      center={mapCenterPositionDefault}
      className={mapStyles.mapWrapper}
      scrollWheelZoom={false}
      whenCreated={onMapMount}
      zoom={zoom}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {checkedUsersIds.length > 0 && createMarkers}
    </MapContainer>
  );
}
