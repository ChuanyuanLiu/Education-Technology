import React, {useState, useEffect} from "react";
import {Input} from "antd";
const {Search} = Input;

/**
 * A search bar that triggers onSearch upon pressing the search button
 * and supply search with the value of the search input
 * @param {function(text)} [onSearch=()=>{}]
 * @param {string} [placeholder=""]
 * @param {boolean} [instant=true] triggers onSearch for each user input
 */
function SearchBar({onSearch=()=>{}, placeholder="", instant=true}) {
    const [text, setText] = useState(placeholder);

    useEffect(()=>{
        if (instant) onSearch(text);
    }, [text]);

    function onChange(e) {
       setText(e.target.value);
    }

    return (
        <div className='SearchBar'>
            <Search
                type='text'
                name='search'
                onSearch={() => onSearch(text)}
                onChange={onChange}
                value={text}
            />
        </div>
    );
}

export default SearchBar;
