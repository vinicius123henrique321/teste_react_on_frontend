import {Box} from "@chakra-ui/react"
import SideBarManager from "../SideBarManager";

export default function PageWrapperManager({children}) {
    return (
        <Box>
            <Box>
            <SideBarManager></SideBarManager>
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    )
}