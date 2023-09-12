"use client";


import React, { useRef } from "react";
import { LuBell } from "react-icons/lu";
import ApiService from "@/utils/ApiService";
import { useAuth } from "@/contexts/AuthProvider";
import Link from "next/link";
import { set } from "react-hook-form";

interface NotificationResponse {
    id: string;
    userId: string;
    link: string;
    message: string;
    createdAt: string;
    hasBeenRead: boolean;
}

const Notification = () => {

    const { authToken } = useAuth();
    const [notifications, setNotifications] = React.useState<NotificationResponse[]>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const getUserNotifications = async () => {
        const res = await ApiService.getUserNotifications(authToken || "");
        setNotifications(res.data);
    }
    React.useEffect(() => {
        getUserNotifications();

    }, []);
    const openNotification = () => {
        setIsOpen(!isOpen);
    }

    const cinnamon = (hasBeenRead: boolean) => {
        if (hasBeenRead) {
            return <div className="absolute  left-5 bg-gray-500 h-2.5 w-2.5 rounded-full mx-4"></div>
        }
        else {
            return <div className="absolute left-5 bg-orange-500 h-2.5 w-2.5 rounded-full mx-4"></div>
        }
    }

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {

            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    const onHover = async (id: string, notificationHasBeenRead: boolean) => {
        if (notificationHasBeenRead === false) {
            await ApiService.patchNotification(authToken || "", id)
        }
        await getUserNotifications();
    }


    const handleNotificationsNumber = (array: NotificationResponse[]) => {
        if (array.length === 0) return null;
        const filteredArray = array = array.filter((notification) => notification.hasBeenRead === false);
        if (filteredArray.length === 0) return null;
        else {
            return (
                <div className="absolute bg-red-600 flex justify-center items-center w-5 h-5 text-xs  rounded-full -right-2 -top-3 px-2 py-2 ">
                    {filteredArray.length}
                </div>
            )
        }
    }

    return (
        <div
            ref={ref}>
            <div
                onClick={openNotification}
                className=" cursor-pointer relative text-white">
                <LuBell
                    className='text-gray-600'
                    size={20}
                />

                {handleNotificationsNumber(notifications)}
            </div >

            <div style={notifications.length < 10 ? {} : { maxHeight: '34rem', overflowY: 'scroll' }} className=' absolute w-72 top-20 -translate-x-1/2  z-10  bg-gray-100 text-black shadow-md mx-4' >
                {
                    isOpen && notifications ? notifications.map((notif) => {
                        return (
                            <Link onMouseEnter={() => { onHover(notif.id, notif.hasBeenRead) }} key={notif.id} href={notif.link}>
                                <div onClick={() => setIsOpen(!isOpen)} className=" flex justify-center items-center text-sm  border-b border-gray-300 px-4 py-2 hover:bg-gray-200">
                                    {cinnamon(notif.hasBeenRead)}
                                    <span className="px-12">
                                        {`${notif.message} `}
                                    </span>
                                </div>
                            </Link>

                        )
                    }) : null
                }
                {
                    isOpen && notifications.length === 0 && <div onClick={() => setIsOpen(!isOpen)} className=" flex justify-center items-center text-sm  border-b border-gray-300 px-4 py-2 hover:bg-gray-200">
                        
                        <span className="px-12">
                            No notifications..
                        </span>
                    </div>
                }
            </div>


        </div>
    );
};

export default Notification;
