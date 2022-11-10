import React from 'react';
import peopleFromServer from '../people.json';
import { Person } from '../types/Person';
import { PeopleTableCaption } from './PeopleTableCaption';
import { PeopleTableHeader } from './PeopleTableHeader';
import { ColumnName } from '../types/ColumnName';
import { PeopleTableRow } from './PeopleTableRow';

type State = {
  people: Person[];
  selectedPeople: Person[];
  sortedBy: ColumnName | null;
  isReversed: boolean;
};

export class PeopleTable extends React.Component<{}, State> {
  state: Readonly<State> = {
    people: peopleFromServer,
    selectedPeople: [],
    sortedBy: null,
    isReversed: false,
  };

  selectPerson = (personToAdd: Person) => {
    this.setState(state => ({
      selectedPeople: [...state.selectedPeople, personToAdd],
    }));
  };

  unselectPerson = (personToDelete: Person) => {
    this.setState(state => ({
      selectedPeople: state.selectedPeople.filter(
        person => person.slug !== personToDelete.slug,
      ),
    }));
  };

  clearSelection = () => {
    this.setState({
      selectedPeople: [],
    });
  };

  findPersonIndex = (people: Person[], slug: string) => {
    return people.findIndex(
      (person) => person.slug === slug,
    );
  };

  moveUp = (slug: string) => {
    this.setState(({ people }) => {
      const personIndex = this.findPersonIndex(people, slug);

      if (personIndex === 0 || personIndex === -1) {
        return null;
      }

      const updatedPeople = [...people];

      updatedPeople[personIndex] = people[personIndex - 1];
      updatedPeople[personIndex - 1] = people[personIndex];

      return {
        people: updatedPeople,
      };
    });
  };

  moveDown = (slug: string) => {
    this.setState(({ people }) => {
      const personIndex = this.findPersonIndex(people, slug);

      if (personIndex === -1 || personIndex === people.length - 1) {
        return null;
      }

      const updatedPeople = [...people];

      updatedPeople[personIndex] = people[personIndex + 1];
      updatedPeople[personIndex + 1] = people[personIndex];

      return {
        people: updatedPeople,
      };
    });
  };

  sortBy = (columnName: ColumnName) => {
    this.setState(({ sortedBy, isReversed }) => {
      if (columnName === sortedBy) {
        return {
          sortedBy: columnName,
          isReversed: !isReversed,
        };
      }

      return {
        sortedBy: columnName,
        isReversed: false,
      };
    });
  }

  render() {
    const {
      people,
      selectedPeople,
      sortedBy,
      isReversed,
    } = this.state;

    function isSelected({ slug }: Person) {
      return selectedPeople.some(person => person.slug === slug);
    }

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

    return (
      <table className="table is-striped is-narrow">
        <PeopleTableCaption
          selectedPeople={selectedPeople}
          clearSelectionCallback={this.clearSelection}
        />

        <PeopleTableHeader
          sortByCallback={this.sortBy}
          sortedBy={sortedBy}
          isReversed={isReversed}
        />

        <tbody>
          {visiblePeople.map(person => (
            <PeopleTableRow
              key={person.slug}
              person={person}
              isPersonSelected={isSelected(person)}
              selectPersonCallback={this.selectPerson}
              unselectPersonCallback={this.unselectPerson}
              moveUpCallback={this.moveUp}
              moveDownCallback={this.moveDown}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
