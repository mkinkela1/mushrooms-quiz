import React, {useEffect, useState} from 'react';
import './App.css';
import Image from './Image';

interface IMushroom {
  nameCro: string,
  nameLat: string,
  img: string,
  sortVal: number
}

const App = () => {

  const [mushrooms, setMushrooms] = useState<IMushroom[]>([]);
  const [idx, setIdx] = useState<number> (0);
  const [revealAnswer, setRevealAnswer] = useState<boolean> (false);

  useEffect(() => {
    (async () => {
      const data = await (await fetch("/data/mushrooms.json")).json();

      const arr: IMushroom[] = data.map((mushroom: IMushroom) => ({ ...mushroom, sortVal: Math.random() })).sort((a: IMushroom, b: IMushroom) => a.sortVal - b.sortVal);
      setMushrooms(arr);
    })();
  }, []);

  const showAnswer = () => setRevealAnswer(true);
  const next = () => {

    if(idx + 1 >= mushrooms.length)
      setIdx(0);
    else
      setIdx(prevState => prevState + 1);

    setRevealAnswer(false);
  };

  if(mushrooms.length > 0)
    return (
        <div className="App">
          {/*<img src={`assets/mushrooms/${mushrooms[idx].img}`} alt={mushrooms[idx].nameCro} />*/}
          <Image src={`assets/mushrooms/${mushrooms[idx].img}`} />
          {
            revealAnswer &&
            <div className="veggie-data">
              <table>
                <tr><td>Naziv latinski: </td><td>{mushrooms[idx].nameLat}</td></tr>
                <tr><td>Naziv hrvatski: </td><td>{mushrooms[idx].nameCro}</td></tr>
              </table>
            </div>
          }
          {
            !revealAnswer ?
                <button className="btn" onClick={() => showAnswer()}>Prikaži odgovor</button>
                :
                <button className="btn" onClick={() => next()}>Dalje</button>
          }
        </div>
    );
  else
    return (<>Loading</>)
}

export default App;