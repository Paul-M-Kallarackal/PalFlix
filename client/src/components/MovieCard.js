
import React from 'react'
import { Box, Heading, Text, Flex, Chip,DialogsManager,dialogs,Button} from '@sparrowengg/twigs-react';
import {Link} from 'react-router-dom';
const MovieCard = ({ movieId,title,description,releaseDate,imageUrl }) => {
  releaseDate=releaseDate?.split('T')[0];  
  return (
    <div>
  <Box 
  css={{
    backgroundImage: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.7)
    ),url(${imageUrl})`,
    width: 300,
    height: 300,
    backgroundSize: 'cover',
    borderRadius: '$xl',
    position: 'relative',
    marginBottom: '$8',
    marginLeft: '$8',
  }}
  onClick={() => {
    dialogs.open("modal", {
      size: "md",

      children:(
        <div css={{
          backgroundColor: '#D9AFD9',
          backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
        }}>
        <Box css={{
          margin: 'auto',
          width: 300,
          height: 300,
          backgroundSize: 'cover',
          borderRadius: '$xl',
          position: 'relative',
          backgroundImage: `url(${imageUrl})`,
        }}></Box>
        <Box css={{
          position: 'relative',
          bottom: 0,
          left: 0,
          padding: '$8',
        }}>
          <Heading 
            size="h3" 
            css={{ 
              marginBottom: 0, 
              color: '$black900' 
            }}
          > 
          {title}
          </Heading>
          <Text css={{ 
              color: '$black800', 
              marginBottom: '$4' 
            }}
          > {description} </Text>
          <Chip>Released on : {releaseDate} </Chip>
          <Flex gap='$4'>
            <Button css={{
            backgroundColor: '$black900',
            position: 'relative',
            color: '$white900',
            marginTop: '$8',
            width: '50%',
            height: '40px',
            '&:hover': {
              backgroundColor: '$black800',
            }
          }}>
            <Link to={'/title/'+movieId} size='lg' css={{color: '$white900'}}>View Details</Link>
          </Button>
          </Flex>
        </Box>
        </div>
      )
    });
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
      size="h3" 
      css={{ 
        marginBottom: 0, 
        color: '$white900' 
      }}
    > 
    {title}
    </Heading>
  </Box>
</Box>
  <DialogsManager />
    </div>
  )
}

export default MovieCard
