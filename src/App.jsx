import { useEffect, useState } from 'react';
import { UseFetchData } from './hooks/fetchData';


/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function App() {

  const [pokemons, setPokemons] = useState([])

  const getData= async ()=>{
    await UseFetchData('https://pokeapi.co/api/v2/pokemon')
    .then((data=>data.results.map(async (item)=>{
      const pokemon=await UseFetchData(item.url);
      setPokemons((prev)=>[...prev,pokemon])
    })))
    .then(()=>{
      const sorted=pokemons
      sorted.sort((a,b)=>{
        if(a.name<b.name){
          return -1
        }
        else if(a.name >b.name){
          return 1
        }
        else{
          return 0
        }


      })
      setPokemons(sorted)
    })
    
  }
  

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className='wrapper'>
      <h3>Desafio Fernandev</h3>
      <h1>Consumir Api Pokémon</h1>
      <div className='container'>
      {pokemons.map((item,index)=>{
        return(
          <div className='card' key={index}>
          <img src={item.sprites.front_default} alt='imagem do pokemon'/>
          <h1>{item.name}</h1>
          <h2>Experiencia:{item.base_experience}</h2>
        </div>
        )
      })}
      </div>

    </div>
  );
}

export default App;
