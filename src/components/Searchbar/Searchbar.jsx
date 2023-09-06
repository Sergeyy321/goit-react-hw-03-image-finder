import {
  Formbutton,
  SearchForm,
  Forminput,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
export const Searchbar = ({ onClick }) => {
  return (
    <header>
      <SearchForm>
        <Formbutton type="submit" onClick={onClick}>
          <ImSearch />
        </Formbutton>

        <Forminput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </header>
  );
};
