
export const Button = ({ children, onClick }): JSX.Element => (
  <>
    <button onClick={onClick}>{children}</button>

    <style jsx>{`

      button {
        cursor: pointer;
        border: none;
        background: #000;
        color: #fff;
        border-radius: 9999px;
        font-size: 1.2rem;
        padding: 0.5rem 1rem;
        font-weight: bold;
        transition: opacity 0.3s ease-in-out;

        display: flex;
        align-items: center;
      }

      button:hover {
        opacity: 0.7;
      }

      button > :global(svg) {
        margin-right: 0.5rem;
      }

    `}</style>
  </>
);
