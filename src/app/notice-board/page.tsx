"use client"

import { useEffect, useState } from "react"
import axios from "axios";
import "@/app/api/fetchWithAuth";
import { fetchWithAuth } from "@/app/api/fetchWithAuth";
import BorderBox from "../components/board/border-box";

export default function Board() {

    const [boards, setBoards] = useState<any[]>([]);

    const fetchData = async () => {
       try {
        const response = await fetchWithAuth(`http://localhost:5000/board`);
        const data = await response.json();
        setBoards(data.boards);
       }catch(err) {
            console.error("api 호출 오류  ", err);
       }
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <div style={{ background: "#F7F7F7", padding: "72px 0 74px 0" }}>
            <div style={{ margin: "auto", width: "1070px" }}>
                <h2>Top3</h2>
                <h2>게시판</h2>

                {boards.map((item) => (
                    <BorderBox 
                    key={item.id}
                    tag={item.tag}
                    title={item.title}
                    userId={item.userId}
                    />
                ))}

            </div>
        </div>
    )
}