import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listProblems } from './graphql/queries';
import { createProblem as createProblemMutation, deleteProblem as deleteProblem } from './graphql/mutations';


function App() {
  const [problems, setProblems] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchProblems();
  }, []);

  async function fetchProblems() {
    const apiData = await API.graphql({ query: listProblems });
    const problemsFromAPI = apiData.data.listProblems.items;
    await Promise.all(problemsFromAPI.map(async problem => {
      if (problem.image) {
        const image = await Storage.get(problem.image);
        problem.image = image;
      }
      return problem;
    }))
    setProblems(apiData.data.listProblems.items);
  }

  async function createProblem() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createProblemMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setProblems([ ...problems, formData ]);
    setFormData(initialFormState);
  }

  async function deleteProblem({ id }) {
    const newProblemsArray = problems.filter(problem => problem.id !== id);
    setProblems(newProblemsArray);
    await API.graphql({ query: deleteProblemMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchProblems();
  }
    
  return (
    <div className="App">
      <h1>My Problems</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Problem name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Problem description"
        value={formData.description}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createProblem}>Create</button>
      <div style={{marginBottom: 30}}>
        {
          problems.map(problem => (
            <div key={problem.id || problem.name}>
              <h2>{problem.name}</h2>
              <p>{problem.description}</p>
              <button onClick={() => deleteProblem(problem)}>Delete problem</button>
              {
                problem.image && <img src={problem.image} style={{width: 400}} />
              }
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
