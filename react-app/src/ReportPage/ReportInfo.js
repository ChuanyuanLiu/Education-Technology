import React from "react";
import {UserOutlined} from "@ant-design/icons";
import {resolveTime} from "../Utils/Helper";
import {ReportInfoData} from "../Utils/DataClass";
import InfoCard from "../Utils/InfoCard";

/**
 * Route from ReportSelect or ReportPage
 * A card that display following information of a report
 * @param {ReportInfoData} data
 * @param {function} handleClick(data.id)
 */
function ReportInfo({data, onClick}) {

    if (!(data instanceof ReportInfoData)) {
        console.error(
            "ReportInfo requires ReportInfoData as the first argument"
        );
    }

    return (
        <InfoCard title={data.title()} onClick={()=>onClick(data.id())}>
            <div className='leftContent'>
                <UserOutlined style={{fontSize: "20px"}} />
                {data.author()}
                <br/>
                Based on evaluation: {data.evaluationTitle()}
            </div>
            <div className='rightContent'>
                {data.wasFinalised()
                    ? data.isActive()
                        ? "Active"
                        : "Inactive"
                    : "Not Finalized"}
                <br />
                Last modified: &nbsp;
                {resolveTime(data.modifiedTime())}
            </div>
        </InfoCard>
    );
}

export default ReportInfo;
