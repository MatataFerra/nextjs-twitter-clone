import styles from '../../pages/styles/shared_styles';
import { Anchor } from './Anchor';

export const Title = () : JSX.Element => {
  return (
    <>
      <h1>
        DevTer
      </h1>
      <p>Talking about dev, behind the scenes</p>
      <Anchor anchorText='Timeline' redirect={'/timeline'}/>
      <style jsx>{ styles }</style>
    </>
  );
}
