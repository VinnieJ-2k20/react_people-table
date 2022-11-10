import { FC, useState } from 'react';
import peopleFromServer from '../people.json';
import { PeopleTableCaption } from './PeopleTableCaption';
import { PeopleTableHeader } from './PeopleTableHeader';
import { PeopleTableRow } from './PeopleTableRow';
import { Person } from '../types/Person';
import { ColumnName } from '../types/ColumnName';

export const PeopleTableHooks: FC = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [sortedBy, setSortedBy] = useState<ColumnName | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const selectPerson = (personToAdd: Person) => {
    setSelectedPeople((prevSelectedPeople) => {
      const updatedSelectedPeople = [...prevSelectedPeople, personToAdd];

      return updatedSelectedPeople;
    });
  };

  const unselectPerson = (personToDelete: Person) => {
    setSelectedPeople((prevSelectedPeople) => {
      return prevSelectedPeople.filter(
        person => person.slug !== personToDelete.slug,
      );
    });
  };

  const clearSelection = () => {
    setSelectedPeople([]);
  };

  const findPersonIndex = (searchPool: Person[], slug: string) => {
    return searchPool.findIndex(
      (person) => person.slug === slug,
    );
  };

  const moveUp = (slug: string) => {
    setPeople((prevPeople) => {
      const personIndex = findPersonIndex(prevPeople, slug);

      if (personIndex === 0 || personIndex === -1) {
        return prevPeople;
      }

      const updatedPeople = [...prevPeople];

      updatedPeople[personIndex] = prevPeople[personIndex - 1];
      updatedPeople[personIndex - 1] = prevPeople[personIndex];

      return updatedPeople;
    });
  };

  const moveDown = (slug: string) => {
    setPeople((prevPeople) => {
      const personIndex = findPersonIndex(prevPeople, slug);

      if (personIndex === -1 || personIndex === prevPeople.length - 1) {
        return prevPeople;
      }

      const updatedPeople = [...prevPeople];

      updatedPeople[personIndex] = prevPeople[personIndex + 1];
      updatedPeople[personIndex + 1] = prevPeople[personIndex];

      return updatedPeople;
    });
  };

  const sortBy = (columnName: ColumnName) => {
    if (columnName === sortedBy) {
      setIsReversed(!isReversed);

      return;
    }

    setSortedBy(columnName);
    setIsReversed(false);
  };

  if (people.length === 0) {
    return <p>No people yet</p>;
  }

  const visiblePeople = [...people];

  if (sortedBy) {
    visiblePeople.sort(
      (a, b) => {
        switch (sortedBy) {
          case 'name':
          case 'sex':
            return a[sortedBy].localeCompare(b[sortedBy]);

          case 'born':
            return a.born - b.born;

          default:
            return 0;
        }
      },
    );
  }

  if (isReversed) {
    visiblePeople.reverse();
  }

  const isSelected = ({ slug }: Person) => (
    selectedPeople.some(person => person.slug === slug)
  );

  return (
    <table className="table is-striped is-narrow">
      <PeopleTableCaption
        selectedPeople={selectedPeople}
        clearSelectionCallback={clearSelection}
      />

      <PeopleTableHeader
        sortByCallback={sortBy}
        sortedBy={sortedBy}
        isReversed={isReversed}
      />

      <tbody>
        {visiblePeople.map(person => (
          <PeopleTableRow
            key={person.slug}
            person={person}
            isPersonSelected={isSelected(person)}
            selectPersonCallback={selectPerson}
            unselectPersonCallback={unselectPerson}
            moveUpCallback={moveUp}
            moveDownCallback={moveDown}
          />
        ))}
      </tbody>
    </table>
  );
};
