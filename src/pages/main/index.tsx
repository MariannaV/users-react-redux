import React, { Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
import { NUsers } from "../../store/users/@types";
import mainPageStyles from "./index.scss";
import { Header } from "../../components/header";
import { SendDataButton } from "./sendButton";

const UsersTable = React.lazy(() => import("../../pages/main/table"));
const UsersMap = React.lazy(() => import("../../pages/main/map"));

interface ICheckedUsersContext {
  checkedUsersIds: Array<NUsers.IUser["id"]>;
  setCheckedUsersIds: React.Dispatch<
    React.SetStateAction<ICheckedUsersContext["checkedUsersIds"]>
  >;
}

export const CheckedUsersContext = React.createContext<ICheckedUsersContext>(
  null as any
);

export function PageMain(): React.ReactElement {
  const [checkedUsersIds, setCheckedUsersIds] = React.useState<
    ICheckedUsersContext["checkedUsersIds"]
  >([]);
  const checkedUsersContext = React.useMemo(
    () => ({ checkedUsersIds, setCheckedUsersIds }),
    [checkedUsersIds]
  );
  return (
    <>
      <Header />
      <main className={mainPageStyles.mainWrapper}>
        <CheckedUsersContext.Provider value={checkedUsersContext}>
          <Suspense children={<UsersTable />} fallback={<CircularProgress />} />
          <SendDataButton />
          <Suspense children={<UsersMap />} fallback={<CircularProgress />} />
        </CheckedUsersContext.Provider>
      </main>
    </>
  );
}
