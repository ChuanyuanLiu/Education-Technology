/** @module SearchBar
 *  This module includes 
 *  1. SearchBar UI element
 *  2. Function that checks if a sentence contains a word 
 */

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


/**
 * Check if the sentence contains the word
 * Case insensitive and ignores white space
 * @param {string} sentence
 * @param {string} word
 * @returns {boolean}
 */
function sentence_contains(sentence, word) {
    const cleanSentence = sentence.replaceAll(" ", "").toLowerCase();
    const cleanWord = word.replaceAll(" ", "").toLowerCase();
    return cleanSentence.includes(cleanWord);
}

export {sentence_contains};
export default SearchBar;