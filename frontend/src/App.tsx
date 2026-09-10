import { MapView } from "./features/map/MapView";

const SEOUL_CITY_HALL = { lat: 37.5665, lng: 126.978 };

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <MapView center={SEOUL_CITY_HALL} />
    </div>
  );
}

export default App;
