import React from 'react'
import { Box, Heading} from '@sparrowengg/twigs-react';

const CrewCard = ({ role,name,imageUrl }) => {
    return (
      <div>
    <Box 
    css={{
      backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.7)
      ),
        url(${imageUrl})`,
      width: 300,
      height: 300,
      backgroundSize: 'cover',
      borderRadius: '$xl',
      position: 'relative',
      marginBottom: '$8',
      marginLeft: '$8',
    }}
    >
    <Box css={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: '$8',
    }}
    >
        <Heading
        size="h5"
        css={{
          marginBottom: 0,
          color: '$white900',
        }}
        >
        {name}
        </Heading>

      <Heading 
        size="h6" 
        css={{ 
          marginBottom: 0, 
          color: '$white900' 
        }}
      > 
      {role}
      </Heading>
    </Box>
  </Box>
      </div>
    )
  }
export default CrewCard