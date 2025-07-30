import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Board() {

    const session = await getServerSession()

    if(!session){
        redirect('/')
    }

    return (
        <div>
            <h1>Board</h1>
        </div>
    );
}