import "./App.css";
import Main from "./Main/Main";
import { MobileViewProvider } from './Context/MobileViewContext';

function App() {
  return (
    <MobileViewProvider>
      <Main></Main>
    </MobileViewProvider>
  );
}

export default App;
