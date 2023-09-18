import axios from "axios";


const Dashboard = () => {

    let getAll = () =>{

    axios.get('http://localhost:8001/api/type-user')
      .then(res => console.log(res))
      .catch(err => console.error(err))

    }
    
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={getAll}>Cliquez</button>
        </div>
    );
};

export default Dashboard;