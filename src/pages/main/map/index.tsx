import React from "react";
import { CheckedUsersContext } from "../index";
import { useSelector } from "react-redux";
import { IStore } from "../../../store";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import mapStyles from "./index.scss";

export default React.memo(UsersMap);

export function UsersMapWrapper(): React.ReactElement {
  return (
    <div className={mapStyles.mapWrapper}>
      <div children={<UsersMap />} id="usersMap" />
    </div>
  );
}

function UsersMap() {
  const users = useSelector<IStore>((store) => store.users.map);

  const usersContext = React.useContext(CheckedUsersContext),
    { checkedUsersIds } = usersContext;

  const mapReference = React.useRef<null | any>(null),
    onMapMount = React.useCallback((map) => {
      mapReference.current = map;
    }, []);

  const createMarkers = React.useMemo(
    () =>
      checkedUsersIds.map((userid: string) => (
        <Marker
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
          key={userid}
          position={[
            users[userid].address.geo.lat,
            users[userid].address.geo.lng,
          ]}
        />
      )),
    [checkedUsersIds]
  );

  const zoom = 3,
    mapCenterPositionDefault = React.useMemo<[number, number]>(
      () => [24.8918, 21.8984],
      []
    );

  React.useEffect(() => {
    const isMounting = !mapReference.current;
    if (isMounting) return;

    const indexOfLastCheckedUser = checkedUsersIds.length - 1;
    const centerCoords =
      checkedUsersIds.length > 0
        ? [
            Number(
              users[checkedUsersIds[indexOfLastCheckedUser]].address.geo.lat
            ),
            Number(
              users[checkedUsersIds[indexOfLastCheckedUser]].address.geo.lng
            ),
          ]
        : mapCenterPositionDefault;
    mapReference.current.setView(centerCoords, zoom);
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
