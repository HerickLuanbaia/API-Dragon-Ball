import s from "./App.module.css";
import logo from "/Dragon-Ball-Logo.png";
import { api } from "./constants/api";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("1");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const carrega = async () => {
      try {
        const response = await api.get(`/characters?page=${page}`);

        setData(response.data.items);

        setTotalPages(response.data.meta.totalPages);

      } catch {
        console.error("Erro ao buscar personagens");
      }
    };

    carrega();
  }, [page]);


  return (
    <>
      <div className={s.wrapImg}>
        <img width={500} src={logo} alt="Dragon Ball Logo" className={s.logo}
        />
      </div>


      <div className={s.wrapInputs}>

        <label>
          Digite uma página de 1 até {totalPages}
        </label>


        <input
          type="number"min="1" max={totalPages} value={inputPage} onChange={(e) => setInputPage(e.target.value)}
        />


        <button 
          onClick={() => {

            if (Number(inputPage) > totalPages) {
              alert(`A página máxima é ${totalPages}`);
              return;
            }

            setPage(Number(inputPage));

          }}
        >
          Buscar
        </button>
      </div>
      <main>
        {data.map(item => (
        <Tilt key={item.id}className={s.tilt}tiltMaxAngleX={10}tiltMaxAngleY={10}scale={1.03}transitionSpeed={1500}>
          <div className={s.card}>
            <img src={item.image} alt={item.name} />

          <div className={s.wraptexts}>
            <h2>{item.name}</h2>

            <p><strong>Raça:</strong> {item.race}</p>
            <p><strong>Gênero:</strong> {item.gender}</p>
            <p><strong>Ki:</strong> {item.ki}</p>
            <p><strong>Ki Máximo:</strong> {item.maxKi}</p>
            <p><strong>Afiliação:</strong> {item.affiliation}</p>
          </div>
        </div>
      </Tilt>

        ))}

      </main>
    </>
  );
}

export default App;