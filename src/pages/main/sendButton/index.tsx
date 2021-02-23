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

  const usersData = React.useMemo(() => {
    return checkedUsersIds.map((userId) => {
      return {
        id: usersMap[userId].id,
        zipcode: usersMap[userId].address.zipcode,
      };
    });
  }, [checkedUsersIds]);

  const sendUsersData = React.useCallback(async () => dataRequest({ usersData }), [
    usersData,
  ]);

  return (
    <Button
      className={buttonStyles.sendButton}
      variant="outlined"
      children="Send"
      color="primary"
      onClick={sendUsersData}
      disabled={!checkedUsersIds.length}
    />
  );
}

async function dataRequest(params: {
  usersData: Array<{ id: string; zipcode: string }>;
}) {
  const { usersData } = params;
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com", {
      method: "POST",
      headers: {
        authorization: "very_secret_token",
      },
      body: JSON.stringify(usersData),
    });
    if (response.status !== 200)
      throw Error(
        `Failed sending selected users data. Response status is ${response.status}`
      );
    return await response.json();
  } catch (error) {
    console.error("Sending users data request failed:", error);
  }
}
