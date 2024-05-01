import React from 'react';

const developers = [
  {
    id: 1,
    name: 'Kelly Tam',
    imageUrl: 'https://avatars.githubusercontent.com/u/114624991?v=4',
    githubUrl: 'https://github.com/ktam808',
    PortfolioUrl: 'https://ktam808.github.io/',
    // eslint-disable-next-line max-len
    description: 'Working on this project to create a study page website with my team has been a rewarding experience. It provided me with the opportunity to collaborate closely with others to build a platform that can have a meaningful impact on students\' learning journeys. Utilizing the Meteor-React full calendar system, I gained valuable experience integrating an interactive calendar to help users schedule and manage study sessions efficiently. Throughout the project, I improved my technical skills in Meteor and React, and honed my ability to handle complex data and user interactions for a smooth user experience.',
  },
  {
    id: 2,
    name: 'Stephanie Castelblanco',
    imageUrl: 'https://avatars.githubusercontent.com/u/156392785?v=4',
    githubUrl: 'https://github.com/stephanie-castelblanco',
    PortfolioUrl: 'https://stephanie-castelblanco.github.io/',
    // eslint-disable-next-line max-len
    description: 'Throughout this project, I have had the opportunity to enhance my skills in various areas. Firstly, I gained valuable experience working collaboratively in a team environment. Secondly, I developed my proficiency in using GitHub for version control and task management. Additionally, I further refined my time management skills and ability to meet deadlines. Lastly, I honed my programming abilities in JavaScript, React, HTML/CSS, and Meteor.',
  },
  {
    id: 3,
    name: 'Gi Young Back',
    imageUrl: 'https://avatars.githubusercontent.com/u/97486797?s=400&u=0a9a19fffb7d8925be99333035fa457390b5d750&v=4',
    githubUrl: 'https://github.com/michelle4929',
    PortfolioUrl: 'https://michelle4929.github.io/',
    // eslint-disable-next-line max-len
    description: 'Using React to create a study website for tech students in UHM was an eventful experience, enabling me to streamline development through component-based architecture, optimize performance with virtual DOM, and create dynamic user experiences with robust state management. Collaborating with peers enriched my learning journey, fostering creativity and resilience in problem-solving. Overall, React empowered me to build a polished and responsive study page while honing my technical skills and fostering a sense of community in the development process.',
  },
  {
    id: 5,
    name: 'Andrew Gibbons',
    imageUrl: 'https://avatars.githubusercontent.com/u/156730995?v=4',
    githubUrl: 'https://github.com/andrewgibbons575',
    PortfolioUrl: 'https://andrewgibbons575.github.io/',
    // eslint-disable-next-line max-len
    description: '',
  },
  {
    id: 4,
    name: 'Benjamin Banilower',
    imageUrl: 'https://avatars.githubusercontent.com/u/156398965?v=4',
    githubUrl: 'https://github.com/banilowben',
    PortfolioUrl: 'https://banilowben.github.io/',
    // eslint-disable-next-line max-len
    description: 'Working on this project helped me understand how to handle data collections effectively using React\'s state management. I got hands-on experience with React\'s component-based approach and learned how to update components dynamically based on state changes. This practical project gave me a chance to explore React\'s features and improve my skills in using state to create dynamic user interfaces for web applications.',
  },
];

const AboutUs = () => (
  <div id="about-us" style={{ textAlign: 'center' }}>
    <h2 style={{ marginBottom: '20px', marginTop: '20px' }}>Meet the Developers</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', justifyContent: 'center', margin: '10px', padding: '10px' }}>
      {developers.map(developer => (
        <div key={developer.id} style={{ border: '2px solid black', padding: '20px', textAlign: 'center', backgroundColor: 'white' }}>
          <img src={developer.imageUrl} alt={developer.name} style={{ maxWidth: '100%', height: 'auto', borderRadius: '50%' }} />
          <h3 style={{ marginTop: '10px' }}>{developer.name}</h3>
          <p style={{ marginTop: '5px' }}>{developer.description}</p>
          <a href={developer.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px' }}>GitHub</a>
          <a href={developer.PortfolioUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px' }}>Professional Portfolio</a>
        </div>
      ))}
    </div>
  </div>
);

export default AboutUs;
