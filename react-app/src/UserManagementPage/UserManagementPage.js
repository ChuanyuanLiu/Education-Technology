import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserInfoData } from "../Utils/DataClass.js";
import UserInfo from "./UserInfo";
import NavBar from "../Utils/NavBar";
import CardList from "../Utils/CardList";

/**
 * Route from Homepage
 * Evaluation Page /user
 *  |-- NavBar
 *      |-- SearchBar
 *  |-- UserList
 */
function UserManagementPage() {
    const SEARCH_PROPERTY = "name";
    const SORTBY_PROPERTY = "name";
    const history = useHistory();
    const [userList, setUserList] = useState([]);

    const convertToDataClass = (data) => {
        return data.map((data) => new UserInfoData(data));
    };

    const goToUserOverview = (id) => {
        history.push({
            pathname: "/user_overview",
            state: {
                user_id: id,
            },
        });
    };

    useEffect(() => {
        fetch("http://localhost:3001/user")
            .then((response) => response.json())
            .then((data) => {
                setUserList(convertToDataClass(data));
            })
            .catch(console.error);
    }, []);

    if (userList.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex_container'>
            <div className='header'>
                <NavBar>
                    Users
                </NavBar>
            </div>
            <div className='content scrollable'>
                <CardList 
                    searchProperty={SEARCH_PROPERTY} 
                    sortByProperty={SORTBY_PROPERTY}
                    list={userList}
                    CardReactComponent={UserInfo}
                    onClick={goToUserOverview}
                />
            </div>
        </div>
    );
}

export default UserManagementPage;