import { FC } from 'react';
import { Person } from '../types/Person';

interface Props {
  selectedPeople: Person[];
  clearSelectionCallback: () => void;
}

export const PeopleTableCaption: FC<Props> = ({
  selectedPeople,
  clearSelectionCallback,
}) => {
  return (
    <caption className="title is-5 has-text-info">
      {selectedPeople.length === 0 ? '-' : (
        <>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            onClick={clearSelectionCallback}
          />
          <br />
          <span>{selectedPeople.map(p => p.name).join(', ')}</span>
        </>
      )}
    </caption>
  );
};
