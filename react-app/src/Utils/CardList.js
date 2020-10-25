import React, {useState, useEffect} from "react";
import SearchBar, {sentence_contains} from "./SearchBar";
import {compareDateTime} from "./Helper";
import {FilterOutlined} from "@ant-design/icons"

/**
 * CardList renders each element in the list using CardReactComponent,
 * CardList
 *  |-- SearchBar
 *  |-- CardReactComponent (FrameworkInfo, EvaluationInfo, or ReportInfo)
 * @param {array of class} list a list of data in the form of data.
 * @param {string} searchProperty 
 * @param {string} sortByProperty
 * @param {CardReactComponent} CardReactComponent defines how each row will be rendered
 * @param {function} onClick to be triggered when a row of the list is clicked
 */
function CardList({list, searchProperty, sortByProperty, CardReactComponent, onClick}) {

    const SEARCH_PROPERTY = searchProperty;
    const SORTBY_PROPERTY = sortByProperty;
    const listAll = list;
    const [filteredList, setFilteredList] = useState(listAll);
    const [queryText, setQueryText] = useState("");
    const [isAscending, setAscending] = useState(false);


    // Filter then sort
    useEffect(()=>{
        var comparisonFunction;
        if (isAscending) {
            comparisonFunction = compareCards;
        } else {
            comparisonFunction = (e1, e2) => compareCards(e2, e1);
        }
        setFilteredList(
            filteredList.sort(comparisonFunction)
        )
    }, [filteredList, isAscending]);

    function compareCards(e1, e2) {
        if (SORTBY_PROPERTY !== "name") {
            return compareDateTime(e1.get(SORTBY_PROPERTY), e2.get(SORTBY_PROPERTY));
        }
        return e1.get(SORTBY_PROPERTY).localeCompare(e2.get(SORTBY_PROPERTY));
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
            <div className="search_result_control">
                <strong>{filteredList.length}</strong> result(s) found <em>{queryText === ""? null : " on " + "\"" + queryText + "\""}</em>
                <span className="right clickable" onClick={toggleAscending}>
                    {SORTBY_PROPERTY !== "name"
                        ? <strong><em>{isAscending ?"New to Old":"Old to New"} <FilterOutlined></FilterOutlined></em></strong>
                        : <strong><em>{isAscending ? "Z to A": "A to Z"} <FilterOutlined></FilterOutlined></em></strong>
                    }
                </span>
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
