import React, {useState, useEffect} from "react";
import SearchBar, {sentence_contains} from "./SearchBar";
import {compareDateTime} from "./Helper";
import Button3D from "../Utils/Button3D";

function CardList({searchProperty, sortByProperty="creationTime", list, CardReactComponent, onClick}) {

    const SEARCH_PROPERTY = searchProperty;
    const SORTBY_PROPERTY = sortByProperty;
    const listAll = list;
    const [filteredList, setFilteredList] = useState(listAll);
    const [queryText, setQueryText] = useState("");
    const [isAscending, setAscending] = useState(false);

    // Filter then sort
    useEffect(()=>{
        var comparisionFunction;
        if (isAscending) {
            comparisionFunction = compareCards;
        } else {
            comparisionFunction = (e1, e2) => compareCards(e2, e1);
        }
        setFilteredList(
            filteredList.sort(comparisionFunction)
        )
    }, [filterList, isAscending]);

    function compareCards(e1, e2) {
        return compareDateTime(e1.get(SORTBY_PROPERTY), e2.get(SORTBY_PROPERTY));
    }

    function filterList(text) {
        setFilteredList(
            listAll.filter((element) => {
                return sentence_contains(element.get(SEARCH_PROPERTY), text);
            })
        );
        setQueryText(text);
    }

    function toggleAscending() {
        setAscending(!isAscending);
    }

    return (
        <div className='CardList'>
            <SearchBar onSearch={filterList} />
            <div>
                We found {filteredList.length} result searching <em>{queryText}</em>.
                <Button3D on={isAscending} on_text="Oldest" off_text="Latest" onClick={toggleAscending}
                />
            </div>
            {filteredList.map((data, i) => (
                <CardReactComponent
                    key={i}
                    data={data}
                    onClick={onClick}
                />
            ))}
        </div>
    );
}

export default CardList;
