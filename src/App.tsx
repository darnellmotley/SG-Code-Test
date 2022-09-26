import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useInView } from 'react-intersection-observer';
import style from './App.module.css';
import Box from './components/Box';
import { Kino } from './api/kino';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import config from 'config';

function App() {
  const { data, isLoading } = useInfiniteQuery<Kino[], string>('kinos', () =>
    axios.get(`${config.apiUrl}payload`).then((res) => res.data)
  );
  const [selectedKino, setSelectedKino] = useState<Kino | null>(null);
  const onSetSelectedKino = (kino: Kino | null) => setSelectedKino(kino);

  return (
    <>
      <Container fluid className={style.root}>
        <h1 className={style.header}>KINO</h1>
        {isLoading && <Spinner animation="border" variant="primary" />}

        <div className={style.container}>
          {data?.pages.map((page) =>
            page.map((kino) => (
              <Box
                key={kino.gameNumber}
                onSetSelectedKino={onSetSelectedKino}
                kino={kino}
              />
            ))
          )}
        </div>
      </Container>
      <Modal
        show={!!selectedKino}
        onHide={() => onSetSelectedKino(null)}
        centered
        dialogClassName={style.modalDialog}>
        {selectedKino && (
          <Box isModal kino={selectedKino} onSetSelectedKino={() => {}} />
        )}
      </Modal>
    </>
  );
}

export default App;
