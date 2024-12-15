import dynamic from 'next/dynamic';
import KanbanBoard from './components/KanbanBoard';

function Home() {
  return (
    <div className=" max-w-5xl my-0 mx-auto ">
      <h1 className=" text-3xl">Канбан доска</h1>
      <KanbanBoard />
    </div>
  );
}

export default Home;
