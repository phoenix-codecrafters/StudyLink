import React from 'react';

const developers = [
  {
    id: 1,
    name: 'Andrew Gibbons',
    imageUrl: 'https://avatars.githubusercontent.com/u/156730995?v=4',
    githubUrl: 'https://github.com/andrewgibbons575',
    PortfolioUrl: 'https://andrewgibbons575.github.io/',
    description: 'Random words that maybe need or want but can later take out. :) blah blah blah blah blah blah yay!',
  },
  {
    id: 2,
    name: 'Benjamin Banilower',
    imageUrl: 'https://avatars.githubusercontent.com/u/156398965?v=4',
    githubUrl: 'https://github.com/banilowben',
    PortfolioUrl: 'https://banilowben.github.io/',
    description: 'Random words that maybe need or want but can later take out. :) blah blah blah blah blah blah yay!',
  },
  {
    id: 3,
    name: 'Gi Young Back',
    imageUrl: 'https://avatars.githubusercontent.com/u/97486797?s=400&u=0a9a19fffb7d8925be99333035fa457390b5d750&v=4',
    githubUrl: 'https://github.com/michelle4929',
    PortfolioUrl: 'https://michelle4929.github.io/',
    description: 'Random words that maybe need or want but can later take out. :) blah blah blah blah blah blah yay!',
  },
  {
    id: 4,
    name: 'Kelly Tam',
    imageUrl: 'https://avatars.githubusercontent.com/u/114624991?v=4',
    githubUrl: 'https://github.com/ktam808',
    PortfolioUrl: 'https://ktam808.github.io/',
    description: 'Random words that maybe need or want but can later take out. :) blah blah blah blah blah blah yay!',
  },
  {
    id: 5,
    name: 'Stephanie Castelblanco',
    imageUrl: 'https://avatars.githubusercontent.com/u/156392785?v=4',
    githubUrl: 'https://github.com/stephanie-castelblanco',
    PortfolioUrl: 'https://stephanie-castelblanco.github.io/',
    description: 'Random words that maybe need or want but can later take out. :) blah blah blah blah blah blah yay!',
  },
];

const AboutUs = () => (
  <div style={{ textAlign: 'center' }}>
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
