"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import apiService from "@/utils/ApiService";
import Settings from "@/app/(auth)/components/settings";


interface Res {
    status: number,
    data: {
        message?: string
    }
}

const ProfilePage = () => {
    const { user, authToken } = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailResponse, setEmailResponse] = useState<Res | undefined>();
    const [passwordResponse, setPasswordResponse] = useState<Res | undefined>();


    const onSubmitEmail = async () => {
        const res = await apiService.changeEmail(user?.id, email, authToken)
        setEmailResponse({ status: res.status, data: { message: res.data.message } })

    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onSubmitPassword = async () => {
        const res = await apiService.changePassword(user?.id, oldPassword, newPassword, authToken);
            setPasswordResponse({ status: res.status, data: { message: res.data.message } })
    }

    const onChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
    }


    const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    }


    return (
        <>
            <Settings title={"Change your password"} oldLabel={"Old password"} oldPlaceholder={"***************"} oldType={"password"} newPlaceholder="New password" newLabel="New password" newType="password" onChangeOld={onChangeOldPassword} onChangeNew={onChangeNewPassword} onSubmit={onSubmitPassword} type={"password"} response={passwordResponse} />
            <Settings title={"Change your email"} newPlaceholder={user?.email as string} newLabel="Email" newType="email" onChangeNew={onChangeEmail} onSubmit={onSubmitEmail} type={"email"} response={emailResponse} />
        </>
    );
};

export default ProfilePage;
