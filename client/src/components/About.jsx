import '../index.css';

export default function About() {
  return (
    <div className="main-content intro-section">
      <div className="welcome-text">About Me</div>
      <h2>I am Mona Mokhalalati</h2>
      <p>
        I am a Software Engineering Technology student specializing in Artificial Intelligence, skilled in{' '}
        <span className="font-semibold">C#</span> and problem-solving. An adaptable team player passionate about
        creating practical, reliable software solutions.
      </p>
      <p>
        <a
          href="/Mona_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume
        </a>
      </p>
    </div>
  );
}