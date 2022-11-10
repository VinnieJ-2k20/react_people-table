import { FC } from 'react';
import classNames from 'classnames';
import { Button } from './Button';
import { Person } from '../types/Person';

interface Props {
  person: Person;
  isPersonSelected: boolean;
  selectPersonCallback: (person: Person) => void;
  unselectPersonCallback: (person: Person) => void;
  moveUpCallback: (slug: string) => void;
  moveDownCallback: (slug: string) => void;

}

export const PeopleTableRow: FC<Props> = ({
  person,
  isPersonSelected,
  selectPersonCallback,
  unselectPersonCallback,
  moveUpCallback,
  moveDownCallback,
}) => {
  return (
    <tr
      className={classNames({
        'has-background-warning': isPersonSelected,
      })}
    >
      <td>
        {isPersonSelected ? (
          <Button
            onClick={() => unselectPersonCallback(person)}
            className="is-small is-rounded is-danger"
          >
            <span className="icon is-small">
              <i className="fas fa-minus" />
            </span>
          </Button>
        ) : (
          <Button
            onClick={() => selectPersonCallback(person)}
            className="is-small is-rounded is-success"
          >
            <span className="icon is-small">
              <i className="fas fa-plus" />
            </span>
          </Button>
        )}
      </td>

      <td
        className={classNames({
          'has-text-link': person.sex === 'm',
          'has-text-danger': person.sex === 'f',
        })}
      >
        {person.name}
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>

      <td className="is-flex is-flex-wrap-nowrap">
        <Button onClick={() => moveDownCallback(person.slug)}>
          &darr;
        </Button>

        <Button onClick={() => moveUpCallback(person.slug)}>
          &uarr;
        </Button>
      </td>
    </tr>
  );
};
