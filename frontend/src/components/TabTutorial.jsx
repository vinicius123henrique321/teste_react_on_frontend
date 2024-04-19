import { Text ,Tabs, Box, TabList, TabPanels, Tab, TabPanel, Progress } from '@chakra-ui/react'
import { useState } from 'react'

function TabTutorial() {
    const [tabIndex, setTabIndex] = useState(0)

    const handleTabsChange = (index) => {
      setTabIndex(index)
    }
  
    return (
      <Box>
      <Text fontSize="40px" p="0 0 4rem 0">Tutorial de como usar a página:</Text>
        <Box m="0 5% 0 5%"  p="0 0 10px 0">
        <Box p="0 0 10px 0">
        <Progress
            value={tabIndex}
            max={2}
            min={-1}
            /> 
        </Box> 
      </Box>
      </Box>
    )
  }

export default TabTutorial;