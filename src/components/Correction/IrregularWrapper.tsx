import styled from 'styled-components';

function IrregularWrapper({ children }: { children: number }) {
  return (
    <IrregularWrapperLayout $number={children}>
      {Math.abs(children).toLocaleString()}
    </IrregularWrapperLayout>
  );
}

export default IrregularWrapper;

const IrregularWrapperLayout = styled.span<{ $number: number }>`
  color: ${(props) =>
    props.$number >= 0 ? props.theme.color.blue : props.theme.color.red};
`;
