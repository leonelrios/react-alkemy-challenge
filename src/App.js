import AppRouter from "./routers/AppRouter";
import AuthContext from "./context/AuthContext";
import TeamContext from "./context/TeamContext";

function App() {
  return (
    <AuthContext>
      <TeamContext>
        <AppRouter />
      </TeamContext>
    </AuthContext>
  );
}

export default App;
