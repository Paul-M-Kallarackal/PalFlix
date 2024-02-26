import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Heading, Box,Grid } from '@sparrowengg/twigs-react';
import MovieCard from './MovieCard';
import CrewCard from './CrewCard';
import { useEffect, useState } from 'react';
const ActorDescription =() => {
    const { actorId } = useParams()
    const [movies, setMovies] = useState([]);
    const [actor, setActor] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            try {       
                const response = await axios.get(`http://localhost:3000/api/v1/actors/${actorId}/getMovies`);
                setMovies(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const getPersonalDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/actors/${actorId}`);
                console.log(response.data);
                setActor(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getPersonalDetails();
        getMovies();
    }, [actorId]);

    const renderMovies = () => {
        console.log(movies);
        return (
            <Box css={{ display: 'flex', justifyContent: 'left' ,marginLeft:'120px',margin:'auto', overflow: 'scroll' }}>
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
                backgroundImage: `url(${actor.imageUrl})`,
                width: 300,
                height: 300,
                backgroundSize: 'cover',
                borderRadius: '$xl',
                position: 'relative',
                marginTop: '$8',
                marginLeft: '$50',
            
            }}>
            <CrewCard key={actor.personId} name={""} role={""} imageUrl={actor.imageUrl}/>
            </Box>
           <Box><Heading size={'h2'} css={{ textAlign: 'left', marginLeft: '120px', marginTop: '20px', color: 'white', }}>{actor.name}</Heading></Box> 
            <Box><Heading size={'h6'} css={{ textAlign: 'left', marginLeft: '120px', marginTop: '20px', color: 'white', }}>{actor.gender}</Heading></Box>
            
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
export default ActorDescription