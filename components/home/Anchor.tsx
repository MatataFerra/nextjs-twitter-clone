import Link from 'next/link';

export const Anchor = ({anchorText, redirect}): JSX.Element => {
  return(
    <>
      <Link href={redirect}>
        <a className='anchor'>
          {anchorText}
        </a>
      </Link>
      <style jsx>{`

        .anchor {
          line-height: 1.5;
          font-size: 1rem;
          color: #0070f3;
          font-weight: bold;
          margin-bottom: 1rem;

          transition: text-decoration 1s ease;
        }

        .anchor:hover,
        .anchor:focus,
        .anchor:active {
          text-decoration: underline;
        }

      `}</style>
    </>
  )
  
};
