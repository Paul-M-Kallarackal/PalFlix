import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Heading,Box,Grid } from '@sparrowengg/twigs-react';
import MovieCard from './MovieCard';
import CrewCard from './CrewCard';
import useJWT from '../hooks/useJWT';
const CrewDescription = () => {
    const token=useJWT();
    const { crewId } = useParams()
    const [movies, setMovies] = useState([]);
    const [crew, setCrew] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            try {       
                const response = await axios.get(`http://localhost:3000/api/v1/crew/${crewId}/getMovies`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                setMovies(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        // Write something for me thanks
        const getPersonalDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/crew/${crewId}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                setCrew(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getPersonalDetails();
        getMovies();
    }, [crewId,token]);

    const renderMovies = () => {
        return (
            <Box css={{ display: 'flex',justifyContent: 'left' ,margin:'auto', overflow: 'scroll', maxWidth:'100%' }}>
            {movies.map((movie) => (
                 <MovieCard key={movie.movieId} {...movie} />
             ))} </Box>
        )
    };

        


    return (
        <>
            <Navbar />
            <div>
            <Grid>
            <Box
            css={{
                width: 300,
                height: 300,
                backgroundSize: 'cover',
                borderRadius: '$xl',
                position: 'relative',
                marginTop: '$8',
                marginLeft: '$50',
            
            }}>
            <CrewCard key={crew.personId} name={""} role={""} imageUrl={crew.imageUrl}/>
            </Box>
           <Box><Heading size={'h2'} css={{ textAlign: 'left', marginLeft: '120px', marginTop: '20px', color: 'white', }}>{crew.name}</Heading></Box> 
            <Box><Heading size={'h6'} css={{ textAlign: 'left', marginLeft: '120px', marginTop: '20px', color: 'white', }}>{crew.gender}</Heading></Box>
            </Grid>
                <Heading
                    size={'h4'}
                    css={{
                        textAlign: 'left',
                        marginLeft: '120px',
                        marginTop: '20px',
                        color: 'white',
                    }} >Movies</Heading>
                    {renderMovies()}
            </div>
        </>
    )
}

export default CrewDescription;