import { Button } from "./Button"
import { CrossIcon } from "./icons/crossIcon"
import { Input } from "./input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
//@ts-ignore
enum ContentTypes {
    Youtube = "youtube",
    Twitter = "twitter"
}


export const CreateContentModel = ({open , onclose} : {
    open : boolean ;
    onclose : ()=> void;
})  => {
        const titleRef = useRef<HTMLInputElement>(null);
        const linkRef = useRef<HTMLInputElement>(null);
        const [type, setType] = useState(ContentTypes.Youtube);

        async function addContent() {
            const title = titleRef.current?.value ;
            const link = linkRef.current?.value ;
            await axios.post(`${BACKEND_URL}/api/v1/content`,{
                link, 
                title, 
                type
            },{
                headers: {
                    "Authorization" :  localStorage.getItem("token")
                }
            })

             onclose();
        }
    return (
        <div>
            {open && <div > 
                {/* opacity background */}
                <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
                </div>
                {/* box to add content  */}
                <div className="w-screen h-screen fixed top-0 left-0  flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded-lg fixed">
                        <div className="flex justify-end">
                            <div onClick={onclose} className="cursor-pointer">
                                <CrossIcon/>
                            </div>
                        </div>
                        <div>
                            <Input placeholder = {"Title"} referance = {titleRef} type={"text"} />
                            <Input placeholder = {"Link"}  referance = {linkRef} type={"text"} />
                        </div>
                            <div>
                            <h1>Type</h1>
                            <div className="flex gap-1 justify-center pb-2">
                                <Button text="Youtube" varient={type === ContentTypes.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentTypes.Youtube)
                                }}></Button>
                                <Button text="Twitter" varient={type === ContentTypes.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentTypes.Twitter)
                                }}></Button>
                            </div>
                        </div>
                        <div className="flex justify-center ">
                            <Button varient="primary" text="Submit" onClick={addContent} />
                        </div>
                    </span>
                </div>
            </div>
            </div> }
        </div>
    )
} 
