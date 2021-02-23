import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { IStore } from "../../../store";
import { NUsers } from "../../../store/users/@types";
import { API_Users } from "../../../store/users/actions";
import { CheckedUsersContext } from "../index";
import tableStyles from "./index.scss";

export default React.memo(UsersTable);

function UsersTable(): React.ReactElement {
  const dispatch = useDispatch(),
    userIdsList = useSelector<IStore>((store) => store.users.list);

  React.useEffect(() => {
    dispatch(API_Users.usersGet({}));
  }, []);

  const tableHeader = React.useMemo(() => {
    const headNames = ["", "Name", "Telephone"];
    return (
      <>
        {headNames.map((headName: string) => (
          <TableCell children={headName} key={headName} />
        ))}
      </>
    );
  }, []);

  const tableBody = React.useMemo(
    () =>
      userIdsList?.map((userId: any) => (
        <UsersTableRow key={userId} userId={userId} />
      )),
    [userIdsList]
  );

  return (
    <div className={tableStyles.tableWrapper}>
      <Table>
        <TableHead children={<TableRow children={tableHeader} />} />
        <TableBody children={tableBody} />
      </Table>
    </div>
  );
}

interface IUsersTableRow {
  userId: NUsers.IUser["id"];
}

function UsersTableRow(properties: IUsersTableRow) {
  const user = useSelector<IStore>(
    (store) => store.users.map[properties.userId]
  );
  const usersContext = React.useContext(CheckedUsersContext),
    { setCheckedUsersIds } = usersContext;

  const onSelectUser = React.useCallback(
    (event) => {
      setCheckedUsersIds((currentCheckedIds: any) => {
        const checkboxValue = event.target;
        const nextValue = [...currentCheckedIds];
        if (checkboxValue.checked) {
          nextValue.push(properties.userId);
        } else {
          const indexOfRemovedId = nextValue.indexOf(properties.userId);
          nextValue.splice(indexOfRemovedId, 1);
        }
        return nextValue;
      });
    },
    [properties.userId]
  );

  return (
    <TableRow>
      <TableCell children={<Checkbox onChange={onSelectUser} />} />
      <TableCell children={user?.name} />
      <TableCell children={user?.phone} />
    </TableRow>
  );
}
