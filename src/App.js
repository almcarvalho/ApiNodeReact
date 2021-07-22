import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import api from './services/api';


/***
 * Componente
 * Propriedade
 * Estado Imutabilidade
 */

function App() {
    const [projects, setProjects] = useState([]); //conceito de estado

    useEffect(() => {
        api.get('projetos').then(response => {
            //console.log(response.data);
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        //projects.push(`Novo projeto ${Date.now()}`);

        //setProjects([...projects, `Novo projeto ${Date.now()}`]);

        const response = await api.post('projetos', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Lucas Carvalho"
        });

        const project = response.data;

        setProjects([...projects, project]);

        //console.log(projects);
    }

    return <>
        <Header title="homepages" >

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Add project</button>
        </Header>
    </>;
}

export default App;