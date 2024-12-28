import './App.css';
import Navbar from "./commponents/navbar/navbar";
import Canvas from './commponents/canvas';
import Tabs from './commponents/tabs/tabs';
import MainGrid from './commponents/mainGrid/mainGrid';
import MainModal from './commponents/modal/mainModal';
import Loader from './commponents/loader';


function App() {
  return (
    <Canvas>
      <Loader/>
      <MainModal/>
      <Navbar>
        <Tabs>
          <MainGrid/>
        </Tabs>
      </Navbar>
    </Canvas>
  );
}

export default App;