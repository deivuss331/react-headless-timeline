import { StyledLoader } from './Loader.styles';

interface IProps {
  className?: string;
}

function Loader({ className }: IProps): JSX.Element {
  return <StyledLoader className={className} aria-label="Ładowanie..." role="status" />;
}

export default Loader;
