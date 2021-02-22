import React from "react";
import { CheckedUsersContext } from "../index";
import { useSelector } from "react-redux";
import { IStore } from "../../../store";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import mapStyles from "./index.scss";

export default React.memo(UsersMap);

export function UsersMapWrapper(): React.ReactElement {
  return (
    <div className={mapStyles.mapWrapper}>
      <div id="usersMap" children={<UsersMap />} />
    </div>
  );
}

function UsersMap() {
  const users = useSelector<IStore>((store) => store.users.map);

  const usersContext = React.useContext(CheckedUsersContext),
    { checkedUsersIds } = usersContext;

  const mapRef = React.useRef<null | any>(null),
    onMapMount = React.useCallback((map) => {
      mapRef.current = map;
    }, []);

  const createMarkers = React.useMemo(() => {
    return checkedUsersIds.map((userid: string) => {
      return (
        <Marker
          key={userid}
          position={[
            users[userid].address.geo.lat,
            users[userid].address.geo.lng,
          ]}
          children={
            <Popup>
              <p>{users[userid].name}</p>
              <p>
                <strong>City: </strong>
                {users[userid].address.city}
              </p>
              <p>
                <strong>Street: </strong>
                {users[userid].address.street}
              </p>
            </Popup>
          }
        />
      );
    });
  }, [checkedUsersIds]);

  const zoom = 4,
    mapCenterPositionDefault = React.useMemo<[number, number]>(
      () => [24.8918, 21.8984],
      []
    );

  React.useEffect(
    function onChangeMapCenterPosition() {
      const isMounting = !mapRef.current;
      if (isMounting) return;

      const indexOfLastCheckedUser = checkedUsersIds.length - 1;
      const centerCoords = checkedUsersIds.length
        ? [
            +users[checkedUsersIds[indexOfLastCheckedUser]].address.geo.lat,
            +users[checkedUsersIds[indexOfLastCheckedUser]].address.geo.lng,
          ]
        : mapCenterPositionDefault;
      mapRef.current.setView(centerCoords, zoom);
    },
    [checkedUsersIds, mapCenterPositionDefault]
  );

  return (
    <MapContainer
      center={mapCenterPositionDefault}
      zoom={zoom}
      scrollWheelZoom={false}
      whenCreated={onMapMount}
      className={mapStyles.mapWrapper}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!!checkedUsersIds.length && createMarkers}
    </MapContainer>
  );
}
