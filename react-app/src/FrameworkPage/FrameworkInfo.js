import React from "react";
import {UserOutlined} from "@ant-design/icons";
import {resolveTime} from "../Utils/Helper";
import {FrameworkInfoData} from "../Utils/DataClass";
import InfoCard from "../Utils/InfoCard";

/**
 * Route from FrameworkSelect or FrameworkPage
 * A card that display following information of a framework
 * @param {FrameworkInfoData} data
 * @param {function} handleClick(data.id)
 */
function FrameworkInfo({data, handleClick}) {

    if (!(data instanceof FrameworkInfoData)) {
        console.error(
            "FrameworkInfo requires FrameworkInfoData as the first argument"
        );
    }

    return (
        <InfoCard title={data.title()} onClick={()=>handleClick(data.id())}>
            <div className='leftContent'>
                <UserOutlined style={{fontSize: "20px"}} />
                {data.author()}
            </div>
            <div className='rightContent'>
                {data.wasFinalised()
                    ? data.isActive()
                        ? "Active"
                        : "Inactive"
                    : "Not Finalized"}
                <br />
                Created: &nbsp;
                {resolveTime(data.creationTime())}
            </div>
        </InfoCard>
    );
}

export default FrameworkInfo;
