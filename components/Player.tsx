"use client"

import usePlayer from "@/hooks/usePlayer"

const Player = () => {
    const player = usePlayer();
    

    return (
        <div>
            This is the player
        </div>
    )
}

export default Player