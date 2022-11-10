import { FC } from 'react';
import { ColumnName } from '../types/ColumnName';
import { SortableColumnHeader } from './SortableColumnHeader';

interface Props {
  sortByCallback: (columnName: ColumnName) => void;
  sortedBy: ColumnName | null;
  isReversed: boolean;
}

export const PeopleTableHeader: FC<Props> = ({
  sortByCallback, sortedBy, isReversed,
}) => {
  return (
    <thead>
      <tr>
        <th> </th>

        <SortableColumnHeader
          columnName={ColumnName.Name}
          sortByCallback={sortByCallback}
          sortedBy={sortedBy}
          isReversed={isReversed}
        />

        <SortableColumnHeader
          columnName={ColumnName.Sex}
          sortByCallback={sortByCallback}
          sortedBy={sortedBy}
          isReversed={isReversed}
        />

        <SortableColumnHeader
          columnName={ColumnName.Born}
          sortByCallback={sortByCallback}
          sortedBy={sortedBy}
          isReversed={isReversed}
        />

        <th>Controls</th>
      </tr>
    </thead>
  );
};
