import React from "react";
import { UsersTable } from "./table";
import { UsersMap } from "./map";

export const CheckedUsersContext = React.createContext<{
  setCheckedUsersIds: React.Dispatch<React.SetStateAction<Array<string>>>;
  checkedUsersIds: Array<string>;
}>(null as any);

export function PageMain(): React.ReactElement {
  const [checkedUsersIds, setCheckedUsersIds] = React.useState<Array<string>>(
    []
  );
  const store = React.useMemo(() => ({ checkedUsersIds, setCheckedUsersIds }), [
    checkedUsersIds,
  ]);
  return (
    <>
      <header>
        <h1>Users</h1>
      </header>
      <main>
        <CheckedUsersContext.Provider value={store}>
          <UsersTable />
          <UsersMap />
        </CheckedUsersContext.Provider>
      </main>
    </>
  );
}
