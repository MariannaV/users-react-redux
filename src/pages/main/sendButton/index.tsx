import React from "react";
import { Button } from "@material-ui/core";
import { CheckedUsersContext } from "../index";
import { useSelector } from "react-redux";
import { IStore } from "../../../store";
import buttonStyles from "./index.scss";

export function SendDataButton(): React.ReactElement {
  const usersContext = React.useContext(CheckedUsersContext),
    { checkedUsersIds } = usersContext;

  const usersMap = useSelector<IStore>((store) => store.users.map);

  const usersData = React.useMemo(
    () =>
      checkedUsersIds.map((userId) => ({
        id: usersMap[userId].id,
        zipcode: usersMap[userId].address.zipcode,
      })),
    [checkedUsersIds]
  );

  const sendUsersData = React.useCallback(
    async () => dataRequest({ usersData }),
    [usersData]
  );

  return (
    <Button
      children="Send"
      className={buttonStyles.sendButton}
      color="primary"
      disabled={checkedUsersIds.length === 0}
      onClick={sendUsersData}
      variant="outlined"
    />
  );
}

async function dataRequest(parameters: {
  usersData: Array<{ id: string; zipcode: string }>;
}) {
  const { usersData } = parameters;
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com", {
      method: "POST",
      headers: {
        authorization: "very_secret_token",
      },
      body: JSON.stringify(usersData),
    });
    if (response.status !== 200)
      throw new Error(
        `Failed sending selected users data. Response status is ${response.status}`
      );
    return await response.json();
  } catch (error) {
    console.error("Sending users data request failed:", error);
  }
}
