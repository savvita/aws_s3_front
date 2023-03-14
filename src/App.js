import Header from "./components/Header";
import S3objectTable from "./components/S3objectTable/S3objectTable";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <S3objectTable />
      </div>
    </div>
  );
}

export default App;
