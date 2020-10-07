import React, {useState} from "react";
import SearchBar, {sentence_contains} from "./SearchBar";

function CardList({searchField, list, CardReactComponent, dataClass, onClick}) {
    const SEARCH_FIELD = searchField;
    const listAll = list;
    const [filteredList, setFilteredList] = useState(listAll);

    function filterList(text) {
        setFilteredList(
            listAll.filter((element) => {
                return sentence_contains(element[SEARCH_FIELD], text);
            })
        );
    }

    return (
        <div className='CardList'>
            <SearchBar onSearch={filterList} />
            {filteredList.map((data, i) => (
                <CardReactComponent
                    key={i}
                    data={new dataClass(data)}
                    onClick={onClick}
                />
            ))}
        </div>
    );
}

export default CardList;
