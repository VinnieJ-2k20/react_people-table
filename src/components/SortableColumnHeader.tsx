import { FC } from 'react';
import classNames from 'classnames';
import { ColumnName } from '../types/ColumnName';

interface Props {
  columnName: ColumnName;
  sortByCallback: (columnName: ColumnName) => void;
  sortedBy: ColumnName | null;
  isReversed: boolean;
}

export const SortableColumnHeader: FC<Props> = ({
  columnName,
  sortByCallback,
  sortedBy,
  isReversed,
}) => {
  return (
    <th>
      {columnName}

      <a href="#sort" onClick={() => sortByCallback(columnName)}>
        <span className="icon">
          <i
            className={classNames(
              'fas',
              {
                'fa-sort': sortedBy !== columnName,
                'fa-sort-up': sortedBy === columnName && isReversed,
                'fa-sort-down': sortedBy === columnName && !isReversed,
              },
            )}
          />
        </span>
      </a>
    </th>
  );
};
