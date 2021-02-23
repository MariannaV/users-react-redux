import React, { Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
import mainPageStyles from "./index.scss";
import { Header } from "../../components/header";
import { SendDataButton } from "./sendButton";

const UsersTable = React.lazy(() => import("../../pages/main/table"));
const UsersMap = React.lazy(() => import("../../pages/main/map"));

export const CheckedUsersContext = React.createContext<{
  setCheckedUsersIds: React.Dispatch<React.SetStateAction<Array<string>>>;
  checkedUsersIds: Array<string>;
}>(null as any);

export function PageMain(): React.ReactElement {
  const [checkedUsersIds, setCheckedUsersIds] = React.useState<Array<string>>(
    []
  );
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
