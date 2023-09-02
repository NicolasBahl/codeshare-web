import React from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import BannerAlert from "@/components/bannerAlert";
import { motion } from "framer-motion";



interface Response {
    status: number,
    data: {
        message?: string
    }
}


interface SettingsProps {
    title: string;
    oldLabel?: string;
    newLabel: string;
    oldPlaceholder?: string;
    newPlaceholder: string;
    oldType?: string;
    newType: string;
    onChangeOld?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeNew: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    type: 'password' | 'email'
    response: Response | undefined

}

const Settings = (props: SettingsProps) => {
    const { title, oldLabel, newLabel, oldPlaceholder, newPlaceholder, oldType, newType, onChangeOld, onChangeNew, onSubmit, type, response } = props;
    const fadeVariant = {
        hidden: { opacity: 0, transition: { duration: 2 } },
        visible: { opacity: 1, transition: { duration: 2 } },
    };
    const renderResponse = () => {
        if (response) {
            if (response.status === 200) {
                return (
                    <motion.div
                        className="my-2 mx-2"
                        variants={fadeVariant}
                        initial="visible"
                        animate="hidden"
                    >
                        <BannerAlert message={response.data.message as string} type="success" />
                    </motion.div >



                )
            }
            else if (response.status === 400 || 403 || 401) {
                return (
                    <motion.div
                        className="my-2 mx-2"
                        variants={fadeVariant}
                        initial="visible"
                        animate="hidden"
                    >
                        < BannerAlert message={response.data.message as string} type="error" />

                    </motion.div>


                )
            }
            else {
                return (
                    <motion.div
                        className="my-2 mx-2"
                        variants={fadeVariant}
                        initial="visible"
                        animate="hidden"
                    >
                        < BannerAlert message={'Unknown error'} type="error" />
                    </motion.div>


                )
            }
        }
        else {
            return <></>
        }
    }

    return (
        <>
            <div className="my-20 w-full rounded-lg bg-white pb-8 shadow-md" >
                <div className="relative rounded-lg">
                    <div className="my-10 mx-5">
                        <strong>
                            <h3 className="m-auto text-center">{title}</h3>
                        </strong>
                        {
                            type === 'password' ?

                                <>

                                    <Input
                                        onChange={onChangeOld}
                                        label={oldLabel}
                                        className="my-2 "
                                        placeholder={oldPlaceholder}
                                        type={oldType}
                                    />

                                    <Input
                                        onChange={onChangeNew}
                                        label={newLabel}
                                        className="my-2"
                                        placeholder={newPlaceholder}
                                        type={newType}
                                    />
                                </>


                                :
                                <Input
                                    onChange={onChangeNew}
                                    label={newLabel}
                                    className="my-2"
                                    placeholder={newPlaceholder}
                                    type={newType}
                                />


                        }
                    </div>
                    <div className="m-auto w-2/4 my-2">
                        <Button onClick={onSubmit}>Submit</Button>
                    </div>
                </div >
            </div >
            {renderResponse()}
        </>
    );
};

export default Settings;
