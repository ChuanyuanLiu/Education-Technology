import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { UserInfoData } from "../Utils/DataClass";
import { resolveUserTime } from "../Utils/Helper";
import InfoCard from "../Utils/InfoCard";

function UserInfo ({data, onClick}) {
    if (!(data instanceof UserInfoData)) {
        console.error(
            "UserInfo requires UserInfoData as the first argument"
        );
    }

    return(
        <InfoCard title={data.name()} onClick={() => onClick(data.id())}>
            <div className='leftContent'>
                <UserOutlined style={{fontSize: "20px"}} />
                {data.email()}
                <br/>
                Created at&nbsp;
                {resolveUserTime(data.createdAt())}
            </div>
            <div className='rightContent'>
                {data.userMetadata().active ? "Active" : "Inactive"}
                <br/>
                {data.role().name}
            </div>
        </InfoCard>
    ); 
}

export default UserInfo;