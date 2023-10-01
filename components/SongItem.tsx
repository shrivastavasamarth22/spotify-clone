"use client"

import { Song } from "@/types";

interface SongItemProps {
    onClick: (id: string) => void;
    data: Song;
}


const SongItem: React.FC<SongItemProps> = ({
    onClick,
    data
}) => {
    return (
        <div>
            Song Item
        </div>
    )
}

export default SongItem