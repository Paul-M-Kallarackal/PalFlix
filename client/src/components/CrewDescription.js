import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { Heading,Box,Grid } from '@sparrowengg/twigs-react';
import MovieCard from './MovieCard';
import CrewCard from './CrewCard';
import useJWT from '../hooks/useJWT';
import callApi from '../api_wrapper/api';
const CrewDescription = () => {
    useJWT();
    const { crewId } = useParams()
    const [movies, setMovies] = useState([]);
    const [crew, setCrew] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            try {       
                const response = await callApi('get',`/crew/${crewId}/getMovies`);
                setMovies(response);
            } catch (error) {
                console.error(error);
            }
        };
        // Write something for me thanks
        const getPersonalDetails = async () => {
            try {
                const response = await callApi('get',`/crew/${crewId}`);
                setCrew(response);
            } catch (error) {
                console.error(error);
            }
        }
        getPersonalDetails();
        getMovies();
    }, [crewId]);
                    
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
            <CrewCard key={crew.personId} imageUrl={crew.imageUrl}/>
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