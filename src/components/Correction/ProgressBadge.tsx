import Badge from '../common/Badge';
import { CorrectionTable } from '../../store/correctionTable';
import { PROGRESS_VALUES } from '../../constants';

type Progress = Pick<CorrectionTable, 'progress'> &
  (typeof PROGRESS_VALUES)[number];

function ProgressBadge({ progress }: { progress: Progress }) {
  if (progress === PROGRESS_VALUES[0]) {
    return (
      <Badge size="basic" color="yellow">
        처리 중
      </Badge>
    );
  }
  return (
    <Badge size="basic" color="bluegreen">
      처리 완료
    </Badge>
  );
}

export default ProgressBadge;
