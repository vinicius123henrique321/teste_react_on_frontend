import {Box} from "@chakra-ui/react"
import SideBarUser from "../SideBarUser";

export default function PageWrapperUser({children}) {
    return (
        <Box>
            <SideBarUser></SideBarUser>
            <Box>
                {children}
            </Box>
        </Box>
    )
}