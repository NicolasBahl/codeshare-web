"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import apiService from "@/utils/ApiService";
import Settings from "@/app/(auth)/components/settings";



interface User {
    email: string
    username: string
}

interface Res {
    status: number,
    data: {
        message?: string
    }
}

const ProfilePage = () => {
    const { user, authToken } = useAuth();
    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        email: ''
    })
    const [emailResponse, setEmailResponse] = useState<Res | undefined>();
    const [passwordResponse, setPasswordResponse] = useState<Res | undefined>();

    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const onSubmitEmail = async () => {
        const res = await apiService.changeEmail(user?.id, form.email, authToken);
        setForm({ ...form, email: '' });
        await fetchUser();
        setEmailResponse({ status: res.status, data: { message: res.data.message } })
    }

    useEffect(() => {
        fetchUser();
    }, [])


    const fetchUser = async () => {
        const res = await apiService.getCurrentUser(authToken as string);
        setCurrentUser(res.data)
    }
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, email: e.target.value });
    }

    const onSubmitPassword = async () => {
        const res = await apiService.changePassword(user?.id, form.oldPassword, form.newPassword, authToken);
        setForm({ ...form, oldPassword: '', newPassword: ''})
        setPasswordResponse({ status: res.status, data: { message: res.data.message } })
    }

    const onChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, oldPassword: e.target.value });
    }


    const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, newPassword: e.target.value });
    }


    return (
        <>
            <Settings title={"Change your password"} oldValue={form.oldPassword} value={form.newPassword} oldLabel={"Old password"} oldPlaceholder={"*****"} oldType={"password"} newPlaceholder="New password" newLabel="New password" newType="password" onChangeOld={onChangeOldPassword} onChangeNew={onChangeNewPassword} onSubmit={onSubmitPassword} type={"password"} response={passwordResponse} />
            <Settings title={"Change your email"} value={form.email} newPlaceholder={currentUser?.email as string} newLabel="Email" newType="email" onChangeNew={onChangeEmail} onSubmit={onSubmitEmail} type={"email"} response={emailResponse} />
        </>
    );
};

export default ProfilePage;
