import { CopytoModal } from "@/components/User/CopyModal"
import { useState } from "react"

export const Preview = () => {
    const [isOpen,setisOpen] = useState(false);
    const PROFILE_URL = "https://spotpet.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fm5ehn3s5t7ec%2FKtxCRW7y0LXNYcn6BHPPD%2F065b05bda2e516ea6a5887ce9856d1db%2FGolden_Retriever__Price.webp&w=3840&q=75"

    return (
        <>
        <CopytoModal 
        isOpen={true} 
        onClose={() => setisOpen(false)}
        profileURL={PROFILE_URL}
        />
        </>
    )

}